const milestones = [
  {
    year: "2018",
    title: "Berawal dari Gerobak Kecil",
    description:
      "Ricky mulai menjual kopi susu dari sebuah gerobak sederhana, dengan biji kopi pilihan dari petani lokal.",
  },
  {
    year: "2020",
    title: "Membuka Kedai Pertama",
    description:
      "Setelah dikenal pelanggan setia, Ricofeery membuka kedai pertama di Jl. LA Jepang dengan suasana yang hangat dan nyaman.",
  },
  {
    year: "2024",
    title: "Menu dari Berbagai Daerah",
    description:
      "Menu diperluas dengan kopi dari berbagai daerah di Indonesia, tanpa meninggalkan kesederhanaan yang menjadi ciri kami.",
  },
];

export default function HistorySection() {
  return (
    <section id="sejarah" data-reveal className="relative px-6 py-24 md:px-12 text-white overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/about-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#4e342e]/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-center">Sejarah Kami</h2>
        <p className="text-white/95 text-center leading-relaxed mb-12">
          Perjalanan Ricofeery dari sebuah gerobak kecil hingga menjadi kedai yang hangat dan inspiratif.
        </p>

        <ol className="max-w-2xl mx-auto list-none border-l-2 border-white/30 pl-8">
          {milestones.map(({ year, title, description }, index) => (
            <li
              key={year}
              className={`relative ${index < milestones.length - 1 ? "pb-12" : ""}`}
            >
              <span
                aria-hidden="true"
                className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-[#4e342e] bg-white"
              />
              <p className="font-bold text-green-300 text-lg">{year}</p>
              <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
              <p className="text-white/90 leading-relaxed">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
