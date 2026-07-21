import Navbar from '../../components/Layout/Navbar/Navbar';
import Footer from '../../components/Layout/Footer/Footer';
import styles from './Heritage.module.css';

export default function Heritage() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.mainContent}>
        <header className={styles.heroSection}>
          <h1 className={styles.title}>Our Heritage</h1>
          <p className={styles.subtitle}>Decades of architectural woodworking and generational artistry.</p>
        </header>

        <article className={styles.timeline}>
          <section className={styles.eraBlock}>
            <div className={styles.meta}>
              <span className={styles.year}>1998</span>
            </div>
            <div className={styles.story}>
              <h3 className={styles.eraTitle}>The Foundation of Excellence</h3>
              <p className={styles.text}>
                Aristhos Woodcraft began as a singular master workshop dedicated to traditional joinery methods. 
                Rejecting modern computerized automation, we prioritized manual carving techniques that preserve 
                the structural integrity and natural grain movement of premium local lumber.
              </p>
            </div>
          </section>

          <section className={styles.eraBlock}>
            <div className={styles.meta}>
              <span className={styles.year}>2012</span>
            </div>
            <div className={styles.story}>
              <h3 className={styles.eraTitle}>Architectural Commissions</h3>
              <p className={styles.text}>
                Expanding from luxury residential furniture into expansive architectural scale installations. 
                Our team secured commissions for heritage restoration properties, replicating historic designs 
                with absolute historical accuracy and museum-grade finishes.
              </p>
            </div>
          </section>

          <section className={styles.eraBlock}>
            <div className={styles.meta}>
              <span className={styles.year}>Present</span>
            </div>
            <div className={styles.story}>
              <h3 className={styles.eraTitle}>Modern Bespoke Engineering</h3>
              <p className={styles.text}>
                Today, we merge ancient structural engineering—such as complex mortise and tenon joinery—with 
                modern stabilization techniques to build custom wood installations engineered to last for generations.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}