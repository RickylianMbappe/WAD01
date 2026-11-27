import Counter from "./hooks/Counter.jsx";
import TodoList from "./hooks/TodoList.jsx";
import DataFetcher from "./hooks/DataFetcher.jsx";

export default function ReactHooksSection() {
  return (
    <section id="react-hooks" className="bg-[#faf6f3] px-6 py-[60px] md:px-10">
      <div className="mx-auto mb-6 max-w-4xl">
        <h2 className="mb-2 text-2xl font-bold text-[#4e342e]">
          Eksplorasi React Hooks (useState &amp; useEffect)
        </h2>
        <p className="text-sm text-[#5d4037]">
          Komponen interaktif React yang terintegrasi di web Ricofeery.
        </p>
      </div>
      <div className="mx-auto max-w-4xl space-y-6">
        <Counter />
        <TodoList />
        <DataFetcher />
      </div>
    </section>
  );
}
