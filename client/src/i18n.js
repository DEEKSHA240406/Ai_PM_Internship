// i18n.js - Complete Configuration file with all languages
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'en-IN': {
    translation: {
      chooseLanguage: 'Choose Your Language',
      languageDescription: 'Select your preferred language for the best experience',
      howProvideInfo: 'How would you like to provide your information?',
      stepByStep: 'Step by Step',
      stepByStepDesc: 'Answer questions one by one',
      voiceInput: 'Voice Input',
      voiceInputDesc: 'Tell us everything at once',
      tellAboutYourself: 'Tell us about yourself',
      speakNaturally: 'Speak naturally about your name, education, skills, interests, and location preferences',
      listening: 'Listening... Speak now',
      processing: 'Processing...',
      processReview: 'Process & Review',
      reviewInfo: 'Review Your Information',
      name: 'Name',
      education: 'Education',
      skills: 'Skills',
      interests: 'Interests',
      preferredLocations: 'Preferred Locations',
      confirmSubmit: 'Confirm & Submit',
      autoSubmitting: 'Auto-submitting in {{count}} seconds...',
      cancel: 'Cancel',
      submitNow: 'Submit Now',
      recommendedInternships: 'Recommended Internships',
      readAloud: 'Read Aloud',
      createNewProfile: 'Create New Profile',
      back: 'Back',
      previous: 'Previous',
      next: 'Next',
      review: 'Review',
      questionOf: 'Question {{current}} of {{total}}',
      addTag: 'Add Tag',
      addedTags: 'Added tags will appear here...',
      useThisText: 'Use This Text',
      clear: 'Clear',
      addAsTags: 'Add as Tags',
      typeAndPress: 'Type and press Enter or comma to add',
      voiceInputBox: 'Voice Input',
      tapToStart: 'Tap to Start',
      speakNaturally2: 'Speak naturally about yourself',
      orTypeInfo: 'Or type your information:',
      tellUsAbout: 'Tell us about your name, education background, skills, career interests, and preferred work locations...',
      questions: {
        name: {
          question: 'What is your name?',
          placeholder: 'e.g., Ananya Sharma'
        },
        education: {
          question: 'What is your educational background?',
          placeholder: 'e.g., B.Sc. Computer Science, 3rd year'
        },
        sector_interests: {
          question: 'Which sectors are you interested in working with?',
          placeholder: 'Select your preferred industry sectors'
        },
        skills: {
          question: 'What technical skills do you have?',
          placeholder: 'Add skills like: Python, JavaScript, React, SQL'
        },
        locationPreferences: {
          question: 'Which locations do you prefer for work?',
          placeholder: 'Add locations like: Chennai, Bangalore, Remote'
        }
      }
    }
  },
  'hi-IN': {
    translation: {
      chooseLanguage: 'अपनी भाषा चुनें',
      languageDescription: 'सर्वोत्तम अनुभव के लिए अपनी पसंदीदा भाषा चुनें',
      howProvideInfo: 'आप अपनी जानकारी कैसे देना चाहते हैं?',
      stepByStep: 'चरणबद्ध',
      stepByStepDesc: 'एक-एक करके प्रश्नों के उत्तर दें',
      voiceInput: 'आवाज़ से इनपुट',
      voiceInputDesc: 'एक साथ सब कुछ बताएं',
      tellAboutYourself: 'अपने बारे में बताएं',
      speakNaturally: 'अपना नाम, शिक्षा, कौशल, रुचियां और स्थान की प्राथमिकताओं के बारे में स्वाभाविक रूप से बोलें',
      listening: 'सुन रहा है... अब बोलें',
      processing: 'प्रसंस्करण...',
      processReview: 'प्रसंस्करण और समीक्षा',
      reviewInfo: 'अपनी जानकारी की समीक्षा करें',
      name: 'नाम',
      education: 'शिक्षा',
      skills: 'कौशल',
      interests: 'रुचियां',
      preferredLocations: 'पसंदीदा स्थान',
      confirmSubmit: 'पुष्टि करें और जमा करें',
      autoSubmitting: '{{count}} सेकंड में ऑटो-सबमिट हो रहा है...',
      cancel: 'रद्द करें',
      submitNow: 'अभी जमा करें',
      recommendedInternships: 'सुझावित इंटर्नशिप',
      readAloud: 'ज़ोर से पढ़ें',
      createNewProfile: 'नया प्रोफाइल बनाएं',
      back: 'वापस',
      previous: 'पिछला',
      next: 'अगला',
      review: 'समीक्षा',
      questionOf: 'प्रश्न {{current}} का {{total}}',
      addTag: 'टैग जोड़ें',
      addedTags: 'जोड़े गए टैग यहां दिखेंगे...',
      useThisText: 'इस टेक्स्ट का उपयोग करें',
      clear: 'साफ़ करें',
      addAsTags: 'टैग के रूप में जोड़ें',
      typeAndPress: 'टाइप करें और Enter या comma दबाएं',
      voiceInputBox: 'आवाज़ इनपुट',
      tapToStart: 'शुरू करने के लिए टैप करें',
      speakNaturally2: 'अपने बारे में स्वाभाविक रूप से बोलें',
      orTypeInfo: 'या अपनी जानकारी टाइप करें:',
      tellUsAbout: 'अपना नाम, शैक्षणिक पृष्ठभूमि, कौशल, करियर रुचियां और पसंदीदा कार्य स्थानों के बारे में बताएं...',
      questions: {
        name: {
          question: 'आपका नाम क्या है?',
          placeholder: 'उदा., अनन्या शर्मा'
        },
        education: {
          question: 'आपकी शैक्षणिक पृष्ठभूमि क्या है?',
          placeholder: 'उदा., B.Sc. कंप्यूटर साइंस, तीसरा वर्ष'
        },
        sector_interests: {
          question: 'आप किन क्षेत्रों में काम करने में रुचि रखते हैं?',
          placeholder: 'अपने पसंदीदा उद्योग क्षेत्रों का चयन करें'
        },
        skills: {
          question: 'आपके पास कौन से तकनीकी कौशल हैं?',
          placeholder: 'कौशल जोड़ें जैसे: Python, JavaScript, React, SQL'
        },
        locationPreferences: {
          question: 'काम के लिए आप कौन से स्थानों को प्राथमिकता देते हैं?',
          placeholder: 'स्थान जोड़ें जैसे: दिल्ली, मुंबई, रिमोट'
        }
      }
    }
  },
  'ta-IN': {
    translation: {
      chooseLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
      languageDescription: 'சிறந்த அனுபவத்திற்கு உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
      howProvideInfo: 'உங்கள் தகவலை எப்படி வழங்க விரும்புகிறீர்கள்?',
      stepByStep: 'படிப்படியாக',
      stepByStepDesc: 'ஒவ்வொரு கேள்விக்கும் ஒவ்வொன்றாக பதிலளிக்கவும்',
      voiceInput: 'குரல் உள்ளீடு',
      voiceInputDesc: 'எல்லாவற்றையும் ஒரே நேரத்தில் சொல்லுங்கள்',
      tellAboutYourself: 'உங்களைப் பற்றி சொல்லுங்கள்',
      speakNaturally: 'உங்கள் பெயர், கல்வி, திறன்கள், ஆர்வங்கள் மற்றும் இடம் விருப்பங்களைப் பற்றி இயல்பாக பேசுங்கள்',
      listening: 'கேட்கிறது... இப்போது பேசுங்கள்',
      processing: 'செயலாக்கப்படுகிறது...',
      processReview: 'செயலாக்கம் மற்றும் மதிப்பாய்வு',
      reviewInfo: 'உங்கள் தகவலை மதிப்பாய்வு செய்யுங்கள்',
      name: 'பெயர்',
      education: 'கல்வி',
      skills: 'திறன்கள்',
      interests: 'ஆர்வங்கள்',
      preferredLocations: 'விருப்பமான இடங்கள்',
      confirmSubmit: 'உறுதிப்படுத்தி சமர்ப்பிக்கவும்',
      autoSubmitting: '{{count}} வினாடிகளில் தானாக சமர்ப்பிக்கப்படுகிறது...',
      cancel: 'ரத்து செய்',
      submitNow: 'இப்போது சமர்ப்பிக்கவும்',
      recommendedInternships: 'பரிந்துரைக்கப்பட்ட பயிற்சி',
      readAloud: 'உரக்கப் படிக்கவும்',
      createNewProfile: 'புதிய சுயவிவரம் உருவாக்கவும்',
      back: 'பின்',
      previous: 'முந்தைய',
      next: 'அடுத்த',
      review: 'மதிப்பாய்வு',
      questionOf: 'கேள்வி {{current}} இல் {{total}}',
      addTag: 'டேக் சேர்க்கவும்',
      addedTags: 'சேர்க்கப்பட்ட டேக்குகள் இங்கே தோன்றும்...',
      useThisText: 'இந்த உரையைப் பயன்படுத்தவும்',
      clear: 'அழிக்கவும்',
      addAsTags: 'டேக்களாக சேர்க்கவும்',
      typeAndPress: 'டைப் செய்து Enter அல்லது கமா அழுத்தவும்',
      voiceInputBox: 'குரல் உள்ளீடு',
      tapToStart: 'தொடங்க தட்டவும்',
      speakNaturally2: 'உங்களைப் பற்றி இயல்பாக பேசுங்கள்',
      orTypeInfo: 'அல்லது உங்கள் தகவலை டைப் செய்யவும்:',
      tellUsAbout: 'உங்கள் பெயர், கல்வி பின்னணி, திறன்கள், தொழில் ஆர்வங்கள் மற்றும் விருப்பமான பணி இடங்களைப் பற்றி சொல்லுங்கள்...',
      questions: {
        name: {
          question: 'உங்கள் பெயர் என்ன?',
          placeholder: 'உதா., அனன்யா ஷர்மா'
        },
        education: {
          question: 'உங்கள் கல்வி பின்னணி என்ன?',
          placeholder: 'உதா., B.Sc. கணினி அறிவியல், மூன்றாம் ஆண்டு'
        },
        sector_interests: {
          question: 'நீங்கள் எந்த துறைகளில் பணியாற்ற ஆர்வமாக உள்ளீர்கள்?',
          placeholder: 'உங்கள் விருப்பமான தொழில் துறைகளைத் தேர்ந்தெடுக்கவும்'
        },
        skills: {
          question: 'உங்களிடம் என்ன தொழில்நுட்ப திறன்கள் உள்ளன?',
          placeholder: 'திறன்களைச் சேர்க்கவும்: Python, JavaScript, React, SQL'
        },
        locationPreferences: {
          question: 'வேலைக்கு நீங்கள் எந்த இடங்களை விரும்புகிறீர்கள்?',
          placeholder: 'இடங்களைச் சேர்க்கவும்: சென்னை, பெங்களூர், ரிமோட்'
        }
      }
    }
  },
  'mr-IN': {
    translation: {
      chooseLanguage: 'तुमची भाषा निवडा',
      languageDescription: 'सर्वोत्तम अनुभवासाठी तुमची आवडती भाषा निवडा',
      howProvideInfo: 'तुम्ही तुमची माहिती कशी देऊ इच्छिता?',
      stepByStep: 'टप्प्याटप्प्याने',
      stepByStepDesc: 'एक एक करून प्रश्नांची उत्तरे द्या',
      voiceInput: 'आवाज इनपुट',
      voiceInputDesc: 'एकाच वेळी सर्व काही सांगा',
      tellAboutYourself: 'आपल्याबद्दल सांगा',
      speakNaturally: 'तुमचे नाव, शिक्षण, कौशल्ये, आवडी आणि स्थान प्राधान्यांबद्दल नैसर्गिकपणे बोला',
      listening: 'ऐकत आहे... आता बोला',
      processing: 'प्रक्रिया करत आहे...',
      processReview: 'प्रक्रिया आणि पुनरावलोकन',
      reviewInfo: 'तुमची माहिती पुनरावलोकन करा',
      name: 'नाव',
      education: 'शिक्षण',
      skills: 'कौशल्ये',
      interests: 'आवडी',
      preferredLocations: 'प्राधान्य स्थळे',
      confirmSubmit: 'पुष्टी करा आणि सबमिट करा',
      autoSubmitting: '{{count}} सेकंदात ऑटो-सबमिट होत आहे...',
      cancel: 'रद्द करा',
      submitNow: 'आता सबमिट करा',
      recommendedInternships: 'शिफारसीत इंटर्नशिप',
      readAloud: 'मोठ्याने वाचा',
      createNewProfile: 'नवीन प्रोफाइल तयार करा',
      back: 'मागे',
      previous: 'मागील',
      next: 'पुढील',
      review: 'पुनरावलोकन',
      questionOf: 'प्रश्न {{current}} चा {{total}}',
      addTag: 'टॅग जोडा',
      addedTags: 'जोडलेले टॅग येथे दिसतील...',
      useThisText: 'हा मजकूर वापरा',
      clear: 'स्पष्ट करा',
      addAsTags: 'टॅग म्हणून जोडा',
      typeAndPress: 'टाइप करा आणि Enter किंवा कॉमा दाबा',
      voiceInputBox: 'आवाज इनपुट',
      tapToStart: 'सुरू करण्यासाठी टॅप करा',
      speakNaturally2: 'तुमच्याबद्दल नैसर्गिकपणे बोला',
      orTypeInfo: 'किंवा तुमची माहिती टाइप करा:',
      tellUsAbout: 'तुमचे नाव, शैक्षणिक पार्श्वभूमी, कौशल्ये, करिअर आवडी आणि प्राधान्य कार्य स्थळांबद्दल सांगा...',
      questions: {
        name: {
          question: 'तुमचे नाव काय आहे?',
          placeholder: 'उदा., अनन्या शर्मा'
        },
        education: {
          question: 'तुमची शैक्षणिक पार्श्वभूमी काय आहे?',
          placeholder: 'उदा., B.Sc. संगणक विज्ञान, तिसरे वर्ष'
        },
        sector_interests: {
          question: 'तुम्ही कोणत्या क्षेत्रांमध्ये काम करण्यात स्वारस्य ठेवता?',
          placeholder: 'तुमची आवडती उद्योग क्षेत्रे निवडा'
        },
        skills: {
          question: 'तुमच्याकडे कोणती तांत्रिक कौशल्ये आहेत?',
          placeholder: 'कौशल्ये जोडा जसे: Python, JavaScript, React, SQL'
        },
        locationPreferences: {
          question: 'कामासाठी तुम्ही कोणती ठिकाणे प्राधान्य देता?',
          placeholder: 'ठिकाणे जोडा जसे: मुंबई, पुणे, रिमोट'
        }
      }
    }
  },
  'gu-IN': {
    translation: {
      chooseLanguage: 'તમારી ભાષા પસંદ કરો',
      languageDescription: 'શ્રેષ્ઠ અનુભવ માટે તમારી પસંદીદા ભાષા પસંદ કરો',
      howProvideInfo: 'તમે તમારી માહિતી કેવી રીતે આપવા માંગો છો?',
      stepByStep: 'પગલું દર પગલું',
      stepByStepDesc: 'એક પછી એક પ્રશ્નોના જવાબ આપો',
      voiceInput: 'અવાજ ઇનપુટ',
      voiceInputDesc: 'એક સાથે બધું કહો',
      tellAboutYourself: 'તમારા વિશે કહો',
      speakNaturally: 'તમારું નામ, શિક્ષણ, કૌશલ્યો, રુચિઓ અને સ્થાન પસંદગીઓ વિશે કુદરતી રીતે બોલો',
      listening: 'સાંભળી રહ્યું છે... હવે બોલો',
      processing: 'પ્રક્રિયા કરી રહ્યું છે...',
      processReview: 'પ્રક્રિયા અને સમીક્ષા',
      reviewInfo: 'તમારી માહિતીની સમીક્ષા કરો',
      name: 'નામ',
      education: 'શિક્ષણ',
      skills: 'કૌશલ્યો',
      interests: 'રુચિઓ',
      preferredLocations: 'પસંદીદા સ્થાનો',
      confirmSubmit: 'પુષ્ટિ કરો અને સબમિટ કરો',
      autoSubmitting: '{{count}} સેકંડમાં ઓટો-સબમિટ થઈ રહ્યું છે...',
      cancel: 'રદ કરો',
      submitNow: 'હવે સબમિટ કરો',
      recommendedInternships: 'ભલામણ કરેલ ઇન્ટર્નશિપ',
      readAloud: 'મોટેથી વાંચો',
      createNewProfile: 'નવી પ્રોફાઇલ બનાવો',
      back: 'પાછળ',
      previous: 'પાછલું',
      next: 'આગળ',
      review: 'સમીક્ષા',
      questionOf: 'પ્રશ્ન {{current}} નો {{total}}',
      addTag: 'ટેગ ઉમેરો',
      addedTags: 'ઉમેરાયેલા ટેગ અહીં દેખાશે...',
      useThisText: 'આ ટેક્સ્ટનો ઉપયોગ કરો',
      clear: 'સાફ કરો',
      addAsTags: 'ટેગ તરીકે ઉમેરો',
      typeAndPress: 'ટાઇપ કરો અને Enter અથવા કોમા દબાવો',
      voiceInputBox: 'અવાજ ઇનપુટ',
      tapToStart: 'શરૂ કરવા માટે ટેપ કરો',
      speakNaturally2: 'તમારા વિશે કુદરતી રીતે બોલો',
      orTypeInfo: 'અથવા તમારી માહિતી ટાઇપ કરો:',
      tellUsAbout: 'તમારું નામ, શૈક્ષણિક પૃષ્ઠભૂમિ, કૌશલ્યો, કારકિર્દીની રુચિઓ અને પસંદીદા કાર્ય સ્થાનો વિશે કહો...',
      questions: {
        name: {
          question: 'તમારું નામ શું છે?',
          placeholder: 'ઉદા., અનન્યા શર્મા'
        },
        education: {
          question: 'તમારી શૈક્ષણિક પૃષ્ઠભૂમિ શું છે?',
          placeholder: 'ઉદા., B.Sc. કમ્પ્યુટર સાયન્સ, ત્રીજા વર્ષ'
        },
        sector_interests: {
          question: 'તમે કયા ક્ષેત્રોમાં કામ કરવામાં રસ ધરાવો છો?',
          placeholder: 'તમારા પસંદીદા ઉદ્યોગ ક્ષેત્રો પસંદ કરો'
        },
        skills: {
          question: 'તમારી પાસે કયા તકનીકી કૌશલ્યો છે?',
          placeholder: 'કૌશલ્યો ઉમેરો જેવા કે: Python, JavaScript, React, SQL'
        },
        locationPreferences: {
          question: 'કામ માટે તમે કયા સ્થાનોને પસંદ કરો છો?',
          placeholder: 'સ્થાનો ઉમેરો જેવા કે: અમદાવાદ, સુરત, રિમોટ'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en-IN', // default language
    fallbackLng: 'en-IN',
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;