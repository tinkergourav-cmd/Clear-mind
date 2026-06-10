// =============================================================================
// Firebase Configuration
// =============================================================================
// HOW TO SET UP:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use an existing one)
// 3. Click "Add app" and choose the Web platform (</>)
// 4. Register your app and copy the config values below
// 5. In the Firebase console, go to "Firestore Database" and create a database
// 6. Replace the placeholder values below with your actual Firebase config
// =============================================================================

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE"
};

// Check if Firebase is configured (not using placeholder values)
export const isFirebaseConfigured = () => {
  return (
    firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID_HERE" &&
    firebaseConfig.appId !== "YOUR_APP_ID_HERE"
  );
};

// Initialize Firebase only if configured
let app = null;
let db = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.warn('[Firebase] Failed to initialize:', error.message);
  }
}

export { db };
export default app;
