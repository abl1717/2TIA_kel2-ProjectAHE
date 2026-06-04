import React from "react";
import { IoMdAdd } from "react-icons/io";
import { FaEdit, FaTrash, FaEye, FaChalkboardTeacher } from "react-icons/fa";

import { pengajarData } from "../../data/pengajar";
import { levelPembelajaranData } from "../../data/levelPembelajaran";

const PageHeader = React.lazy(
  () => import("../../components/owner/PageHeader"),
);

export default function Pengajar({ onAddClick }) {
  const totalPengajar = pengajarData.length;

  const pengajarAktif = pengajarData.filter((pengajar) => {
    return pengajar.status === "Aktif";
  }).length;

  const totalBimbingan = levelPembelajaranData.length;

  const getJumlahMurid = (idPengajar) => {
    return levelPembelajaranData.filter((level) => {
      return level.idPengajar === idPengajar;
    }).length;
  };

  return (
    <div
      id="pengajar-container"
      className="owner-bg min-h-screen rounded-[36px] p-5"
    >
      <PageHeader title="Data Pengajar" breadcrumb="Pengajar" />

      <div className="glass-panel rounded-[32px] p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#180161]">
              Data Pengajar SmartAHE
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Kelola data pengajar yang membimbing siswa SmartAHE.
            </p>
          </div>

          <button
            onClick={onAddClick}
            className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-[#180161] via-[#4F1787] to-[#EB3678] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4F1787]/25 transition hover:scale-105"
          >
            <IoMdAdd className="text-xl" />
            Tambah Pengajar
          </button>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-3">
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#180161] to-[#4F1787] p-4 text-2xl text-white shadow-md">
                <FaChalkboardTeacher />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Pengajar
                </p>

                <h3 className="text-3xl font-bold text-[#180161]">
                  {totalPengajar}
                </h3>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#EB3678] to-[#FB773C] p-4 text-2xl text-white shadow-md">
                <FaChalkboardTeacher />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Pengajar Aktif
                </p>

                <h3 className="text-3xl font-bold text-[#180161]">
                  {pengajarAktif}
                </h3>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#FB773C] to-[#EB3678] p-4 text-2xl text-white shadow-md">
                <FaChalkboardTeacher />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Bimbingan
                </p>

                <h3 className="text-3xl font-bold text-[#180161]">
                  {totalBimbingan}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card overflow-hidden rounded-3xl">
          <div className="flex flex-col justify-between gap-4 border-b border-white/50 p-5 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold text-[#180161]">
                Daftar Pengajar
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Data sementara menggunakan data statis dari pengajar.js.
              </p>
            </div>

            <input
              type="text"
              placeholder="Cari nama pengajar..."
              className="glass-input rounded-2xl px-5 py-3 text-sm text-[#180161] outline-none placeholder:text-gray-400 focus:border-[#4F1787]/50 focus:ring-4 focus:ring-[#4F1787]/10"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="bg-white/35 text-sm text-[#180161] backdrop-blur-md">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Nama Pengajar</th>
                  <th className="px-6 py-4">No HP</th>
                  <th className="px-6 py-4">Alamat</th>
                  <th className="px-6 py-4">Jumlah Murid</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {pengajarData.map((pengajar, index) => (
                  <tr
                    key={pengajar.id}
                    className="border-b border-white/40 text-sm transition hover:bg-white/35"
                  >
                    <td className="px-6 py-4 font-semibold text-[#180161]">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-bold text-[#180161]">
                        {pengajar.nama}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">{pengajar.noHp}</td>

                    <td className="px-6 py-4 text-gray-600">
                      {pengajar.alamat}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[#4F1787]/10 px-3 py-1 text-xs font-bold text-[#4F1787]">
                        {getJumlahMurid(pengajar.id)} Murid
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          pengajar.status === "Aktif"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-[#FB773C]/10 text-[#FB773C]"
                        }`}
                      >
                        {pengajar.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="rounded-xl bg-white/45 p-3 text-[#4F1787] shadow-sm transition hover:bg-[#4F1787] hover:text-white">
                          <FaEye />
                        </button>

                        <button className="rounded-xl bg-white/45 p-3 text-[#EB3678] shadow-sm transition hover:bg-[#EB3678] hover:text-white">
                          <FaEdit />
                        </button>

                        <button className="rounded-xl bg-white/45 p-3 text-[#FB773C] shadow-sm transition hover:bg-[#FB773C] hover:text-white">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
