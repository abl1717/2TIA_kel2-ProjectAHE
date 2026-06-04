import React from "react";
import { FaUserGraduate, FaBookOpen, FaWallet } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";

import { siswaData } from "../../data/siswa";
import { pengajarData } from "../../data/pengajar";
import { modulData } from "../../data/modul";
import { keuanganData } from "../../data/keuangan";

const PageHeader = React.lazy(
  () => import("../../components/owner/PageHeader"),
);

export default function Dashboard() {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const totalSiswa = siswaData.length;
  const siswaAktif = siswaData.filter(
    (siswa) => siswa.status === "Aktif",
  ).length;

  const totalPengajar = pengajarData.length;
  const pengajarAktif = pengajarData.filter(
    (pengajar) => pengajar.status === "Aktif",
  ).length;

  const totalStokModul = modulData.reduce((total, modul) => {
    return total + modul.stok;
  }, 0);

  const modulStokRendah = modulData.filter((modul) => modul.stok <= 50).length;

  const totalPemasukan = keuanganData
    .filter((item) => item.jenis === "Pemasukan")
    .reduce((total, item) => total + item.jumlah, 0);

  const totalPengeluaran = keuanganData
    .filter((item) => item.jenis === "Pengeluaran")
    .reduce((total, item) => total + item.jumlah, 0);

  const saldo = totalPemasukan - totalPengeluaran;

  const nilaiTertinggiKeuangan = Math.max(
    ...keuanganData.map((item) => item.jumlah),
  );

  const cards = [
    {
      title: "Siswa Aktif",
      value: siswaAktif,
      description: `${totalSiswa} total siswa`,
      icon: <FaUserGraduate />,
      color: "from-[#180161] to-[#4F1787]",
    },
    {
      title: "Pengajar Aktif",
      value: pengajarAktif,
      description: `${totalPengajar} total pengajar`,
      icon: <BsPeopleFill />,
      color: "from-[#EB3678] to-[#FB773C]",
    },
    {
      title: "Stok Modul",
      value: totalStokModul,
      description: `${modulStokRendah} modul perlu tambah stok`,
      icon: <FaBookOpen />,
      color: "from-[#4F1787] to-[#EB3678]",
    },
    {
      title: "Saldo Keuangan",
      value: formatRupiah(saldo),
      description: "Pemasukan - pengeluaran",
      icon: <FaWallet />,
      color: "from-[#FB773C] to-[#EB3678]",
    },
  ];

  return (
    <div
      id="dashboard-container"
      className="owner-bg min-h-screen rounded-[36px] p-5"
    >
      <PageHeader title="Dashboard" breadcrumb="Dashboard" />

      <div className="min-h-screen rounded-[36px] glass-panel p-6">
        <div className="mb-6 rounded-[36px] glass-card-dark p-6 text-white">
          <h2 className="text-3xl font-bold">Dashboard Owner SmartAHE</h2>
          <p className="mt-2 text-white/80">
            Ringkasan data siswa, pengajar, modul pembelajaran, dan keuangan.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-[32px] glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
            >
              <div className="flex items-center gap-5">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-3xl text-white shadow-lg`}
                >
                  {card.icon}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-1 text-3xl font-bold text-[#180161]">
                    {card.value}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <div className="rounded-[32px] glass-card p-6 xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#180161]">
                  Grafik Keuangan
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Ringkasan pemasukan dan pengeluaran SmartAHE.
                </p>
              </div>

              <select className="glass-input rounded-xl px-4 py-2 text-sm font-medium text-[#180161] outline-none focus:border-[#4F1787]">
                <option>Bulan Ini</option>
                <option>Minggu Ini</option>
              </select>
            </div>

            <div className="mb-4 flex justify-end gap-5 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#4F1787]"></span>
                <span className="text-gray-500">Pemasukan</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FB773C]"></span>
                <span className="text-gray-500">Pengeluaran</span>
              </div>
            </div>

            <div className="relative h-80 rounded-[32px] glass-panel p-6">
              <div className="absolute inset-x-6 top-10 border-t border-dashed border-white/60"></div>
              <div className="absolute inset-x-6 top-24 border-t border-dashed border-white/60"></div>
              <div className="absolute inset-x-6 top-40 border-t border-dashed border-white/60"></div>
              <div className="absolute inset-x-6 top-56 border-t border-dashed border-white/60"></div>

              <div className="relative flex h-full items-end gap-5">
                {keuanganData.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-1 flex-col items-center"
                  >
                    <div
                      className={`w-full rounded-t-2xl bg-gradient-to-t shadow-lg ${
                        item.jenis === "Pemasukan"
                          ? "from-[#180161] via-[#4F1787] to-[#EB3678]"
                          : "from-[#FB773C] to-[#EB3678]"
                      }`}
                      style={{
                        height: `${Math.max(
                          (item.jumlah / nilaiTertinggiKeuangan) * 100,
                          12,
                        )}%`,
                      }}
                    ></div>

                    <span className="mt-3 text-xs text-gray-500">
                      {item.jenis}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] glass-card p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#180161]">Stok Modul</h2>
              <p className="mt-1 text-sm text-gray-500">
                Pantauan stok modul pembelajaran.
              </p>
            </div>

            <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full bg-conic-gradient shadow-lg">
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full glass-card">
                <h3 className="text-3xl font-bold text-[#180161]">
                  {totalStokModul}
                </h3>
                <p className="text-sm text-gray-500">Total Stok</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {modulData.map((modul) => (
                <div key={modul.id} className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-500">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        modul.stok <= 50 ? "bg-[#FB773C]" : "bg-[#EB3678]"
                      }`}
                    ></span>
                    {modul.level}
                  </span>

                  <span className="font-semibold text-[#180161]">
                    {modul.stok} stok
                  </span>
                </div>
              ))}
            </div>

            {modulStokRendah > 0 && (
              <div className="mt-6 rounded-2xl bg-[#FB773C]/10 p-4 text-sm font-semibold text-[#FB773C]">
                {modulStokRendah} modul memiliki stok rendah. Segera tambah
                stok.
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="rounded-[32px] glass-card p-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#180161]">
                Siswa Terbaru
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Ringkasan data administrasi siswa.
              </p>
            </div>

            <div className="space-y-4">
              {siswaData.slice(0, 4).map((siswa) => (
                <div
                  key={siswa.id}
                  className="flex items-center justify-between rounded-2xl glass-panel p-4"
                >
                  <div>
                    <h3 className="font-bold text-[#180161]">{siswa.nama}</h3>
                    <p className="text-sm text-gray-500">
                      {siswa.level} • SPP {siswa.spp}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#4F1787]/10 px-3 py-1 text-xs font-bold text-[#4F1787]">
                    {siswa.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] glass-card p-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#180161]">
                Keuangan Terbaru
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Data pemasukan dan pengeluaran terbaru.
              </p>
            </div>

            <div className="space-y-4">
              {keuanganData.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl glass-panel p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${
                        item.jenis === "Pemasukan"
                          ? "bg-[#4F1787]/10 text-[#4F1787]"
                          : "bg-[#EB3678]/10 text-[#EB3678]"
                      }`}
                    >
                      <MdOutlinePayments />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#180161]">
                        {item.keterangan}
                      </h3>
                      <p className="text-sm text-gray-500">{item.tanggal}</p>
                    </div>
                  </div>

                  <p
                    className={`text-sm font-bold ${
                      item.jenis === "Pemasukan"
                        ? "text-[#4F1787]"
                        : "text-[#FB773C]"
                    }`}
                  >
                    {item.jenis === "Pemasukan" ? "+" : "-"}{" "}
                    {formatRupiah(item.jumlah)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
