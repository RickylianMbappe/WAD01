import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ComplaintPage() {
  const [step, setStep] = useState("form"); // "form" | "tracking"
  const [formData, setFormData] = useState({
    nama: "",
    kontak: "",
    kategori: "Kualitas Makanan & Minuman",
    orderId: "",
    pesan: "",
  });
  const [errors, setErrors] = useState({});
  const [ticketNumber, setTicketNumber] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [ticketStatus, setTicketStatus] = useState("Sedang Diverifikasi Tim");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const errs = {};
    if (!formData.nama.trim()) errs.nama = "Nama wajib diisi.";
    if (!formData.kontak.trim()) errs.kontak = "Nomor WhatsApp wajib diisi.";
    if (!formData.pesan.trim() || formData.pesan.trim().length < 10)
      errs.pesan = "Detail pengaduan minimal 10 karakter.";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const generatedTicket = `#CMP-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketNumber(generatedTicket);
    setStep("tracking");

    setMessages([
      {
        sender: "system",
        text: `Tiket aduan ${generatedTicket} berhasil dibuat. Tim Support Ricofeery akan segera merespons kendala Anda.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      {
        sender: "admin",
        text: `Halo Kak ${formData.nama} 👋. Terima kasih telah menghubungi layanan pengaduan Ricofeery. Laporan terkait "${formData.kategori}" telah kami terima dan sedang ditinjau oleh tim operasional kami.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }

  function handleSendMessage(e) {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      sender: "user",
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    // Simulate Admin reply after 1 second
    setTimeout(() => {
      let replyText = "Baik Kak, catatan tambahan Anda telah kami teruskan ke supervisor terkait. Mohon menunggu sebentar ya.";
      if (messages.length === 2) {
        setTicketStatus("Dalam Investigasi Lapangan");
        replyText = "Tim kami sedang memeriksa hal tersebut dengan bagian dapur/kasir. Kami pastikan segera memberikan solusi terbaik.";
      } else if (messages.length >= 4) {
        setTicketStatus("Selesai & Solusi Diberikan");
        replyText = "Terima kasih atas konfirmasinya Kak. Semoga kendala ini terselesaikan dengan baik. Selamat menikmati hari bersama Ricofeery!";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "admin",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1000);
  }

  function resetComplaint() {
    setStep("form");
    setFormData({
      nama: "",
      kontak: "",
      kategori: "Kualitas Makanan & Minuman",
      orderId: "",
      pesan: "",
    });
    setErrors({});
    setTicketNumber("");
    setMessages([]);
    setTicketStatus("Sedang Diverifikasi Tim");
  }

  return (
    <div className="min-h-screen bg-[#faf6f3] px-6 py-12 text-[#333] md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb / Back */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4e342e] hover:underline"
          >
            &larr; Kembali ke Beranda
          </Link>
          <span className="rounded-full bg-[#4e342e] px-3 py-1 text-xs font-bold text-white">
            Pusat Bantuan &amp; Pengaduan Respon Cepat
          </span>
        </div>

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#4e342e] md:text-4xl">
            Layanan Chat Pengaduan Pelanggan
          </h1>
          <p className="mt-2 text-stone-600">
            Alur pengaduan transparan mulai dari pembuatan tiket, peninjauan tim, hingga penyelesaian masalah.
          </p>
        </div>

        {/* Step 1: Form Pengaduan */}
        {step === "form" && (
          <div className="rounded-2xl bg-white p-6 shadow-xl border border-stone-200 md:p-8">
            <h2 className="mb-6 text-xl font-bold text-[#4e342e] border-b pb-3">
              Formulir Pengaduan Kendala
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama Anda"
                    className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#4e342e] focus:ring-1 focus:ring-[#4e342e]"
                  />
                  {errors.nama && (
                    <p className="mt-1 text-xs text-rose-500">{errors.nama}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                    Nomor WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="kontak"
                    value={formData.kontak}
                    onChange={handleChange}
                    placeholder="Contoh: 0852xxxxxxxx"
                    className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#4e342e] focus:ring-1 focus:ring-[#4e342e]"
                  />
                  {errors.kontak && (
                    <p className="mt-1 text-xs text-rose-500">{errors.kontak}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                    Kategori Kendala <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#4e342e] focus:ring-1 focus:ring-[#4e342e]"
                  >
                    <option value="Kualitas Makanan & Minuman">
                      Kualitas Makanan &amp; Minuman
                    </option>
                    <option value="Pelayanan & Staff Kedai">
                      Pelayanan &amp; Staff Kedai
                    </option>
                    <option value="Takeaway & Waktu Tunggu">
                      Takeaway &amp; Waktu Tunggu
                    </option>
                    <option value="Transaksi & Pembayaran">
                      Transaksi &amp; Pembayaran
                    </option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                    Nomor Pesanan / Struk (Opsional)
                  </label>
                  <input
                    type="text"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    placeholder="Contoh: #ORD-10293"
                    className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#4e342e] focus:ring-1 focus:ring-[#4e342e]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                  Detail Pengaduan / Pesan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="pesan"
                  rows="4"
                  value={formData.pesan}
                  onChange={handleChange}
                  placeholder="Ceritakan kendala atau masukan Anda secara jelas (minimal 10 karakter)..."
                  className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#4e342e] focus:ring-1 focus:ring-[#4e342e]"
                />
                {errors.pesan && (
                  <p className="mt-1 text-xs text-rose-500">{errors.pesan}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#4e342e] py-3.5 text-sm font-bold text-white shadow transition-colors hover:bg-[#3e2723]"
                >
                  Kirim Pengaduan &amp; Mulai Chat
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2 & 3: Tracking & Live Chat Flow */}
        {step === "tracking" && (
          <div className="space-y-6">
            {/* Status & Ticket Info Card */}
            <div className="rounded-2xl bg-white p-6 shadow-xl border border-stone-200">
              <div className="flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Nomor Tiket Anda
                  </span>
                  <div className="text-2xl font-bold text-[#4e342e]">
                    {ticketNumber}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-stone-600">Status:</span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                    {ticketStatus}
                  </span>
                </div>
              </div>

              {/* Timeline Alur Aduan */}
              <div className="mt-6">
                <h3 className="mb-4 text-sm font-bold text-stone-700">
                  Alur Penyelesaian Aduan
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-emerald-50 p-3 border border-emerald-200 text-center">
                    <div className="text-xs font-bold text-emerald-700">Tahap 1</div>
                    <div className="mt-1 text-xs font-semibold text-emerald-900">
                      Tiket Dibuat
                    </div>
                  </div>
                  <div className={`rounded-lg p-3 text-center border ${ticketStatus.includes("Diverifikasi") ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-emerald-50 border-emerald-200 text-emerald-900"}`}>
                    <div className="text-xs font-bold">Tahap 2</div>
                    <div className="mt-1 text-xs font-semibold">
                      Ditinjau Tim
                    </div>
                  </div>
                  <div className={`rounded-lg p-3 text-center border ${ticketStatus.includes("Investigasi") ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-stone-50 border-stone-200 text-stone-500"}`}>
                    <div className="text-xs font-bold">Tahap 3</div>
                    <div className="mt-1 text-xs font-semibold">
                      Investigasi &amp; Solusi
                    </div>
                  </div>
                  <div className={`rounded-lg p-3 text-center border ${ticketStatus.includes("Selesai") ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-stone-50 border-stone-200 text-stone-500"}`}>
                    <div className="text-xs font-bold">Tahap 4</div>
                    <div className="mt-1 text-xs font-semibold">Selesai</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Chat Simulator Box */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl border border-stone-200">
              <div className="bg-[#4e342e] px-6 py-4 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Live Chat Customer Support</h3>
                  <p className="text-xs text-stone-300">
                    Terhubung dengan Admin Ricofeery • {formData.nama}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetComplaint}
                  className="rounded bg-stone-700 px-3 py-1.5 text-xs font-medium text-stone-200 hover:bg-stone-600"
                >
                  Buat Aduan Baru
                </button>
              </div>

              {/* Message List */}
              <div className="h-80 overflow-y-auto p-6 space-y-4 bg-stone-50">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-md rounded-2xl px-4 py-3 text-sm shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#4e342e] text-white rounded-br-none"
                          : msg.sender === "system"
                          ? "bg-amber-100 text-amber-900 border border-amber-200 mx-auto text-center w-full"
                          : "bg-white text-stone-800 border border-stone-200 rounded-bl-none"
                      }`}
                    >
                      {msg.sender !== "system" && (
                        <div className="mb-1 text-[10px] font-bold opacity-75">
                          {msg.sender === "user" ? "Anda" : "Admin Ricofeery"}
                        </div>
                      )}
                      <p>{msg.text}</p>
                      <div
                        className={`mt-1 text-[10px] ${
                          msg.sender === "user"
                            ? "text-stone-300 text-right"
                            : "text-stone-400 text-right"
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-3 border-t bg-white p-4"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ketik pesan atau balasan untuk admin..."
                  className="flex-1 rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#4e342e]"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#4e342e] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#3e2723]"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
