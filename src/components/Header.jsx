import vguLogo from '../assets/vgu.png';
import councilLogo from '../assets/council.jpg';

const Header = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '16px 20px',
      fontFamily: "'Poppins', sans-serif",
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
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
          <img
            src={vguLogo}
            alt="VGU Logo"
            style={{
              height: '48px',
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
              background: 'white',
              padding: '4px'
            }}
          />
        </div>

        {/* Title - Center */}
        <div style={{
          textAlign: 'center',
          flex: '1',
          minWidth: 0
        }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'white',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: '-0.01em',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
          <img
            src={councilLogo}
            alt="Student Council Logo"
            style={{
              height: '48px',
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
              background: 'white',
              padding: '4px'
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
