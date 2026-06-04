import {
  FaBookOpen,
  FaChild,
  FaChalkboardTeacher,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React from "react";
import { orangTuaData } from "../../data/orangTua";
import { siswaData } from "../../data/siswa";
import { levelPembelajaranData } from "../../data/levelPembelajaran";
import { pengajarData } from "../../data/pengajar";
import { modulData } from "../../data/modul";

const Kontak = React.lazy(() => import("../orangtua/Kontak"));
const Pembelajaran = React.lazy(() => import("../orangtua/Pembelajaran"));
const Tentang = React.lazy(() => import("../orangtua/Tentang"));

export default function Dashboard() {
  const navigate = useNavigate();

  const orangTuaLogin = orangTuaData.find((orangTua) => {
    return orangTua.nama === "Ibu Sari";
  });

  const dataAnak = siswaData.filter((siswa) => {
    return siswa.idOrangTua === orangTuaLogin.id;
  });

  const getLevelAnak = (idSiswa) => {
    return levelPembelajaranData.find((level) => level.idSiswa === idSiswa);
  };

  const getPengajar = (idPengajar) => {
    return pengajarData.find((pengajar) => pengajar.id === idPengajar);
  };

  const getModul = (level) => {
    return modulData.find((modul) => modul.level === level);
  };

  const jumlahPengajarAktif = new Set(
    dataAnak
      .map((anak) => getLevelAnak(anak.id)?.idPengajar)
      .filter((idPengajar) => idPengajar !== undefined),
  ).size;

  return (
    <div className="space-y-16">
      <section
        id="beranda"
        className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-[#FFF1EB] via-white to-[#FFE5D9] px-8 py-14 shadow-md scroll-mt-32"
      >
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FFB4A2]/30 blur-3xl"></div>
        <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#B5838D]/20 blur-3xl"></div>

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-[#FFE5D9] px-5 py-2 text-sm font-bold text-[#B5838D]">
              Portal Monitoring Anak
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-[#6D6875]">
              Pantau Perkembangan Belajar Anak Secara Mudah
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-500">
              Selamat datang, {orangTuaLogin.nama}. Lihat level pembelajaran,
              modul aktif, pengajar, dan catatan perkembangan anak dalam satu
              halaman.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("anak")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full bg-gradient-to-r from-[#E5989B] to-[#FFB4A2] px-7 py-4 font-bold text-white shadow-md transition hover:scale-105"
              >
                Lihat Anak Saya
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("tentang")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full border border-[#FFE5D9] bg-white px-7 py-4 font-bold text-[#B5838D] shadow-sm transition hover:bg-[#FFF1EB]"
              >
                Tentang SmartAHE
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute h-80 w-80 rounded-full bg-[#FFB4A2]/20 blur-3xl"></div>
            <img
              src="/orangtua-hero.png"
              alt="Hero Orang Tua"
              className="relative z-10 h-[360px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-[32px] bg-white p-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-gradient-to-br from-[#B5838D] to-[#E5989B] p-5 text-2xl text-white">
              <FaChild />
            </div>
            <div>
              <p className="text-sm text-gray-400">Jumlah Anak</p>
              <h2 className="text-4xl font-extrabold text-[#6D6875]">
                {dataAnak.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-gradient-to-br from-[#E5989B] to-[#FFB4A2] p-5 text-2xl text-white">
              <FaBookOpen />
            </div>
            <div>
              <p className="text-sm text-gray-400">Level Aktif</p>
              <h2 className="text-4xl font-extrabold text-[#6D6875]">
                {dataAnak.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-gradient-to-br from-[#FFB4A2] to-[#E5989B] p-5 text-2xl text-white">
              <FaChalkboardTeacher />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pengajar Anak</p>
              <h2 className="text-4xl font-extrabold text-[#6D6875]">
                {jumlahPengajarAktif}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section
        id="anak"
        className="rounded-[44px] bg-white p-8 shadow-md scroll-mt-32"
      >
        <div className="mb-8">
          <span className="text-sm font-bold text-[#E5989B]">DATA ANAK</span>
          <h2 className="mt-2 text-3xl font-extrabold text-[#6D6875]">
            Ringkasan Level Anak
          </h2>
          <p className="mt-2 text-gray-400">
            Pilih anak untuk melihat detail level pembelajarannya.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {dataAnak.map((anak) => {
            const levelAnak = getLevelAnak(anak.id);
            const pengajar = getPengajar(levelAnak?.idPengajar);
            const modul = getModul(levelAnak?.level);

            return (
              <div
                key={anak.id}
                className="group rounded-[36px] border border-[#FFE5D9] bg-[#FFF8F3] p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#E5989B] to-[#FFB4A2] text-2xl font-bold text-white">
                      {anak.nama.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-2xl font-extrabold text-[#6D6875]">
                        {anak.nama}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Dibimbing oleh {pengajar ? pengajar.nama : "-"}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#FFE5D9] px-4 py-2 text-xs font-bold text-[#B5838D]">
                    {levelAnak ? levelAnak.status : "Belum Ada Level"}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-5">
                    <p className="text-sm text-gray-400">Level Saat Ini</p>
                    <h4 className="mt-2 text-xl font-bold text-[#6D6875]">
                      {levelAnak ? levelAnak.level : "-"}
                    </h4>
                  </div>

                  <div className="rounded-3xl bg-white p-5">
                    <p className="text-sm text-gray-400">Modul</p>
                    <h4 className="mt-2 text-xl font-bold text-[#6D6875]">
                      {modul ? modul.namaModul : "-"}
                    </h4>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-gray-500">
                  {levelAnak
                    ? levelAnak.kemampuan
                    : "Level pembelajaran anak belum dicatat oleh pengajar."}
                </p>

                <button
                  onClick={() => navigate(`/orangtua/detail-anak/${anak.id}`)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E5989B] to-[#FFB4A2] py-4 font-bold text-white transition group-hover:scale-[1.02]"
                >
                  Lihat Detail Level
                  <FaArrowRight />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section id="pembelajaran" className="scroll-mt-32">
        <Pembelajaran />
      </section>

      <section id="tentang" className="scroll-mt-32">
        <Tentang />
      </section>

      <section id="kontak" className="scroll-mt-32">
        <Kontak />
      </section>
    </div>
  );
}
