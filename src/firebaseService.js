// =============================================================================
// Firestore Service - handles all database read/write operations
// =============================================================================
// This module provides functions to save and load app data from Firestore.
// If Firebase is not configured, all functions gracefully return null/do nothing.
// =============================================================================

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

// Firestore document path: collection "appData", document "main"
const COLLECTION = 'appData';
const DOC_ID = 'main';

/**
 * Get a reference to the main data document
 */
function getDocRef() {
  if (!db) return null;
  return doc(db, COLLECTION, DOC_ID);
}

/**
 * Save the full projects array to Firestore
 * Projects are stored as a JSON string to handle large data gracefully
 * @param {Array} projects - Array of project objects
 * @returns {Promise<boolean>} true if saved successfully, false otherwise
 */
export async function saveProjects(projects) {
  if (!isFirebaseConfigured() || !db) {
    console.info('[Firebase] Not configured - skipping save. Set up your Firebase config in src/firebase.js');
    return false;
  }
  try {
    const docRef = getDocRef();
    await setDoc(docRef, { projects: JSON.stringify(projects) }, { merge: true });
    return true;
  } catch (error) {
    console.warn('[Firebase] Error saving projects:', error.message);
    return false;
  }
}

/**
 * Load the projects array from Firestore
 * @returns {Promise<Array|null>} Array of projects or null if not available
 */
export async function loadProjects() {
  if (!isFirebaseConfigured() || !db) {
    console.info('[Firebase] Not configured - skipping load. Set up your Firebase config in src/firebase.js');
    return null;
  }
  try {
    const docRef = getDocRef();
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.projects) {
        return JSON.parse(data.projects);
      }
    }
    return null;
  } catch (error) {
    console.warn('[Firebase] Error loading projects:', error.message);
    return null;
  }
}

/**
 * Save the active project ID to Firestore
 * @param {string} projectId - The active project ID
 * @returns {Promise<boolean>} true if saved successfully
 */
export async function saveActiveProject(projectId) {
  if (!isFirebaseConfigured() || !db) return false;
  try {
    const docRef = getDocRef();
    await setDoc(docRef, { activeProjectId: projectId }, { merge: true });
    return true;
  } catch (error) {
    console.warn('[Firebase] Error saving active project:', error.message);
    return false;
  }
}

/**
 * Load the active project ID from Firestore
 * @returns {Promise<string|null>} The active project ID or null
 */
export async function loadActiveProject() {
  if (!isFirebaseConfigured() || !db) return null;
  try {
    const docRef = getDocRef();
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().activeProjectId || null;
    }
    return null;
  } catch (error) {
    console.warn('[Firebase] Error loading active project:', error.message);
    return null;
  }
}

/**
 * Save the default project ID to Firestore
 * @param {string} projectId - The default project ID
 * @returns {Promise<boolean>} true if saved successfully
 */
export async function saveDefaultProject(projectId) {
  if (!isFirebaseConfigured() || !db) return false;
  try {
    const docRef = getDocRef();
    await setDoc(docRef, { defaultProjectId: projectId }, { merge: true });
    return true;
  } catch (error) {
    console.warn('[Firebase] Error saving default project:', error.message);
    return false;
  }
}

/**
 * Load the default project ID from Firestore
 * @returns {Promise<string|null>} The default project ID or null
 */
export async function loadDefaultProject() {
  if (!isFirebaseConfigured() || !db) return null;
  try {
    const docRef = getDocRef();
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().defaultProjectId || null;
    }
    return null;
  } catch (error) {
    console.warn('[Firebase] Error loading default project:', error.message);
    return null;
  }
}
