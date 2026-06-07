import React, { useState } from "react";
import {
  FaEdit,
  FaClipboardList,
  FaUserGraduate,
  FaBookOpen,
} from "react-icons/fa";

import { levelPembelajaranData } from "../../data/levelPembelajaran";
import { siswaData } from "../../data/siswa";
import { pengajarData } from "../../data/pengajar";
import { modulData } from "../../data/modul";

const FormCatatLevel = React.lazy(() => import("./FormCatatLevel"));

const PengajarPageHeader = React.lazy(
  () => import("../../components/pengajar/PageHeader"),
);

export default function Level() {
  const [showForm, setShowForm] = useState(false);
  const [listLevel, setListLevel] = useState(levelPembelajaranData);
  const [editLevel, setEditLevel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("");

  const pengajarLogin = pengajarData.find((pengajar) => {
    return pengajar.nama === "Bu Rina";
  });

  const dataLevelPengajar = listLevel.filter((level) => {
    return level.idPengajar === pengajarLogin.id;
  });

  const totalSiswa = dataLevelPengajar.length;

  const totalLevelBerbeda = new Set(dataLevelPengajar.map((item) => item.level))
    .size;

  const totalModulTerkait = dataLevelPengajar.filter((item) => {
    return modulData.some((modul) => modul.level === item.level);
  }).length;

  const siswaYangSudahAdaLevel = dataLevelPengajar.map((item) => item.idSiswa);

  const siswaBelumDicatat = siswaData.filter((siswa) => {
    return !siswaYangSudahAdaLevel.includes(siswa.id);
  });

  const getSiswa = (idSiswa) => {
    return siswaData.find((siswa) => siswa.id === idSiswa);
  };

  const getModul = (levelSiswa) => {
    return modulData.find((modul) => modul.level === levelSiswa);
  };

  const handleTambahLevel = (data) => {
    const levelBaru = {
      id: listLevel.length + 1,
      idSiswa: data.levelPembelajaran.idSiswa,
      idPengajar: data.levelPembelajaran.idPengajar,
      level: data.levelPembelajaran.level,
      keterangan: data.levelPembelajaran.keterangan,
    };

    setListLevel([...listLevel, levelBaru]);
    setShowForm(false);
  };

  const handleEditLevel = (data) => {
    const hasilUpdate = listLevel.map((item) => {
      if (item.id === data.levelPembelajaran.id) {
        return {
          ...item,
          idSiswa: data.levelPembelajaran.idSiswa,
          idPengajar: data.levelPembelajaran.idPengajar,
          level: data.levelPembelajaran.level,
          keterangan: data.levelPembelajaran.keterangan,
        };
      }

      return item;
    });

    setListLevel(hasilUpdate);
    setEditLevel(null);
  };

  const filteredLevel = dataLevelPengajar.filter((item) => {
    const siswa = getSiswa(item.idSiswa);
    const modul = getModul(item.level);

    const namaSiswa = siswa?.nama?.toLowerCase() || "";
    const level = item.level.toLowerCase();
    const namaModul = modul?.namaModul?.toLowerCase() || "";
    const keterangan = item.keterangan?.toLowerCase() || "";

    const cocokSearch =
      namaSiswa.includes(searchTerm.toLowerCase()) ||
      level.includes(searchTerm.toLowerCase()) ||
      namaModul.includes(searchTerm.toLowerCase()) ||
      keterangan.includes(searchTerm.toLowerCase());

    const cocokFilter = filterLevel === "" || item.level === filterLevel;

    return cocokSearch && cocokFilter;
  });

  return (
    <div className="pengajar-bg min-h-screen rounded-[36px] p-5">
      <PengajarPageHeader
        title="Level Pembelajaran"
        breadcrumb="Level Pembelajaran"
      />

      <div className="pengajar-glass-panel rounded-[32px] p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#240a29]">
              Data Level Pembelajaran Siswa
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Pengajar dapat melihat dan memperbarui level pembelajaran siswa
              yang diajarnya.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-2xl bg-gradient-to-r from-[#6b1d7c] via-[#cf30a2] to-[#ed6a45] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105"
          >
            + Catat Level Baru
          </button>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-3">
          <div className="pengajar-glass-card rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#6b1d7c] to-[#b230cf] p-4 text-2xl text-white shadow-md">
                <FaClipboardList />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Total Siswa
                </p>

                <h3 className="text-3xl font-bold text-[#240a29]">
                  {totalSiswa}
                </h3>
              </div>
            </div>
          </div>

          <div className="pengajar-glass-card rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#cf30a2] to-[#ed6a45] p-4 text-2xl text-white shadow-md">
                <FaUserGraduate />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Level Berbeda
                </p>

                <h3 className="text-3xl font-bold text-[#240a29]">
                  {totalLevelBerbeda}
                </h3>
              </div>
            </div>
          </div>

          <div className="pengajar-glass-card rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#ed6a45] to-[#cf30a2] p-4 text-2xl text-white shadow-md">
                <FaBookOpen />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Modul Terkait
                </p>

                <h3 className="text-3xl font-bold text-[#240a29]">
                  {totalModulTerkait}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="pengajar-glass-card overflow-hidden rounded-3xl">
          <div className="flex flex-col justify-between gap-4 border-b border-white/50 p-5 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold text-[#240a29]">
                Daftar Level Siswa
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Data sementara menggunakan state React.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari siswa, level, modul..."
                className="pengajar-glass-input rounded-2xl px-5 py-3 text-sm text-[#240a29] outline-none placeholder:text-gray-400 focus:border-[#cf30a2] focus:ring-4 focus:ring-[#cf30a2]/10"
              />

              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="pengajar-glass-input rounded-2xl px-5 py-3 text-sm text-[#240a29] outline-none focus:border-[#cf30a2]"
              >
                <option value="">Semua Level</option>
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="Level 3">Level 3</option>
                <option value="Level 4">Level 4</option>
                <option value="Level 5">Level 5</option>
                <option value="Level 6">Level 6</option>
                <option value="Level 7">Level 7</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead>
                <tr className="bg-white/35 text-sm text-[#240a29] backdrop-blur-md">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Nama Siswa</th>
                  <th className="px-6 py-4">Level</th>
                  <th className="px-6 py-4">Modul</th>
                  <th className="px-6 py-4">Keterangan</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredLevel.map((item, index) => {
                  const siswa = getSiswa(item.idSiswa);
                  const modul = getModul(item.level);

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-white/40 text-sm transition hover:bg-white/35"
                    >
                      <td className="px-6 py-4 font-semibold text-[#240a29]">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6b1d7c] to-[#cf30a2] font-bold text-white shadow-md">
                            {siswa ? siswa.nama.charAt(0) : "-"}
                          </div>

                          <span className="font-bold text-[#240a29]">
                            {siswa ? siswa.nama : "Data siswa tidak ditemukan"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full border border-[#cf30a2]/20 bg-[#cf30a2]/10 px-3 py-1 text-xs font-bold text-[#cf30a2] backdrop-blur-md">
                          {item.level}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {modul ? modul.namaModul : "-"}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {item.keterangan || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => setEditLevel(item)}
                            className="rounded-xl bg-white/45 p-3 text-[#cf30a2] shadow-sm transition hover:bg-[#cf30a2] hover:text-white"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredLevel.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      Data level pembelajaran tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <FormCatatLevel
          onClose={() => setShowForm(false)}
          onSubmit={handleTambahLevel}
          siswaList={siswaBelumDicatat}
          pengajarLogin={pengajarLogin}
        />
      )}

      {editLevel && (
        <FormCatatLevel
          mode="edit"
          dataEdit={editLevel}
          onClose={() => setEditLevel(null)}
          onSubmit={handleEditLevel}
          siswaList={siswaData}
          pengajarLogin={pengajarLogin}
        />
      )}
    </div>
  );
}
