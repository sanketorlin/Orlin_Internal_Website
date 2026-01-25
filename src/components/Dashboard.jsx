import { useState, useEffect } from 'react';
import { signOut } from '../utils/auth';
import { getUserRole, getUserInfo, getReportsForRole } from '../utils/roles';
import { LogOut, Settings, User } from 'lucide-react';
import ReportCard from './ReportCard';
import ReportManager from './ReportManager';
import reportsConfig from '../config/reports.json';
import Logo from './Logo';

const Dashboard = ({ userEmail, onLogout }) => {
  const [reports, setReports] = useState(reportsConfig.reports);
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showManager, setShowManager] = useState(false);
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    const role = getUserRole(userEmail);
    const info = getUserInfo(userEmail);
    setUserRole(role);
    setUserInfo(info);
    
    // Load reports from localStorage if available, otherwise use default
    const savedReports = localStorage.getItem('bi-reports');
    if (savedReports) {
      try {
        const parsed = JSON.parse(savedReports);
        setReports(parsed);
      } catch (e) {
        console.error('Error loading saved reports:', e);
      }
    }
  }, [userEmail]);

  useEffect(() => {
    const accessible = getReportsForRole(reports, userRole);
    setFilteredReports(accessible);
  }, [reports, userRole]);

  const handleLogout = async () => {
    try {
      await signOut();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAddReport = (newReport) => {
    const updated = [...reports, newReport];
    setReports(updated);
    localStorage.setItem('bi-reports', JSON.stringify(updated));
  };

  const handleRemoveReport = (reportId) => {
    const updated = reports.filter(r => r.id !== reportId);
    setReports(updated);
    localStorage.setItem('bi-reports', JSON.stringify(updated));
  };

  const handleUpdateReports = (updatedReports) => {
    setReports(updatedReports);
    localStorage.setItem('bi-reports', JSON.stringify(updatedReports));
  };

  if (!userRole) {
    return (
      <div className="loading" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        gap: '20px'
      }}>
        <div className="spinner"></div>
        <div>
          <p style={{ color: '#fff', fontSize: '18px', marginBottom: '10px' }}>
            User not found in system
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
            Email: {userEmail}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '10px' }}>
            Please contact administrator to add your email to users.json
          </p>
          <button 
            onClick={handleLogout} 
            className="btn-primary"
            style={{ marginTop: '20px' }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.2)', 
            borderRadius: '12px', 
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Logo size="medium" showText={false} variant="light" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1>BI Dashboard Portal</h1>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.95)', letterSpacing: '1.5px', fontWeight: '600' }}>
              ORLIN APPAREL PRIVATE LIMITED
            </div>
          </div>
          <div className="user-info">
            <User className="user-icon" />
            <div>
              <span className="user-name">{userInfo?.name || 'User'}</span>
              <span className="user-role">{userRole}</span>
            </div>
          </div>
        </div>
        <div className="header-right">
          {userRole === 'team-head' && (
            <button
              onClick={() => setShowManager(!showManager)}
              className="btn-icon"
              title="Manage Reports"
            >
              <Settings />
            </button>
          )}
          <button onClick={handleLogout} className="btn-icon" title="Logout">
            <LogOut />
          </button>
        </div>
      </header>

      {showManager && userRole === 'team-head' && (
        <ReportManager
          reports={reports}
          onAdd={handleAddReport}
          onRemove={handleRemoveReport}
          onUpdate={handleUpdateReports}
          onClose={() => setShowManager(false)}
        />
      )}

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="reports-header">
            <h2>Your Dashboards</h2>
            <p className="reports-count">
              {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {filteredReports.length === 0 ? (
            <div className="empty-state">
              <p>No reports available for your role.</p>
            </div>
          ) : (
            <div className="reports-grid">
              {filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
