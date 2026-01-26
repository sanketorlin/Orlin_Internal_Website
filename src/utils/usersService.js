// Users Service - Syncs users across all devices using Firebase Firestore
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import app from '../firebase/config';
import usersConfig from '../config/users.json';

const db = getFirestore(app);
const USERS_COLLECTION = 'users';
const USERS_DOC_ID = 'all-users';

// Get users from Firestore (with real-time sync)
export const getUsers = async () => {
  try {
    const docRef = doc(db, USERS_COLLECTION, USERS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const users = docSnap.data().users || {};
      console.log('Loaded users from Firestore:', Object.keys(users).length);
      return users;
    }
    console.log('No users in Firestore yet');
    return {};
  } catch (error) {
    console.error('Error getting users from Firestore:', error);
    // Fallback to users.json if Firestore fails
    return usersConfig.users || {};
  }
};

// Save users to Firestore (syncs across all devices)
export const saveUsers = async (users) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, USERS_DOC_ID);
    await setDoc(docRef, { users }, { merge: false });
    
    console.log('Saved users to Firestore:', Object.keys(users).length);
    return true;
  } catch (error) {
    console.error('Error saving users to Firestore:', error);
    console.error('Error details:', error.message, error.code);
    throw error;
  }
};

// Add new user
export const addUser = async (email, userData) => {
  try {
    const currentUsers = await getUsers();
    const updatedUsers = {
      ...currentUsers,
      [email]: {
        email: email,
        role: userData.role || 'sales',
        name: userData.name || email.split('@')[0],
        ...userData
      }
    };
    await saveUsers(updatedUsers);
    console.log('✅ User added:', email);
    return true;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Update existing user
export const updateUser = async (email, userData) => {
  try {
    const currentUsers = await getUsers();
    if (!currentUsers[email]) {
      throw new Error('User not found');
    }
    const updatedUsers = {
      ...currentUsers,
      [email]: {
        ...currentUsers[email],
        ...userData
      }
    };
    await saveUsers(updatedUsers);
    console.log('✅ User updated:', email);
    return true;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (email) => {
  try {
    const currentUsers = await getUsers();
    if (!currentUsers[email]) {
      throw new Error('User not found');
    }
    const updatedUsers = { ...currentUsers };
    delete updatedUsers[email];
    await saveUsers(updatedUsers);
    console.log('✅ User deleted:', email);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Listen to real-time changes (auto-updates when users change on any device)
export const subscribeToUsers = (callback) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, USERS_DOC_ID);
    
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const users = docSnap.data().users || {};
          console.log('📡 Users update detected:', Object.keys(users).length, 'users');
          callback(users);
        } else {
          console.log('⚠️ Users document does not exist, using default');
          callback(usersConfig.users || {});
        }
      },
      (error) => {
        console.error('Error listening to users:', error);
        callback(usersConfig.users || {});
      }
    );
    
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up users listener:', error);
    return () => {};
  }
};

// Initialize with default users if Firestore is empty
export const initializeUsers = async () => {
  try {
    const existing = await getUsers();
    if (Object.keys(existing).length === 0 && Object.keys(usersConfig.users).length > 0) {
      console.log('Initializing Firestore with default users...');
      await saveUsers(usersConfig.users);
    }
  } catch (error) {
    console.error('Error initializing users:', error);
  }
};

