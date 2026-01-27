import React from 'react';

const Logo = ({ size = 'medium', showText = true, variant = 'dark' }) => {
  const sizes = {
    small: { logo: 40, text: 18, subtitle: 10 },
    medium: { logo: 80, text: 32, subtitle: 11 },
    large: { logo: 120, text: 42, subtitle: 13 }
  };

  const { logo: logoSize, text: textSize, subtitle: subtitleSize } = sizes[size];
  
  // Color scheme based on variant
  const colors = variant === 'light' || variant === 'white'
    ? { 
        logo: 'white', 
        text: 'white', 
        subtitle: 'rgba(255, 255, 255, 0.9)',
        bg: 'rgba(255, 255, 255, 0.15)'
      }
    : { 
        logo: '#1a237e', 
        text: '#1a237e', 
        subtitle: '#3949ab',
        bg: 'rgba(26, 35, 126, 0.12)'
      };

  return (
    <div className="orlin-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      {showText ? (
        <>
          {/* Logo with text - Orlin style */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div className="logo-text" style={{ 
              fontSize: `${textSize}px`, 
              fontWeight: '700',
              color: colors.text,
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              ORLIN
            </div>
            <div className="logo-subtitle" style={{ 
              fontSize: `${subtitleSize}px`, 
              fontWeight: '600',
              color: colors.subtitle,
              letterSpacing: '3px',
              textTransform: 'uppercase'
            }}>
              APPAREL PRIVATE LIMITED
            </div>
          </div>
        </>
      ) : (
        /* Icon only - for header */
        <div className="logo-icon" style={{ 
          width: `${logoSize}px`, 
          height: `${logoSize}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: colors.bg,
          borderRadius: '12px',
          padding: '12px'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: colors.logo,
            borderRadius: '8px',
            opacity: 0.8
          }}></div>
        </div>
      )}
    </div>
  );
};

export default Logo;
