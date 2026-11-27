export default function TestimonialSection() {
  const testimonials = [
    { name: "Albert Kurniawan", role: "Key Account Manager", quote: "Integrasi ekosistem digital Ricofeery sangat memudahkan Genz & Millenials menikmati kopi favorit." },
    { name: "Samanda Tondang", role: "Coffee Enthusiast", quote: "Pelayanannya luar biasa, cepat, dan rasa kopinya konsisten enak di setiap cabang." },
    { name: "Devi Alfilovita", role: "Partner Brand Manager", quote: "Kolaborasi menu seasonal-nya juara banget! Tim Ricofeery profesional & kreatif." }
  ];

  return (
    <section id="testimonials" className="py-16 px-6 bg-[#f8fafc]" data-reveal>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0f2e22] mb-10 text-center">Kolaborasi & Testimoni</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition hover:shadow-lg">
              <p className="italic text-gray-700 mb-6 leading-relaxed">"{t.quote}"</p>
              <h4 className="font-bold text-gray-900">— {t.name}</h4>
              <span className="text-sm text-gray-500">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
