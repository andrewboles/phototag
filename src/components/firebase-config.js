const config = {
  apiKey: "AIzaSyCy9CpGsYVrzMd-EEexFUh5sHzGJkGd4jU",
  authDomain: "phototag-a14db.firebaseapp.com",
  projectId: "phototag-a14db",
  storageBucket: "phototag-a14db.appspot.com",
  messagingSenderId: "749203714428",
  appId: "1:749203714428:web:cc759abd8ade1867ce34f9"
};


export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}

