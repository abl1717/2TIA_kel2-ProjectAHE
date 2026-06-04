import { Outlet } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";

export default function AuthLayout() {
  return (
    <div className="auth-glass-bg relative h-screen overflow-hidden">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#4F1787]/20 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#FB773C]/20 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#EB3678]/15 blur-3xl"></div>

      <div className="relative z-10 grid h-screen w-full overflow-hidden lg:grid-cols-2">
        <div className="auth-glass-dark relative hidden h-screen overflow-hidden rounded-r-[48px] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-16 top-20 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#FB773C]/20 blur-3xl"></div>

          <div className="relative z-10">
            <div className="auth-glass-card inline-flex rounded-[30px] p-4">
              <img
                src="/logo.png"
                alt="Logo SmartAHE"
                className="h-24 w-36 object-contain"
              />
            </div>

            <div className="auth-glass-card mt-5 inline-flex items-center gap-3 rounded-full px-5 py-3">
              <FaUserGraduate />

              <span className="text-sm font-semibold">
                SmartAHE Education System
              </span>
            </div>
          </div>

          <div className="relative z-10">
            <h1 className="max-w-xl text-6xl font-extrabold leading-tight">
              Platform Pendidikan Anak Cerdas
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Kelola data siswa, pengajar, modul, dan keuangan bimbingan belajar
              dengan tampilan modern dan mudah digunakan.
            </p>
          </div>

          <div className="relative z-10 grid max-w-2xl grid-cols-3 gap-5">
            <div className="auth-glass-card rounded-3xl p-5">
              <h3 className="text-4xl font-bold">400+</h3>
              <p className="mt-1 text-sm text-white/80">Siswa Aktif</p>
            </div>

            <div className="auth-glass-card rounded-3xl p-5">
              <h3 className="text-4xl font-bold">18+</h3>
              <p className="mt-1 text-sm text-white/80">Pengajar</p>
            </div>

            <div className="auth-glass-card rounded-3xl p-5">
              <h3 className="text-4xl font-bold">95%</h3>
              <p className="mt-1 text-sm text-white/80">Kepuasan</p>
            </div>
          </div>
        </div>

        <div className="flex h-screen items-center justify-center p-8">
          <div className="w-full max-w-xl">
            <Outlet />

            <div className="mt-6 text-center text-sm text-gray-500">
              © 2026 SmartAHE. Hak cipta dilindungi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
