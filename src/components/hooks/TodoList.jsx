import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  function addTodo(event) {
    event.preventDefault();
    const todo = input.trim();
    if (!todo) return;
    setTodos((currentTodos) => [...currentTodos, todo]);
    setInput("");
  }

  return (
    <div className="rounded-xl border border-[#e0d4cc] bg-white p-6 shadow-md">
      <h3 className="mb-2 text-lg font-bold text-[#4e342e]">
        2. Catatan Pesanan Khusus (useState &amp; Array)
      </h3>
      <p className="mb-4 text-sm text-slate-600">
        Mengelola catatan pesanan kedai menggunakan array state.
      </p>
      <form onSubmit={addTodo} className="mb-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Catatan baru (misal: Less sugar)..."
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#4e342e]"
        />
        <button
          type="submit"
          className="rounded-lg bg-[#4e342e] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#3e2723]"
        >
          Tambah
        </button>
      </form>
      <ul className="space-y-2">
        {todos.length === 0 ? (
          <li className="text-sm italic text-slate-400">
            Belum ada catatan pesanan.
          </li>
        ) : (
          todos.map((todo, index) => (
            <li
              key={`${todo}-${index}`}
              className="flex items-center justify-between rounded-lg border border-[#e0d4cc] bg-[#faf6f3] px-4 py-2.5 text-sm"
            >
              <span className="text-slate-700">{todo}</span>
              <button
                type="button"
                onClick={() =>
                  setTodos((currentTodos) =>
                    currentTodos.filter((_, todoIndex) => todoIndex !== index),
                  )
                }
                className="text-xs font-semibold text-red-500 hover:text-red-700"
              >
                Hapus
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
