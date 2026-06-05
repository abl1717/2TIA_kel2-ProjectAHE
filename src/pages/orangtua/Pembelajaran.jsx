import {
  FaBookOpen,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

export default function Pembelajaran() {
  return (
    <div className="space-y-8">
      <section className="orangtua-glass-panel relative overflow-hidden rounded-[44px] p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FFB4A2]/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#B5838D]/20 blur-3xl"></div>

        <div className="relative z-10">
          <p className="font-bold tracking-wider text-[#E5989B]">
            PEMBELAJARAN SMARTAHE
          </p>

          <h1 className="mt-3 text-5xl font-extrabold text-[#6D6875]">
            Sistem Level Pembelajaran Anak
          </h1>

          <p className="mt-5 max-w-3xl leading-relaxed text-gray-500">
            Pembelajaran SmartAHE dibagi berdasarkan level. Setiap perkembangan
            anak akan dicatat oleh pengajar agar orang tua dapat memantau
            kemampuan anak secara bertahap.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="orangtua-glass-card rounded-[36px] p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#B5838D] to-[#E5989B] text-3xl text-white shadow-md">
            <FaUserGraduate />
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#6D6875]">
            Level Bertahap
          </h3>

          <p className="mt-3 leading-relaxed text-gray-500">
            Anak belajar dari level dasar hingga level lanjutan sesuai kemampuan
            membaca.
          </p>
        </div>

        <div className="orangtua-glass-card rounded-[36px] p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#E5989B] to-[#FFB4A2] text-3xl text-white shadow-md">
            <FaBookOpen />
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#6D6875]">Modul Aktif</h3>

          <p className="mt-3 leading-relaxed text-gray-500">
            Setiap level memiliki modul pembelajaran yang digunakan dalam proses
            belajar.
          </p>
        </div>

        <div className="orangtua-glass-card rounded-[36px] p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#FFB4A2] to-[#E5989B] text-3xl text-white shadow-md">
            <FaChalkboardTeacher />
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#6D6875]">
            Dipantau Pengajar
          </h3>

          <p className="mt-3 leading-relaxed text-gray-500">
            Pengajar mencatat level dan keterangan perkembangan anak secara
            berkala.
          </p>
        </div>
      </section>
    </div>
  );
}
