import { FaBell, FaSearch, FaBars, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  return (
    <header className="pengajar-glass-panel sticky top-0 z-30 flex items-center justify-between rounded-b-[32px] px-6 py-5">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-[#240a29]">
          SmartAHE Management System
        </h2>

        <p className="text-sm text-gray-500">
          Portal Manajemen Bimbingan Belajar Anak Hebat
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/35 px-4 py-3 shadow-sm backdrop-blur-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#cf30a2] to-[#8e27a5] font-bold text-white shadow-md">
            {userLogin?.name?.charAt(0)?.toUpperCase() || "P"}
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#240a29]">
              {userLogin?.name || "Pengajar"}
            </h3>
            <p className="text-xs text-gray-400">Pengajar</p>
          </div>
        </div>
      </div>
    </header>
  );
}
