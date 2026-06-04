import React from "react";
import { IoMdAdd } from "react-icons/io";
import {
  FaWallet,
  FaArrowDown,
  FaArrowUp,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

import { keuanganData } from "../../data/keuangan";

const PageHeader = React.lazy(
  () => import("../../components/owner/PageHeader"),
);

export default function Keuangan({ onAddClick }) {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const totalPemasukan = keuanganData
    .filter((item) => item.jenis === "Pemasukan")
    .reduce((total, item) => total + item.jumlah, 0);

  const totalPengeluaran = keuanganData
    .filter((item) => item.jenis === "Pengeluaran")
    .reduce((total, item) => total + item.jumlah, 0);

  const totalSaldo = totalPemasukan - totalPengeluaran;

  return (
    <div
      id="keuangan-container"
      className="owner-bg min-h-screen rounded-[36px] p-5"
    >
      <PageHeader title="Data Keuangan" breadcrumb="Keuangan" />

      <div className="rounded-[36px] glass-panel p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#180161]">
              Laporan Keuangan SmartAHE
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Kelola data pemasukan dan pengeluaran bimbingan belajar.
            </p>
          </div>

          <button
            onClick={onAddClick}
            className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-[#180161] via-[#4F1787] to-[#EB3678] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105"
          >
            <IoMdAdd className="text-xl" />
            Tambah Keuangan
          </button>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-[32px] glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#180161] to-[#4F1787] p-4 text-2xl text-white shadow-md">
                <FaWallet />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Saldo
                </p>
                <h3 className="text-3xl font-bold text-[#180161]">
                  {formatRupiah(totalSaldo)}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#EB3678] to-[#FB773C] p-4 text-2xl text-white shadow-md">
                <FaArrowUp />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Pemasukan</p>
                <h3 className="text-3xl font-bold text-[#180161]">
                  {formatRupiah(totalPemasukan)}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#FB773C] to-[#EB3678] p-4 text-2xl text-white shadow-md">
                <FaArrowDown />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Pengeluaran
                </p>
                <h3 className="text-3xl font-bold text-[#180161]">
                  {formatRupiah(totalPengeluaran)}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] glass-card">
          <div className="flex flex-col justify-between gap-4 border-b border-white/40 p-5 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold text-[#180161]">
                Daftar Keuangan
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Data sementara menggunakan data statis dari keuangan.js.
              </p>
            </div>

            <input
              type="text"
              placeholder="Cari data keuangan..."
              className="glass-input rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787] focus:ring-4 focus:ring-[#4F1787]/10"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="bg-white/30 text-sm text-[#180161]">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Keterangan</th>
                  <th className="px-6 py-4">Jenis</th>
                  <th className="px-6 py-4">Jumlah</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {keuanganData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/40 text-sm transition hover:bg-white/30"
                  >
                    <td className="px-6 py-4 font-semibold text-[#180161]">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 text-gray-500">{item.tanggal}</td>

                    <td className="px-6 py-4 font-medium text-[#180161]">
                      {item.keterangan}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          item.jenis === "Pemasukan"
                            ? "bg-[#4F1787]/10 text-[#4F1787]"
                            : "bg-[#FB773C]/10 text-[#FB773C]"
                        }`}
                      >
                        {item.jenis}
                      </span>
                    </td>

                    <td
                      className={`px-6 py-4 font-bold ${
                        item.jenis === "Pemasukan"
                          ? "text-[#4F1787]"
                          : "text-[#FB773C]"
                      }`}
                    >
                      {formatRupiah(item.jumlah)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="rounded-xl bg-[#4F1787]/10 p-3 text-[#4F1787] transition hover:bg-[#4F1787] hover:text-white">
                          <FaEye />
                        </button>

                        <button className="rounded-xl bg-[#EB3678]/10 p-3 text-[#EB3678] transition hover:bg-[#EB3678] hover:text-white">
                          <FaEdit />
                        </button>

                        <button className="rounded-xl bg-[#FB773C]/10 p-3 text-[#FB773C] transition hover:bg-[#FB773C] hover:text-white">
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
