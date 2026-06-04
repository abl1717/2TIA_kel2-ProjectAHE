import React from "react";
import {
  FaUserGraduate,
  FaBookOpen,
  FaStar,
  FaChartLine,
} from "react-icons/fa";

import { siswaData } from "../../data/siswa";
import { pengajarData } from "../../data/pengajar";
import { levelPembelajaranData } from "../../data/levelPembelajaran";

export default function Dashboard() {
  const pengajarLogin = pengajarData.find((pengajar) => {
    return pengajar.nama === "Bu Rina";
  });

  const dataLevelPengajar = levelPembelajaranData.filter((level) => {
    return level.idPengajar === pengajarLogin.id;
  });

  const totalMurid = dataLevelPengajar.length;

  const levelBerjalan = dataLevelPengajar.filter((level) => {
    return level.status === "Berjalan";
  }).length;

  const perluBimbingan = dataLevelPengajar.filter((level) => {
    return level.status === "Perlu Bimbingan";
  }).length;

  const selesaiLevel = dataLevelPengajar.filter((level) => {
    return level.status === "Selesai";
  }).length;

  const getNamaSiswa = (idSiswa) => {
    const siswa = siswaData.find((item) => item.id === idSiswa);
    return siswa ? siswa.nama : "-";
  };

  const jumlahLevel1 = dataLevelPengajar.filter((item) => {
    return item.level === "Level 1";
  }).length;

  const jumlahLevel2 = dataLevelPengajar.filter((item) => {
    return item.level === "Level 2";
  }).length;

  const jumlahLevel3 = dataLevelPengajar.filter((item) => {
    return item.level === "Level 3";
  }).length;

  const jumlahLevel4 = dataLevelPengajar.filter((item) => {
    return item.level === "Level 4";
  }).length;

  return (
    <div className="pengajar-bg min-h-screen rounded-[36px] p-5">
      <div className="space-y-6">
        <div className="pengajar-glass-panel relative overflow-hidden rounded-[36px] px-7 py-6">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-12 left-20 h-36 w-36 rounded-full bg-[#cf30a2]/15 blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#240a29]">
                Selamat datang, {pengajarLogin.nama}! 👋
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Mari catat perkembangan belajar anak-anak hari ini.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <div className="pengajar-glass-card rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#6b1d7c] to-[#b230cf] p-4 text-2xl text-white shadow-md">
                <FaUserGraduate />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Total Murid
                </p>

                <h2 className="text-3xl font-bold text-[#240a29]">
                  {totalMurid}
                </h2>

                <p className="text-xs text-gray-400">Anak yang diajar</p>
              </div>
            </div>
          </div>

          <div className="pengajar-glass-card rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#cf30a2] to-[#ed6a45] p-4 text-2xl text-white shadow-md">
                <FaBookOpen />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Level Berjalan
                </p>

                <h2 className="text-3xl font-bold text-[#240a29]">
                  {levelBerjalan}
                </h2>

                <p className="text-xs text-gray-400">Sedang dipelajari</p>
              </div>
            </div>
          </div>

          <div className="pengajar-glass-card rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#ed6a45] to-[#cf30a2] p-4 text-2xl text-white shadow-md">
                <FaStar />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Selesai Level
                </p>

                <h2 className="text-3xl font-bold text-[#240a29]">
                  {selesaiLevel}
                </h2>

                <p className="text-xs text-gray-400">Telah diselesaikan</p>
              </div>
            </div>
          </div>

          <div className="pengajar-glass-card rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#d183e2] to-[#cf30a2] p-4 text-2xl text-white shadow-md">
                <FaChartLine />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Perlu Bimbingan
                </p>

                <h2 className="text-3xl font-bold text-[#240a29]">
                  {perluBimbingan}
                </h2>

                <p className="text-xs text-gray-400">Butuh perhatian</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="pengajar-glass-card rounded-3xl p-6">
            <h2 className="text-xl font-bold text-[#240a29]">
              Progres Level Murid
            </h2>

            <div className="mt-6 flex flex-col items-center justify-center gap-10 md:flex-row">
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-pengajar-donut shadow-xl">
                <div className="pengajar-glass-card flex h-28 w-28 flex-col items-center justify-center rounded-full">
                  <h3 className="text-3xl font-bold text-[#240a29]">
                    {totalMurid}
                  </h3>

                  <p className="text-xs text-gray-400">Total Murid</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <p className="flex items-center gap-3 text-[#240a29]">
                  <span className="h-3 w-3 rounded-full bg-[#8e27a5]"></span>
                  Level 1 <b>{jumlahLevel1} Murid</b>
                </p>

                <p className="flex items-center gap-3 text-[#240a29]">
                  <span className="h-3 w-3 rounded-full bg-[#cf30a2]"></span>
                  Level 2 <b>{jumlahLevel2} Murid</b>
                </p>

                <p className="flex items-center gap-3 text-[#240a29]">
                  <span className="h-3 w-3 rounded-full bg-[#ed6a45]"></span>
                  Level 3 <b>{jumlahLevel3} Murid</b>
                </p>

                <p className="flex items-center gap-3 text-[#240a29]">
                  <span className="h-3 w-3 rounded-full bg-[#e382c1]"></span>
                  Level 4 <b>{jumlahLevel4} Murid</b>
                </p>
              </div>
            </div>
          </div>

          <div className="pengajar-glass-card rounded-3xl p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#240a29]">
                Murid Butuh Perhatian
              </h2>

              <button className="pengajar-glass-input rounded-full px-4 py-2 text-sm font-bold text-[#cf30a2] transition hover:bg-[#cf30a2] hover:text-white">
                Lihat Semua
              </button>
            </div>

            <div className="space-y-4">
              {dataLevelPengajar
                .filter((item) => item.status === "Perlu Bimbingan")
                .map((item) => (
                  <div
                    key={item.id}
                    className="pengajar-glass-card flex items-center justify-between rounded-2xl p-4 transition hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#6b1d7c] to-[#cf30a2] font-bold text-white shadow-md">
                        {getNamaSiswa(item.idSiswa).charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-bold text-[#240a29]">
                          {getNamaSiswa(item.idSiswa)}
                        </h3>

                        <p className="text-xs text-gray-400">
                          {item.level} • {item.kemampuan}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full border border-[#ed6a45]/20 bg-[#ed6a45]/10 px-3 py-1 text-xs font-bold text-[#e84417] backdrop-blur-md">
                      Perlu Bimbingan
                    </span>
                  </div>
                ))}

              {dataLevelPengajar.filter(
                (item) => item.status === "Perlu Bimbingan",
              ).length === 0 && (
                <div className="pengajar-glass-card rounded-2xl p-5 text-center text-sm text-gray-500">
                  Tidak ada murid yang membutuhkan perhatian khusus.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
