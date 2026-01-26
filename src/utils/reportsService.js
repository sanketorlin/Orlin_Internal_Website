// Reports Service - Syncs reports across all devices using Firebase Firestore
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import app from '../firebase/config';

const db = getFirestore(app);
const REPORTS_COLLECTION = 'reports';
const REPORTS_DOC_ID = 'all-reports';

// Get reports from Firestore (with real-time sync)
export const getReports = async () => {
  try {
    const docRef = doc(db, REPORTS_COLLECTION, REPORTS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const reports = docSnap.data().reports || [];
      console.log('Loaded reports from Firestore:', reports.length);
      return reports;
    }
    console.log('No reports in Firestore yet');
    return [];
  } catch (error) {
    console.error('Error getting reports from Firestore:', error);
    // Only fallback to localStorage if Firestore is completely unavailable
    // This should not happen if Firestore is properly set up
    console.warn('Falling back to localStorage (Firestore may not be enabled)');
    const local = localStorage.getItem('bi-reports');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        return [];
      }
    }
    return [];
  }
};

// Save reports to Firestore (syncs across all devices)
export const saveReports = async (reports) => {
  try {
    const docRef = doc(db, REPORTS_COLLECTION, REPORTS_DOC_ID);
    await setDoc(docRef, { reports }, { merge: false });
    
    console.log('Saved reports to Firestore:', reports.length);
    
    // Also save to localStorage as backup
    localStorage.setItem('bi-reports', JSON.stringify(reports));
    
    return true;
  } catch (error) {
    console.error('Error saving reports to Firestore:', error);
    console.error('Error details:', error.message, error.code);
    
    // Fallback to localStorage only if Firestore save fails
    localStorage.setItem('bi-reports', JSON.stringify(reports));
    
    // Re-throw error so caller knows it failed
    throw error;
  }
};

// Listen to real-time changes (auto-updates when reports change on any device)
export const subscribeToReports = (callback) => {
  try {
    const docRef = doc(db, REPORTS_COLLECTION, REPORTS_DOC_ID);
    
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const reports = docSnap.data().reports || [];
          console.log('📡 Firestore update detected:', reports.length, 'reports');
          callback(reports);
          // Update localStorage as backup
          localStorage.setItem('bi-reports', JSON.stringify(reports));
        } else {
          console.log('⚠️ Firestore document does not exist, using localStorage');
          // No reports in Firestore, use localStorage or default
          const local = localStorage.getItem('bi-reports');
          if (local) {
            try {
              const localReports = JSON.parse(local);
              console.log('📦 Using localStorage reports:', localReports.length);
              callback(localReports);
            } catch (e) {
              console.error('❌ Error parsing localStorage:', e);
              callback([]);
            }
          } else {
            callback([]);
          }
        }
      },
      (error) => {
        console.error('Error listening to reports:', error);
        // Fallback to localStorage
        const local = localStorage.getItem('bi-reports');
        if (local) {
          try {
            callback(JSON.parse(local));
          } catch (e) {
            callback([]);
          }
        }
      }
    );
    
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up reports listener:', error);
    // Fallback: return a no-op unsubscribe function
    return () => {};
  }
};

// Migrate localStorage data to Firestore (one-time migration)
export const migrateLocalStorageToFirestore = async () => {
  try {
    const local = localStorage.getItem('bi-reports');
    if (local) {
      try {
        const localReports = JSON.parse(local);
        const firestoreReports = await getReports();
        
        // If Firestore is empty or has fewer reports, migrate from localStorage
        if (firestoreReports.length === 0 || localReports.length > firestoreReports.length) {
          console.log('Migrating reports from localStorage to Firestore...');
          await saveReports(localReports);
          console.log('Migration complete!');
        }
      } catch (e) {
        console.error('Error parsing localStorage data:', e);
      }
    }
  } catch (error) {
    console.error('Error migrating reports:', error);
  }
};

// Initialize with default reports if Firestore is empty
export const initializeReports = async (defaultReports) => {
  try {
    // First, try to migrate from localStorage
    await migrateLocalStorageToFirestore();
    
    // Then check if Firestore is still empty
    const existing = await getReports();
    if (existing.length === 0 && defaultReports.length > 0) {
      console.log('Initializing Firestore with default reports...');
      await saveReports(defaultReports);
    }
  } catch (error) {
    console.error('Error initializing reports:', error);
  }
};

