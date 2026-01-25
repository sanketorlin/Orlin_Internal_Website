import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Edit2, Users } from 'lucide-react';
import { getRoles, getRoleIds, addRole, updateRole, deleteRole, saveRoles } from '../utils/rolesManager';

const ReportManager = ({ reports, onAdd, onRemove, onUpdate, onClose }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRoleManager, setShowRoleManager] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    url: '',
    iframe: true,
    allowedRoles: [],
    icon: '📊',
    category: ''
  });
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    setRoles(getRoles());
  }, []);

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      url: '',
      iframe: true,
      allowedRoles: [],
      icon: '📊',
      category: ''
    });
    setEditingReport(null);
    setShowAddForm(false);
  };

  const handleEdit = (report) => {
    setEditingReport(report.id);
    setFormData({
      id: report.id,
      title: report.title,
      description: report.description || '',
      url: report.url,
      iframe: report.iframe !== false,
      allowedRoles: report.allowedRoles || [],
      icon: report.icon || '📊',
      category: report.category || ''
    });
    setShowAddForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate ID if not provided
    const id = formData.id || formData.title.toLowerCase().replace(/\s+/g, '-');
    
    const reportData = {
      ...formData,
      id,
      allowedRoles: formData.allowedRoles.length > 0 
        ? formData.allowedRoles 
        : ['team-head'] // Default to team-head only
    };

    if (editingReport) {
      // Update existing report
      const updated = reports.map(r => 
        r.id === editingReport ? reportData : r
      );
      onUpdate(updated);
    } else {
      // Add new report
      onAdd(reportData);
    }
    
    resetForm();
  };

  const handleRoleToggle = (roleId) => {
    setFormData(prev => ({
      ...prev,
      allowedRoles: prev.allowedRoles.includes(roleId)
        ? prev.allowedRoles.filter(r => r !== roleId)
        : [...prev.allowedRoles, roleId]
    }));
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    try {
      const updated = addRole(roleFormData);
      setRoles(updated);
      setRoleFormData({ name: '', description: '' });
      setEditingRole(null);
      alert('Role added successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditRole = (role) => {
    setEditingRole(role.id);
    setRoleFormData({
      name: role.name,
      description: role.description || ''
    });
  };

  const handleUpdateRole = (e) => {
    e.preventDefault();
    try {
      const updated = updateRole(editingRole, roleFormData);
      setRoles(updated);
      setRoleFormData({ name: '', description: '' });
      setEditingRole(null);
      alert('Role updated successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm(`Are you sure you want to delete this role? This will remove it from all reports.`)) {
      try {
        const updated = deleteRole(roleId);
        setRoles(updated);
        alert('Role deleted successfully!');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const resetRoleForm = () => {
    setRoleFormData({ name: '', description: '' });
    setEditingRole(null);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ reports }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reports-config.json';
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (imported.reports && Array.isArray(imported.reports)) {
            onUpdate(imported.reports);
            alert('Reports imported successfully!');
          } else {
            alert('Invalid file format');
          }
        } catch (error) {
          alert('Error importing file: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="report-manager-overlay">
      <div className="report-manager">
        <div className="report-manager-header">
          <h2>Manage Reports</h2>
          <button onClick={onClose} className="btn-icon">
            <X />
          </button>
        </div>

        <div className="report-manager-content">
          <div className="manager-actions">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary"
            >
              <Plus /> Add New Report
            </button>
            <button
              onClick={() => setShowRoleManager(!showRoleManager)}
              className="btn-primary"
            >
              <Users /> Manage Roles
            </button>
            <button onClick={handleExport} className="btn-secondary">
              <Save /> Export Config
            </button>
            <label className="btn-secondary">
              <Save /> Import Config
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {showRoleManager && (
            <div className="role-manager-section">
              <div className="section-header">
                <h3>Manage Roles</h3>
                <button
                  onClick={() => {
                    setShowRoleManager(false);
                    resetRoleForm();
                  }}
                  className="btn-icon-small"
                >
                  <X />
                </button>
              </div>

              <form 
                onSubmit={editingRole ? handleUpdateRole : handleAddRole} 
                className="role-form"
              >
                <div className="form-row">
                  <div className="form-group">
                    <label>Role Name *</label>
                    <input
                      type="text"
                      value={roleFormData.name}
                      onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
                      placeholder="e.g., Operations, IT"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      value={roleFormData.description}
                      onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
                      placeholder="Role description"
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingRole ? 'Update Role' : 'Add Role'}
                  </button>
                  {editingRole && (
                    <button
                      type="button"
                      onClick={resetRoleForm}
                      className="btn-secondary"
                    >
                      <X /> Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="roles-list">
                <h4>Existing Roles ({roles.length})</h4>
                <div className="roles-grid">
                  {roles.map((role) => (
                    <div key={role.id} className="role-card">
                      <div className="role-card-header">
                        <h5>{role.name}</h5>
                        <div className="role-card-actions">
                          <button
                            onClick={() => handleEditRole(role)}
                            className="btn-edit-small"
                            title="Edit Role"
                          >
                            <Edit2 />
                          </button>
                          {role.id !== 'team-head' && (
                            <button
                              onClick={() => handleDeleteRole(role.id)}
                              className="btn-danger-small"
                              title="Delete Role"
                            >
                              <Trash2 />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="role-id">ID: {role.id}</p>
                      {role.description && (
                        <p className="role-description">{role.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showAddForm && (
            <form onSubmit={handleSubmit} className="add-report-form">
              <h3>{editingReport ? 'Edit Report' : 'Add New Report'}</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Sales, Finance, etc."
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>URL *</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    required
                    placeholder="https://example.com/dashboard"
                  />
                </div>
                <div className="form-group">
                  <label>Icon</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="📊"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.iframe}
                    onChange={(e) => setFormData({ ...formData, iframe: e.target.checked })}
                  />
                  Display as iframe
                </label>
              </div>

              <div className="form-group">
                <label>Allowed Roles *</label>
                <div className="role-checkboxes">
                  {roles.map(role => (
                    <label key={role.id} className="role-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.allowedRoles.includes(role.id)}
                        onChange={() => handleRoleToggle(role.id)}
                      />
                      <span>{role.name}</span>
                      {role.description && (
                        <span className="role-hint">({role.description})</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingReport ? 'Update Report' : 'Add Report'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  <X /> Cancel
                </button>
              </div>
            </form>
          )}

          <div className="reports-list">
            <h3>Existing Reports ({reports.length})</h3>
            <div className="reports-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Roles</th>
                    <th>URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>
                        <span className="report-icon-small">{report.icon}</span>
                        {report.title}
                      </td>
                      <td>{report.category}</td>
                      <td>
                        <div className="role-badges">
                          {report.allowedRoles.map(roleId => {
                            const role = roles.find(r => r.id === roleId);
                            return (
                              <span key={roleId} className="role-badge">
                                {role ? role.name : roleId}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="url-cell">
                        <a href={report.url} target="_blank" rel="noopener noreferrer">
                          {report.url.substring(0, 30)}...
                        </a>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            onClick={() => handleEdit(report)}
                            className="btn-edit"
                            title="Edit Report"
                          >
                            <Edit2 /> Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete "${report.title}"?`)) {
                                onRemove(report.id);
                              }
                            }}
                            className="btn-danger"
                            title="Remove Report"
                          >
                            <Trash2 /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportManager;
