import React, { useState } from "react";
import {
  FaBookOpen,
  FaExclamationTriangle,
  FaBoxes,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

import { modulData } from "../../data/modul";

const PageHeader = React.lazy(
  () => import("../../components/owner/PageHeader"),
);

const FormTambahModul = React.lazy(() => import("./FormTambahModul"));

export default function Modul() {
  const [listModul, setListModul] = useState(modulData);
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedModul, setSelectedModul] = useState(null);
  const [jenisTransaksi, setJenisTransaksi] = useState("");

  const totalStokModul = listModul.reduce((total, modul) => {
    return total + modul.stok;
  }, 0);

  const totalJenisModul = listModul.length;

  const stokRendah = listModul.filter((modul) => {
    return modul.stok <= 50;
  }).length;

  const getPersenStok = (stok) => {
    return Math.min((stok / 100) * 100, 100);
  };

  const getStatusStok = (stok) => {
    if (stok <= 50) return "Stok Rendah";
    return "Stok Aman";
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

  const openFormTransaksi = (modul, jenis) => {
    setSelectedModul(modul);
    setJenisTransaksi(jenis);
    setShowForm(true);
  };

  const handleSubmitTransaksi = (data) => {
    const hasilUpdateModul = listModul.map((modul) => {
      if (modul.id === data.idModul) {
        return {
          ...modul,
          stok:
            data.jenis === "Masuk"
              ? modul.stok + data.jumlah
              : modul.stok - data.jumlah,
        };
      }

      return modul;
    });

    const transaksiBaru = {
      id: riwayatTransaksi.length + 1,
      idModul: data.idModul,
      namaModul: data.namaModul,
      level: data.level,
      jenis: data.jenis,
      jumlah: data.jumlah,
      tanggal: new Date().toLocaleDateString("id-ID"),
      keterangan: data.keterangan,
    };

    setListModul(hasilUpdateModul);
    setRiwayatTransaksi([transaksiBaru, ...riwayatTransaksi]);
    setShowForm(false);
    setSelectedModul(null);
    setJenisTransaksi("");
  };

  return (
    <div
      id="modul-container"
      className="owner-bg min-h-screen rounded-[36px] p-5"
    >
      <PageHeader title="Modul Pembelajaran" breadcrumb="Modul" />

      <div className="glass-panel rounded-[36px] p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#180161]">
              Data Modul Pembelajaran
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Kelola stok masuk dan stok keluar modul pembelajaran berdasarkan
              level.
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-3">
          <div className="glass-card rounded-[32px] p-6">
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

          <div className="glass-card rounded-[32px] p-6">
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

          <div className="glass-card rounded-[32px] p-6">
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
          {listModul.map((modul, index) => {
            const persenStok = getPersenStok(modul.stok);
            const color = getColor(index);
            const statusStok = getStatusStok(modul.stok);

            return (
              <div
                key={modul.id}
                className="glass-card rounded-[32px] p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
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
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-[#180161]">
                      {modul.namaModul}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        modul.stok <= 50
                          ? "bg-[#FB773C]/10 text-[#FB773C]"
                          : "bg-[#180161]/10 text-[#180161]"
                      }`}
                    >
                      {statusStok}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Level</span>

                      <span className="font-bold text-[#180161]">
                        {modul.level}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Stok Tersedia</span>

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
                      <span className="text-xs font-bold text-[#FB773C]">
                        Perlu tambah stok
                      </span>
                    )}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => openFormTransaksi(modul, "Masuk")}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-[#180161]/10 px-4 py-3 text-xs font-bold text-[#180161] transition hover:bg-[#180161] hover:text-white"
                    >
                      <FaArrowUp />
                      Masuk
                    </button>

                    <button
                      type="button"
                      onClick={() => openFormTransaksi(modul, "Keluar")}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-[#EB3678]/10 px-4 py-3 text-xs font-bold text-[#EB3678] transition hover:bg-[#EB3678] hover:text-white"
                    >
                      <FaArrowDown />
                      Keluar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass-card mt-8 rounded-[32px] p-5">
          <h3 className="text-xl font-bold text-[#180161]">
            Riwayat Transaksi Modul
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Riwayat modul masuk dan modul keluar.
          </p>

          {riwayatTransaksi.length === 0 ? (
            <div className="mt-5 rounded-2xl bg-white/40 p-5 text-sm text-gray-500">
              Belum ada transaksi modul yang ditampilkan.
            </div>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead>
                  <tr className="bg-white/35 text-[#180161]">
                    <th className="px-5 py-4">Tanggal</th>
                    <th className="px-5 py-4">Modul</th>
                    <th className="px-5 py-4">Jenis</th>
                    <th className="px-5 py-4">Jumlah</th>
                    <th className="px-5 py-4">Keterangan</th>
                  </tr>
                </thead>

                <tbody>
                  {riwayatTransaksi.map((item) => (
                    <tr key={item.id} className="border-b border-white/40">
                      <td className="px-5 py-4 text-gray-600">
                        {item.tanggal}
                      </td>

                      <td className="px-5 py-4 font-semibold text-[#180161]">
                        {item.namaModul}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            item.jenis === "Masuk"
                              ? "bg-[#180161]/10 text-[#180161]"
                              : "bg-[#EB3678]/10 text-[#EB3678]"
                          }`}
                        >
                          {item.jenis}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-bold text-[#180161]">
                        {item.jenis === "Masuk" ? "+" : "-"}
                        {item.jumlah}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {item.keterangan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showForm && selectedModul && (
        <FormTambahModul
          modul={selectedModul}
          jenis={jenisTransaksi}
          onClose={() => {
            setShowForm(false);
            setSelectedModul(null);
            setJenisTransaksi("");
          }}
          onSubmit={handleSubmitTransaksi}
        />
      )}
    </div>
  );
}
