export default function PageHeader({ title, breadcrumb }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-[#240a29]">{title}</h1>

        <div className="mt-2 flex items-center gap-2 text-sm font-medium">
          <span className="text-gray-500">Pengajar</span>

          <span className="text-gray-400">/</span>

          <span className="font-semibold text-[#cf30a2]">{breadcrumb}</span>
        </div>
      </div>

      <div className="pengajar-glass-input hidden rounded-2xl px-5 py-3 text-sm font-semibold text-[#240a29] md:block">
        SmartAHE Pengajar
      </div>
    </div>
  );
}
