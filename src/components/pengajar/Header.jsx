import { FaBell, FaSearch, FaBars, FaChevronDown } from "react-icons/fa";

export default function Header() {
  return (
    <header className="pengajar-glass-panel sticky top-0 z-30 flex items-center justify-between rounded-b-[32px] px-6 py-5">
      <div className="flex items-center gap-6">
        <button className="rounded-2xl border border-white/60 bg-white/35 p-3 text-2xl text-[#471353] shadow-sm backdrop-blur-xl transition hover:bg-white/60 hover:text-[#cf30a2]">
          <FaBars />
        </button>

        <div className="relative hidden w-[420px] md:block">
          <input
            type="text"
            placeholder="Cari sesuatu..."
            className="pengajar-glass-input w-full rounded-2xl px-6 py-4 pr-12 text-sm text-[#240a29] outline-none placeholder:text-gray-400 focus:border-[#b230cf] focus:ring-4 focus:ring-[#cf30a2]/10"
          />

          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-[#471353]" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative rounded-2xl border border-white/60 bg-white/35 p-4 text-xl text-[#471353] shadow-sm backdrop-blur-xl transition hover:bg-white/60">
          <FaBell />

          <span className="absolute -right-2 -top-2 rounded-full bg-[#cf30a2] px-2 py-1 text-xs font-bold text-white shadow-md">
            3
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/35 px-4 py-3 shadow-sm backdrop-blur-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#cf30a2] to-[#8e27a5] font-bold text-white shadow-md">
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
