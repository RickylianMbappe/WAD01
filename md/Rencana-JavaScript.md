# Analisis & Rencana Implementasi JavaScript - Kopi Ricky

Laporan ini merangkum rencana penambahan JavaScript pada website Kopi Ricky untuk mengubah halaman statis menjadi interaktif.

## 1. Ringkasan Proyek
Website Kopi Ricky saat ini menggunakan HTML dan Tailwind CSS (CDN). Penambahan JavaScript bertujuan untuk:
- Menghapus ketergantungan pada markup manual berulang.
- Menambahkan interaksi (smooth scroll, mobile menu, sticky header).
- Mengimplementasikan fitur fungsional (keranjang belanja, validasi form, integrasi WhatsApp).

## 2. Struktur Folder yang Disarankan
```
Pertemuan 1/
├── index.html
├── coffe-img/
├── css/
│   └── style.css
└── js/ (atau sv/)
    ├── app.js          <-- Entry point
    ├── data.js         // Data menu & sejarah
    ├── navigation.js   // Navigasi & scroll
    ├── menu.js         // Render & filter menu
    ├── cart.js         // Logika keranjang
    ├── form.js         // Validasi & WhatsApp
    └── utils.js        // Fungsi bantuan (format, debounce, toast)
```

## 3. Modul Utama & Fungsi
### A. Navigasi
- `initSmoothScroll()`: Gulir halus ke section.
- `initActiveNav()`: Menandai link aktif menggunakan `IntersectionObserver`.
- `initMobileMenu()`: Toggle menu hamburger pada layar kecil.
- `initStickyHeader()`: Membuat header lengket saat scroll.

### B. Menu Berbasis Data
- `renderMenu()`: Merender kartu menu dari array data.
- `formatRupiah()`: Memformat angka ke mata uang IDR.
- `filterMenu()` & `cariMenu()`: Fitur pencarian dan penyaringan menu.

### C. Keranjang & Pemesanan
- `tambahKeKeranjang()`: Menyimpan pesanan ke `localStorage`.
- `renderKeranjang()`: Menampilkan daftar belanja.
- `checkoutWhatsApp()`: Mengirim detail pesanan ke WhatsApp.

### D. Form & Validasi
- `validasiNama()`, `validasiEmail()`, dll: Memastikan input pengguna benar.
- `handleSubmit()`: Menangani pengiriman form dan mencegah reload halaman.

## 4. Prioritas Implementasi
1. **Dasar**: Smooth scroll, active nav, sticky header.
2. **Konten**: Render menu dari data, format harga, pencarian.
3. **Transaksi**: Keranjang belanja & checkout WhatsApp.
4. **Form**: Validasi input & kirim pesan.
5. **Polesan**: Animasi reveal, toast, dark mode.
