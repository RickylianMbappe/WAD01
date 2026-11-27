import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { menuItems } from "../data/menuItems.js";
import { formatRupiah } from "../utils/formatCurrency.js";

export default function DineInPage({ cart, onAdd, onRemoveOne, onRemoveItem }) {
  const [formData, setFormData] = useState({ name: "", phone: "", tableNumber: "", paymentMethod: "QRIS" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    const found = menuItems.find((m) => m.id === item.id);
    return sum + (found ? found.price * item.qty : 0);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone.startsWith("08")) {
      alert("Nomor WhatsApp harus diawali dengan 08!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#faf6f3] py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#e6d5cb]">
        <Link to="/" className="text-sm font-semibold text-[#8d5b4c] hover:underline mb-6 inline-block">
          &larr; Kembali ke Beranda
        </Link>
        <h1 className="text-3xl font-serif font-bold text-[#2d1810] mb-2">🍽️ Halaman Transaksi Dine-In</h1>
        <p className="text-sm text-gray-600 mb-8">Pemesanan khusus makan di tempat (Dine-In).</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-bold text-[#2d1810] mb-3">Ringkasan Pesanan</h3>
              {cart.length === 0 ? (
                <p className="text-sm text-gray-500">Keranjang masih kosong. <Link to="/menu" className="text-[#8d5b4c] underline">Pilih menu</Link></p>
              ) : (
                <div className="space-y-2 mb-6">
                  {cart.map(({ id, qty }) => {
                    const item = menuItems.find((m) => m.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex justify-between items-center bg-[#faf6f3] p-3 rounded-xl border border-[#e6d5cb]">
                        <span className="text-sm font-semibold text-[#4e342e]">{item.name} x{qty}</span>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => onRemoveOne(id)} className="px-2 bg-white border">-</button>
                          <span>{qty}</span>
                          <button type="button" onClick={() => onAdd(id)} className="px-2 bg-white border">+</button>
                          <span className="text-sm font-bold ml-2">{formatRupiah(item.price * qty)}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-between font-bold text-lg pt-4 border-t">
                    <span>Total:</span>
                    <span className="text-[#4e342e]">{formatRupiah(total)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-[#2d1810]">Informasi Meja & Pemesan</h3>
              <input 
                type="text" 
                required
                placeholder="Nama Pemesan" 
                className="w-full border border-[#d7ccc8] rounded-xl p-3" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="text" 
                required
                placeholder="Nomor WhatsApp (Diawali 08)" 
                className={`w-full border rounded-xl p-3 ${formData.phone && !formData.phone.startsWith("08") ? "border-red-500" : "border-[#d7ccc8]"}`} 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <input 
                type="text" 
                required
                placeholder="Nomor Meja (Contoh: Meja 05)" 
                className="w-full border border-[#d7ccc8] rounded-xl p-3" 
                value={formData.tableNumber}
                onChange={(e) => setFormData({...formData, tableNumber: e.target.value})}
              />
            </div>

            <div>
              <h3 className="font-bold text-[#2d1810] mb-3">Metode Pembayaran</h3>
              <div className="space-y-2">
                {["QRIS / E-Wallet", "Bayar di Kasir (Cash)"].map((method) => (
                  <label key={method} className="flex items-center gap-3 border p-3 rounded-xl cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === method}
                      onChange={() => setFormData({...formData, paymentMethod: method})}
                    />
                    <span className="font-semibold">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {cart.length > 0 && (
              <button type="submit" className="w-full py-4 bg-[#4e342e] text-white font-bold rounded-xl hover:bg-[#3e2723] transition">
                Konfirmasi Pesanan Dine-In
              </button>
            )}
          </form>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto font-bold">✓</div>
            <h2 className="text-2xl font-bold text-[#2d1810]">Pesanan Dine-In Berhasil!</h2>
            <p className="text-gray-600">Terima kasih <strong>{formData.name}</strong>. Pesanan untuk <strong>Meja {formData.tableNumber}</strong> sedang disiapkan oleh barista.</p>
            <button onClick={() => navigate("/")} className="px-6 py-3 bg-[#4e342e] text-white font-bold rounded-xl">Kembali ke Beranda</button>
          </div>
        )}
      </div>
    </div>
  );
}
