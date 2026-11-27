import { Link } from "react-router-dom";

const PHONE_NUMBER = "6285211068550";
const INSTAGRAM_URL = "https://www.instagram.com/_.birujingga/#";

export default function ContactFooter() {
  const isOpen = new Date().getHours() >= 8 && new Date().getHours() < 22;

  return (
    <footer id="kontak" className="bg-[#3e2723] px-6 py-10 text-white md:px-10">
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <div className="mb-2 text-2xl font-bold">Ricofeery</div>
          <p className="mb-3 text-sm text-stone-300">
            Kedai kopi sederhana dengan suasana hangat untuk menemani harimu.
          </p>
          <span
            className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium text-white ${
              isOpen ? "bg-emerald-700" : "bg-rose-700"
            }`}
          >
            {isOpen ? "Buka sekarang (08.00 - 22.00)" : "Tutup (buka 08.00)"}
          </span>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-stone-200">
            Sosial Media &amp; Hubungi Kami
          </h2>
          <p className="mb-4 text-sm text-stone-300">
            Kunjungi profil Instagram kami atau terhubung langsung melalui WhatsApp.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="https://www.instagram.com/_.birujingga/#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Instagram
            </a>
            <a
              href={`https://wa.me/${PHONE_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-500"
            >
              WhatsApp
            </a>
            <Link
              to="/pengaduan"
              className="flex items-center justify-center gap-2 rounded bg-amber-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-amber-600"
            >
              Chat Pengaduan
            </Link>
          </div>
        </div>

        <div className="space-y-1 text-sm text-stone-300 md:text-right">
          <p className="mb-2 text-base font-bold text-white">Lokasi &amp; Kontak</p>
          <p>Jl. LA Jepang</p>
          <p>
            Email:{" "}
            <a href="mailto:halo@ricofeer.id" className="underline hover:text-white">
              halo@ricofeer.id
            </a>
          </p>
          <p>
            Telp / WA:{" "}
            <a
              href={`https://wa.me/${PHONE_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white"
            >
              0852-1106-8550
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-[#4e342e] pt-6 text-center text-xs text-stone-400">
        &copy; {new Date().getFullYear()} Ricofeery. Seluruh hak cipta
        dilindungi.
      </div>
    </footer>
  );
}
