import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../../../utils/axiosInstance';
import styles from './InventoryList.module.css';

export default function InventoryList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchInventory = async (page) => {
    try {
      setLoading(true);
      // Securely routes through apiClient 
      const response = await apiClient.get(`/products?page=${page}&limit=10`);
      
      setProducts(response.data.data || []);
      setCurrentPage(response.data.pagination?.currentPage || 1);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setError('');
    } catch (err) {
      setError('Failed to fetch inventory from database.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory(currentPage);
  }, [currentPage]);

  const handleDelete = async (productId) => {
    // Production Guard
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this product?");
    if (!confirmDelete) return;

    try {
      // apiClient handles the base URL and JWT cookie injection
      await apiClient.delete(`/products/${productId}`);
      fetchInventory(currentPage);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to delete product.';
      alert(`Deletion Failed: ${errorMessage}`);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/edit/${productId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Inventory Management</h2>
        {/* Replaced <a> with <Link> to prevent full page reloads */}
        <Link to="/admin/create" className={styles.addBtn}>
          + Add New Product
        </Link>
      </div>

      {error && (
        <div className={styles.errorBanner}>{error}</div>
      )}

      {loading ? (
        <div className={styles.loadingText}>Loading database records...</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeadRow}>
                <th className={styles.th}>Media</th>
                <th className={styles.th}>Product Name</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Status</th>
                <th className={`${styles.th} ${styles.textRight}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles.emptyCell}>
                    No products found in the database.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  // Safe data normalization
                  const displayCategory = Array.isArray(product.category) ? product.category[0] : product.category;
                  
                  return (
                    <tr key={product._id} className={styles.tableRow}>
                      <td className={styles.td}>
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
                        ) : (
                          <div className={styles.noImage}>No Img</div>
                        )}
                      </td>
                      <td className={`${styles.td} ${styles.productName}`}>{product.name}</td>
                      <td className={`${styles.td} ${styles.category}`}>{displayCategory}</td>
                      <td className={`${styles.td} ${styles.price}`}>₹{product.price.toLocaleString('en-IN')}</td>
                      <td className={styles.td}>
                        <span className={`${styles.statusBadge} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.actions}>
                          <button onClick={() => handleEdit(product._id)} className={styles.editBtn}>Edit</button>
                          <button onClick={() => handleDelete(product._id)} className={styles.deleteBtn}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className={styles.pageBtn}
              >
                Previous
              </button>
              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className={styles.pageBtn}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}