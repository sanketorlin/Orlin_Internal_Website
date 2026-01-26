import usersConfig from '../config/users.json';
import { getUsers } from './usersService';

// Cache for users (updated in real-time)
let usersCache = null;
let usersCachePromise = null;

// Load users from Firestore (with cache)
const loadUsers = async () => {
  if (usersCache) return usersCache;
  if (usersCachePromise) return usersCachePromise;
  
  usersCachePromise = (async () => {
    try {
      const firestoreUsers = await getUsers();
      if (Object.keys(firestoreUsers).length > 0) {
        usersCache = firestoreUsers;
        return firestoreUsers;
      }
      // Fallback to users.json if Firestore is empty
      usersCache = usersConfig.users || {};
      return usersCache;
    } catch (error) {
      console.error('Error loading users:', error);
      usersCache = usersConfig.users || {};
      return usersCache;
    } finally {
      usersCachePromise = null;
    }
  })();
  
  return usersCachePromise;
};

// Update users cache (called by real-time listener)
export const updateUsersCache = (users) => {
  usersCache = users;
};

// Get user role from email (synchronous - uses cache)
export const getUserRole = (email) => {
  if (!usersCache) {
    // If cache not loaded, try users.json as fallback
    return usersConfig.users[email]?.role || null;
  }
  return usersCache[email]?.role || null;
};

// Get user info (synchronous - uses cache)
export const getUserInfo = (email) => {
  if (!usersCache) {
    // If cache not loaded, try users.json as fallback
    return usersConfig.users[email] || null;
  }
  return usersCache[email] || null;
};

// Check if user has access to a report
export const hasAccessToReport = (userRole, allowedRoles) => {
  if (!userRole || !allowedRoles) return false;
  return allowedRoles.includes(userRole);
};

// Get all reports accessible by role
export const getReportsForRole = (reports, userRole) => {
  if (userRole === 'team-head') {
    return reports; // Team head sees all reports
  }
  return reports.filter(report => 
    hasAccessToReport(userRole, report.allowedRoles)
  );
};
