import { useState } from 'react';
import apiClient from '../../utils/axiosInstance';
import Navbar from '../../components/Layout/Navbar/Navbar';
import Footer from '../../components/Layout/Footer/Footer';
import styles from './About.module.css';

export default function About() {
  // Restored State and Form Logic
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | loading | success | error

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      await apiClient.post('/inquiries', {
        source: 'about_page_custom_project',
        status: 'new_custom_project',
        customerName: formData.name,
        customerEmail: formData.email,
        message: formData.message
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className={styles.splitLayout}>
          
          <section className={styles.textContent}>
            <h1>Our Heritage</h1>
            <p className={styles.paragraph}>
              The story of Aristhos Woodcraft begins in Saharanpur, India, a city with a 400-year legacy of 
              woodcarving. Our workshop is not a factory; it is a sanctuary for an art form that predates modern 
              machinery.
            </p>
            <p className={styles.paragraph}>
              Each piece we create utilizes solid blocks of A-grade Teak and Rosewood. From intricate latticework 
              to structural joinery, our artisans execute techniques passed down through generations. We believe 
              in creating heirloom pieces that carry the weight of history and the precision of modern durability.
            </p>
          </section>

          <section className={styles.formSection}>
            <div className={styles.formCard}>
              <h2>Start Your Custom Project</h2>
              
              {submitStatus === 'success' ? (
                <div className={styles.successMessage}>
                  Your inquiry has been received. Our master artisans will review your request and contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="message">Project Details</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      required 
                      value={formData.message}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  
                  {submitStatus === 'error' && (
                    <div className={styles.errorMessage}>Submission failed. Please try again later.</div>
                  )}

                  <button 
                    type="submit" 
                    disabled={submitStatus === 'loading'}
                    style={{ width: '100%', marginTop: '1rem' }}
                  >
                    {submitStatus === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}