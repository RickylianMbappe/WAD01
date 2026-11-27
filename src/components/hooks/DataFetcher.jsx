import { useEffect, useState } from "react";

export default function DataFetcher() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Permintaan gagal (${response.status})`);
        }
        return response.json();
      })
      .then(setUsers)
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          console.error("Gagal memuat data pelanggan:", fetchError);
          setError("Data pelanggan tidak dapat dimuat saat ini.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="rounded-xl border border-[#e0d4cc] bg-white p-6 shadow-md">
      <h3 className="mb-2 text-lg font-bold text-[#4e342e]">
        3. Daftar Pelanggan VIP (useEffect)
      </h3>
      <p className="mb-4 text-sm text-slate-600">
        Mengambil data pelanggan secara otomatis dari API eksternal.
      </p>
      {loading ? (
        <p className="animate-pulse text-sm font-medium text-[#4e342e]">
          Memuat data pelanggan...
        </p>
      ) : error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-lg border border-[#e0d4cc] bg-[#faf6f3] p-3 text-sm"
            >
              <p className="font-bold text-[#4e342e]">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
