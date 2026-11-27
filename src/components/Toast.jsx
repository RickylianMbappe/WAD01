export default function Toast({ message, type = "success" }) {
  if (!message) return null;

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-lg px-5 py-3 text-sm text-white shadow-lg ${
        type === "error" ? "bg-red-600" : "bg-[#4e342e]"
      }`}
    >
      {message}
    </div>
  );
}
