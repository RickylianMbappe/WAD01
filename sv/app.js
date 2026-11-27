function initJamBuka() {
  const el = document.getElementById("status-buka");
  if (!el) return;
  const jam = new Date().getHours();
  const buka = jam >= 8 && jam < 22;
  el.textContent = buka ? "Buka sekarang (08.00 - 22.00)" : "Tutup (buka 08.00)";
  el.className = buka
    ? "inline-block text-xs px-2.5 py-1 rounded-full bg-emerald-700 text-white font-medium"
    : "inline-block text-xs px-2.5 py-1 rounded-full bg-rose-700 text-white font-medium";
}

function initTahunFooter() {
  const el = document.getElementById("tahun");
  if (el) el.textContent = new Date().getFullYear();
}

function initRevealOnScroll() {
  const elemen = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    elemen.forEach((el) => el.classList.remove("opacity-0"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("opacity-0", "translate-y-6");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  elemen.forEach((el) => {
    el.classList.add("opacity-0", "translate-y-6", "transition-all", "duration-700");
    observer.observe(el);
  });
}

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", throttle(() => {
    btn.classList.toggle("hidden", window.scrollY < 400);
  }, 200), { passive: true });
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }));
}

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initActiveNav();
  initMobileMenu();
  initStickyHeader();
  renderMenu();
  initFilterMenu();
  initKeranjang();
  initFormKontak();
  initRevealOnScroll();
  initBackToTop();
  initJamBuka();
  initTahunFooter();
});
