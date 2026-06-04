import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Kontak() {
  return (
    <div className="space-y-8">
      <section className="rounded-[44px] bg-gradient-to-br from-[#FFF1EB] via-white to-[#FFE5D9] p-10 shadow-md">
        <p className="font-bold text-[#E5989B]">KONTAK SMARTAHE</p>

        <h1 className="mt-3 text-5xl font-extrabold text-[#6D6875]">
          Hubungi Kami
        </h1>

        <p className="mt-5 max-w-2xl text-gray-500">
          Orang tua dapat menghubungi pihak SmartAHE jika memiliki pertanyaan
          mengenai perkembangan belajar anak.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[36px] bg-white p-7 shadow-md">
          <FaMapMarkerAlt className="text-4xl text-[#B5838D]" />
          <h3 className="mt-4 text-xl font-bold text-[#6D6875]">Alamat</h3>
          <p className="mt-2 text-gray-500">Rumbai, Pekanbaru</p>
        </div>

        <div className="rounded-[36px] bg-white p-7 shadow-md">
          <FaEnvelope className="text-4xl text-[#E5989B]" />
          <h3 className="mt-4 text-xl font-bold text-[#6D6875]">Email</h3>
          <p className="mt-2 text-gray-500">smartahe@gmail.com</p>
        </div>

        <div className="rounded-[36px] bg-white p-7 shadow-md">
          <FaPhoneAlt className="text-4xl text-[#FFB4A2]" />
          <h3 className="mt-4 text-xl font-bold text-[#6D6875]">Telepon</h3>
          <p className="mt-2 text-gray-500">+62 812 3456 7890</p>
        </div>
      </section>
    </div>
  );
}
