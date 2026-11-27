import HeroBanner from "../components/HeroBanner.jsx";
import AboutSection from "../components/AboutSection.jsx";
import HistorySection from "../components/HistorySection.jsx";
import MenuSection from "../components/MenuSection.jsx";
import NewsSection from "../components/NewsSection.jsx";
import TestimonialSection from "../components/TestimonialSection.jsx";

export default function HomePage({ onAddToCart }) {
  return (
    <div>
      <HeroBanner />
      <AboutSection />
      <HistorySection />
      <MenuSection onAddToCart={onAddToCart} />
      <NewsSection />
      <TestimonialSection />
    </div>
  );
}
