import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaEdit, FaTrash, FaChalkboardTeacher } from "react-icons/fa";

import api from "../../services/api";
import { levelPembelajaranData } from "../../data/levelPembelajaran";

const FormTambahPengajar = React.lazy(() => import("./FormTambahPengajar"));
const Pagination = React.lazy(() => import("../../components/Pagination"));

const PageHeader = React.lazy(
  () => import("../../components/owner/PageHeader"),
);

export default function Pengajar() {
  const [showForm, setShowForm] = useState(false);
  const [listPengajar, setListPengajar] = useState([]);
  const [editPengajar, setEditPengajar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const perPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const [lastPage, setLastPage] = useState(1);

  const [totalData, setTotalData] = useState(0);

  const [summary, setSummary] = useState({
    total_pengajar: 0,
    pengajar_membimbing: 0,
    total_bimbingan: 0,
  });

  useEffect(() => {
    fetchPengajar(currentPage);
  }, [currentPage]);

  const fetchPengajar = async (page = 1) => {
    try {
      const response = await api.get(
        `/pengajar?page=${page}&per_page=${perPage}`,
      );

      setListPengajar(response.data.data.data);

      setCurrentPage(response.data.data.current_page);

      setLastPage(response.data.data.last_page);

      setTotalData(response.data.data.total);
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Gagal mengambil data pengajar", error);
    }
  };

  const getJumlahMurid = (pengajar) => {
    return pengajar.level_pembelajaran?.length || 0;
  };

  const _searchTerm = searchTerm.toLowerCase();

  const filteredPengajar = listPengajar.filter((pengajar) => {
    const nama_pengajar = pengajar.nama_pengajar.toLowerCase();
    const no_hp = pengajar.no_hp.toLowerCase();
    const alamat = pengajar.alamat.toLowerCase();
    const jumlahMurid = String(getJumlahMurid(pengajar.id)).toLowerCase();

    return (
      nama_pengajar.includes(_searchTerm) ||
      no_hp.includes(_searchTerm) ||
      alamat.includes(_searchTerm) ||
      jumlahMurid.includes(_searchTerm)
    );
  });

  const handleTambahPengajar = async (data) => {
    try {
      await api.post("/pengajar", {
        nama_pengajar: data.pengajar.nama_pengajar,
        no_hp: data.pengajar.no_hp,
        alamat: data.pengajar.alamat,
        email: data.akunPengajar.email,
        password: data.akunPengajar.password,
      });

      fetchPengajar();
      setShowForm(false);
    } catch (error) {
      console.error("Gagal menambah pengajar", error);
      alert("Gagal menambah pengajar.");
    }
  };

  const handleEditPengajar = async (data) => {
    try {
      await api.put(`/pengajar/${data.pengajar.id}`, {
        nama_pengajar: data.pengajar.nama_pengajar,
        no_hp: data.pengajar.no_hp,
        alamat: data.pengajar.alamat,
      });

      fetchPengajar();
      setEditPengajar(null);
    } catch (error) {
      console.error("Gagal mengedit pengajar", error);
      alert("Gagal mengedit data pengajar.");
    }
  };

  const handleHapusPengajar = async (idPengajar) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menghapus data pengajar ini?",
    );

    if (!konfirmasi) return;

    try {
      await api.delete(`/pengajar/${idPengajar}`);

      fetchPengajar();
    } catch (error) {
      console.error("Gagal menghapus pengajar", error);

      const pesan =
        error.response?.data?.message || "Gagal menghapus data pengajar.";

      alert(pesan);
    }
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
            onClick={() => setShowForm(true)}
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
                  {summary.total_pengajar}
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
                  {summary.pengajar_membimbing}
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
                  Bimbingan Aktif
                </p>

                <h3 className="text-3xl font-bold text-[#180161]">
                  {summary.total_bimbingan}
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
                Data sementara menggunakan state React.
              </p>
            </div>

            <input
              type="text"
              name="searchTerm"
              placeholder="Cari nama, no HP, alamat, atau jumlah murid..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input rounded-2xl px-5 py-3 text-sm text-[#180161] outline-none placeholder:text-gray-400 focus:border-[#4F1787]/50 focus:ring-4 focus:ring-[#4F1787]/10"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="bg-white/35 text-sm text-[#180161] backdrop-blur-md">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Nama Pengajar</th>
                  <th className="px-6 py-4">No HP</th>
                  <th className="px-6 py-4">Alamat</th>
                  <th className="px-6 py-4">Jumlah Murid</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredPengajar.map((pengajar, index) => (
                  <tr
                    key={pengajar.id}
                    className="border-b border-white/40 text-sm transition hover:bg-white/35"
                  >
                    <td className="px-6 py-4 font-semibold text-[#180161]">
                      {(currentPage - 1) * perPage + index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-bold text-[#180161]">
                        {pengajar.nama_pengajar}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {pengajar.no_hp}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {pengajar.alamat}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[#4F1787]/10 px-3 py-1 text-xs font-bold text-[#4F1787]">
                        {getJumlahMurid(pengajar)} Murid
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setEditPengajar(pengajar)}
                          className="rounded-xl bg-white/45 p-3 text-[#EB3678] shadow-sm transition hover:bg-[#EB3678] hover:text-white"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleHapusPengajar(pengajar.id)}
                          className="rounded-xl bg-white/45 p-3 text-[#FB773C] shadow-sm transition hover:bg-[#FB773C] hover:text-white"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredPengajar.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      Data pengajar tidak ditemukan.
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
        <FormTambahPengajar
          onClose={() => setShowForm(false)}
          onSubmit={handleTambahPengajar}
        />
      )}

      {editPengajar && (
        <FormTambahPengajar
          mode="edit"
          dataEdit={editPengajar}
          onClose={() => setEditPengajar(null)}
          onSubmit={handleEditPengajar}
        />
      )}
    </div>
  );
}
