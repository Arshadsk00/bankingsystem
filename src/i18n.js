import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// =====================================================
// ENGLISH
// =====================================================

const en = {

  translation: {

    // Common
    dashboard: "Dashboard",
    profile: "Profile",
    sendMoney: "Send Money",
    deposit: "Deposit",
    transactions: "Transactions",
    settings: "Settings",
    logout: "Logout",
    contact: "Contact",
    help: "Help",

    // Header
    secureDigitalBanking: "Secure Digital Banking",
    searchServices: "Search services...",

    // Dashboard
    goodMorning: "Good Morning",
    availableBalance: "Available Balance",
    account: "Account",
    accountNumber: "Account Number",
    quickActions: "Quick Actions",
    recentTransactions: "Recent Transactions",
    viewAll: "View All",

    moneyReceived: "Money Received",
    moneySent: "Money Sent",
    from: "From",
    to: "To",
    noRecentTransactions: "No Recent Transactions",
    noTransactionsMessage:
      "You haven't made any transactions yet.",

    // Settings
    settingsTitle: "Settings",
    darkMode: "Dark Mode",
    darkModeDescription:
      "Switch between Light and Dark theme",

    language: "Language",
    languageDescription:
      "Choose your preferred language",

    notifications: "Notifications",
    notificationsDescription:
      "Receive banking notifications",

    security: "Security",
    securityDescription:
      "Manage your account security",

    support: "Support",
    supportDescription:
      "Get help with your banking",

    // Languages
    english: "English",
    telugu: "Telugu",
    hindi: "Hindi",

    // Profile
    myProfile: "My Profile",
    manageAccount:
      "Manage your SAFE BANK account details",

    fullName: "Full Name",
    mobileNumber: "Mobile Number",
    email: "Email",
    address: "Address",
    saveChanges: "Save Changes",

    changePin: "Change PIN",
    currentPin: "Current PIN",
    newPin: "New PIN",
    confirmNewPin: "Confirm New PIN",

    // Quick Actions
    sendMoneyAction: "Send Money",
    depositAction: "Deposit",
    transactionsAction: "Transactions",
    profileAction: "Profile"
  }
};


// =====================================================
// TELUGU
// =====================================================

const te = {

  translation: {

    // Common
    dashboard: "డాష్‌బోర్డ్",
    profile: "ప్రొఫైల్",
    sendMoney: "డబ్బు పంపండి",
    deposit: "డిపాజిట్",
    transactions: "లావాదేవీలు",
    settings: "సెట్టింగ్స్",
    logout: "లాగ్ అవుట్",
    contact: "సంప్రదించండి",
    help: "సహాయం",

    // Header
    secureDigitalBanking: "సురక్షిత డిజిటల్ బ్యాంకింగ్",
    searchServices: "సేవలను వెతకండి...",

    // Dashboard
    goodMorning: "శుభోదయం",
    availableBalance: "అందుబాటులో ఉన్న బ్యాలెన్స్",
    account: "ఖాతా",
    accountNumber: "ఖాతా నంబర్",
    quickActions: "త్వరిత చర్యలు",
    recentTransactions: "ఇటీవలి లావాదేవీలు",
    viewAll: "అన్నీ చూడండి",

    moneyReceived: "డబ్బు అందింది",
    moneySent: "డబ్బు పంపబడింది",
    from: "నుండి",
    to: "కు",

    noRecentTransactions:
      "ఇటీవలి లావాదేవీలు లేవు",

    noTransactionsMessage:
      "మీరు ఇంకా ఎటువంటి లావాదేవీలు చేయలేదు.",

    // Settings
    settingsTitle: "సెట్టింగ్స్",

    darkMode: "డార్క్ మోడ్",

    darkModeDescription:
      "లైట్ మరియు డార్క్ థీమ్ మధ్య మార్చండి",

    language: "భాష",

    languageDescription:
      "మీకు ఇష్టమైన భాషను ఎంచుకోండి",

    notifications: "నోటిఫికేషన్స్",

    notificationsDescription:
      "బ్యాంకింగ్ నోటిఫికేషన్లు పొందండి",

    security: "భద్రత",

    securityDescription:
      "మీ ఖాతా భద్రతను నిర్వహించండి",

    support: "సహాయం",

    supportDescription:
      "మీ బ్యాంకింగ్‌కు సహాయం పొందండి",

    // Languages
    english: "ఇంగ్లీష్",
    telugu: "తెలుగు",
    hindi: "హిందీ",

    // Profile
    myProfile: "నా ప్రొఫైల్",

    manageAccount:
      "మీ SAFE BANK ఖాతా వివరాలను నిర్వహించండి",

    fullName: "పూర్తి పేరు",
    mobileNumber: "మొబైల్ నంబర్",
    email: "ఈమెయిల్",
    address: "చిరునామా",
    saveChanges: "మార్పులను సేవ్ చేయండి",

    changePin: "PIN మార్చండి",
    currentPin: "ప్రస్తుత PIN",
    newPin: "కొత్త PIN",
    confirmNewPin: "కొత్త PIN నిర్ధారించండి",

    // Quick Actions
    sendMoneyAction: "డబ్బు పంపండి",
    depositAction: "డిపాజిట్",
    transactionsAction: "లావాదేవీలు",
    profileAction: "ప్రొఫైల్"
  }
};


// =====================================================
// HINDI
// =====================================================

const hi = {

  translation: {

    // Common
    dashboard: "डैशबोर्ड",
    profile: "प्रोफ़ाइल",
    sendMoney: "पैसे भेजें",
    deposit: "जमा करें",
    transactions: "लेन-देन",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    contact: "संपर्क करें",
    help: "मदद",

    // Header
    secureDigitalBanking:
      "सुरक्षित डिजिटल बैंकिंग",

    searchServices:
      "सेवाएं खोजें...",

    // Dashboard
    goodMorning: "सुप्रभात",
    availableBalance: "उपलब्ध बैलेंस",
    account: "खाता",
    accountNumber: "खाता नंबर",
    quickActions: "त्वरित कार्य",
    recentTransactions: "हाल के लेन-देन",
    viewAll: "सभी देखें",

    moneyReceived: "पैसे प्राप्त हुए",
    moneySent: "पैसे भेजे गए",
    from: "से",
    to: "को",

    noRecentTransactions:
      "कोई हाल का लेन-देन नहीं है",

    noTransactionsMessage:
      "आपने अभी तक कोई लेन-देन नहीं किया है।",

    // Settings
    settingsTitle: "सेटिंग्स",

    darkMode: "डार्क मोड",

    darkModeDescription:
      "लाइट और डार्क थीम के बीच बदलें",

    language: "भाषा",

    languageDescription:
      "अपनी पसंदीदा भाषा चुनें",

    notifications: "सूचनाएं",

    notificationsDescription:
      "बैंकिंग सूचनाएं प्राप्त करें",

    security: "सुरक्षा",

    securityDescription:
      "अपने खाते की सुरक्षा प्रबंधित करें",

    support: "सहायता",

    supportDescription:
      "अपने बैंकिंग के लिए सहायता प्राप्त करें",

    // Languages
    english: "अंग्रेज़ी",
    telugu: "तेलुगु",
    hindi: "हिंदी",

    // Profile
    myProfile: "मेरी प्रोफ़ाइल",

    manageAccount:
      "अपने SAFE BANK खाते की जानकारी प्रबंधित करें",

    fullName: "पूरा नाम",
    mobileNumber: "मोबाइल नंबर",
    email: "ईमेल",
    address: "पता",
    saveChanges: "परिवर्तन सहेजें",

    changePin: "PIN बदलें",
    currentPin: "वर्तमान PIN",
    newPin: "नया PIN",
    confirmNewPin: "नया PIN पुष्टि करें",

    // Quick Actions
    sendMoneyAction: "पैसे भेजें",
    depositAction: "जमा करें",
    transactionsAction: "लेन-देन",
    profileAction: "प्रोफ़ाइल"
  }
};


// =====================================================
// INITIAL LANGUAGE
// =====================================================

const savedLanguage =
  localStorage.getItem("language") || "en";


// =====================================================
// INITIALIZE
// =====================================================

i18n
  .use(initReactI18next)
  .init({

    resources: {
      en,
      te,
      hi
    },

    lng: savedLanguage,

    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });


export default i18n;