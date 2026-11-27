import { useEffect, useState } from "react";

const sections = [
  { id: "tentang", label: "Tentang" },
  { id: "sejarah", label: "Sejarah" },
  { id: "menu", label: "Menu" },
  { id: "news", label: "News" },
  { id: "testimoni", label: "Testimoni" },
  { id: "kontak", label: "Kontak" },
];

export default function Header({ cartCount, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    window.location.hash.slice(1) || "tentang",
  );

  useEffect(() => {
    const targets = document.querySelectorAll("main section[id], footer[id]");
    if (!("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-[#4e342e] px-6 py-4 text-white transition-shadow md:px-10">
      <a
        href="#tentang"
        onClick={closeMenu}
        className="text-2xl font-bold tracking-tight text-white no-underline"
      >
        Ricofeery
      </a>

      <nav
        id="nav-menu"
        aria-label="Navigasi utama"
        className={`${mobileMenuOpen ? "block" : "hidden"} absolute left-0 top-full w-full bg-[#4e342e] px-6 pb-4 md:static md:block md:w-auto md:bg-transparent md:p-0`}
      >
        <ul className="flex list-none flex-col gap-3 text-sm font-medium md:flex-row md:gap-6">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={closeMenu}
                aria-current={activeSection === id ? "location" : undefined}
                className={`text-white no-underline transition-opacity hover:opacity-80 ${
                  activeSection === id ? "font-bold underline" : ""
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`Keranjang Belanja, ${cartCount} item`}
          className="relative flex items-center gap-2 rounded-lg bg-[#3e2723] px-3.5 py-2 text-sm font-semibold text-white shadow transition-transform hover:scale-105"
        >
          <span aria-hidden="true">🛒</span>
          <span className="hidden sm:inline">Pesanan</span>
          {cartCount > 0 && (
            <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white shadow-sm">
              {cartCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="nav-menu"
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          className="rounded-lg bg-[#3e2723] p-2 text-white hover:bg-[#2e1c18] md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
