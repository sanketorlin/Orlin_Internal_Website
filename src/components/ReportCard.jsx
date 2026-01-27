import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const ReportCard = ({ report, onViewCategory, categoryDashboards }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const handleOpenReport = () => {
    // If there are multiple dashboards in this category, show selector
    if (categoryDashboards && categoryDashboards.length > 1) {
      onViewCategory(report.category, categoryDashboards);
    } else {
      // If only one dashboard, open it directly
      setIsFullscreen(true);
      setIframeLoading(true);
    }
  };

  const handleCloseReport = () => {
    setIsFullscreen(false);
  };

  if (isFullscreen) {
    return (
      <div className="report-fullscreen">
        <div className="report-fullscreen-header" style={{
          background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.95) 0%, rgba(22, 27, 34, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          padding: '16px 24px'
        }}>
          <h2 style={{
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: '600',
            margin: 0,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>{report.title}</h2>
          <div className="report-actions">
            <button 
              onClick={handleCloseReport} 
              className="btn-close-fullscreen"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <X size={18} /> Close
            </button>
          </div>
        </div>
        <div className="report-fullscreen-content" style={{
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)',
          position: 'relative'
        }}>
          {report.iframe ? (
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
                  src={report.url}
                  title={report.title}
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
              <p>Report URL: {report.url}</p>
              <a
                href={report.url}
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

  return (
    <div className="report-card">
      <div className="report-card-header">
        <span className="report-icon">{report.icon}</span>
        <span className="report-category">{report.category}</span>
      </div>
      <div className="report-card-body">
        <h3>{report.title}</h3>
        <p>{report.description}</p>
      </div>
      <div className="report-card-footer">
        <button onClick={handleOpenReport} className="btn-primary">
          <Maximize2 /> View Dashboard
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
