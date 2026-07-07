export default function Pagination({
  currentPage,
  lastPage,
  totalData,
  perPage,
  onPageChange,
}) {
  const firstData = totalData === 0 ? 0 : (currentPage - 1) * perPage + 1;

  const lastData = Math.min(currentPage * perPage, totalData);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-white/40 px-6 py-5 md:flex-row">
      <p className="text-sm text-gray-500">
        Menampilkan{" "}
        <span className="font-semibold text-[#180161]">{firstData}</span>
        {" - "}
        <span className="font-semibold text-[#180161]">{lastData}</span>
        {" dari "}
        <span className="font-semibold text-[#180161]">{totalData}</span>
        {" data"}
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`rounded-xl px-4 py-2 font-semibold transition
          ${
            currentPage === 1
              ? "cursor-not-allowed bg-gray-200 text-gray-400"
              : "bg-white/60 text-[#180161] hover:bg-[#180161] hover:text-white"
          }`}
        >
          {'<<'}
        </button>

        {Array.from({ length: lastPage }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-10 w-10 rounded-xl font-semibold transition
              ${
                currentPage === page
                  ? "bg-gradient-to-r from-[#180161] via-[#4F1787] to-[#EB3678] text-white shadow-md"
                  : "bg-white/60 text-[#180161] hover:bg-[#4F1787] hover:text-white"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className={`rounded-xl px-4 py-2 font-semibold transition
          ${
            currentPage === lastPage
              ? "cursor-not-allowed bg-gray-200 text-gray-400"
              : "bg-white/60 text-[#180161] hover:bg-[#180161] hover:text-white"
          }`}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
}
