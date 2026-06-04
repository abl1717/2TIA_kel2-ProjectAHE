export default function PageHeader({ title, breadcrumb }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-[#180161]">{title}</h1>

        <div className="mt-2 flex items-center gap-2 text-sm font-medium">
          <span className="text-gray-400">Pengajar</span>
          <span className="text-gray-300">/</span>
          <span className="text-[#EB3678]">{breadcrumb}</span>
        </div>
      </div>
    </div>
  );
}
