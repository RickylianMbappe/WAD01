const KUNCI_KERANJANG = "ricofeer:keranjang";
let keranjang = ambilData(KUNCI_KERANJANG, []);

function simpanKeranjang() {
  simpanData(KUNCI_KERANJANG, keranjang);
  renderKeranjang();
  updateBadge();
}

function tambahKeKeranjang(id) {
  const item = keranjang.find((k) => k.id === id);
  if (item) {
    item.qty += 1;
  } else {
    keranjang.push({ id, qty: 1 });
  }
  simpanKeranjang();
  const menu = dataMenu.find((m) => m.id === id);
  if (menu) {
    tampilkanToast(`${menu.nama} ditambahkan ke pesanan`);
  }
}

function kurangiItem(id) {
  const item = keranjang.find((k) => k.id === id);
  if (!item) return;
  item.qty -= 1;
  if (item.qty <= 0) {
    hapusItem(id);
  } else {
    simpanKeranjang();
  }
}

function hapusItem(id) {
  keranjang = keranjang.filter((k) => k.id !== id);
  simpanKeranjang();
}

function hitungTotal() {
  return keranjang.reduce((total, k) => {
    const menu = dataMenu.find((m) => m.id === k.id);
    return total + (menu ? menu.harga * k.qty : 0);
  }, 0);
}

function jumlahItem() {
  return keranjang.reduce((n, k) => n + k.qty, 0);
}

function updateBadge() {
  const badge = document.getElementById("badge-keranjang");
  if (!badge) return;
  const total = jumlahItem();
  badge.textContent = total;
  badge.classList.toggle("hidden", total === 0);
}

function renderKeranjang() {
  const wadah = document.getElementById("isi-keranjang");
  if (!wadah) return;

  if (keranjang.length === 0) {
    wadah.innerHTML = `<p class="py-12 text-center text-sm text-gray-500">Keranjang masih kosong.</p>`;
  } else {
    wadah.innerHTML = keranjang.map((k) => {
      const menu = dataMenu.find((m) => m.id === k.id);
      if (!menu) return "";
      return `
        <div class="flex items-center justify-between border-b border-[#e0d4cc] py-3">
          <div class="flex-1 pr-2">
            <h4 class="font-bold text-[#4e342e] text-sm">${escapeHtml(menu.nama)}</h4>
            <p class="text-xs text-gray-600">${formatRupiah(menu.harga)} x ${k.qty}</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn-kurang rounded bg-[#e0d4cc] px-2 py-1 text-xs font-bold text-[#4e342e] hover:bg-[#d7ccc8]" data-id="${menu.id}">-</button>
            <span class="text-xs font-semibold w-4 text-center">${k.qty}</span>
            <button class="btn-tambah-cart rounded bg-[#e0d4cc] px-2 py-1 text-xs font-bold text-[#4e342e] hover:bg-[#d7ccc8]" data-id="${menu.id}">+</button>
            <button class="btn-hapus ml-2 text-[10px] text-red-600 hover:underline" data-id="${menu.id}">Hapus</button>
          </div>
        </div>`;
    }).join("");
  }

  const totalEl = document.getElementById("total-belanja");
  if (totalEl) totalEl.textContent = formatRupiah(hitungTotal());
}

function checkoutWhatsApp() {
  if (keranjang.length === 0) {
    tampilkanToast("Keranjang masih kosong.", "error");
    return;
  }

  const baris = keranjang.map((k, i) => {
    const m = dataMenu.find((x) => x.id === k.id);
    return `${i + 1}. ${m.nama} x${k.qty} — ${formatRupiah(m.harga * k.qty)}`;
  });

  const pesan = [
    "Halo Ricofeer 👋",
    "Saya ingin memesan:",
    "",
    ...baris,
    "",
    `Total: ${formatRupiah(hitungTotal())}`,
  ].join("\n");

  const nomor = "6285211068550";
  window.open(`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`, "_blank");
}

function initKeranjang() {
  const grid = document.getElementById("grid-menu");
  if (grid) {
    grid.addEventListener("click", (e) => {
      const tombol = e.target.closest(".btn-tambah");
      if (!tombol) return;
      tambahKeKeranjang(Number(tombol.dataset.id));
    });
  }

  const panelWadah = document.getElementById("isi-keranjang");
  if (panelWadah) {
    panelWadah.addEventListener("click", (e) => {
      const btnKurang = e.target.closest(".btn-kurang");
      const btnTambah = e.target.closest(".btn-tambah-cart");
      const btnHapus = e.target.closest(".btn-hapus");

      if (btnKurang) kurangiItem(Number(btnKurang.dataset.id));
      if (btnTambah) tambahKeKeranjang(Number(btnTambah.dataset.id));
      if (btnHapus) hapusItem(Number(btnHapus.dataset.id));
    });
  }

  const btnCartToggle = document.getElementById("keranjang-btn");
  const panelKeranjang = document.getElementById("panel-keranjang");
  const btnTutup = document.getElementById("tutup-keranjang");
  const overlay = document.getElementById("cart-overlay");

  if (btnCartToggle && panelKeranjang && overlay) {
    btnCartToggle.addEventListener("click", () => {
      panelKeranjang.classList.remove("translate-x-full");
      overlay.classList.remove("hidden");
    });
  }

  const tutupHandler = () => {
    if (panelKeranjang && overlay) {
      panelKeranjang.classList.add("translate-x-full");
      overlay.classList.add("hidden");
    }
  };

  if (btnTutup) btnTutup.addEventListener("click", tutupHandler);
  if (overlay) overlay.addEventListener("click", tutupHandler);

  const btnCheckout = document.getElementById("checkout-btn");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", checkoutWhatsApp);
  }

  renderKeranjang();
  updateBadge();
}
