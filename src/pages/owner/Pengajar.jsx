import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaEdit, FaTrash, FaChalkboardTeacher } from "react-icons/fa";

import { pengajarData } from "../../data/pengajar";
import { levelPembelajaranData } from "../../data/levelPembelajaran";

const FormTambahPengajar = React.lazy(() => import("./FormTambahPengajar"));

const PageHeader = React.lazy(
  () => import("../../components/owner/PageHeader"),
);

export default function Pengajar() {
  const [showForm, setShowForm] = useState(false);
  const [listPengajar, setListPengajar] = useState(pengajarData);
  const [editPengajar, setEditPengajar] = useState(null);

  const totalPengajar = listPengajar.length;

  const totalBimbingan = levelPembelajaranData.length;

  const pengajarMemilikiMurid = listPengajar.filter((pengajar) => {
    return levelPembelajaranData.some((level) => {
      return level.idPengajar === pengajar.id;
    });
  }).length;

  const getJumlahMurid = (idPengajar) => {
    return levelPembelajaranData.filter((level) => {
      return level.idPengajar === idPengajar;
    }).length;
  };

  const handleTambahPengajar = (data) => {
    const pengajarBaru = {
      id: listPengajar.length + 1,
      nama: data.pengajar.nama,
      noHp: data.pengajar.noHp,
      alamat: data.pengajar.alamat,
    };

    setListPengajar([...listPengajar, pengajarBaru]);
    setShowForm(false);
  };

  const handleEditPengajar = (data) => {
    const hasilUpdate = listPengajar.map((pengajar) => {
      if (pengajar.id === data.pengajar.id) {
        return {
          ...pengajar,
          nama: data.pengajar.nama,
          noHp: data.pengajar.noHp,
          alamat: data.pengajar.alamat,
        };
      }

      return pengajar;
    });

    setListPengajar(hasilUpdate);
    setEditPengajar(null);
  };

  const handleHapusPengajar = (idPengajar) => {
    const jumlahMurid = getJumlahMurid(idPengajar);

    if (jumlahMurid > 0) {
      alert(
        "Pengajar ini masih memiliki data bimbingan murid. Data tidak bisa dihapus.",
      );
      return;
    }

    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menghapus data pengajar ini?",
    );

    if (!konfirmasi) return;

    const hasilHapus = listPengajar.filter((pengajar) => {
      return pengajar.id !== idPengajar;
    });

    setListPengajar(hasilHapus);
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
                  Pengajar Membimbing
                </p>

                <h3 className="text-3xl font-bold text-[#180161]">
                  {pengajarMemilikiMurid}
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
                Data sementara menggunakan state React.
              </p>
            </div>

            <input
              type="text"
              placeholder="Cari nama pengajar..."
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
                {listPengajar.map((pengajar, index) => (
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

                {listPengajar.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      Belum ada data pengajar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
