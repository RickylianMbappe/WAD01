import { Link } from "react-router-dom";

export default function ArticleThree() {
  return (
    <div className="min-h-screen bg-[#faf6f3] py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#e6d5cb]">
        <Link to="/" className="text-sm font-semibold text-[#8d5b4c] hover:underline mb-6 inline-block">
          &larr; Kembali ke Beranda
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider bg-[#f5ede6] text-[#8d5b4c] px-3 py-1 rounded-full">
          Promo
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2d1810] mt-4 mb-4">
          Diskon 50% Pembelian Pertama via App
        </h1>
        <p className="text-sm text-gray-500 mb-8">Promo Eksklusif • Tim Membership Ricofeery</p>
        
        <div className="space-y-6 text-[#4a3b32] leading-relaxed">
          <p>
            Nikmati kemudahan memesan kopi favorit Anda sekaligus hemat lebih banyak! Ricofeery mempersembahkan promo spesial berupa <strong>Diskon 50% untuk Pembelian Pertama</strong> khusus melalui aplikasi seluler kami.
          </p>
          <h3 className="text-xl font-bold text-[#2d1810] mt-6 mb-2">Cara Mendapatkan Voucher</h3>
          <p>
            1. Download aplikasi Ricofeery di App Store atau Google Play Store.<br/>
            2. Buat akun baru menggunakan nomor WhatsApp atau email Anda.<br/>
            3. Voucher diskon 50% akan otomatis masuk ke dalam dompet digital akun Anda dan dapat langsung digunakan untuk transaksi pertama.
          </p>
          <p>
            Jangan lewatkan kesempatan emas ini untuk menikmati secangkir Kopi Susu atau Caramel Macchiato dengan harga spesial. Segera unduh aplikasinya sekarang!
          </p>
        </div>
      </div>
    </div>
  );
}
