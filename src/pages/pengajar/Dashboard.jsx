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
    return pengajar.nama === "Pak Andi";
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
    <div className="space-y-6">
      <div className="rounded-3xl bg-[#faeaf6] px-7 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#240a29]">
              Selamat datang, {pengajarLogin.nama}! 👋
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Mari catat perkembangan belajar anak-anak hari ini.
            </p>
          </div>

          <img
            src="/teacher-hero.png"
            alt="Hero"
            className="hidden h-32 object-contain md:block"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-3xl bg-white p-5 shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-[#6b1d7c] to-[#b230cf] p-4 text-2xl text-white">
              <FaUserGraduate />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-400">Total Murid</p>

              <h2 className="text-3xl font-bold text-[#240a29]">
                {totalMurid}
              </h2>

              <p className="text-xs text-gray-400">Anak yang diajar</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-[#cf30a2] to-[#ed6a45] p-4 text-2xl text-white">
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

        <div className="rounded-3xl bg-white p-5 shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-[#ed6a45] to-[#cf30a2] p-4 text-2xl text-white">
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

        <div className="rounded-3xl bg-white p-5 shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-[#d183e2] to-[#cf30a2] p-4 text-2xl text-white">
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
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h2 className="text-xl font-bold text-[#240a29]">
            Progres Level Murid
          </h2>

          <div className="mt-6 flex items-center justify-center gap-10">
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-pengajar-donut">
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
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

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#240a29]">
              Murid Butuh Perhatian
            </h2>

            <button className="rounded-full bg-[#cf30a2]/10 px-4 py-2 text-sm font-bold text-[#cf30a2]">
              Lihat Semua
            </button>
          </div>

          <div className="space-y-4">
            {dataLevelPengajar
              .filter((item) => item.status === "Perlu Bimbingan")
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-[#f0d6f5] bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7d4ee] font-bold text-[#6b1d7c]">
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

                  <span className="rounded-full bg-[#ed6a45]/10 px-3 py-1 text-xs font-bold text-[#e84417]">
                    Perlu Bimbingan
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
