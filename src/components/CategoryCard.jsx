import { Maximize2 } from 'lucide-react';

const CategoryCard = ({ category, dashboards, onViewCategory }) => {
  const totalDashboards = dashboards.length;
  const firstDashboard = dashboards[0]; // Use first dashboard for icon/description

  return (
    <div className="report-card">
      <div className="report-card-header">
        <span className="report-icon">{firstDashboard.icon}</span>
        <span className="report-category">{category}</span>
      </div>
      <div className="report-card-body">
        <h3>{category} Dashboards</h3>
        <p>
          {totalDashboards === 1 
            ? `1 dashboard available` 
            : `${totalDashboards} dashboards available`}
        </p>
        <p style={{ 
          marginTop: '8px', 
          fontSize: '13px', 
          color: 'rgba(255,255,255,0.5)',
          fontStyle: 'italic'
        }}>
          Click to view all {category.toLowerCase()} dashboards
        </p>
      </div>
      <div className="report-card-footer">
        <button 
          onClick={() => onViewCategory(category, dashboards)} 
          className="btn-primary"
        >
          <Maximize2 /> View Dashboards
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;

