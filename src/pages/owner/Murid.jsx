import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaEdit, FaTrash, FaUserGraduate } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

import { siswaData } from "../../data/siswa";
import { orangTuaData } from "../../data/orangTua";
import { pengajarData } from "../../data/pengajar";
import { levelPembelajaranData } from "../../data/levelPembelajaran";

const FormTambahSiswa = React.lazy(() => import("./FormTambahSiswa"));

const PageHeader = React.lazy(
  () => import("../../components/owner/PageHeader"),
);

export default function Murid() {
  const [showForm, setShowForm] = useState(false);
  const [listSiswa, setListSiswa] = useState(siswaData);
  const [listOrangTua, setListOrangTua] = useState(orangTuaData);
  const [listPengajar] = useState(pengajarData);
  const [listLevel, setListLevel] = useState(levelPembelajaranData);
  const [editSiswa, setEditSiswa] = useState(null);

  const totalSiswa = listSiswa.length;
  const totalOrangTua = listOrangTua.length;

  const getOrangTua = (idOrangTua) => {
    const orangTua = listOrangTua.find(
      (item) => item.id === Number(idOrangTua),
    );

    return orangTua ? orangTua.nama : "-";
  };

  const getIdPengajarSiswa = (idSiswa) => {
    const level = listLevel.find((item) => item.idSiswa === Number(idSiswa));
    return level ? level.idPengajar : "";
  };

  const getNamaPengajar = (idSiswa) => {
    const idPengajar = getIdPengajarSiswa(idSiswa);

    const pengajar = listPengajar.find(
      (item) => item.id === Number(idPengajar),
    );

    return pengajar ? pengajar.nama : "-";
  };

  const handleTambahSiswa = (data) => {
    let idOrangTua = Number(data.siswa.idOrangTua);

    if (data.tipeOrangTua === "baru") {
      const orangTuaBaru = {
        id: listOrangTua.length + 1,
        nama: data.orangTua.nama,
        noHp: data.orangTua.noHp,
        alamat: data.orangTua.alamat,
      };

      setListOrangTua([...listOrangTua, orangTuaBaru]);
      idOrangTua = orangTuaBaru.id;
    }

    const idSiswaBaru = listSiswa.length + 1;

    const siswaBaru = {
      id: idSiswaBaru,
      nama: data.siswa.nama,
      jenisKelamin: data.siswa.jenisKelamin,
      tanggalLahir: data.siswa.tanggalLahir,
      alamat: data.siswa.alamat,
      idOrangTua: idOrangTua,
    };

    const levelBaru = {
      id: listLevel.length + 1,
      idSiswa: idSiswaBaru,
      idPengajar: Number(data.siswa.idPengajar),
      level: "Level 1",
      keterangan: "Siswa baru mendaftar",
    };

    setListSiswa([...listSiswa, siswaBaru]);
    setListLevel([...listLevel, levelBaru]);
    setShowForm(false);
  };

  const handleEditSiswa = (data) => {
    const hasilUpdateSiswa = listSiswa.map((siswa) => {
      if (siswa.id === data.siswa.id) {
        return {
          ...siswa,
          nama: data.siswa.nama,
          jenisKelamin: data.siswa.jenisKelamin,
          tanggalLahir: data.siswa.tanggalLahir,
          alamat: data.siswa.alamat,
          idOrangTua: Number(data.siswa.idOrangTua),
        };
      }

      return siswa;
    });

    const hasilUpdateLevel = listLevel.map((level) => {
      if (level.idSiswa === data.siswa.id) {
        return {
          ...level,
          idPengajar: Number(data.siswa.idPengajar),
        };
      }

      return level;
    });

    setListSiswa(hasilUpdateSiswa);
    setListLevel(hasilUpdateLevel);
    setEditSiswa(null);
  };

  const handleHapusSiswa = (idSiswa) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menghapus data siswa ini?",
    );

    if (!konfirmasi) return;

    const hasilHapusSiswa = listSiswa.filter((siswa) => siswa.id !== idSiswa);
    const hasilHapusLevel = listLevel.filter(
      (level) => level.idSiswa !== idSiswa,
    );

    setListSiswa(hasilHapusSiswa);
    setListLevel(hasilHapusLevel);
  };

  return (
    <div
      id="siswa-container"
      className="owner-bg min-h-screen rounded-[36px] p-5"
    >
      <PageHeader title="Data Siswa" breadcrumb="Siswa" />

      <div className="glass-panel rounded-[32px] p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#180161]">
              Data Siswa SmartAHE
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Kelola data siswa, orang tua, dan pengajar siswa.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-[#180161] via-[#4F1787] to-[#EB3678] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105"
          >
            <IoMdAdd className="text-xl" />
            Tambah Siswa
          </button>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-3">
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#180161] to-[#4F1787] p-4 text-2xl text-white shadow-md">
                <FaUserGraduate />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Siswa
                </p>

                <h3 className="text-3xl font-bold text-[#180161]">
                  {totalSiswa}
                </h3>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#EB3678] to-[#FB773C] p-4 text-2xl text-white shadow-md">
                <BsPeopleFill />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Orang Tua
                </p>

                <h3 className="text-3xl font-bold text-[#180161]">
                  {totalOrangTua}
                </h3>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#FB773C] to-[#EB3678] p-4 text-2xl text-white shadow-md">
                <FaUserGraduate />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Pengajar
                </p>

                <h3 className="text-3xl font-bold text-[#180161]">
                  {listPengajar.length}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card overflow-hidden rounded-3xl">
          <div className="flex flex-col justify-between gap-4 border-b border-white/50 p-5 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold text-[#180161]">Daftar Siswa</h3>

              <p className="mt-1 text-sm text-gray-500">
                Data sementara menggunakan state React.
              </p>
            </div>

            <input
              type="text"
              placeholder="Cari nama siswa..."
              className="glass-input rounded-2xl px-5 py-3 text-sm text-[#180161] outline-none placeholder:text-gray-400 focus:border-[#4F1787]/50 focus:ring-4 focus:ring-[#4F1787]/10"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead>
                <tr className="bg-white/35 text-sm text-[#180161] backdrop-blur-md">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Nama Siswa</th>
                  <th className="px-6 py-4">Jenis Kelamin</th>
                  <th className="px-6 py-4">Tanggal Lahir</th>
                  <th className="px-6 py-4">Orang Tua</th>
                  <th className="px-6 py-4">Pengajar</th>
                  <th className="px-6 py-4">Alamat</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {listSiswa.map((siswa, index) => (
                  <tr
                    key={siswa.id}
                    className="border-b border-white/40 text-sm transition hover:bg-white/35"
                  >
                    <td className="px-6 py-4 font-semibold text-[#180161]">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-bold text-[#180161]">
                        {siswa.nama}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {siswa.jenisKelamin || "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {siswa.tanggalLahir || "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {getOrangTua(siswa.idOrangTua)}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {getNamaPengajar(siswa.id)}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {siswa.alamat || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            setEditSiswa({
                              ...siswa,
                              idPengajar: getIdPengajarSiswa(siswa.id),
                            })
                          }
                          className="rounded-xl bg-white/45 p-3 text-[#EB3678] shadow-sm transition hover:bg-[#EB3678] hover:text-white"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleHapusSiswa(siswa.id)}
                          className="rounded-xl bg-white/45 p-3 text-[#FB773C] shadow-sm transition hover:bg-[#FB773C] hover:text-white"
                        >
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

      {showForm && (
        <FormTambahSiswa
          onClose={() => setShowForm(false)}
          onSubmit={handleTambahSiswa}
          orangTuaList={listOrangTua}
          pengajarList={listPengajar}
        />
      )}

      {editSiswa && (
        <FormTambahSiswa
          mode="edit"
          dataEdit={editSiswa}
          onClose={() => setEditSiswa(null)}
          onSubmit={handleEditSiswa}
          orangTuaList={listOrangTua}
          pengajarList={listPengajar}
        />
      )}
    </div>
  );
}
