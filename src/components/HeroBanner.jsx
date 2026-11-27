export default function HeroBanner() {
  return (
    <section 
      id="hero" 
      data-reveal
      className="relative flex items-center justify-center min-h-[500px] text-white overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/cover.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="bg-green-600/50 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest border border-white/20">
          Welcome to Ricofeery
        </span>
        <h1 className="text-5xl md:text-6xl font-bold mt-6 mb-8 leading-tight">
          Kopi Hangat, Suasana Nyaman di Ricofeery
        </h1>
        <div className="flex justify-center gap-4">
          <button className="bg-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition">
            Pesan Sekarang
          </button>
          <a href="#tentang" className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-900 transition">
            Tentang Kami
          </a>
        </div>
      </div>
    </section>
  );
}
