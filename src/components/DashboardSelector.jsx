import { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';

const DashboardSelector = ({ category, dashboards, onClose, onSelectDashboard }) => {
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(true);

  const handleSelectDashboard = (dashboard) => {
    setSelectedDashboard(dashboard);
    setIframeLoading(true);
  };

  const handleClose = () => {
    setSelectedDashboard(null);
    setIframeLoading(true);
    onClose();
  };

  // If a dashboard is selected, show it in fullscreen
  if (selectedDashboard) {
    return (
      <div className="report-fullscreen">
        <div className="report-fullscreen-header" style={{ 
          background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.95) 0%, rgba(22, 27, 34, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          padding: '16px 24px',
          minHeight: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setSelectedDashboard(null)}
              className="btn-icon"
              style={{ 
                color: '#ffffff',
                padding: '8px 16px',
                fontSize: '14px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              title="Back to Dashboard List"
            >
              ← Back
            </button>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600',
              margin: 0,
              color: '#ffffff',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}>
              {selectedDashboard.title}
            </h2>
          </div>
          <div className="report-actions">
            <button 
              onClick={handleClose} 
              className="btn-icon"
              style={{ 
                padding: '8px',
                fontSize: '14px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="report-fullscreen-content" style={{
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)',
          position: 'relative'
        }}>
          {selectedDashboard.iframe ? (
            <>
              {iframeLoading && (
                <div className="iframe-loading">
                  <div className="spinner"></div>
                  <p>Loading dashboard...</p>
                </div>
              )}
              <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)',
                overflow: 'hidden'
              }}>
                <iframe
                  src={selectedDashboard.url}
                  title={selectedDashboard.title}
                  className="report-iframe"
                  allowFullScreen
                  frameBorder="0"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
                  loading="lazy"
                  onLoad={() => setIframeLoading(false)}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block',
                    filter: 'brightness(0.85) contrast(1.1) saturate(0.9)',
                    transition: 'filter 0.3s ease',
                    background: '#0a0e27'
                  }}
                />
              </div>
            </>
          ) : (
            <div className="report-placeholder">
              <p>Report URL: {selectedDashboard.url}</p>
              <a
                href={selectedDashboard.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Open Report
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show list of dashboards in this category
  return (
    <div className="report-fullscreen" style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)' }}>
      <div className="report-fullscreen-header" style={{ 
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: '32px', 
          fontWeight: '700',
          color: '#ffffff',
          textShadow: '0 2px 20px rgba(255, 255, 255, 0.1)'
        }}>
          {category} Dashboards
        </h2>
        <button 
          onClick={handleClose} 
          className="btn-icon"
          style={{ 
            padding: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
          title="Close"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={20} />
        </button>
      </div>
      <div style={{ 
        padding: '40px', 
        maxWidth: '1400px', 
        margin: '0 auto',
        minHeight: 'calc(100vh - 100px)'
      }}>
        <div style={{ 
          marginBottom: '32px',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '18px',
          fontWeight: '500'
        }}>
          Select a dashboard to view:
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: dashboards.length === 1 
            ? '1fr' 
            : dashboards.length === 2 
            ? 'repeat(2, 1fr)' 
            : dashboards.length === 3
            ? 'repeat(3, 1fr)'
            : 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: dashboards.length <= 3 ? '24px' : '20px',
          maxWidth: dashboards.length <= 3 ? '1400px' : '100%',
          margin: dashboards.length <= 3 ? '0 auto' : '0'
        }}>
          {dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              onClick={() => handleSelectDashboard(dashboard)}
              className="dashboard-selector-card"
              style={{
                background: 'linear-gradient(135deg, rgba(22, 27, 34, 0.9) 0%, rgba(13, 17, 23, 0.95) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: dashboards.length <= 2 ? '40px' : dashboards.length === 3 ? '32px' : '28px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
                minHeight: dashboards.length <= 2 ? '320px' : dashboards.length === 3 ? '280px' : '260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backdropFilter: 'blur(20px)',
                transformStyle: 'preserve-3d',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(74, 144, 226, 0.4)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(74, 144, 226, 0.3) inset, 0 0 40px rgba(74, 144, 226, 0.2)';
                e.currentTarget.style.transform = 'translateY(-12px) rotateX(5deg) rotateY(-2deg) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08) inset';
                e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
              }}
            >
              <div>
                <div style={{ 
                  fontSize: dashboards.length <= 2 ? '72px' : dashboards.length === 3 ? '64px' : '56px', 
                  marginBottom: dashboards.length <= 2 ? '24px' : '20px',
                  textAlign: 'center',
                  lineHeight: '1'
                }}>
                  {dashboard.icon}
                </div>
                <h3 style={{ 
                  margin: '0 0 12px 0', 
                  fontSize: dashboards.length <= 2 ? '24px' : dashboards.length === 3 ? '22px' : '20px', 
                  fontWeight: '700',
                  color: '#ffffff',
                  textAlign: 'center',
                  lineHeight: '1.3',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                }}>
                  {dashboard.title}
                </h3>
                <p style={{ 
                  margin: '0 0 24px 0', 
                  fontSize: dashboards.length <= 2 ? '16px' : '15px', 
                  color: 'rgba(255, 255, 255, 0.7)',
                  textAlign: 'center',
                  lineHeight: '1.6',
                  minHeight: dashboards.length <= 2 ? '56px' : '48px'
                }}>
                  {dashboard.description || 'No description available'}
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                color: '#ffffff',
                fontWeight: '600',
                fontSize: dashboards.length <= 2 ? '17px' : '16px',
                padding: dashboards.length <= 2 ? '14px 28px' : '12px 24px',
                background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(92, 107, 192, 0.2) 100%)',
                borderRadius: '12px',
                border: '1px solid rgba(74, 144, 226, 0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(74, 144, 226, 0.2)'
              }}>
                <Maximize2 size={dashboards.length <= 2 ? 22 : 20} />
                View Dashboard
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSelector;

