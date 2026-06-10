import { FaBell } from "react-icons/fa";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 mb-4 flex items-center justify-between rounded-b-[32px] border border-white/60 bg-white/45 px-6 py-5 shadow-[0_18px_45px_rgba(24,1,97,0.10)] backdrop-blur-2xl">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-[#180161]">
          SmartAHE Management System
        </h2>

        <p className="text-sm text-gray-500">
          Portal Manajemen Bimbingan Belajar Anak Hebat
        </p>
      </div>

      <div className="flex items-center gap-5">
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
