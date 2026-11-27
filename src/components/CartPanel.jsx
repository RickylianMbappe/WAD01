import { useState } from "react";
import { menuItems } from "../data/menuItems.js";
import { formatRupiah } from "../utils/formatCurrency.js";

export default function CartPanel({
  isOpen,
  cart,
  total,
  onClose,
  onAdd,
  onRemoveOne,
  onRemoveItem,
  onCheckout,
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", orderType: "dine-in", tableNumber: "" });

  const resetFlow = () => {
    setStep(1);
    setFormData({ name: "", phone: "", address: "" });
    onClose();
  };

  const handleNext = () => setStep((s) => s + 1);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Tutup keranjang"
          onClick={resetFlow}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
        />
      )}
      <aside
        role="dialog"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col justify-between bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#e0d4cc] bg-[#4e342e] px-6 py-4 text-white">
          <h2 className="text-lg font-bold">
            {step === 1 ? "Pesanan Anda" : step === 2 ? "Detail Pemesan" : step === 3 ? "Metode Pembayaran" : "Pesanan Berhasil"}
          </h2>
          <button type="button" onClick={resetFlow} className="p-1">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 1 && (
            <div className="space-y-4">
              {cart.length === 0 ? <p className="text-center">Keranjang kosong.</p> : cart.map(({ id, qty }) => {
                const item = menuItems.find((m) => m.id === id);
                return (
                  <div key={id} className="flex justify-between items-center border-b pb-2">
                    <p className="text-sm font-bold">{item.name} x{qty}</p>
                    <div className="flex gap-2">
                      <button onClick={() => onRemoveOne(id)} className="bg-gray-100 px-2">-</button>
                      <span>{qty}</span>
                      <button onClick={() => onAdd(id)} className="bg-gray-100 px-2">+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Tipe Pesanan:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="orderType" checked={formData.orderType === "dine-in"} onChange={() => setFormData({...formData, orderType: "dine-in"})} /> Dine-In
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="orderType" checked={formData.orderType === "takeaway"} onChange={() => setFormData({...formData, orderType: "takeaway"})} /> Takeaway
                  </label>
                </div>
              </div>
              <input placeholder="Nama Pemesan" className="w-full border p-2 rounded" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input placeholder="No. WhatsApp" className="w-full border p-2 rounded" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              {formData.orderType === "dine-in" ? (
                <input placeholder="Nomor Meja" className="w-full border p-2 rounded" onChange={(e) => setFormData({...formData, tableNumber: e.target.value})} />
              ) : (
                <textarea placeholder="Alamat Pengiriman" className="w-full border p-2 rounded" onChange={(e) => setFormData({...formData, address: e.target.value})} />
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <label className="block border p-3 rounded cursor-pointer hover:bg-gray-50"><input type="radio" name="pay" className="mr-2" /> QRIS / E-Wallet</label>
              <label className="block border p-3 rounded cursor-pointer hover:bg-gray-50"><input type="radio" name="pay" className="mr-2" /> Transfer Bank</label>
              <label className="block border p-3 rounded cursor-pointer hover:bg-gray-50"><input type="radio" name="pay" className="mr-2" /> Cash on Delivery (COD)</label>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-10 space-y-4">
              <div className="text-6xl text-green-500">✓</div>
              <h3 className="font-bold text-xl">Order Diterima!</h3>
              <p className="text-sm text-gray-600">Pesanan anda telah masuk ke sistem. Tim kami akan segera menghubungi anda.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-[#e0d4cc] bg-[#faf6f3]">
          {step < 3 && <button onClick={handleNext} className="w-full py-3 bg-[#4e342e] text-white font-bold rounded-lg hover:bg-[#3e2723]">Lanjut</button>}
          {step === 3 && <button onClick={() => { onCheckout(formData); handleNext(); }} className="w-full py-3 bg-green-500 text-white font-bold rounded-lg">Konfirmasi Pembayaran</button>}
          {step === 4 && <button onClick={resetFlow} className="w-full py-3 border font-bold rounded-lg">Tutup</button>}
        </div>
      </aside>
    </>
  );
}
