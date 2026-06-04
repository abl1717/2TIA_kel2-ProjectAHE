import { FaBell, FaSearch, FaBars } from "react-icons/fa";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 mb-4 flex items-center justify-between rounded-b-[32px] border border-white/60 bg-white/45 px-6 py-5 shadow-[0_18px_45px_rgba(24,1,97,0.10)] backdrop-blur-2xl">
      <div className="flex items-center gap-5">
        <button className="rounded-2xl border border-white/70 bg-white/45 p-4 text-[#4F1787] shadow-sm backdrop-blur-xl transition hover:bg-white/65 hover:shadow-md">
          <FaBars />
        </button>

        <div className="relative hidden w-[520px] md:block">
          <input
            className="glass-input w-full rounded-2xl px-6 py-4 pr-12 text-sm text-[#180161] outline-none transition placeholder:text-gray-400 focus:border-[#4F1787]/50 focus:ring-4 focus:ring-[#4F1787]/10"
            type="text"
            placeholder="Cari murid, modul, pengajar..."
          />

          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-[#4F1787]" />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative cursor-pointer rounded-2xl border border-white/60 bg-white/45 p-4 text-[#4F1787] shadow-sm backdrop-blur-xl transition hover:bg-white/65 hover:shadow-md">
          <FaBell />

          <span className="absolute -right-2 -top-2 rounded-full bg-[#EB3678] px-2 py-1 text-xs font-bold text-white shadow-md">
            50
          </span>
        </div>

        <div className="flex items-center gap-4 border-l border-white/60 pl-5">
          <div className="text-right">
            <p className="text-sm text-gray-500">Hello,</p>

            <h3 className="font-bold text-[#180161]">Admin SmartAHE</h3>
          </div>

          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#180161] via-[#4F1787] to-[#EB3678] text-lg font-bold text-white shadow-lg shadow-[#4F1787]/25">
            A
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
