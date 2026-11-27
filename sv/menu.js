function buatKartuMenu(item) {
  return `
    <article class="rounded-lg border border-[#d7ccc8] bg-white p-5 shadow-sm transition-all hover:shadow-md" data-reveal>
      <img src="${item.gambar}" alt="${item.nama}" loading="lazy"
           class="mb-3 h-40 w-full rounded-md object-cover" />
      <h3 class="mb-1 text-lg font-bold text-[#4e342e]">${escapeHtml(item.nama)}</h3>
      <p class="text-sm text-[#5d4037]">${escapeHtml(item.deskripsi)}</p>
      <p class="mt-3 text-lg font-bold text-[#4e342e]">${formatRupiah(item.harga)}</p>
      <button class="btn-tambah mt-3 w-full rounded-md bg-[#4e342e] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#3e2723]"
              data-id="${item.id}">+ Tambah</button>
    </article>`;
}

function renderMenu(list = dataMenu) {
  const grid = document.getElementById("grid-menu");
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `<p class="col-span-full py-8 text-center text-gray-500">Menu tidak ditemukan.</p>`;
    return;
  }
  grid.innerHTML = list.map(buatKartuMenu).join("");
  
  // Re-init animation for new elements
  if (typeof initRevealOnScroll === 'function') initRevealOnScroll();
}

function cariMenu(keyword) {
  const q = keyword.toLowerCase().trim();
  const hasil = dataMenu.filter((m) =>
    m.nama.toLowerCase().includes(q) ||
    m.deskripsi.toLowerCase().includes(q)
  );
  renderMenu(hasil);
}

function initFilterMenu() {
  const input = document.getElementById("cari-menu");
  if (input) {
    input.addEventListener("input", debounce((e) => cariMenu(e.target.value), 300));
  }
}
