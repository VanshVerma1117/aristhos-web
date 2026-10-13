import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import apiClient from '../../../utils/axiosInstance';
import styles from './AdminLayout.module.css';

const NAV_LINKS = [
  { name: 'Inventory', path: '/admin/inventory', icon: 'fa-box' },
  { name: 'Add Product', path: '/admin/create', icon: 'fa-plus' },
  { name: 'Inquiries', path: '/admin/inquiries', icon: 'fa-envelope' }
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState('checking');

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await apiClient.get('/auth/me');
        setAuthStatus('authenticated');
      } catch (error) {
        setAuthStatus('unauthenticated');
      }
    };
    verifyAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout network failure:', error);
    } finally {
      navigate('/admin/login');
      window.location.reload(); 
    }
  };

  if (authStatus === 'checking') {
    return <div className={styles.loadingScreen}>Verifying access...</div>;
  }

  if (authStatus === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.brandHeader}>
          <h2 className={styles.brandTitle}>Aristhos</h2>
          <p className={styles.brandSubtitle}>Admin Command Center</p>
        </div>

        <nav className={styles.navMenu}>
          {NAV_LINKS.map((link) => {
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

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}