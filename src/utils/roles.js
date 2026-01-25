import usersConfig from '../config/users.json';

// Get user role from email
export const getUserRole = (email) => {
  const user = usersConfig.users[email];
  return user ? user.role : null;
};

// Get user info
export const getUserInfo = (email) => {
  return usersConfig.users[email] || null;
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
