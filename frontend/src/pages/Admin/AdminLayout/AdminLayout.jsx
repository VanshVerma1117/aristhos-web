import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import apiClient from '../../../utils/axiosInstance';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState('checking');

    useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Any protected GET route works as a lightweight "am I logged in" check.
        // Cleanest is a dedicated /api/auth/me route if you have or add one.
        await apiClient.get('/auth/me'); // real, protected check
        setAuthStatus('authenticated');
      } catch (error) {
        setAuthStatus('unauthenticated');
      }
    };
    verifyAuth();
  }, []);

  const handleLogout = async () => {
    try {
      // Securely routes through apiClient which handles the base URL and credentials automatically
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout network failure', error);
    } finally {
      navigate('/admin/login');
      // Hard reload clears any lingering React memory/context state
      window.location.reload(); 
    }
  };

  if (authStatus === 'checking') {
    return <div className={styles.loadingScreen}>Verifying access...</div>;
  }

  if (authStatus === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />;
  }

  const navLinks = [
    { name: 'Inventory', path: '/admin/inventory', icon: 'fa-box' },
    { name: 'Add Product', path: '/admin/create', icon: 'fa-plus' },
    { name: 'Inquiries', path: '/admin/inquiries', icon: 'fa-envelope' }
  ];

  return (
    <div className={styles.layoutContainer}>
      
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.brandHeader}>
          <h2 className={styles.brandTitle}>Aristhos</h2>
          <p className={styles.brandSubtitle}>Admin Command Center</p>
        </div>

        <nav className={styles.navMenu}>
          {navLinks.map((link) => {
            const isActive = location.pathname.includes(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
              >
                <i className={`fas ${link.icon} ${styles.icon}`}></i>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <i className="fas fa-sign-out-alt"></i>
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}