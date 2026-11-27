import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-xl border border-[#e0d4cc] bg-white p-6 shadow-md">
      <h3 className="mb-2 text-lg font-bold text-[#4e342e]">
        1. Counter Pesanan (useState)
      </h3>
      <p className="mb-4 text-sm text-slate-600">
        Menggunakan <code>useState</code> untuk menghitung jumlah pesanan.
      </p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setCount((value) => value - 1)}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          - Kurang
        </button>
        <span className="min-w-10 text-center text-2xl font-bold text-[#4e342e]">
          {count}
        </span>
        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          + Tambah
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="rounded-lg bg-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
