import { useMemo, useState } from "react";
import { menuItems } from "../data/menuItems.js";
import { formatRupiah } from "../utils/formatCurrency.js";

export default function MenuSection({ onAddToCart }) {
  const [search, setSearch] = useState("");
  const filteredItems = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id-ID");
    if (!query) return menuItems;

    return menuItems.filter(
      (item) =>
        item.name.toLocaleLowerCase("id-ID").includes(query) ||
        item.description.toLocaleLowerCase("id-ID").includes(query),
    );
  }, [search]);

  return (
    <section
      id="menu"
      data-reveal
      className="bg-[#f5ede6] px-6 py-16 md:px-12"
    >
      {/* Menu Header Banner */}
      <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#231b17]">
        <img 
          src="/images/menu-cover.png" 
          alt="Ricofeery Menu Collection" 
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold text-[#4e342e]">Menu Pilihan Ricofeery</h2>
          <p className="text-[#5d4037]">
            Temukan sajian kopi dingin terbaik untuk menemani harimu.
          </p>
        </div>
        <label className="w-full md:w-80">
          <span className="sr-only">Cari menu kopi</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="🔍 Cari menu favoritmu..."
            className="w-full rounded-full border border-[#d7ccc8] bg-white px-5 py-3 text-sm text-[#333] shadow-inner outline-none focus:border-[#4e342e] focus:ring-1 focus:ring-[#4e342e]"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length === 0 ? (
          <p className="col-span-full py-8 text-center text-gray-500">
            Menu tidak ditemukan.
          </p>
        ) : (
          filteredItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#e6d5cb] bg-white/90 backdrop-blur-md p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="mb-3 h-40 w-full rounded-md object-cover"
              />
              <h3 className="mb-1 text-lg font-bold text-[#4e342e]">
                {item.name}
              </h3>
              <p className="text-sm text-[#5d4037]">{item.description}</p>
              <p className="mt-3 text-lg font-bold text-[#4e342e]">
                {formatRupiah(item.price)}
              </p>
              <button
                type="button"
                onClick={() => onAddToCart(item)}
                className="mt-3 w-full rounded-md bg-[#4e342e] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#3e2723]"
              >
                + Tambah
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
