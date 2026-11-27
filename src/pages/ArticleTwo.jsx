import { Link } from "react-router-dom";

export default function ArticleTwo() {
  return (
    <div className="min-h-screen bg-[#faf6f3] py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#e6d5cb]">
        <Link to="/" className="text-sm font-semibold text-[#8d5b4c] hover:underline mb-6 inline-block">
          &larr; Kembali ke Beranda
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider bg-[#f5ede6] text-[#8d5b4c] px-3 py-1 rounded-full">
          Collaboration
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2d1810] mt-4 mb-4">
          Ricofeery x Local Artisans & Farmers
        </h1>
        <p className="text-sm text-gray-500 mb-8">Special Partnership • Kemitraan Petani Lokal</p>
        
        <div className="space-y-6 text-[#4a3b32] leading-relaxed">
          <p>
            Di balik setiap cangkir kopi Ricofeery, terdapat dedikasi luar biasa dari para petani lokal di berbagai pelosok Nusantara. Melalui program <strong>Ricofeery x Local Artisans & Farmers</strong>, kami memperkuat komitmen untuk memberdayakan petani lokal secara langsung.
          </p>
          <h3 className="text-xl font-bold text-[#2d1810] mt-6 mb-2">Transparansi & Kualitas</h3>
          <p>
            Kami bekerja sama langsung dengan kelompok petani kopi di dataran tinggi untuk memastikan setiap biji kopi dipetik pada tingkat kematangan optimal dan diproses dengan standar kualitas tertinggi.
          </p>
          <p>
            Langkah kolaboratif ini tidak hanya menjamin cita rasa kopi yang otentik bagi pelanggan setia kami, tetapi juga memastikan kesejahteraan yang adil bagi para pahlawan di balik layar: para petani kopi Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}
