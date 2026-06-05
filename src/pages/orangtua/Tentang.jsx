export default function Tentang() {
  return (
    <div className="space-y-8">
      <section className="orangtua-glass-panel relative overflow-hidden rounded-[44px] p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FFB4A2]/20 blur-3xl"></div>

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#B5838D]/20 blur-3xl"></div>

        <div className="relative z-10">
          <p className="font-bold tracking-wider text-[#E5989B]">
            TENTANG SMARTAHE
          </p>

          <h1 className="mt-3 text-5xl font-extrabold text-[#6D6875]">
            Tentang SmartAHE
          </h1>

          <p className="mt-5 max-w-3xl leading-relaxed text-gray-500">
            SmartAHE adalah sistem digital yang membantu owner, pengajar, dan
            orang tua dalam mengelola serta memantau proses pembelajaran anak di
            bimbingan belajar AHE secara lebih mudah, cepat, dan terorganisir.
          </p>
        </div>
      </section>

      <section className="orangtua-glass-card rounded-[40px] p-8">
        <h2 className="text-3xl font-bold text-[#6D6875]">Tujuan Sistem</h2>

        <p className="mt-4 leading-relaxed text-gray-500">
          Sistem ini dibuat agar proses pencatatan data siswa, pengajar, orang
          tua, modul pembelajaran, keuangan, dan perkembangan belajar anak
          menjadi lebih rapi serta dapat diakses sesuai dengan hak akses
          masing-masing pengguna.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="orangtua-glass-card rounded-[36px] p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
          <h3 className="text-xl font-bold text-[#6D6875]">Untuk Owner</h3>

          <p className="mt-3 leading-relaxed text-gray-500">
            Mengelola data siswa, pengajar, modul pembelajaran, serta keuangan
            bimbingan belajar secara terpusat.
          </p>
        </div>

        <div className="orangtua-glass-card rounded-[36px] p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
          <h3 className="text-xl font-bold text-[#6D6875]">Untuk Pengajar</h3>

          <p className="mt-3 leading-relaxed text-gray-500">
            Mencatat level pembelajaran dan perkembangan siswa setiap kali
            proses belajar berlangsung.
          </p>
        </div>

        <div className="orangtua-glass-card rounded-[36px] p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
          <h3 className="text-xl font-bold text-[#6D6875]">Untuk Orang Tua</h3>

          <p className="mt-3 leading-relaxed text-gray-500">
            Memantau level pembelajaran, modul yang dipelajari, serta
            perkembangan anak secara transparan dan real-time.
          </p>
        </div>
      </section>
    </div>
  );
}
