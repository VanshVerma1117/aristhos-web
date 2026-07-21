import { useState, useEffect } from 'react';
import apiClient from '../../../utils/axiosInstance';
import styles from './InquiryList.module.css';

const SOURCE_LABELS = {
  custom_order_form: 'Specific Product',
  about_page_custom_project: 'Custom Project',
  cta_custom_order: 'Custom Order (CTA)',
};

export default function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/inquiries');
      setInquiries(response.data.data || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch inquiries from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiClient.put(`/inquiries/${id}`, { status: newStatus });
      // Update local state instantly instead of requiring a full network refetch
      setInquiries(inquiries.map(inq => inq._id === id ? { ...inq, status: newStatus } : inq));
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Customer Inquiries</h2>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      {loading ? (
        <div className={styles.loadingText}>Loading lead data...</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeadRow}>
                <th className={styles.th}>Reference ID</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Source</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan="4" className={styles.emptyCell}>No inquiries recorded yet.</td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq._id} className={styles.tableRow}>
                    <td className={`${styles.td} ${styles.refId}`}>{inq.inquiryId}</td>
                    <td className={styles.td}>{new Date(inq.createdAt).toLocaleDateString()}</td>
                    <td className={styles.td}>
                      {SOURCE_LABELS[inq.source] || inq.source}
                    </td>
                    <td className={styles.td}>
                      <select 
                        value={inq.status} 
                        onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                        className={styles.statusSelect}
                      >
                        <option value="pending_whatsapp">Pending WhatsApp</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}