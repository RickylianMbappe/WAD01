# Resume Syntax Utama JavaScript

Ringkasan fitur JavaScript modern yang digunakan dalam proyek website Kopi Ricky.

## 1. Deklarasi Variabel (`const` & `let`)
- **`const`**: Untuk nilai tetap (konstanta), seperti elemen DOM atau kunci localStorage.
- **`let`**: Untuk nilai yang dapat berubah, seperti total harga atau status menu.
- *Contoh*: `const KUNCI = "data"; let total = 0;`

## 2. Fungsi Panah (Arrow Function)
- Cara ringkas menulis fungsi.
- *Contoh*: `const format = (n) => n.toLocaleString();`
- Digunakan untuk callback event dan manipulasi array.

## 3. Template Literals (Backticks)
- Menggabungkan string dan variabel menggunakan `${}`.
- *Contoh*: `console.log(`Halo ${nama}`);`
- Digunakan untuk merender HTML secara dinamis.

## 4. Metode Array (`map`, `filter`, `reduce`)
- **`map()`**: Mengubah setiap item (misal: data -> kartu HTML).
- **`filter()`**: Menyaring data (misal: kategori kopi saja).
- **`reduce()`**: Menghitung total dari daftar (misal: total harga keranjang).

## 5. DOM Manipulation (`querySelector`)
- Mencari elemen HTML untuk diubah atau dipasang event listener.
- *Contoh*: `const btn = document.querySelector("#submit");`

## 6. Event Handling (`addEventListener`)
- Merespons aksi pengguna seperti klik, ketik, atau gulir.
- `e.preventDefault()`: Mencegah aksi bawaan browser (misal: reload form).

## 7. Storage & JSON (`localStorage`)
- Menyimpan data di browser agar tidak hilang saat refresh.
- `JSON.stringify()`: Objek -> Teks.
- `JSON.parse()`: Teks -> Objek.
