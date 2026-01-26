import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Edit2, User, Mail, Shield } from 'lucide-react';
import { getUsers, addUser, updateUser, deleteUser, subscribeToUsers } from '../utils/usersService';

const UserManager = ({ onClose }) => {
  const [users, setUsers] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'sales'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { id: 'team-head', name: 'Team Head', description: 'Can see all reports and manage them' },
    { id: 'sales', name: 'Sales', description: 'Can see sales reports' },
    { id: 'finance', name: 'Finance', description: 'Can see finance reports' },
    { id: 'hr', name: 'HR', description: 'Can see HR reports' },
    { id: 'marketing', name: 'Marketing', description: 'Can see marketing reports' }
  ];

  useEffect(() => {
    // Load users from Firestore
    const loadUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    loadUsers();

    // Subscribe to real-time changes
    const unsubscribe = subscribeToUsers((updatedUsers) => {
      console.log('🔄 Users update received:', Object.keys(updatedUsers).length, 'users');
      setUsers(updatedUsers);
    });

    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setFormData({
      email: '',
      name: '',
      role: 'sales'
    });
    setEditingUser(null);
    setShowAddForm(false);
    setError('');
  };

  const handleEdit = (email) => {
    const user = users[email];
    setFormData({
      email: user.email,
      name: user.name || '',
      role: user.role || 'sales'
    });
    setEditingUser(email);
    setShowAddForm(true);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate email
      if (!formData.email || !formData.email.includes('@')) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Validate name
      if (!formData.name || formData.name.trim() === '') {
        setError('Please enter a name');
        setLoading(false);
        return;
      }

      if (editingUser) {
        // Update existing user
        await updateUser(editingUser, {
          name: formData.name.trim(),
          role: formData.role
        });
        alert('✅ User updated successfully!');
      } else {
        // Add new user
        await addUser(formData.email.toLowerCase().trim(), {
          name: formData.name.trim(),
          role: formData.role
        });
        alert('✅ User added successfully!');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving user:', error);
      setError(error.message || 'Failed to save user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email) => {
    if (!confirm(`Are you sure you want to delete user "${email}"?`)) {
      return;
    }

    try {
      await deleteUser(email);
      alert('✅ User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('❌ Failed to delete user: ' + (error.message || 'Unknown error'));
    }
  };

  const usersList = Object.values(users);

  return (
    <div className="report-manager-overlay">
      <div className="report-manager">
        <div className="report-manager-header">
          <div>
            <h2>
              <User style={{ marginRight: '8px', display: 'inline' }} />
              User Management
            </h2>
            <p style={{ marginTop: '4px', color: 'rgba(0,0,0,0.6)', fontSize: '14px' }}>
              Manage users and their access roles. Changes sync automatically across all devices.
            </p>
          </div>
          <button onClick={onClose} className="btn-icon" title="Close">
            <X />
          </button>
        </div>

        <div className="report-manager-content">
          {error && (
            <div style={{
              background: '#fee',
              color: '#c33',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px',
              border: '1px solid #fcc'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{usersList.length}</strong> user{usersList.length !== 1 ? 's' : ''} registered
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Plus size={18} />
              Add New User
            </button>
          </div>

          {showAddForm && (
            <div className="add-report-form" style={{ marginBottom: '24px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '16px' }}>
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                    <Mail size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!!editingUser}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                    placeholder="user@example.com"
                  />
                  {editingUser && (
                    <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>
                      Email cannot be changed
                    </small>
                  )}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                    <User size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                    placeholder="John Doe"
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                    <Shield size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>
                        {role.name} - {role.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Save size={18} />
                    {loading ? 'Saving...' : (editingUser ? 'Update User' : 'Add User')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary"
                    style={{ padding: '10px 20px' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="reports-list">
            <h3 style={{ marginBottom: '16px' }}>All Users</h3>
            {usersList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <User size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                <p>No users found. Add your first user above.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {usersList.map((user) => (
                  <div
                    key={user.email}
                    style={{
                      background: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: '#4a90e2',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}>
                          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '16px' }}>
                            {user.name || 'No name'}
                          </div>
                          <div style={{ color: '#666', fontSize: '14px' }}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        background: '#e3f2fd',
                        color: '#1976d2',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        textTransform: 'uppercase'
                      }}>
                        {user.role || 'sales'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(user.email)}
                        className="btn-icon"
                        title="Edit User"
                        style={{ color: '#4a90e2' }}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.email)}
                        className="btn-icon"
                        title="Delete User"
                        style={{ color: '#e74c3c' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;

