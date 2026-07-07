import React, { useEffect, useState } from "react";

import {
  FaBookOpen,
  FaChild,
  FaChalkboardTeacher,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const Kontak = React.lazy(() => import("../orangtua/Kontak"));
const Pembelajaran = React.lazy(() => import("../orangtua/Pembelajaran"));
const Tentang = React.lazy(() => import("../orangtua/Tentang"));

export default function Dashboard() {
  const [listOrangTua, setListOrangTua] = useState([]);
  const [listSiswa, setListSiswa] = useState([]);
  const [listLevel, setListLevel] = useState([]);
  const [listPengajar, setListPengajar] = useState([]);
  const [listModul, setListModul] = useState([]);

  useEffect(() => {
    fetchDataOrangTua();
  }, []);

  const fetchDataOrangTua = async () => {
    try {
      const [orangTuaRes, siswaRes, levelRes, pengajarRes, modulRes] =
        await Promise.all([
          api.get("/orang-tua"),
          api.get("/siswa"),
          api.get("/level-pembelajaran"),
          api.get("/pengajar"),
          api.get("/modul-pembelajaran"),
        ]);

      setListOrangTua(orangTuaRes.data.data);
      setListSiswa(siswaRes.data.data.data);
      setListLevel(levelRes.data.data.data);
      setListPengajar(pengajarRes.data.data.data);
      setListModul(modulRes.data.data);
    } catch (error) {
      console.error(
        "Gagal mengambil data orang tua",
        error.response?.data || error,
      );
      alert("Gagal mengambil data dashboard orang tua.");
    }
  };

  const navigate = useNavigate();

  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const orangTuaLogin = listOrangTua.find((orangTua) => {
    return orangTua.user_id === userLogin?.id;
  });

  const dataAnak = listSiswa.filter((siswa) => {
    return siswa.orang_tua_id === orangTuaLogin?.id;
  });

  const getLevelAnak = (idSiswa) => {
    return listLevel.find((level) => level.siswa_id === idSiswa);
  };

  const getPengajar = (idPengajar) => {
    return listPengajar.find((pengajar) => pengajar.id === idPengajar);
  };

  const getModul = (level) => {
    return listModul.find((modul) => modul.level === level);
  };

  const jumlahLevelAktif = dataAnak.filter((anak) => {
    return getLevelAnak(anak.id);
  }).length;

  const jumlahPengajarAktif = new Set(
    dataAnak
      .map((anak) => getLevelAnak(anak.id)?.pengajar_id)
      .filter((idPengajar) => idPengajar !== undefined),
  ).size;

  return (
    <div className="space-y-16">
      <section
        id="beranda"
        className="orangtua-glass-panel relative overflow-hidden rounded-[48px] px-8 py-14 scroll-mt-32"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FFB4A2]/30 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#B5838D]/20 blur-3xl"></div>

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="orangtua-glass-input inline-flex rounded-full px-5 py-2 text-sm font-bold text-[#B5838D]">
              Portal Monitoring Anak
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-[#6D6875]">
              Pantau Perkembangan Belajar Anak Secara Mudah
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-500">
              Selamat datang, {orangTuaLogin?.nama_orang_tua || "Orang Tua"}.
              Lihat level pembelajaran, modul aktif, pengajar, dan keterangan
              progres anak dalam satu halaman.
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
                className="orangtua-glass-input rounded-full px-7 py-4 font-bold text-[#B5838D] transition hover:scale-105"
              >
                Tentang SmartAHE
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute h-80 w-80 rounded-full bg-[#FFB4A2]/20 blur-3xl"></div>

            <div className="orangtua-glass-card relative z-10 rounded-[42px] p-5">
              <img
                src="/orangtua-hero.png"
                alt="Hero Orang Tua"
                className="h-[340px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="orangtua-glass-card rounded-[32px] p-6 transition hover:-translate-y-1 hover:scale-[1.01]">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-gradient-to-br from-[#B5838D] to-[#E5989B] p-5 text-2xl text-white shadow-md">
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

        <div className="orangtua-glass-card rounded-[32px] p-6 transition hover:-translate-y-1 hover:scale-[1.01]">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-gradient-to-br from-[#E5989B] to-[#FFB4A2] p-5 text-2xl text-white shadow-md">
              <FaBookOpen />
            </div>

            <div>
              <p className="text-sm text-gray-400">Level Aktif</p>
              <h2 className="text-4xl font-extrabold text-[#6D6875]">
                {jumlahLevelAktif}
              </h2>
            </div>
          </div>
        </div>

        <div className="orangtua-glass-card rounded-[32px] p-6 transition hover:-translate-y-1 hover:scale-[1.01]">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-gradient-to-br from-[#FFB4A2] to-[#E5989B] p-5 text-2xl text-white shadow-md">
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
        className="orangtua-glass-panel rounded-[44px] p-8 scroll-mt-32"
      >
        <div className="mb-8">
          <span className="text-sm font-bold text-[#E5989B]">DATA ANAK</span>

          <h2 className="mt-2 text-3xl font-extrabold text-[#6D6875]">
            Ringkasan Level Anak
          </h2>

          <p className="mt-2 text-gray-500">
            Pilih anak untuk melihat detail level pembelajarannya.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {dataAnak.map((anak) => {
            const levelAnak = getLevelAnak(anak.id);
            const pengajar = getPengajar(levelAnak?.pengajar_id);
            const modul = getModul(levelAnak?.level);

            return (
              <div
                key={anak.id}
                className="orangtua-glass-card group rounded-[36px] p-6 transition hover:-translate-y-1 hover:scale-[1.01]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#E5989B] to-[#FFB4A2] text-2xl font-bold text-white shadow-md">
                      {anak.nama_siswa.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-2xl font-extrabold text-[#6D6875]">
                        {anak.nama_siswa}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Dibimbing oleh {pengajar ? pengajar.nama_pengajar : "-"}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-[#FFE5D9]/80 bg-[#FFE5D9]/60 px-4 py-2 text-xs font-bold text-[#B5838D] backdrop-blur-md">
                    {levelAnak ? levelAnak.level : "Belum Ada Level"}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="orangtua-glass-input rounded-3xl p-5">
                    <p className="text-sm text-gray-400">Level Saat Ini</p>

                    <h4 className="mt-2 text-xl font-bold text-[#6D6875]">
                      {levelAnak ? levelAnak.level : "-"}
                    </h4>
                  </div>

                  <div className="orangtua-glass-input rounded-3xl p-5">
                    <p className="text-sm text-gray-400">Modul</p>

                    <h4 className="mt-2 text-xl font-bold text-[#6D6875]">
                      {modul ? modul.nama : "-"}
                    </h4>
                  </div>
                </div>

                <div className="mt-5 rounded-3xl bg-white/35 p-5 backdrop-blur-xl">
                  <p className="text-sm font-bold text-[#B5838D]">
                    Keterangan Progres
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {levelAnak
                      ? levelAnak.keterangan || "Belum ada keterangan progres."
                      : "Level pembelajaran anak belum dicatat oleh pengajar."}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/orangtua/detail-anak/${anak.id}`)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E5989B] to-[#FFB4A2] py-4 font-bold text-white shadow-md transition group-hover:scale-[1.02]"
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
