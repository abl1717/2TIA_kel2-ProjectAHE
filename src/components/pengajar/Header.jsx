import { FaBell, FaSearch, FaBars, FaChevronDown } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button className="rounded-2xl p-3 text-2xl text-[#471353]">
          <FaBars />
        </button>

        <div className="relative hidden w-[420px] md:block">
          <input
            type="text"
            placeholder="Cari sesuatu..."
            className="w-full rounded-2xl border border-[#f0d6f5] bg-[#fbeaf7] px-6 py-4 pr-12 text-sm outline-none focus:border-[#b230cf]"
          />

          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-[#471353]" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative text-2xl text-[#471353]">
          <FaBell />

          <span className="absolute -right-2 -top-2 rounded-full bg-[#cf30a2] px-2 py-1 text-xs font-bold text-white">
            3
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#cf30a2] to-[#8e27a5] font-bold text-white">
            R
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#240a29]">Bu Rina</h3>
            <p className="text-xs text-gray-400">Pengajar</p>
          </div>

          <FaChevronDown className="text-[#471353]" />
        </div>
      </div>
    </header>
  );
}
