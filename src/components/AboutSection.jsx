export default function AboutSection() {
  return (
    <section
      id="tentang"
      data-reveal
      className="relative bg-gradient-to-b from-[#f5ede6] to-[#e8d8cd] px-6 py-28 md:px-12 text-[#3b261e] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#4e342e_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] bg-[#d7ccc8]/50 text-[#5d4037] px-5 py-2 rounded-full border border-[#c5b5af]">
          Our Philosophy & Story
        </span>
        <h2 className="mt-8 mb-6 text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#2d1810]">
          Menyulam Rasa, Merajut Makna
        </h2>
        <div className="space-y-6 text-lg md:text-xl text-[#4a3b32] font-light leading-relaxed max-w-3xl mx-auto font-sans">
          <p>
            Di setiap tetes seduhan Ricofeery, terukir perjalanan panjang dari biji kopi pilihan yang dirawat dengan ketulusan. Kami percaya bahwa secangkir kopi lebih dari sekadar minuman; ia adalah sebuah medium perenungan, jembatan kehangatan, dan ruang di mana waktu sejenak berhenti.
          </p>
          <p>
            Bagai filosofi pohon yang menghunjam bumi dan dahan yang menggapai langit, Ricofeery hadir untuk menumbuhkan harmoni antara cita rasa nusantara yang otentik dan ketenangan jiwa di setiap tegukan Anda.
          </p>
        </div>
      </div>
    </section>
  );
}
