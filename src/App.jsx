import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackToTop from "./components/BackToTop.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import ContactFooter from "./components/ContactFooter.jsx";
import Header from "./components/Header.jsx";
import Toast from "./components/Toast.jsx";
import HomePage from "./pages/HomePage.jsx";
import ArticleOne from "./pages/ArticleOne.jsx";
import ArticleTwo from "./pages/ArticleTwo.jsx";
import ArticleThree from "./pages/ArticleThree.jsx";
import DineInPage from "./pages/DineInPage.jsx";
import TakeawayPage from "./pages/TakeawayPage.jsx";
import ComplaintPage from "./pages/ComplaintPage.jsx";
import { menuItems } from "./data/menuItems.js";
import { useCart } from "./hooks/useCart.js";
import { formatRupiah } from "./utils/formatCurrency.js";

const PHONE_NUMBER = "6285211068550";

export default function App() {
  const { cart, count, total, addItem, removeOne, removeItem } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const toastTimer = useRef(null);

  useEffect(
    () => () => {
      window.clearTimeout(toastTimer.current);
    },
    [],
  );

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("opacity-0", "translate-y-6");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((element) => {
      element.classList.add(
        "opacity-0",
        "translate-y-6",
        "transition-all",
        "duration-700",
      );
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  function showToast(message, type = "success") {
    window.clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = window.setTimeout(
      () => setToast({ message: "", type: "success" }),
      2500,
    );
  }

  function addMenuItem(item) {
    addItem(item.id);
    showToast(`${item.name} ditambahkan ke pesanan`);
  }

  function checkout() {
    if (cart.length === 0) {
      showToast("Keranjang masih kosong.", "error");
      return;
    }

    const orderLines = cart.map((cartItem, index) => {
      const item = menuItems.find(({ id }) => id === cartItem.id);
      return `${index + 1}. ${item.name} x${cartItem.qty} — ${formatRupiah(
        item.price * cartItem.qty,
      )}`;
    });
    const text = [
      "Halo Ricofeery 👋",
      "Saya ingin memesan:",
      "",
      ...orderLines,
      "",
      `Total: ${formatRupiah(total)}`,
    ].join("\n");

    window.open(
      `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#faf6f3] font-[Arial,sans-serif] leading-relaxed text-[#333]">
        <Header cartCount={count} onOpenCart={() => setCartOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={addMenuItem} />} />
            <Route path="/news/1" element={<ArticleOne />} />
            <Route path="/news/2" element={<ArticleTwo />} />
            <Route path="/news/3" element={<ArticleThree />} />
            <Route path="/dine-in" element={<DineInPage cart={cart} onAdd={addItem} onRemoveOne={removeOne} onRemoveItem={removeItem} />} />
            <Route path="/takeaway" element={<TakeawayPage cart={cart} onAdd={addItem} onRemoveOne={removeOne} onRemoveItem={removeItem} />} />
            <Route path="/pengaduan" element={<ComplaintPage />} />
          </Routes>
        </main>
        <ContactFooter onToast={showToast} />
        <CheckoutModal
          isOpen={cartOpen}
          cart={cart}
          total={total}
          onClose={() => setCartOpen(false)}
          onAdd={addItem}
          onRemoveOne={removeOne}
          onRemoveItem={removeItem}
        />
        <BackToTop />
        <Toast message={toast.message} type={toast.type} />
      </div>
    </BrowserRouter>
  );
}
