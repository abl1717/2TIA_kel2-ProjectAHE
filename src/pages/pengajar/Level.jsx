import React from "react";
import { FaEdit, FaEye, FaClipboardList, FaUserGraduate } from "react-icons/fa";

import { levelPembelajaranData } from "../../data/levelPembelajaran";
import { siswaData } from "../../data/siswa";
import { pengajarData } from "../../data/pengajar";
import { modulData } from "../../data/modul";

const PengajarPageHeader = React.lazy(
  () => import("../../components/pengajar/PageHeader"),
);

export default function Level() {
  const pengajarLogin = pengajarData.find((pengajar) => {
    return pengajar.nama === "Pak Andi";
  });

  const dataLevelPengajar = levelPembelajaranData.filter((level) => {
    return level.idPengajar === pengajarLogin.id;
  });

  const totalSiswa = dataLevelPengajar.length;

  const levelBerjalan = dataLevelPengajar.filter((level) => {
    return level.status === "Berjalan";
  }).length;

  const perluBimbingan = dataLevelPengajar.filter((level) => {
    return level.status === "Perlu Bimbingan";
  }).length;

  const getSiswa = (idSiswa) => {
    return siswaData.find((siswa) => siswa.id === idSiswa);
  };

  const getModul = (levelSiswa) => {
    return modulData.find((modul) => modul.level === levelSiswa);
  };

  return (
    <div>
      <PengajarPageHeader
        title="Level Pembelajaran"
        breadcrumb="Level Pembelajaran"
      />

      <div className="rounded-[32px] bg-white/60 p-6 shadow-sm">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#240a29]">
              Data Level Pembelajaran Siswa
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Pengajar dapat melihat dan memperbarui level pembelajaran anak
              yang diajarnya.
            </p>
          </div>

          <button className="rounded-2xl bg-gradient-to-r from-[#6b1d7c] via-[#cf30a2] to-[#ed6a45] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105">
            + Catat Level Baru
          </button>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#6b1d7c] to-[#b230cf] p-4 text-2xl text-white shadow-md">
                <FaClipboardList />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Total Siswa
                </p>

                <h3 className="text-3xl font-bold text-[#240a29]">
                  {totalSiswa}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#cf30a2] to-[#ed6a45] p-4 text-2xl text-white shadow-md">
                <FaUserGraduate />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Level Berjalan
                </p>

                <h3 className="text-3xl font-bold text-[#240a29]">
                  {levelBerjalan}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#ed6a45] to-[#cf30a2] p-4 text-2xl text-white shadow-md">
                <FaClipboardList />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Perlu Bimbingan
                </p>

                <h3 className="text-3xl font-bold text-[#240a29]">
                  {perluBimbingan}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold text-[#240a29]">
                Daftar Level Siswa
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Data diambil dari relasi levelPembelajaran, siswa, pengajar, dan
                modul.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                placeholder="Cari nama siswa..."
                className="rounded-2xl border border-gray-200 px-5 py-3 text-sm outline-none focus:border-[#cf30a2] focus:ring-4 focus:ring-[#cf30a2]/10"
              />

              <select className="rounded-2xl border border-gray-200 px-5 py-3 text-sm text-[#240a29] outline-none focus:border-[#cf30a2]">
                <option>Semua Level</option>
                <option>Level 1</option>
                <option>Level 2</option>
                <option>Level 3</option>
                <option>Level 4</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead>
                <tr className="bg-[#faeaf6] text-sm text-[#240a29]">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Nama Siswa</th>
                  <th className="px-6 py-4">Level</th>
                  <th className="px-6 py-4">Modul</th>
                  <th className="px-6 py-4">Kemampuan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Update Terakhir</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {dataLevelPengajar.map((item, index) => {
                  const siswa = getSiswa(item.idSiswa);
                  const modul = getModul(item.level);

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 text-sm transition hover:bg-[#faeaf6]"
                    >
                      <td className="px-6 py-4 font-semibold text-[#240a29]">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7d4ee] font-bold text-[#6b1d7c]">
                            {siswa ? siswa.nama.charAt(0) : "-"}
                          </div>

                          <span className="font-bold text-[#240a29]">
                            {siswa ? siswa.nama : "Data siswa tidak ditemukan"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#cf30a2]/10 px-3 py-1 text-xs font-bold text-[#cf30a2]">
                          {item.level}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {modul ? modul.namaModul : "-"}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {item.kemampuan}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            item.status === "Berjalan"
                              ? "bg-green-50 text-green-600"
                              : item.status === "Selesai"
                                ? "bg-[#cf30a2]/10 text-[#cf30a2]"
                                : "bg-[#ed6a45]/10 text-[#e84417]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {item.tanggalUpdate}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button className="rounded-xl bg-[#8e27a5]/10 p-3 text-[#8e27a5] transition hover:bg-[#8e27a5] hover:text-white">
                            <FaEye />
                          </button>

                          <button className="rounded-xl bg-[#cf30a2]/10 p-3 text-[#cf30a2] transition hover:bg-[#cf30a2] hover:text-white">
                            <FaEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
