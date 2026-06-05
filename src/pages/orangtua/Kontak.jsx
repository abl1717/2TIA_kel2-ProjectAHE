import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Kontak() {
  return (
    <div className="space-y-8">
      <section className="orangtua-glass-panel relative overflow-hidden rounded-[44px] p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FFB4A2]/20 blur-3xl"></div>

        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#B5838D]/20 blur-3xl"></div>

        <div className="relative z-10">
          <p className="font-bold tracking-wider text-[#E5989B]">
            KONTAK SMARTAHE
          </p>

          <h1 className="mt-3 text-5xl font-extrabold text-[#6D6875]">
            Hubungi Kami
          </h1>

          <p className="mt-5 max-w-2xl leading-relaxed text-gray-500">
            Orang tua dapat menghubungi pihak SmartAHE jika memiliki pertanyaan
            mengenai perkembangan belajar anak, jadwal pembelajaran, maupun
            informasi administrasi lainnya.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="orangtua-glass-card rounded-[36px] p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#B5838D] to-[#E5989B] text-3xl text-white shadow-md">
            <FaMapMarkerAlt />
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#6D6875]">Alamat</h3>

          <p className="mt-3 leading-relaxed text-gray-500">
            Rumbai, Pekanbaru,
            <br />
            Provinsi Riau
          </p>
        </div>

        <div className="orangtua-glass-card rounded-[36px] p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#E5989B] to-[#FFB4A2] text-3xl text-white shadow-md">
            <FaEnvelope />
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#6D6875]">Email</h3>

          <p className="mt-3 break-all leading-relaxed text-gray-500">
            smartahe@gmail.com
          </p>
        </div>

        <div className="orangtua-glass-card rounded-[36px] p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#FFB4A2] to-[#E5989B] text-3xl text-white shadow-md">
            <FaPhoneAlt />
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#6D6875]">Telepon</h3>

          <p className="mt-3 leading-relaxed text-gray-500">
            +62 812 3456 7890
          </p>
        </div>
      </section>
    </div>
  );
}
