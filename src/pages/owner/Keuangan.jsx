import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
  FaWallet,
  FaArrowDown,
  FaArrowUp,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import api from "../../services/api";

const Pagination = React.lazy(() => import("../../components/Pagination"));
const FormTambahKeuangan = React.lazy(() => import("./FormTambahKeuangan"));

const PageHeader = React.lazy(
  () => import("../../components/owner/PageHeader"),
);

export default function Keuangan() {
  const [showForm, setShowForm] = useState(false);
  const [listKeuangan, setListKeuangan] = useState([]);
  const [totalSaldo, setTotalSaldo] = useState(0);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const perPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const [lastPage, setLastPage] = useState(1);

  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    fetchKeuangan(currentPage);
  }, [currentPage]);

  const fetchKeuangan = async (page = 1) => {
    try {
      const response = await api.get(
        `/keuangan?page=${page}&per_page=${perPage}`,
      );
      setListKeuangan(response.data.data.data);

      setCurrentPage(response.data.data.current_page);

      setLastPage(response.data.data.last_page);

      setTotalData(response.data.data.total);
      setTotalSaldo(response.data.summary.total_saldo);

      setTotalPemasukan(response.data.summary.total_pemasukan);

      setTotalPengeluaran(response.data.summary.total_pengeluaran);
    } catch (error) {
      console.error(
        "Gagal mengambil data keuangan",
        error.response?.data || error,
      );
      alert("Gagal mengambil data keuangan dari backend.");
    }
  };

  const [editKeuangan, setEditKeuangan] = useState(null);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const totalDataKeuangan = totalData;

  const handleTambahKeuangan = async (data) => {
    try {
      await api.post("/keuangan", {
        tanggal: data.keuangan.tanggal,
        keterangan: data.keuangan.keterangan,
        jenis: data.keuangan.jenis,
        jumlah: data.keuangan.jumlah,
      });

      fetchKeuangan();
      setShowForm(false);
    } catch (error) {
      console.error("Gagal menambah keuangan", error.response?.data || error);

      const pesan =
        error.response?.data?.message || "Gagal menambah data keuangan.";

      alert(pesan);
    }
  };

  const handleEditKeuangan = async (data) => {
    try {
      await api.put(`/keuangan/${data.keuangan.id}`, {
        tanggal: data.keuangan.tanggal,
        keterangan: data.keuangan.keterangan,
        jenis: data.keuangan.jenis,
        jumlah: data.keuangan.jumlah,
      });

      fetchKeuangan();
      setEditKeuangan(null);
    } catch (error) {
      console.error("Gagal mengedit keuangan", error.response?.data || error);

      const pesan =
        error.response?.data?.message || "Gagal mengedit data keuangan.";

      alert(pesan);
    }
  };

  const _searchTerm = searchTerm.toLowerCase();

  const filteredKeuangan = listKeuangan.filter((item) => {
    const tanggal = (item.tanggal || "").toLowerCase();
    const keterangan = (item.keterangan || "").toLowerCase();
    const jenis = (item.jenis || "").toLowerCase();
    const jumlah = String(item.jumlah || "").toLowerCase();

    return (
      tanggal.includes(_searchTerm) ||
      keterangan.includes(_searchTerm) ||
      jenis.includes(_searchTerm) ||
      jumlah.includes(_searchTerm)
    );
  });

  return (
    <div
      id="keuangan-container"
      className="owner-bg min-h-screen rounded-[36px] p-5"
    >
      <PageHeader title="Data Keuangan" breadcrumb="Keuangan" />

      <div className="glass-panel rounded-[36px] p-6">
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
            onClick={() => setShowForm(true)}
            className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-[#180161] via-[#4F1787] to-[#EB3678] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105"
          >
            <IoMdAdd className="text-xl" />
            Tambah Keuangan
          </button>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-3">
          <div className="glass-card rounded-[32px] p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
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

          <div className="glass-card rounded-[32px] p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
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

          <div className="glass-card rounded-[32px] p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
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

        <div className="glass-card overflow-hidden rounded-[32px]">
          <div className="flex flex-col justify-between gap-4 border-b border-white/40 p-5 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold text-[#180161]">
                Daftar Keuangan
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Data laporan uang masuk dan keluar bimbingan belajar SmartAHE.
              </p>
            </div>

            <input
              type="text"
              name="searchTerm"
              placeholder="Cari data keuangan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787] focus:ring-4 focus:ring-[#4F1787]/10"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="bg-white/30 text-sm text-[#180161]">
                  <th className="px-6 py-4 text-center">No</th>
                  <th className="px-6 py-4 text-center">Tanggal</th>
                  <th className="px-6 py-4 text-center">Keterangan</th>
                  <th className="px-6 py-4 text-center">Jenis</th>
                  <th className="px-6 py-4 text-center">Jumlah</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredKeuangan.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/40 text-sm transition hover:bg-white/30"
                  >
                    <td className="px-6 py-4 text-center font-semibold text-[#180161]">
                      {(currentPage - 1) * perPage + index + 1}
                    </td>

                    <td className="px-6 py-4 text-center text-gray-500">
                      {item.tanggal}
                    </td>

                    <td className="px-6 py-4 text-center font-medium text-[#180161]">
                      {item.keterangan}
                    </td>

                    <td className="px-6 py-4 text-center">
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
                      className={`px-6 py-4 text-center font-bold ${
                        item.jenis === "Pemasukan"
                          ? "text-[#4F1787]"
                          : "text-[#FB773C]"
                      }`}
                    >
                      {formatRupiah(item.jumlah)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setEditKeuangan(item)}
                          className="rounded-xl bg-white/45 p-3 text-[#EB3678] shadow-sm transition hover:bg-[#EB3678] hover:text-white"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredKeuangan.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      Belum ada data keuangan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            totalData={totalData}
            perPage={perPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {showForm && (
        <FormTambahKeuangan
          onClose={() => setShowForm(false)}
          onSubmit={handleTambahKeuangan}
        />
      )}

      {editKeuangan && (
        <FormTambahKeuangan
          mode="edit"
          dataEdit={editKeuangan}
          onClose={() => setEditKeuangan(null)}
          onSubmit={handleEditKeuangan}
        />
      )}
    </div>
  );
}
