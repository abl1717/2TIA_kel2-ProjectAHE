export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-br from-[#FFF1EB] via-white to-[#FFE5D9] px-8 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-14 w-14 object-contain"
            />

            <div>
              <h2 className="text-2xl font-extrabold text-[#6D6875]">
                SmartAHE
              </h2>
              <p className="text-sm text-gray-400">Portal Orang Tua</p>
            </div>
          </div>

          <p className="mt-5 leading-relaxed text-gray-500">
            Portal interaktif untuk membantu orang tua memantau level
            pembelajaran anak secara mudah, modern, dan menyenangkan.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#6D6875]">Menu Cepat</h3>

          <div className="mt-5 space-y-3 text-gray-500">
            <p className="cursor-pointer transition hover:text-[#B5838D]">
              Beranda
            </p>
            <p className="cursor-pointer transition hover:text-[#B5838D]">
              Data Anak
            </p>
            <p className="cursor-pointer transition hover:text-[#B5838D]">
              Detail Level
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#6D6875]">Kontak</h3>

          <div className="mt-5 space-y-3 text-gray-500">
            <p>📍 Rumbai, Pekanbaru</p>
            <p>📧 smartahe@gmail.com</p>
            <p>📞 +62 812 3456 7890</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-[#FFE5D9] pt-6 text-center text-sm text-gray-400">
        © 2026 SmartAHE. Hak cipta dilindungi.
      </div>
    </footer>
  );
}
