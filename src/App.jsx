import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Map, HeartPulse, BarChart3 } from 'lucide-react';
import MapPage from './pages/MapPage';
import InfoPage from './pages/InfoPage';
import StatusPage from './pages/StatusPage';

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        {/* 왼쪽 사이드바 네비게이션 */}
        <nav style={styles.navBar}>
          <div style={styles.logo}>❤️</div>
          <Link to="/" style={styles.navItem}>
            <Map size={24} style={styles.icon} />
            <span style={styles.navText}>지도</span>
          </Link>
          <Link to="/info" style={styles.navItem}>
            <HeartPulse size={24} style={styles.icon} />
            <span style={styles.navText}>필요성</span>
          </Link>
          <Link to="/status" style={styles.navItem}>
            <BarChart3 size={24} style={styles.icon} />
            <span style={styles.navText}>현황</span>
          </Link>
        </nav>

        {/* 오른쪽 메인 콘텐츠 영역 */}
        <div style={styles.mainArea}>
          <header style={styles.header}>
            <h1>생명을 살리는 헌혈, 모두 함께 합시다</h1>
          </header>
          <main style={styles.content}>
            <Routes>
              <Route path="/" element={<MapPage />} />
              <Route path="/info" element={<InfoPage />} />
              <Route path="/status" element={<StatusPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    display: 'flex', // 가로로 나열 (사이드바 | 메인)
    height: '95vh',
    width: '99vw',
  },
  navBar: {
    width: '80px', // 슬림한 너비
    height: '100%',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #ddd', // 오른쪽 구분선
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    gap: '20px',
  },
  logo: { fontSize: '24px', marginBottom: '20px' },
  navItem: { 
    textDecoration: 'none', 
    color: '#333', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    gap: '5px' 
  },
  navText: { fontSize: '11px', fontWeight: 'bold' },
  icon: { color: '#e63946' },
  mainArea: {
    flex: 1, // 나머지 공간 다 쓰기
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: { 
    fontSize: '15px',
    padding: '0.5rem', 
    backgroundColor: '#f8f9fa', 
    borderBottom: '1px solid #eee',
    textAlign: 'center' 
  },
  content: { 
    flex: 1, 
    overflowY: 'auto',
    padding: '20px' 
  }
};

export default App;
