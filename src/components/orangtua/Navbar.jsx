import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    navigate("/orangtua/dashboard");

    setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FFF8F3]/80 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/90 px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />

          <div>
            <h1 className="text-xl font-extrabold text-[#6D6875]">SmartAHE</h1>
            <p className="text-xs text-gray-400">Portal Orang Tua</p>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => scrollToSection("beranda")}
            className="font-semibold text-gray-500 transition hover:text-[#B5838D]"
          >
            Beranda
          </button>

          <button
            onClick={() => scrollToSection("anak")}
            className="font-semibold text-gray-500 transition hover:text-[#B5838D]"
          >
            Data Anak
          </button>

          <button
            onClick={() => scrollToSection("pembelajaran")}
            className="font-semibold text-gray-500 transition hover:text-[#B5838D]"
          >
            Pembelajaran
          </button>

          <button
            onClick={() => scrollToSection("tentang")}
            className="font-semibold text-gray-500 transition hover:text-[#B5838D]"
          >
            Tentang
          </button>

          <button
            onClick={() => scrollToSection("kontak")}
            className="font-semibold text-gray-500 transition hover:text-[#B5838D]"
          >
            Kontak
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative rounded-full bg-[#FFE5D9] p-4 text-[#B5838D]">
            <FaBell />
            <span className="absolute -right-1 -top-1 rounded-full bg-[#FFB4A2] px-2 py-1 text-[10px] font-bold text-white">
              2
            </span>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <FaUserCircle className="text-3xl text-[#B5838D]" />
            <div>
              <p className="text-sm font-bold text-[#6D6875]">Ibu Sari</p>
              <p className="text-xs text-gray-400">Orang Tua</p>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="rounded-full bg-gradient-to-r from-[#E5989B] to-[#FFB4A2] p-4 text-white transition hover:scale-105"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </nav>
  );
}
