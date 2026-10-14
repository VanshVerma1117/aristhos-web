import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../utils/axiosInstance';
import styles from './EditProduct.module.css';

const INITIAL_FORM_STATE = {
  name: '',
  price: '',
  description: '',
  category: 'Living Room',
  inStock: true,
  imageUrl: ''
};

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState('loading'); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        const product = response.data.data || response.data;
        
        const normalizedCategory = Array.isArray(product.category) 
          ? product.category[0] 
          : (product.category || 'Living Room');
        
        setFormData({
          name: product.name || '',
          price: product.price || '',
          description: product.description || '',
          category: normalizedCategory,
          inStock: product.inStock ?? true,
          imageUrl: product.imageUrl || ''
        });
        setPreviewUrl(product.imageUrl || '');
        setStatus('idle');
      } catch (err) {
        setErrorMessage('Failed to load product data.');
        setStatus('error');
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File exceeds 5MB limit.');
      return;
    }

    setImageFile(file);
    
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file)); 
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    let finalImageUrl = formData.imageUrl; 

    try {
      if (imageFile) {
        setStatus('uploading');
        const uploadData = new FormData();
        uploadData.append('image', imageFile);

        const uploadResponse = await apiClient.post('/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        finalImageUrl = uploadResponse.data.imageUrl;
      }

      setStatus('saving');
      const productPayload = {
        ...formData,
        price: Number(formData.price),
        imageUrl: finalImageUrl
      };

      await apiClient.put(`/products/${id}`, productPayload);
      navigate('/admin/inventory');

    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Update failed.';
      setErrorMessage(`Error: ${message}`);
      setStatus('error');
    }
  };

  const getButtonText = () => {
    if (status === 'uploading') return 'Uploading New Image...';
    if (status === 'saving') return 'Updating Database...';
    return 'Save Changes';
  };

  if (status === 'loading') {
    return <div className={styles.loadingState}>Loading product data...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Edit Product</h2>
        <button onClick={() => navigate('/admin/inventory')} className={styles.cancelBtn}>Cancel</button>
      </div>
      
      {errorMessage && (
        <div className={styles.errorBanner}>{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.mediaUploadContainer}>
          <label className={styles.label}>Replace Product Image (Max 5MB)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            disabled={status === 'uploading' || status === 'saving'} 
            className={styles.fileInput}
          />
          {previewUrl && (
            <div className={styles.previewSection}>
              <span className={styles.previewLabel}>Current Image:</span>
              <img src={previewUrl} alt="Preview" className={styles.imagePreview} />
            </div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Product Name</label>
          <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Price (INR)</label>
          <input type="number" name="price" required min="0" value={formData.price} onChange={handleInputChange} className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Description</label>
          <textarea name="description" required rows="4" value={formData.description} onChange={handleInputChange} className={styles.textarea} />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Category</label>
          <select name="category" value={formData.category} onChange={handleInputChange} className={styles.select}>
            <option value="Living Room">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Dining Room">Dining Room</option>
            <option value="Bespoke / Custom">Bespoke / Custom</option>
          </select>
        </div>

        <div className={styles.checkboxGroup}>
          <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleInputChange} id="inStockCheck" className={styles.checkbox} />
          <label htmlFor="inStockCheck" className={styles.checkboxLabel}>Currently in Stock</label>
        </div>

        <button 
          type="submit" 
          disabled={status === 'uploading' || status === 'saving'}
          className={styles.submitBtn}
        >
          {getButtonText()}
        </button>
      </form>
    </div>
  );
}