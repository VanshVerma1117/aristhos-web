import Navbar from "../components/Navbar";
import HomeHero from "../components/Features/Home/HomeHero";
import OurCollections from "../components/Features/Home/OurCollections";
import Craftsmanship from "../components/Features/Home/Craftsmanship";
import SignaturePieces from "../components/Features/Home/SignaturePieces";
import Feedback from "../components/Features/Home/Feedback";
import CTA from "../components/Features/Home/Cta";
import Footer from "../components/Features/Home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHero />
      {/* 2. Main content container holds all your structured layout blocks perfectly */}
      <main className="main_content">
        <OurCollections />
        <Craftsmanship />
        <SignaturePieces />
        <Feedback />
      </main>
      <CTA />
      <Footer />
    </>
  );
}