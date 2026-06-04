export default function PageHeader({ title, breadcrumb }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-[#180161]">{title}</h1>

        <div className="mt-2 flex items-center gap-2 text-sm font-medium">
          <span className="text-gray-500">Dashboard</span>

          <span className="text-gray-400">/</span>

          <span className="font-semibold text-[#EB3678]">{breadcrumb}</span>
        </div>
      </div>

      <select
        className="
          glass-input
          rounded-2xl
          px-5
          py-3
          text-sm
          font-semibold
          text-[#180161]
          shadow-sm
          outline-none
          transition
          focus:border-[#4F1787]/50
          focus:ring-4
          focus:ring-[#4F1787]/10
        "
      >
        <option>12 Mei 2026</option>
        <option>Mei 2026</option>
        <option>April 2026</option>
      </select>
    </div>
  );
}
