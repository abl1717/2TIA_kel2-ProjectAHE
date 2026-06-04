export default function Tentang() {
  return (
    <div className="space-y-8">
      <section className="rounded-[44px] bg-gradient-to-br from-[#B5838D] via-[#E5989B] to-[#FFB4A2] p-10 text-white shadow-md">
        <h1 className="text-5xl font-extrabold">Tentang SmartAHE</h1>

        <p className="mt-5 max-w-3xl leading-relaxed text-white/90">
          SmartAHE adalah sistem digital yang membantu owner, pengajar, dan
          orang tua dalam mengelola serta memantau proses pembelajaran anak di
          bimbingan belajar AHE.
        </p>
      </section>

      <section className="rounded-[40px] bg-white p-8 shadow-md">
        <h2 className="text-3xl font-bold text-[#6D6875]">Tujuan Sistem</h2>

        <p className="mt-4 leading-relaxed text-gray-500">
          Sistem ini dibuat agar proses pencatatan data siswa, pengajar, modul,
          keuangan, dan level pembelajaran anak menjadi lebih mudah, rapi, dan
          dapat diakses sesuai role masing-masing pengguna.
        </p>
      </section>
    </div>
  );
}
