import { Link } from "react-router-dom";

export default function ArticleOne() {
  return (
    <div className="min-h-screen bg-[#faf6f3] py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#e6d5cb]">
        <Link to="/" className="text-sm font-semibold text-[#8d5b4c] hover:underline mb-6 inline-block">
          &larr; Kembali ke Beranda
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider bg-[#f5ede6] text-[#8d5b4c] px-3 py-1 rounded-full">
          News & Launch
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2d1810] mt-4 mb-4">
          Peluncuran Menu Spesial Ridonut & Seasonal Coffee
        </h1>
        <p className="text-sm text-gray-500 mb-8">November 2026 • Tim Redaksi Ricofeery</p>
        
        <div className="space-y-6 text-[#4a3b32] leading-relaxed">
          <p>
            Ricofeery kembali menghadirkan inovasi kuliner yang memanjakan lidah para pecinta kopi nusantara. Kali ini, kami dengan bangga memperkenalkan kolaborasi eksklusif antara donut lembut buatan tangan, <strong>Ridonut</strong>, dan racikan <strong>Seasonal Coffee</strong> khas Ricofeery.
          </p>
          <h3 className="text-xl font-bold text-[#2d1810] mt-6 mb-2">Perpaduan Sempurna</h3>
          <p>
            Ridonut dibuat dengan resep rahasia yang menghasilkan tekstur sangat empuk di dalam dan lapisan manis yang pas. Ketika dinikmati bersama tegukan pertama es kopi signature kami, tercipta harmoni rasa manis dan pahit kopi yang membangkitkan semangat.
          </p>
          <p>
            Menu spesial ini tersedia di seluruh cabang Ricofeery mulai bulan November 2026. Jangan sampai ketinggalan untuk mencobanya bersama kerabat terdekat Anda!
          </p>
        </div>
      </div>
    </div>
  );
}
