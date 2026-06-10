import { Outlet } from "react-router-dom";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaChild,
  FaShieldAlt,
} from "react-icons/fa";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6ECFF] via-white to-[#FFE5D9]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#F6ECFF] via-[#FFEAF3] to-[#FFE5D9] px-16 py-12 lg:block">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#8E27A5]/25 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#4F1787]/25 blur-3xl"></div>
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#EB3678]/20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-[#FB773C]/20 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-5">
              <div className="rounded-[30px] bg-white/80 p-5 shadow-xl backdrop-blur-xl">
                <img
                  src="/logo.png"
                  alt="Logo SmartAHE"
                  className="h-24 w-36 object-contain"
                />
              </div>

              <div>
                <h1 className="text-4xl font-extrabold text-[#180161]">
                  SmartAHE
                </h1>
                <p className="mt-1 text-lg font-semibold text-[#4F1787]">
                  Sistem Monitoring Belajar Anak
                </p>
              </div>
            </div>

            <div className="mt-16 max-w-2xl">
              <h2 className="text-6xl font-extrabold leading-tight text-[#180161]">
                Satu Portal untuk <span className="text-[#8E27A5]">Owner</span>,{" "}
                <span className="text-[#EB3678]">Pengajar</span>, dan{" "}
                <span className="text-[#FB773C]">Orang Tua</span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
                SmartAHE membantu owner mengelola operasional bimbel, pengajar
                mencatat perkembangan belajar, dan orang tua memantau level anak
                secara mudah dan terintegrasi.
              </p>
            </div>

            <div className="mt-12 grid max-w-3xl grid-cols-3 gap-5">
              <div className="rounded-[30px] bg-white/70 p-6 text-center shadow-xl backdrop-blur-xl">
                <FaUserShield className="mx-auto text-4xl text-[#8E27A5]" />
                <h3 className="mt-4 text-xl font-extrabold text-[#8E27A5]">
                  Owner
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Kelola data utama dan operasional
                </p>
              </div>

              <div className="rounded-[30px] bg-white/70 p-6 text-center shadow-xl backdrop-blur-xl">
                <FaChalkboardTeacher className="mx-auto text-4xl text-[#EB3678]" />
                <h3 className="mt-4 text-xl font-extrabold text-[#EB3678]">
                  Pengajar
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Catat dan pantau perkembangan siswa
                </p>
              </div>

              <div className="rounded-[30px] bg-white/70 p-6 text-center shadow-xl backdrop-blur-xl">
                <FaChild className="mx-auto text-4xl text-[#FB773C]" />
                <h3 className="mt-4 text-xl font-extrabold text-[#FB773C]">
                  Orang Tua
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Pantau level dan kemajuan anak
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center px-6 py-10">
          <div className="w-full max-w-2xl">
            <Outlet />

            <p className="mt-6 text-center text-sm text-gray-500">
              © 2026 SmartAHE. Hak cipta dilindungi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
