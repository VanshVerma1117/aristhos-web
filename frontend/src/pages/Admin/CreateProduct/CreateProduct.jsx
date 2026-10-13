import { useState, useEffect } from 'react';
import apiClient from '../../../utils/axiosInstance';
import styles from './CreateProduct.module.css';

const INITIAL_FORM_STATE = {
  name: '',
  price: '',
  description: '',
  category: 'Living Room',
  inStock: true
};

export default function CreateProduct() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File exceeds 5MB limit. Optimize the image and try again.');
      return;
    }

    setImageFile(file);
    
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file)); 
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setErrorMessage('A product image is required.');
      return;
    }

    setErrorMessage('');
    
    try {
      setStatus('uploading');
      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      const uploadResponse = await apiClient.post('/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setStatus('saving');
      const productPayload = {
        ...formData,
        price: Number(formData.price),
        imageUrl: uploadResponse.data.imageUrl
      };

      await apiClient.post('/products', productPayload);

      setStatus('success');
      
      setTimeout(() => {
        setStatus('idle');
        setFormData(INITIAL_FORM_STATE);
        setImageFile(null);
        setPreviewUrl('');
      }, 3000);

    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Transaction failed.';
      setErrorMessage(`Error: ${message}`);
      setStatus('error');
    }
  };

  const getButtonText = () => {
    if (status === 'uploading') return '1/2: Uploading Image to CDN...';
    if (status === 'saving') return '2/2: Writing to Database...';
    return 'Create Product';
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Inventory</h2>
      
      {errorMessage && <div className={styles.errorBanner}>{errorMessage}</div>}
      {status === 'success' && <div className={styles.successBanner}>Product successfully written to database and CDN.</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.mediaUploadContainer}>
          <label className={styles.label}>Product Image (Max 5MB)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            disabled={status === 'uploading' || status === 'saving'} 
            className={styles.fileInput}
          />
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className={styles.imagePreview} />
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