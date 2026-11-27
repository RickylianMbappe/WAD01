import MenuSection from "../components/MenuSection.jsx";
export default function MenuPage({ onAddToCart }) {
  return (
    <div className="pt-8">
      <MenuSection onAddToCart={onAddToCart} />
    </div>
  );
}
