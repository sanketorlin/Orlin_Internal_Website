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
      <div className="logo-icon" style={{ 
        width: `${logoSize}px`, 
        height: `${logoSize}px`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.bg,
        borderRadius: '50%',
        padding: '12px'
      }}>
        {/* Stylized O with hanger design */}
        <svg width={logoSize * 0.8} height={logoSize * 0.8} viewBox="0 0 100 100" style={{ position: 'absolute' }}>
          {/* Outer circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke={colors.logo} strokeWidth="5" />
          {/* Vertical line */}
          <line x1="50" y1="10" x2="50" y2="90" stroke={colors.logo} strokeWidth="5" />
          {/* Horizontal hanger lines */}
          <line x1="50" y1="30" x2="30" y2="30" stroke={colors.logo} strokeWidth="5" strokeLinecap="round" />
          <line x1="50" y1="30" x2="70" y2="30" stroke={colors.logo} strokeWidth="5" strokeLinecap="round" />
          <line x1="30" y1="30" x2="30" y2="50" stroke={colors.logo} strokeWidth="5" strokeLinecap="round" />
          <line x1="70" y1="30" x2="70" y2="50" stroke={colors.logo} strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>
      {showText && (
        <>
          <div className="logo-text" style={{ 
            fontSize: `${textSize}px`, 
            fontWeight: '800',
            color: colors.text,
            letterSpacing: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ fontSize: `${textSize * 1.3}px`, fontWeight: '900' }}>O</span>
            <span>RLIN</span>
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
        </>
      )}
    </div>
  );
};

export default Logo;
