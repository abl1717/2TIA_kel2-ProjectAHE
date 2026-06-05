export default function Footer() {
  return (
    <footer className="mt-16 px-6 pb-8">
      <div className="orangtua-glass-panel mx-auto max-w-7xl overflow-hidden rounded-t-[44px] rounded-b-[32px] p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FFB4A2]/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#B5838D]/15 blur-3xl"></div>

        <div className="relative z-10 grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-4">
              <div className="orangtua-glass-input flex h-16 w-16 items-center justify-center rounded-3xl">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>

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

        <div className="relative z-10 mt-10 border-t border-white/50 pt-6 text-center text-sm text-gray-400">
          © 2026 SmartAHE. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
