import { useState } from 'react';
import apiClient from '../../utils/axiosInstance';
import Navbar from '../../components/Layout/Navbar/Navbar';
import Footer from '../../components/Layout/Footer/Footer';
import styles from './About.module.css';

const INITIAL_FORM_STATE = { name: '', email: '', message: '' };

export default function About() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      await apiClient.post('/inquiries/custom-project', {
      customerName: formData.name,
      customerEmail: formData.email,
      message: formData.message,
      });
      
      setSubmitStatus('success');
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      console.error('Inquiry submission failed:', error);
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
                    <div className={styles.errorMessage}>
                      Submission failed. Please try again later.
                    </div>
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