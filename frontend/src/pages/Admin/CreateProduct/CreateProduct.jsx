import { useState, useEffect } from 'react';
import apiClient from '../../../utils/axiosInstance';
import styles from './CreateProduct.module.css';

export default function CreateProduct() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Living Room',
    inStock: true
  });
  
  // Media State
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  // Transaction State
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

  // Production Guard: Prevent memory leaks from dangling blob URLs
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
    
    // Revoke old URL before creating a new one to free memory
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
    let uploadedImageUrl = '';

    try {
      // PHASE 1: Stream to Cloudinary using your configured apiClient
      setStatus('uploading');
      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      // apiClient automatically handles the base URL and withCredentials
      const uploadResponse = await apiClient.post('/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      uploadedImageUrl = uploadResponse.data.imageUrl;

      // PHASE 2: Save to MongoDB
      setStatus('saving');
      const productPayload = {
        ...formData,
        price: Number(formData.price),
        imageUrl: uploadedImageUrl
      };

      await apiClient.post('/products', productPayload);

      setStatus('success');
      
      // Reset form
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', price: '', description: '', category: 'Living Room', inStock: true });
        setImageFile(null);
        setPreviewUrl('');
      }, 3000);

    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Transaction failed.';
      setErrorMessage(`Error: ${message}`);
      setStatus('error');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Inventory</h2>
      
      {errorMessage && <div className={styles.errorBanner}>{errorMessage}</div>}
      {status === 'success' && <div className={styles.successBanner}>Product successfully written to database and CDN.</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* Phase 1 Input: Media */}
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

        {/* Phase 2 Inputs: Metadata */}
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
          {status === 'idle' || status === 'error' ? 'Create Product' : 
           status === 'uploading' ? '1/2: Uploading Image to CDN...' : 
           '2/2: Writing to Database...'}
        </button>
      </form>
    </div>
  );
}