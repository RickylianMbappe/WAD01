import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../data/menuItems.js";
import { formatRupiah } from "../utils/formatCurrency.js";

export default function CheckoutModal({ isOpen, cart, total, onClose, onAdd, onRemoveOne, onRemoveItem }) {
  const [mode, setMode] = useState("dine-in"); // "dine-in" or "takeaway"
  const [step, setStep] = useState(1); // 1: cart, 2: details, 3: payment, 4: success
  const [formData, setFormData] = useState({ name: "", phone: "", tableNumber: "", address: "", paymentMethod: "QRIS" });

  if (!isOpen) return null;

  const resetAll = () => {
    setStep(1);
    setMode("dine-in");
    setFormData({ name: "", phone: "", tableNumber: "", address: "", paymentMethod: "QRIS" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#e6d5cb] animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-[#4e342e] text-white px-8 py-6 flex justify-between items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d7ccc8]">Ricofeery Transaction</span>
            <h2 className="text-2xl font-serif font-bold">
              {step === 1 && "Keranjang & Tipe Pesanan"}
              {step === 2 && (mode === "dine-in" ? "Transaksi Dine-In (Makan di Tempat)" : "Transaksi Takeaway")}
              {step === 3 && "Pembayaran"}
              {step === 4 && "Pesanan Berhasil"}
            </h2>
          </div>
          <button onClick={resetAll} className="text-white hover:bg-[#3e2723] p-2 rounded-full text-lg">✕</button>
        </div>

        {/* Body Content */}
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex bg-[#f5ede6] p-1.5 rounded-2xl">
                <button
                  onClick={() => setMode("dine-in")}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm transition ${mode === "dine-in" ? "bg-[#4e342e] text-white shadow" : "text-[#4e342e]"}`}
                >
                  🍽️ Dine-In (Makan di Tempat)
                </button>
                <button
                  onClick={() => setMode("takeaway")}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm transition ${mode === "takeaway" ? "bg-[#4e342e] text-white shadow" : "text-[#4e342e]"}`}
                >
                  🛍️ Takeaway / Delivery
                </button>
              </div>

              <div>
                <h3 className="font-bold text-[#4e342e] mb-4">Daftar Pesanan:</h3>
                {cart.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">Keranjang masih kosong.</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map(({ id, qty }) => {
                      const item = menuItems.find((m) => m.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between items-center bg-[#faf6f3] p-4 rounded-2xl border border-[#e6d5cb]">
                          <div>
                            <h4 className="font-bold text-[#4e342e]">{item.name}</h4>
                            <p className="text-xs text-gray-600">{formatRupiah(item.price)} x {qty}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={() => onRemoveOne(id)} className="w-8 h-8 rounded-lg bg-white border border-[#d7ccc8] font-bold">-</button>
                            <span className="font-semibold">{qty}</span>
                            <button onClick={() => onAdd(id)} className="w-8 h-8 rounded-lg bg-white border border-[#d7ccc8] font-bold">+</button>
                            <button onClick={() => onRemoveItem(id)} className="text-red-600 text-xs ml-2 hover:underline">Hapus</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="flex justify-between items-center pt-4 border-t border-[#e6d5cb]">
                  <span className="font-medium text-gray-700">Total Pembayaran:</span>
                  <span className="text-2xl font-serif font-bold text-[#4e342e]">{formatRupiah(total)}</span>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-[#f5ede6] p-4 rounded-2xl mb-4 text-sm text-[#4e342e]">
                Mode Terpilih: <strong className="uppercase">{mode === "dine-in" ? "Dine-In (Makan di Tempat)" : "Takeaway / Delivery"}</strong>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#4e342e] mb-1">Nama Pemesan</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama Anda" 
                  className="w-full border border-[#d7ccc8] rounded-xl p-3 focus:outline-none focus:border-[#4e342e]" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#4e342e] mb-1">Nomor WhatsApp</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 08123456789" 
                  className={`w-full border border-[#d7ccc8] rounded-xl p-3 focus:outline-none focus:border-[#4e342e] ${formData.phone && !formData.phone.startsWith('08') ? 'border-red-500' : ''}`} 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                {formData.phone && !formData.phone.startsWith('08') && (
                  <p className="text-red-500 text-xs mt-1">Nomor harus diawali dengan 08</p>
                )}
              </div>
              {mode === "dine-in" ? (
                <div>
                  <label className="block text-sm font-semibold text-[#4e342e] mb-1">Nomor Meja</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Meja 05" 
                    className="w-full border border-[#d7ccc8] rounded-xl p-3 focus:outline-none focus:border-[#4e342e]" 
                    value={formData.tableNumber}
                    onChange={(e) => setFormData({...formData, tableNumber: e.target.value})}
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-[#4e342e] mb-1">Alamat Pengambilan / Pengiriman</label>
                  <textarea 
                    placeholder="Masukkan alamat lengkap" 
                    className="w-full border border-[#d7ccc8] rounded-xl p-3 focus:outline-none focus:border-[#4e342e]" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-bold text-[#4e342e] mb-2">Pilih Metode Pembayaran:</h3>
              {["QRIS / E-Wallet (Instant)", "Transfer Bank (BCA / Mandiri)", mode === "dine-in" ? "Bayar di Kasir (Cash)" : "Cash on Delivery (COD)"].map((method) => (
                <label key={method} className={`flex items-center justify-between border p-4 rounded-2xl cursor-pointer transition ${formData.paymentMethod === method ? "border-[#4e342e] bg-[#f5ede6]" : "border-[#d7ccc8]"}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === method}
                      onChange={() => setFormData({...formData, paymentMethod: method})}
                    />
                    <span className="font-semibold text-[#4e342e]">{method}</span>
                  </div>
                  <span className="text-xs text-gray-500">Aman & Terverifikasi</span>
                </label>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 font-bold">✓</div>
              <h3 className="text-2xl font-serif font-bold text-[#4e342e]">Transaksi Berhasil!</h3>
              <p className="text-[#6d5b52] max-w-md mx-auto">
                Terima kasih <strong>{formData.name}</strong>. Pesanan {mode === "dine-in" ? `untuk Meja ${formData.tableNumber}` : "Takeaway"} Anda sedang diproses oleh barista kami.
              </p>
              <div className="bg-[#faf6f3] p-4 rounded-2xl border border-[#e6d5cb] text-left max-w-sm mx-auto text-sm space-y-1">
                <p><strong>Total:</strong> {formatRupiah(total)}</p>
                <p><strong>Metode:</strong> {formData.paymentMethod}</p>
                <p><strong>Tipe:</strong> {mode.toUpperCase()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#faf6f3] px-8 py-5 border-t border-[#e6d5cb] flex justify-between items-center">
          {step > 1 && step < 4 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl border border-[#d7ccc8] font-semibold text-[#4e342e] hover:bg-gray-100 transition"
            >
              Kembali
            </button>
          )}
          {step === 1 && <div />}

          {step < 3 && cart.length > 0 && (
            <button 
              onClick={() => {
                if (step === 2 && (!formData.phone || !formData.phone.startsWith("08"))) {
                  alert("Nomor WhatsApp harus diawali dengan 08!");
                  return;
                }
                setStep(step + 1);
              }}
              className="px-8 py-3 rounded-xl bg-[#4e342e] text-white font-bold hover:bg-[#3e2723] transition ml-auto"
            >
              Lanjutkan &rarr;
            </button>
          )}

          {step === 3 && (
            <button 
              onClick={() => setStep(4)}
              className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition ml-auto"
            >
              Konfirmasi & Bayar Sekarang
            </button>
          )}

          {step === 4 && (
            <button 
              onClick={resetAll}
              className="w-full py-3 rounded-xl bg-[#4e342e] text-white font-bold hover:bg-[#3e2723] transition text-center"
            >
              Selesai & Tutup
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
