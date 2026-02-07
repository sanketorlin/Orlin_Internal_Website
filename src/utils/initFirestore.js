// One-time script to initialize Firestore with current reports
// Run this in browser console to manually sync reports to Firestore

import { saveReports } from './reportsService';
import reportsConfig from '../config/reports.json';

// Initialize Firestore with reports
export const initFirestoreNow = async () => {
  try {
    console.log('🚀 Initializing Firestore...');
    
    // Get current reports from localStorage or use defaults
    const local = localStorage.getItem('bi-reports');
    let reportsToSave = reportsConfig.reports;
    
    if (local) {
      try {
        const localReports = JSON.parse(local);
        if (localReports.length > 0) {
          reportsToSave = localReports;
          console.log('📦 Using reports from localStorage:', localReports.length);
        }
      } catch (e) {
        console.log('⚠️ Using default reports');
      }
    }
    
    // Save to Firestore
    await saveReports(reportsToSave);
    console.log('✅ Firestore initialized with', reportsToSave.length, 'reports');
    console.log('📋 Report IDs:', reportsToSave.map(r => r.id));
    
    return { success: true, count: reportsToSave.length };
  } catch (error) {
    console.error('❌ Error initializing Firestore:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    return { success: false, error: error.message };
  }
};

// Make it available globally
if (typeof window !== 'undefined') {
  window.initFirestore = initFirestoreNow;
  console.log('💡 To initialize Firestore, type: window.initFirestore()');
}



