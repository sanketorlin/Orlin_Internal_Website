// Role management utilities
// Stores roles in localStorage

const ROLES_STORAGE_KEY = 'bi-roles';

// Get all roles
export const getRoles = () => {
  const savedRoles = localStorage.getItem(ROLES_STORAGE_KEY);
  if (savedRoles) {
    try {
      return JSON.parse(savedRoles);
    } catch (e) {
      console.error('Error loading roles:', e);
    }
  }
  
  // Default roles
  const defaultRoles = [
    { id: 'team-head', name: 'Team Head', description: 'Can see all reports and manage them' },
    { id: 'sales', name: 'Sales', description: 'Can see sales reports' },
    { id: 'finance', name: 'Finance', description: 'Can see finance reports' },
    { id: 'hr', name: 'HR', description: 'Can see HR reports' },
    { id: 'marketing', name: 'Marketing', description: 'Can see marketing reports' }
  ];
  
  localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(defaultRoles));
  return defaultRoles;
};

// Save roles
export const saveRoles = (roles) => {
  localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles));
};

// Add new role
export const addRole = (role) => {
  const roles = getRoles();
  const newRole = {
    id: role.id || role.name.toLowerCase().replace(/\s+/g, '-'),
    name: role.name,
    description: role.description || ''
  };
  
  // Check if role already exists
  if (roles.find(r => r.id === newRole.id)) {
    throw new Error('Role with this ID already exists');
  }
  
  roles.push(newRole);
  saveRoles(roles);
  return roles;
};

// Update role
export const updateRole = (roleId, updatedRole) => {
  const roles = getRoles();
  const index = roles.findIndex(r => r.id === roleId);
  
  if (index === -1) {
    throw new Error('Role not found');
  }
  
  roles[index] = {
    ...roles[index],
    ...updatedRole,
    id: roleId // Keep original ID
  };
  
  saveRoles(roles);
  return roles;
};

// Delete role
export const deleteRole = (roleId) => {
  // Prevent deleting team-head
  if (roleId === 'team-head') {
    throw new Error('Cannot delete team-head role');
  }
  
  const roles = getRoles();
  const filtered = roles.filter(r => r.id !== roleId);
  saveRoles(filtered);
  return filtered;
};

// Get role by ID
export const getRoleById = (roleId) => {
  const roles = getRoles();
  return roles.find(r => r.id === roleId);
};

// Get role IDs only (for compatibility)
export const getRoleIds = () => {
  return getRoles().map(r => r.id);
};
