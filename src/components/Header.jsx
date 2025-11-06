const Header = () => {
  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #EBEBEB',
      padding: '16px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* VGU Logo - Left */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            background: '#004AAD',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '700',
            fontSize: '14px',
            letterSpacing: '0.5px'
          }}>
            VGU
          </div>
        </div>

        {/* Title - Center */}
        <div style={{
          textAlign: 'center',
          flex: '1',
          minWidth: 0
        }}>
          <h1 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#222222',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: '-0.01em'
          }}>
            Student Council Election 2025
          </h1>
        </div>

        {/* Student Council Logo - Right */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            background: '#FFD700',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#004AAD',
            fontWeight: '700',
            fontSize: '14px',
            letterSpacing: '0.5px'
          }}>
            SC
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
