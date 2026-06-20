import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import Cursor from './components/Cursor.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import { PortfolioProvider } from './context/PortfolioContext.jsx';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Cursor />
        <ScrollProgress />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--bg-card)',
              color: '#ffffff',
              border: '1px solid rgba(177, 95, 44, 0.3)',
              fontFamily: 'var(--font-body)',
            },
            success: {
              iconTheme: { primary: 'var(--accent)', secondary: 'var(--bg-card)' },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;

