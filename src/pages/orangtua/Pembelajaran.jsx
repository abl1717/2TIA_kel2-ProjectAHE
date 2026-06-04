import {
  FaBookOpen,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

export default function Pembelajaran() {
  return (
    <div className="space-y-8">
      <section className="rounded-[44px] bg-gradient-to-br from-[#FFF1EB] via-white to-[#FFE5D9] p-10 shadow-md">
        <p className="font-bold text-[#E5989B]">PEMBELAJARAN SMARTAHE</p>

        <h1 className="mt-3 text-5xl font-extrabold text-[#6D6875]">
          Sistem Level Pembelajaran Anak
        </h1>

        <p className="mt-5 max-w-3xl leading-relaxed text-gray-500">
          Pembelajaran SmartAHE dibagi berdasarkan level. Setiap perkembangan
          anak akan dicatat oleh pengajar agar orang tua dapat memantau
          kemampuan anak secara bertahap.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[36px] bg-white p-7 shadow-md">
          <FaUserGraduate className="text-4xl text-[#B5838D]" />
          <h3 className="mt-4 text-xl font-bold text-[#6D6875]">
            Level Bertahap
          </h3>
          <p className="mt-2 text-gray-500">
            Anak belajar dari level dasar hingga level lanjutan sesuai kemampuan
            membaca.
          </p>
        </div>

        <div className="rounded-[36px] bg-white p-7 shadow-md">
          <FaBookOpen className="text-4xl text-[#E5989B]" />
          <h3 className="mt-4 text-xl font-bold text-[#6D6875]">Modul Aktif</h3>
          <p className="mt-2 text-gray-500">
            Setiap level memiliki modul pembelajaran yang digunakan dalam proses
            belajar.
          </p>
        </div>

        <div className="rounded-[36px] bg-white p-7 shadow-md">
          <FaChalkboardTeacher className="text-4xl text-[#FFB4A2]" />
          <h3 className="mt-4 text-xl font-bold text-[#6D6875]">
            Dipantau Pengajar
          </h3>
          <p className="mt-2 text-gray-500">
            Pengajar mencatat kemampuan, status, dan perkembangan anak secara
            berkala.
          </p>
        </div>
      </section>
    </div>
  );
}
