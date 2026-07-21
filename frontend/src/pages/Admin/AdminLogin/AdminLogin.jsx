import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../utils/axiosInstance';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // apiClient automatically injects the correct base URL and withCredentials configuration
      const response = await apiClient.post('/auth/login', credentials);

      if (response.status === 200) {
        navigate('/admin/create');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Authentication failed.';
      setError(`Access Denied: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginCard}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>Aristhos Admin</h2>
          <p className={styles.subtitle}>Enter your credentials to access the inventory system.</p>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Administrator Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              autoComplete="email"
              value={credentials.email} 
              onChange={handleInputChange} 
              className={styles.inputField} 
            />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              autoComplete="current-password"
              value={credentials.password} 
              onChange={handleInputChange} 
              className={styles.inputField} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
}