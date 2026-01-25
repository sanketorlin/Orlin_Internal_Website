import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const ReportCard = ({ report }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const handleOpenReport = () => {
    setIsFullscreen(true);
    setIframeLoading(true);
  };

  const handleCloseReport = () => {
    setIsFullscreen(false);
  };

  if (isFullscreen) {
    return (
      <div className="report-fullscreen">
        <div className="report-fullscreen-header">
          <h2>{report.title}</h2>
          <div className="report-actions">
            <button onClick={handleCloseReport} className="btn-close-fullscreen">
              <X /> Close
            </button>
          </div>
        </div>
        <div className="report-fullscreen-content">
          {report.iframe ? (
            <>
              {iframeLoading && (
                <div className="iframe-loading">
                  <div className="spinner"></div>
                  <p>Loading dashboard...</p>
                </div>
              )}
              <iframe
                src={report.url}
                title={report.title}
                className="report-iframe"
                allowFullScreen
                frameBorder="0"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
                loading="lazy"
                onLoad={() => setIframeLoading(false)}
              />
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
