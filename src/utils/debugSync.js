// Debug tool to check Firestore sync status
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase/config';

const db = getFirestore(app);

// Check Firestore connection and data
export const debugFirestore = async () => {
  console.log('=== FIRESTORE DEBUG ===');
  
  try {
    const docRef = doc(db, 'reports', 'all-reports');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const reports = docSnap.data().reports || [];
      console.log('✅ Firestore is connected');
      console.log('📊 Reports in Firestore:', reports.length);
      console.log('📋 Report IDs:', reports.map(r => r.id));
      return {
        connected: true,
        reportsCount: reports.length,
        reports: reports
      };
    } else {
      console.log('⚠️ Firestore document does not exist yet');
      return {
        connected: true,
        reportsCount: 0,
        reports: []
      };
    }
  } catch (error) {
    console.error('❌ Firestore error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    return {
      connected: false,
      error: error.message,
      code: error.code
    };
  }
};

// Check localStorage
export const debugLocalStorage = () => {
  console.log('=== LOCALSTORAGE DEBUG ===');
  const local = localStorage.getItem('bi-reports');
  if (local) {
    try {
      const reports = JSON.parse(local);
      console.log('📦 Reports in localStorage:', reports.length);
      console.log('📋 Report IDs:', reports.map(r => r.id));
      return {
        exists: true,
        reportsCount: reports.length,
        reports: reports
      };
    } catch (e) {
      console.error('❌ Error parsing localStorage:', e);
      return { exists: true, error: e.message };
    }
  } else {
    console.log('⚠️ No reports in localStorage');
    return { exists: false, reportsCount: 0 };
  }
};

// Full debug check
export const fullDebug = async () => {
  console.log('🔍 Starting full debug check...\n');
  
  const firestore = await debugFirestore();
  console.log('');
  const local = debugLocalStorage();
  
  console.log('\n=== SUMMARY ===');
  console.log('Firestore connected:', firestore.connected);
  console.log('Firestore reports:', firestore.reportsCount || 0);
  console.log('LocalStorage reports:', local.reportsCount || 0);
  
  if (firestore.connected && firestore.reportsCount > 0) {
    console.log('✅ Firestore has data - sync should work!');
  } else if (!firestore.connected) {
    console.log('❌ Firestore not connected - check Firebase setup');
  } else {
    console.log('⚠️ Firestore is empty - need to initialize');
  }
  
  return { firestore, local };
};

// Make it available globally for easy access
if (typeof window !== 'undefined') {
  window.debugSync = {
    firestore: debugFirestore,
    localStorage: debugLocalStorage,
    full: fullDebug
  };
  console.log('💡 Debug tools available! Type: window.debugSync.full()');
}

