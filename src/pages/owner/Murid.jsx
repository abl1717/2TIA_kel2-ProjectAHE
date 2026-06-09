import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaEdit, FaTrash, FaUserGraduate } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

import api from "../../services/api";

const FormTambahSiswa = React.lazy(() => import("./FormTambahSiswa"));

const PageHeader = React.lazy(
  () => import("../../components/owner/PageHeader"),
);

export default function Murid() {
  const [showForm, setShowForm] = useState(false);
  const [listSiswa, setListSiswa] = useState([]);
  const [listOrangTua, setListOrangTua] = useState([]);
  const [listPengajar, setListPengajar] = useState([]);
  const [listLevel, setListLevel] = useState([]);
  const [editSiswa, setEditSiswa] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDataMurid();
  }, []);

  const fetchDataMurid = async () => {
    try {
      const [siswaResponse, orangTuaResponse, pengajarResponse] =
        await Promise.all([
          api.get("/siswa"),
          api.get("/orang-tua"),
          api.get("/pengajar"),
        ]);

      setListSiswa(siswaResponse.data.data);
      setListOrangTua(orangTuaResponse.data.data);
      setListPengajar(pengajarResponse.data.data);
    } catch (error) {
      console.error("Gagal mengambil data murid", error);
      alert("Gagal mengambil data murid dari backend.");
    }
  };

  const totalSiswa = listSiswa.length;
  const totalOrangTua = listOrangTua.length;

  const getOrangTua = (siswa) => {
    return siswa.orang_tua?.nama_orang_tua || "-";
  };

  const getIdPengajarSiswa = (siswa) => {
    return siswa.level_pembelajaran?.[0]?.pengajar_id || "";
  };

  const getNamaPengajar = (siswa) => {
    return siswa.level_pembelajaran?.[0]?.pengajar?.nama_pengajar || "-";
  };

  const _searchTerm = searchTerm.toLowerCase();

  const filteredSiswa = listSiswa.filter((siswa) => {
    const namaSiswa = (siswa.nama_siswa || "").toLowerCase();
    const jenisKelamin = (siswa.jenis_kelamin || "").toLowerCase();
    const tanggalLahir = (siswa.tanggal_lahir || "").toLowerCase();
    const alamat = (siswa.alamat || "").toLowerCase();
    const namaOrangTua = getOrangTua(siswa).toLowerCase();
    const namaPengajar = getNamaPengajar(siswa).toLowerCase();

    return (
      namaSiswa.includes(_searchTerm) ||
      jenisKelamin.includes(_searchTerm) ||
      tanggalLahir.includes(_searchTerm) ||
      alamat.includes(_searchTerm) ||
      namaOrangTua.includes(_searchTerm) ||
      namaPengajar.includes(_searchTerm)
    );
  });

  const handleTambahSiswa = async (data) => {
    try {
      const payload = {
        tipe_orang_tua: data.tipeOrangTua,

        nama_siswa: data.siswa.nama,
        jenis_kelamin: data.siswa.jenisKelamin,
        tanggal_lahir: data.siswa.tanggalLahir,
        alamat: data.siswa.alamat,
        pengajar_id: data.siswa.idPengajar,
      };

      if (data.tipeOrangTua === "lama") {
        payload.orang_tua_id = data.siswa.idOrangTua;
      }

      if (data.tipeOrangTua === "baru") {
        payload.nama_orang_tua = data.orangTua.nama;
        payload.no_hp = data.orangTua.noHp;
        payload.alamat_orang_tua = data.orangTua.alamat;
        payload.email = data.akunOrangTua.email;
        payload.password = data.akunOrangTua.password;
      }

      await api.post("/siswa", payload);

      fetchDataMurid();
      setShowForm(false);
    } catch (error) {
      console.error("Gagal menambah siswa", error.response?.data || error);

      const pesan =
        error.response?.data?.message || "Gagal menambah data siswa.";

      alert(pesan);
    }
  };

  const handleEditSiswa = async (data) => {
    try {
      await api.put(`/siswa/${data.siswa.id}`, {
        nama_siswa: data.siswa.nama,
        jenis_kelamin: data.siswa.jenisKelamin,
        tanggal_lahir: data.siswa.tanggalLahir,
        alamat: data.siswa.alamat,
        orang_tua_id: data.siswa.idOrangTua,
        pengajar_id: data.siswa.idPengajar,
      });

      fetchDataMurid();
      setEditSiswa(null);
    } catch (error) {
      console.error("Gagal mengedit siswa", error.response?.data || error);

      const pesan =
        error.response?.data?.message || "Gagal mengedit data siswa.";

      alert(pesan);
    }
  };

  const handleHapusSiswa = async (idSiswa) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menghapus data siswa ini?",
    );

    if (!konfirmasi) return;

    try {
      await api.delete(`/siswa/${idSiswa}`);

      fetchDataMurid();
    } catch (error) {
      console.error("Gagal menghapus siswa", error.response?.data || error);

      const pesan =
        error.response?.data?.message || "Gagal menghapus data siswa.";

      alert(pesan);
    }
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
              name="searchTerm"
              placeholder="Cari siswa, orang tua, atau pengajar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                {filteredSiswa.map((siswa, index) => (
                  <tr
                    key={siswa.id}
                    className="border-b border-white/40 text-sm transition hover:bg-white/35"
                  >
                    <td className="px-6 py-4 font-semibold text-[#180161]">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-bold text-[#180161]">
                        {siswa.nama_siswa}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {siswa.jenis_kelamin || "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {siswa.tanggal_lahir || "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {getOrangTua(siswa)}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {getNamaPengajar(siswa)}
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
                              idOrangTua: siswa.orang_tua_id,
                              idPengajar: getIdPengajarSiswa(siswa),
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

                {filteredSiswa.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      Data siswa tidak ditemukan.
                    </td>
                  </tr>
                )}
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
