import vguLogo from '../assets/vgu.png';
import councilLogo from '../assets/council.jpg';

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
          <img
            src={vguLogo}
            alt="VGU Logo"
            style={{
              height: '44px',
              width: 'auto',
              objectFit: 'contain'
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
          <img
            src={councilLogo}
            alt="Student Council Logo"
            style={{
              height: '44px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
