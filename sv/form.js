const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const POLA_TELEPON = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;

function validasiNama(nilai) {
  if (nilai.trim().length < 3) return "Nama minimal 3 karakter.";
  if (nilai.trim().length > 50) return "Nama maksimal 50 karakter.";
  return "";
}

function validasiEmail(nilai) {
  if (!nilai.trim()) return "Email wajib diisi.";
  return POLA_EMAIL.test(nilai) ? "" : "Format email tidak valid.";
}

function validasiTelepon(nilai) {
  if (!nilai.trim()) return "Nomor telepon wajib diisi.";
  return POLA_TELEPON.test(nilai.replace(/[\s-]/g, ""))
    ? ""
    : "Gunakan format 08xx atau +628xx.";
}

function validasiPesan(nilai) {
  if (nilai.trim().length < 10) return "Pesan minimal 10 karakter.";
  return "";
}

function tampilkanError(id, pesan) {
  const el = document.getElementById(`error-${id}`);
  const input = document.getElementById(id);
  if (el) el.textContent = pesan;
  if (input) {
    input.classList.toggle("border-red-500", Boolean(pesan));
    input.setAttribute("aria-invalid", pesan ? "true" : "false");
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());

  const error = {
    nama: validasiNama(data.nama || ""),
    email: validasiEmail(data.email || ""),
    telepon: validasiTelepon(data.telepon || ""),
    pesan: validasiPesan(data.pesan || ""),
  };

  Object.entries(error).forEach(([key, pesan]) => tampilkanError(key, pesan));

  if (Object.values(error).some(Boolean)) {
    tampilkanToast("Periksa kembali data yang belum benar.", "error");
    return;
  }

  kirimKeWhatsApp(data);
  form.reset();
  tampilkanToast("Pesan siap dikirim melalui WhatsApp.");
}

function kirimKeWhatsApp(data) {
  const nomor = "6285211068550";
  const teks = [
    "Halo Ricofeer 👋",
    "",
    `Nama   : ${data.nama}`,
    `Email  : ${data.email}`,
    `Telepon: ${data.telepon}`,
    "",
    `Pesan  : ${data.pesan}`,
  ].join("\n");

  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(teks)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function initFormKontak() {
  const form = document.getElementById("form-kontak");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
}
