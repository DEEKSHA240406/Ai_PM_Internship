// utils/emailNotificationService.js - Final version using your existing mailer.js
const User = require('../models/User');
const Profile = require('../models/Profile');
const Internship = require('../models/Internship');
const offlineTranslationService = require('./offlineTranslationService');
const mailer = require('./mailer'); // Your existing mailer.js

// ENHANCED MATCHING ALGORITHM (same as before)
const calculateMatchScore = (profile, internship) => {
  let score = 0;
  let maxScore = 0;

  try {
    // Translate profile data to English for consistent matching
    const translatedProfile = offlineTranslationService.translateProfile(profile);

    // Skills matching (40% weight)
    const skillsWeight = 0.4;
    maxScore += skillsWeight * 100;
    
    const profileSkills = translatedProfile.skills.map(s => s.toLowerCase().trim());
    const requiredSkills = internship.skills_required.map(s => s.toLowerCase().trim());
    
    let skillMatches = 0;
    requiredSkills.forEach(requiredSkill => {
      if (offlineTranslationService.enhancedMatch(
        requiredSkill, 
        profileSkills, 
        profile.language || 'en-IN'
      )) {
        skillMatches++;
      }
    });
    
    if (requiredSkills.length > 0) {
      score += (skillMatches / requiredSkills.length) * skillsWeight * 100;
    }

    // Location matching (30% weight)
    const locationWeight = 0.3;
    maxScore += locationWeight * 100;
    
    const translatedLocations = translatedProfile.preferred_locations.map(loc => loc.toLowerCase().trim());
    const internshipLocation = internship.location.toLowerCase().trim();
    
    let locationMatch = false;
    translatedLocations.forEach(userLocation => {
      if (offlineTranslationService.enhancedMatch(
        userLocation,
        [internshipLocation],
        profile.language || 'en-IN'
      )) {
        locationMatch = true;
      }
    });
    
    if (locationMatch || internship.remote_ok) {
      score += locationWeight * 100;
    }

    // Sector matching (30% weight)
    const sectorWeight = 0.3;
    maxScore += sectorWeight * 100;
    
    let sectorMatches = 0;
    
    if (profile.sector_interests && profile.sector_interests.length > 0 && 
        internship.sectors && internship.sectors.length > 0) {
      
      const userSectorNames = profile.sector_interests.map(sector => {
        if (typeof sector === 'object' && sector.name) {
          return sector.name.toLowerCase().trim();
        }
        return null;
      }).filter(Boolean);
      
      const internshipSectorNames = internship.sectors.map(sector => {
        if (typeof sector === 'object' && sector.name) {
          return sector.name.toLowerCase().trim();
        }
        return null;
      }).filter(Boolean);
      
      const translatedUserSectors = userSectorNames.map(sectorName => 
        offlineTranslationService.translateTerm(sectorName, profile.language || 'en-IN')
      );
      
      internshipSectorNames.forEach(internshipSector => {
        if (offlineTranslationService.enhancedMatch(
          internshipSector,
          translatedUserSectors,
          profile.language || 'en-IN'
        )) {
          sectorMatches++;
        }
      });
      
      if (internshipSectorNames.length > 0) {
        score += (sectorMatches / internshipSectorNames.length) * sectorWeight * 100;
      }
    }

    const finalScore = Math.round((score / maxScore) * 100);
    
    console.log(`Match calculation for user ${profile.name || profile.userId}:`, {
      language: profile.language || 'en-IN',
      skillMatches: `${skillMatches}/${requiredSkills.length}`,
      locationMatch,
      sectorMatches: `${sectorMatches}/${internship.sectors?.length || 0}`,
      finalScore
    });

    return finalScore;

  } catch (error) {
    console.error('Error calculating match score:', error);
    return 0;
  }
};

// FIND MATCHING USERS FOR NEW INTERNSHIP
const findMatchingUsers = async (internshipId, minMatchScore = 50) => {
  try {
    const internship = await Internship.findById(internshipId).populate('sectors');
    if (!internship) {
      throw new Error('Internship not found');
    }
    
    console.log(`Finding matches for internship: ${internship.title}`);
    
    // Get all profiles with email notifications enabled and populated user data
    const profiles = await Profile.find({ notificationsEnabled: true })
      .populate('sector_interests')
      .populate('userId', 'email name'); // Only populate email and name from User
    
    console.log(`Total profiles with notifications enabled: ${profiles.length}`);
    
    const matchingUsers = [];

    for (const profile of profiles) {
      console.log(`Evaluating profile for user: ${profile.userId?.name || profile.userId?._id}`);
      if (!profile.userId || !profile.userId.email) continue;

      try {
        const matchScore = calculateMatchScore(profile, internship);
        console.log(`User ${profile.name || profile.userId.name} match score: ${matchScore}%`);
        if (matchScore >= minMatchScore) {
          matchingUsers.push({
            userId: profile.userId._id,
            email: profile.userId.email,
            name: profile.name || profile.userId.name,
            profile: profile,
            matchScore: matchScore
          });
        }
      } catch (matchError) {
        console.error(`Error calculating match for user ${profile.userId?._id}:`, matchError);
        continue;
      }
    }
    
    console.log(`Users matching minimum score of ${minMatchScore}: ${matchingUsers.length}`);
    
    // Sort by match score (highest first)
    matchingUsers.sort((a, b) => b.matchScore - a.matchScore);

    return matchingUsers;
    
  } catch (error) {
    console.error('Error finding matching users:', error);
    return [];
  }
};

// CREATE LOCALIZED EMAIL CONTENT
// CREATE LOCALIZED EMAIL CONTENT - UPDATED
const createLocalizedEmailContent = (internship, user, language) => {
  let subject, greeting, matchText, detailsText, skillsText, locationText, 
      applyText, footerText, applyButtonText, viewDetailsText;

  const stipendText = internship.stipend?.amount > 0 ? 
    `₹${internship.stipend.amount}/${language === 'hi-IN' ? 'महीना' : language === 'ta-IN' ? 'மாதம்' : 'month'}` : 
    (language === 'hi-IN' ? 'अवेतनिक' : language === 'ta-IN' ? 'ஊதியம் இல்லை' : 'Unpaid');

  // NEW: Translate skills to user's language
  const translateSkillsToUserLanguage = (skills, targetLanguage) => {
    if (targetLanguage === 'en-IN') return skills;
    
    const reverseTranslations = {
      'ta-IN': {
        'react': 'ரியாக்ட்',
        'nodejs': 'நோட்ஜேஎஸ்',
        'javascript': 'ஜாவாஸ்கிரிப்ட்',
        'python': 'பைதான்',
        'java': 'ஜாவா',
        'html': 'எச்டிஎம்எல்',
        'css': 'சிஎஸ்எஸ்',
        'sql': 'எஸ்க்யூஎல்',
        'mongodb': 'மாங்கோடிபி',
        'mysql': 'மைஎஸ்க்யூஎல்',
        'express': 'எக்ஸ்பிரஸ்',
        'git': 'கிட்',
        'docker': 'டாக்கர்',
        'aws': 'ஏடபிள்யூஎஸ்'
      },
      'hi-IN': {
        'react': 'रिएक्ट',
        'nodejs': 'नोड जेएस',
        'javascript': 'जावास्क्रिप्ट',
        'python': 'पायथन',
        'java': 'जावा',
        'html': 'एचटीएमएल',
        'css': 'सीएसएस',
        'sql': 'एसक्यूएल',
        'mongodb': 'मोंगोडीबी',
        'mysql': 'माईएसक्यूएल',
        'express': 'एक्सप्रेस',
        'git': 'गिट',
        'docker': 'डॉकर',
        'aws': 'एडब्ल्यूएस'
      }
    };
    
    const translations = reverseTranslations[targetLanguage] || {};
    return skills.map(skill => translations[skill.toLowerCase()] || skill);
  };

  

  const localizedSkills = translateSkillsToUserLanguage(internship.skills_required || [], language);

  const localizedLocation = offlineTranslationService.translateTerm(internship.location, language);

  const localizedDuration = offlineTranslationService.translateTerm(internship.duration, language); 

  switch (language) {
    case 'hi-IN':
      subject = `आपके लिए परफेक्ट इंटर्नशिप मिली! ${user.matchScore}% मैच`;
      greeting = `नमस्ते ${user.name}!`;
      matchText = `हमें आपके लिए एक बेहतरीन इंटर्नशिप अवसर मिला है जो आपकी प्रोफाइल से ${user.matchScore}% मैच करता है।`;
      detailsText = `पद: ${internship.title}\nकंपनी: ${internship.company}\nस्थान: ${localizedLocation}\nअवधि: ${localizedDuration}\nवेतन: ${stipendText}`;
      skillsText = `आवश्यक स्किल: ${localizedSkills.join(', ')}`;
      locationText = internship.remote_ok ? 'रिमोट कार्य उपलब्ध' : `कार्य स्थल: ${localizedLocation}`;
      applyButtonText = 'अभी आवेदन करें';
      viewDetailsText = 'पूरी जानकारी देखें';
      footerText = 'प्रधानमंत्री इंटर्नशिप योजना टीम';
      break;
      
    case 'ta-IN':
      subject = `உங்களுக்கான சரியான வேலை கிடைத்துள்ளது! ${user.matchScore}% பொருத்தம்`;
      greeting = `வணக்கம் ${user.name}!`;
      matchText = `உங்கள் சுயவிவரத்துடன் ${user.matchScore}% பொருந்தும் ஒரு சிறந்த பயிற்சி வாய்ப்பை நாங்கள் கண்டறிந்துள்ளோம்.`;
      detailsText = `பதவி: ${internship.title}\nநிறுவனம்: ${internship.company}\nஇடம்: ${localizedLocation}\nகாலம்: ${localizedDuration}\nஊதியம்: ${stipendText}`;
      skillsText = `தேவையான திறன்கள்: ${localizedSkills.join(', ')}`;
      locationText = internship.remote_ok ? 'தொலைநிலை வேலை கிடைக்கும்' : `வேலை இடம்: ${localizedLocation}`;
      applyButtonText = 'இப்போதே விண்ணப்பிக்கவும்';
      viewDetailsText = 'முழு விவரங்களைப் பார்க்கவும்';
      footerText = 'பிரதமர் பயிற்சித் திட்டம் குழு';
      break;
      
    case 'mr-IN':
      subject = `तुमच्यासाठी परफेक्ट इंटर्नशिप मिळाली! ${user.matchScore}% मॅच`;
      greeting = `नमस्कार ${user.name}!`;
      matchText = `आम्हाला तुमच्यासाठी एक उत्कृष्ट इंटर्नशिप संधी मिळाली आहे जी तुमच्या प्रोफाइलशी ${user.matchScore}% मॅच करते.`;
      detailsText = `पद: ${internship.title}\nकंपनी: ${internship.company}\nस्थान: ${localizedLocation}\nकालावधी: ${localizedDuration}\nपगार: ${stipendText}`;
      skillsText = `आवश्यक कौशल्ये: ${localizedSkills.join(', ')}`;
      locationText = internship.remote_ok ? 'रिमोट काम उपलब्ध' : `काम करण्याचे ठिकाण: ${localizedLocation}`;
      applyButtonText = 'आता अर्ज करा';
      viewDetailsText = 'संपूर्ण तपशील पहा';
      footerText = 'पंतप्रधान इंटर्नशिप योजना संघ';
      break;
      
    case 'gu-IN':
      subject = `તમારા માટે યોગ્ય ઇન્ટર્નશિપ મળી! ${user.matchScore}% મેચ`;
      greeting = `નમસ્તે ${user.name}!`;
      matchText = `અમને તમારા માટે એક શ્રેષ્ઠ ઇન્ટર્નશિપ તક મળી છે જે તમારી પ્રોફાઇલ સાથે ${user.matchScore}% મેચ કરે છે.`;
      detailsText = `પદ: ${internship.title}\nકંપની: ${internship.company}\nસ્થાન: ${localizedLocation}\nઅવધિ: ${localizedDuration}\nવેતન: ${stipendText}`;
      skillsText = `જરૂરી કુશળતાઓ: ${localizedSkills.join(', ')}`;
      locationText = internship.remote_ok ? 'રિમોટ કામ ઉપલબ્ધ' : `કાર્યસ્થળ: ${localizedLocation}`;
      applyButtonText = 'હવે અરજી કરો';
      viewDetailsText = 'સંપૂર્ણ વિગતો જુઓ';
      footerText = 'પ્રધાનમંત્રી ઇન્ટર્નશિપ યોજના ટીમ';
      break;
      
    default: // en-IN
      subject = `Perfect Internship Match Found! ${user.matchScore}% Match`;
      greeting = `Dear ${user.name},`;
      matchText = `We found an excellent internship opportunity that matches ${user.matchScore}% with your profile.`;
      detailsText = `Position: ${internship.title}\nCompany: ${internship.company}\nLocation: ${localizedLocation}\nDuration: ${localizedDuration}\nStipend: ${stipendText}`;
      skillsText = `Required Skills: ${localizedSkills.join(', ')}`;
      locationText = internship.remote_ok ? 'Remote work available' : `Work Location: ${localizedLocation}`;
      applyButtonText = 'Apply Now';
      viewDetailsText = 'View Full Details';
      footerText = 'PM Internship Scheme Team';
  }

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .match-score { background: #4CAF50; color: white; padding: 10px; border-radius: 5px; text-align: center; margin: 15px 0; }
        .internship-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin: 15px 0; }
        .btn { display: inline-block; background: #FF6B35; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
        .btn:hover { background: #e55a2b; }
        .footer { text-align: center; padding: 20px; background: #333; color: white; }
        .skills-tag { background: #e3f2fd; padding: 5px 10px; margin: 3px; border-radius: 15px; display: inline-block; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 PM Internship Scheme</h1>
        <p>${user.matchScore}% ${language === 'ta-IN' ? 'பொருத்தம்' : language === 'hi-IN' ? 'मैच' : 'Match'}</p>
    </div>
    
    <div class="content">
        <p>${greeting}</p>
        <p>${matchText}</p>
        
        <div class="match-score">
            <strong>Match Score: ${user.matchScore}%</strong>
        </div>
        
        <div class="internship-card">
            <h2>${internship.title}</h2>
            <pre>${detailsText}</pre>
            <p><strong>${skillsText}</strong></p>
            <div style="margin: 15px 0;">
                ${localizedSkills.map(skill => `<span class="skills-tag">${skill}</span>`).join('')}
            </div>
            <p>${locationText}</p>
            
            <div style="text-align: center; margin-top: 25px;">
                <a href="${process.env.FRONTEND_URL}/internships/${internship._id}/apply" class="btn">${applyButtonText}</a>
                <a href="${process.env.FRONTEND_URL}/internships/${internship._id}" class="btn" style="background: #2196F3;">${viewDetailsText}</a>
            </div>
        </div>
        
        <p><small>Application Deadline: ${new Date(internship.applicationDeadline).toLocaleDateString()}</small></p>
    </div>
    
    <div class="footer">
        <p>${footerText}</p>
        <p><small>Government of India Initiative</small></p>
    </div>
</body>
</html>`;

  const textContent = `
${greeting}

${matchText}

${detailsText}

${skillsText}
${locationText}

Application Deadline: ${new Date(internship.applicationDeadline).toLocaleDateString()}

Apply: ${process.env.FRONTEND_URL}/internships/${internship._id}/apply
View Details: ${process.env.FRONTEND_URL}/internships/${internship._id}

---
${footerText}
Government of India Initiative
`;

  return { subject, htmlContent, textContent };
};

// SEND EMAIL NOTIFICATIONS USING YOUR EXISTING MAILER
const sendMatchingNotifications = async (internshipId, minMatchScore = 50) => {
  try {
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      throw new Error('Internship not found');
    }

    const matchingUsers = await findMatchingUsers(internshipId, minMatchScore);
    console.log(`Found ${matchingUsers.length} matching users for internship: ${internship.title}`);
    
    if (matchingUsers.length === 0) {
      console.log('No matching users found');
      return { sent: 0, failed: 0, totalMatches: 0 };
    }

    let sentCount = 0;
    let failedCount = 0;
    const notifiedUsers = [];

    // Limit to top 50 matches to prevent spam
    const usersToNotify = matchingUsers.slice(0, 50);

    for (const user of usersToNotify) {
      try {
        const userLanguage = user.profile.language || 'en-IN';
        const emailContent = createLocalizedEmailContent(internship, user, userLanguage);

        // Use your existing mailer.sendInternshipMatch function
        await mailer.sendInternshipMatch(user.email, emailContent);

        sentCount++;
        notifiedUsers.push(user.userId);
        
        console.log(`Email notification sent to ${user.name} (${user.matchScore}% match, ${userLanguage})`);
        
        // Add small delay to avoid overwhelming the SMTP server
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Failed to send email notification to user ${user.userId}:`, error);
        failedCount++;
      }
    }

    // Update internship with notified users
    await Internship.findByIdAndUpdate(internshipId, {
      $addToSet: { notifiedUsers: { $each: notifiedUsers } }
    });

    console.log(`Email Notification Summary for "${internship.title}":
    - Total matches: ${matchingUsers.length}
    - Sent: ${sentCount}
    - Failed: ${failedCount}`);

    return { 
      sent: sentCount, 
      failed: failedCount, 
      totalMatches: matchingUsers.length,
      topMatches: usersToNotify.map(u => ({
        name: u.name,
        email: u.email,
        matchScore: u.matchScore,
        language: u.profile.language
      }))
    };

  } catch (error) {
    console.error('Error sending matching notifications:', error);
    throw error;
  }
};

// SEND GENERAL EMAIL NOTIFICATION TO SPECIFIC USER
const sendNotificationToUser = async (userId, subject, message, data = {}) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.email) {
      throw new Error('User not found or no email address');
    }

    // Get user language preference
    const profile = await Profile.findOne({ userId });
    const userLanguage = profile?.language || 'en-IN';

    // Basic localization for common terms
    let localizedSubject = subject;
    let localizedMessage = message;
    
    if (userLanguage === 'hi-IN') {
      if (subject.includes('Test')) localizedSubject = 'टेस्ट ईमेल';
      if (message.includes('test')) localizedMessage = message.replace(/test/gi, 'परीक्षण');
    } else if (userLanguage === 'ta-IN') {
      if (subject.includes('Test')) localizedSubject = 'சோதனை மின்னஞ்சல்';
      if (message.includes('test')) localizedMessage = message.replace(/test/gi, 'சோதனை');
    }

    // Use your existing mailer.sendGeneralNotification function
    await mailer.sendGeneralNotification(user.email, localizedSubject, localizedMessage);
    
    console.log(`General email notification sent to user ${userId} (${userLanguage})`);
    return true;
    
  } catch (error) {
    console.error(`Failed to send general email notification:`, error);
    return false;
  }
};

// Export functions
module.exports = {
  calculateMatchScore,
  findMatchingUsers,
  sendMatchingNotifications,
  sendNotificationToUser
};