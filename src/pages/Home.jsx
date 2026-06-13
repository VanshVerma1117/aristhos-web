import Navbar from "../Components/Navbar";
import HomeHero from "../Components/Features/Home/HomeHero";
import OurCollections from "../Components/Features/Home/OurCollections";
import Craftsmanship from "../Components/Features/Home/Craftsmanship";
import SignaturePieces from "../Components/Features/Home/SignaturePieces";
import Feedback from "../Components/Features/Home/Feedback";
import CTA from "../Components/Features/Home/Cta";
import Footer from "../Components/Features/Home/Footer";

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