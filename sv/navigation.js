function scrollKe(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  const header = document.querySelector("header");
  const tinggiHeader = header ? header.offsetHeight : 72;
  const posisi = target.getBoundingClientRect().top + window.scrollY - tinggiHeader - 8;

  window.scrollTo({ top: posisi, behavior: "smooth" });
}

function initSmoothScroll() {
  document.querySelectorAll('nav a[href^="#"], footer a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href");
      if (id === "#") return;
      scrollKe(id);
      history.replaceState(null, "", id);
      closeMenu();
    });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll("main section, footer[id]");
  const links = document.querySelectorAll('nav a[href^="#"]');

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const aktif = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("underline", aktif);
        link.classList.toggle("font-bold", aktif);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach((s) => observer.observe(s));
}

function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  const btn = document.getElementById("menu-toggle");
  if (!nav || !btn) return;
  const terbuka = nav.classList.toggle("hidden");
  btn.setAttribute("aria-expanded", String(!terbuka));
}

function closeMenu() {
  const nav = document.getElementById("nav-menu");
  const btn = document.getElementById("menu-toggle");
  if (nav && btn) {
    nav.classList.add("hidden");
    btn.setAttribute("aria-expanded", "false");
  }
}

function initMobileMenu() {
  const btn = document.getElementById("menu-toggle");
  if (btn) {
    btn.addEventListener("click", toggleMenu);
  }
}

function initStickyHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  const handler = () => {
    const lewat = window.scrollY > 20;
    header.classList.toggle("shadow-xl", lewat);
  };
  window.addEventListener("scroll", handler, { passive: true });
  handler();
}
