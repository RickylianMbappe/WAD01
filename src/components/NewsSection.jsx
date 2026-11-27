import { Link } from "react-router-dom";

export default function NewsSection() {
  const newsList = [
    {
      id: 1,
      category: "News & Launch",
      date: "November 2026",
      title: "Peluncuran Menu Spesial Ridonut & Seasonal Coffee",
      desc: "Nikmati pengalaman baru menikmati donut lembut berpadu dengan es kopi signature Ricofeery."
    },
    {
      id: 2,
      category: "Collaboration",
      date: "Special Partnership",
      title: "Ricofeery x Local Artisans & Farmers",
      desc: "Kolaborasi eksklusif bersama petani kopi lokal pilihan untuk menghadirkan biji kopi single origin berkualitas tinggi."
    },
    {
      id: 3,
      category: "Promo",
      date: "Promo Eksklusif",
      title: "Diskon 50% Pembelian Pertama via App",
      desc: "Download aplikasi sekarang dan dapatkan voucher potongan harga langsung untuk menu favoritmu."
    }
  ];

  return (
    <section id="news" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#f5ede6] to-[#eae0d5]" data-reveal>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] bg-[#e6d5cb] text-[#5d4037] px-4 py-2 rounded-full border border-[#d7ccc8]">
            Updates & Partnerships
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-bold text-[#2d1810]">
            Ricofeery News & Collaboration
          </h2>
          <p className="mt-2 text-[#6d5b52] max-w-xl mx-auto">
            Kabar terbaru, kolaborasi inspiratif, dan penawaran spesial dari dunia Ricofeery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsList.map((item) => (
            <div 
              key={item.id} 
              className="bg-white/80 backdrop-blur-md border border-[#e6d5cb] p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider bg-[#f5ede6] text-[#8d5b4c] px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-[#8c7a72] font-medium">{item.date}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2d1810] mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[#6d5b52] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f0e6e0]">
                <Link 
                  to={`/news/${item.id}`} 
                  className="text-xs font-semibold text-[#8d5b4c] hover:text-[#4e342e] inline-flex items-center gap-1 transition"
                >
                  Baca Selengkapnya &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
