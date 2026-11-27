const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, limit = 200) {
  let terakhir = 0;
  return (...args) => {
    const sekarang = Date.now();
    if (sekarang - terakhir >= limit) {
      terakhir = sekarang;
      fn(...args);
    }
  };
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function simpanData(kunci, nilai) {
  try {
    localStorage.setItem(kunci, JSON.stringify(nilai));
  } catch (e) {
    console.warn("Gagal menyimpan data:", e);
  }
}

function ambilData(kunci, fallback = null) {
  try {
    const raw = localStorage.getItem(kunci);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function tampilkanToast(pesan, tipe = "sukses") {
  const toast = document.createElement("div");
  toast.textContent = pesan;
  toast.className =
    "fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] rounded-lg px-5 py-3 " +
    "text-white text-sm shadow-lg transition-opacity duration-300 " +
    (tipe === "error" ? "bg-red-600" : "bg-[#4e342e]");

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
