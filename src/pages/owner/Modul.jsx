import React from "react";
import { IoMdAdd } from "react-icons/io";
import { FaBookOpen, FaExclamationTriangle, FaBoxes } from "react-icons/fa";

import { modulData } from "../../data/modul";

const PageHeader = React.lazy(
  () => import("../../components/owner/PageHeader"),
);

export default function Modul({ onAddClick }) {
  const totalStokModul = modulData.reduce((total, modul) => {
    return total + modul.stok;
  }, 0);

  const totalJenisModul = modulData.length;

  const stokRendah = modulData.filter((modul) => {
    return modul.stok <= 50;
  }).length;

  const getPersenStok = (stok) => {
    return Math.min((stok / 100) * 100, 100);
  };

  const getColor = (index) => {
    const colors = [
      "from-[#180161] to-[#4F1787]",
      "from-[#EB3678] to-[#FB773C]",
      "from-[#4F1787] to-[#EB3678]",
      "from-[#FB773C] to-[#EB3678]",
    ];

    return colors[index % colors.length];
  };

  return (
    <div
      id="modul-container"
      className="owner-bg min-h-screen rounded-[36px] p-5"
    >
      <PageHeader title="Modul Pembelajaran" breadcrumb="Modul" />

      <div className="rounded-[36px] glass-panel p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#180161]">
              Data Modul Pembelajaran
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Kelola stok modul pembelajaran berdasarkan level siswa.
            </p>
          </div>

          <button
            onClick={onAddClick}
            className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-[#180161] via-[#4F1787] to-[#EB3678] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105"
          >
            <IoMdAdd className="text-xl" />
            Tambah Modul
          </button>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-[32px] glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#180161] to-[#4F1787] p-4 text-2xl text-white shadow-md">
                <FaBoxes />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Stok Modul
                </p>

                <h3 className="text-3xl font-bold text-[#180161]">
                  {totalStokModul}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#EB3678] to-[#FB773C] p-4 text-2xl text-white shadow-md">
                <FaBookOpen />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Jenis Modul
                </p>

                <h3 className="text-3xl font-bold text-[#180161]">
                  {totalJenisModul}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#FB773C] to-[#EB3678] p-4 text-2xl text-white shadow-md">
                <FaExclamationTriangle />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Stok Rendah
                </p>

                <h3 className="text-3xl font-bold text-[#180161]">
                  {stokRendah} Modul
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {modulData.map((modul, index) => {
            const persenStok = getPersenStok(modul.stok);
            const color = getColor(index);

            return (
              <div
                key={modul.id}
                className="rounded-[32px] glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
              >
                <div
                  className={`rounded-[28px] bg-gradient-to-br ${color} p-5 text-white shadow-md`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">
                        Modul Pembelajaran
                      </p>

                      <h2 className="mt-2 text-3xl font-bold">{modul.level}</h2>
                    </div>

                    <FaBookOpen className="text-4xl text-white/90" />
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="font-bold text-[#180161]">
                    {modul.namaModul}
                  </h3>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Level</span>

                      <span className="font-bold text-[#180161]">
                        {modul.level}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Stok</span>

                      <span className="font-bold text-[#180161]">
                        {modul.stok}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 h-3 rounded-full bg-white/50">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${color}`}
                      style={{ width: `${persenStok}%` }}
                    ></div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {persenStok}% Ketersediaan
                    </p>

                    {modul.stok <= 50 && (
                      <span className="rounded-full bg-[#FB773C]/10 px-3 py-1 text-xs font-bold text-[#FB773C]">
                        Tambah Stok
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
