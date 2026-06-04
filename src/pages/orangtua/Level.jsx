import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  FaArrowLeft,
  FaBookOpen,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

import { siswaData } from "../../data/siswa";
import { levelPembelajaranData } from "../../data/levelPembelajaran";
import { pengajarData } from "../../data/pengajar";
import { modulData } from "../../data/modul";

export default function Level() {
  const { id } = useParams();
  const navigate = useNavigate();

  const siswa = siswaData.find((item) => item.id === Number(id));

  if (!siswa) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-md">
        Data siswa tidak ditemukan.
      </div>
    );
  }

  const levelData = levelPembelajaranData.find(
    (item) => item.idSiswa === siswa.id,
  );

  const pengajar = pengajarData.find(
    (item) => item.id === levelData?.idPengajar,
  );

  const modul = modulData.find((item) => item.level === levelData?.level);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const getProgress = (level) => {
    switch (level) {
      case "Level 1":
        return 25;
      case "Level 2":
        return 50;
      case "Level 3":
        return 75;
      case "Level 4":
        return 100;
      default:
        return 0;
    }
  };

  const progress = getProgress(levelData?.level);

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/orangtua/dashboard")}
        className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-[#B5838D] shadow-md transition hover:scale-105"
      >
        <FaArrowLeft />
        Kembali
      </button>

      <section className="rounded-[40px] bg-white p-8 shadow-md">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 inline-block rounded-full bg-[#E5989B]/10 px-4 py-2 text-sm font-bold text-[#E5989B]">
              Detail Level Pembelajaran
            </p>

            <h1 className="text-5xl font-extrabold text-[#6D6875]">
              {siswa.nama}
            </h1>

            <p className="mt-3 text-gray-500">
              Dibimbing oleh <b>{pengajar ? pengajar.nama : "-"}</b>
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-[#FFF1EB] p-5">
                <FaUserGraduate className="text-3xl text-[#B5838D]" />

                <p className="mt-3 text-sm text-gray-500">Level Saat Ini</p>

                <h3 className="text-2xl font-bold text-[#6D6875]">
                  {levelData?.level || "-"}
                </h3>
              </div>

              <div className="rounded-3xl bg-[#FFE5D9] p-5">
                <FaBookOpen className="text-3xl text-[#FFB4A2]" />

                <p className="mt-3 text-sm text-gray-500">Modul</p>

                <h3 className="text-xl font-bold text-[#6D6875]">
                  {modul?.namaModul || "-"}
                </h3>
              </div>

              <div className="rounded-3xl bg-[#FFF1EB] p-5">
                <FaChalkboardTeacher className="text-3xl text-[#B5838D]" />

                <p className="mt-3 text-sm text-gray-500">Pengajar</p>

                <h3 className="text-xl font-bold text-[#6D6875]">
                  {pengajar?.nama || "-"}
                </h3>
              </div>

              <div className="rounded-3xl bg-[#FFE5D9] p-5">
                <p className="text-sm text-gray-500">Status Belajar</p>

                <h3 className="mt-3 text-xl font-bold text-[#6D6875]">
                  {levelData?.status || "-"}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-gradient-to-br from-[#B5838D] via-[#E5989B] to-[#FFB4A2] p-8 text-white">
            <p className="text-sm text-white/80">Progress Pembelajaran</p>

            <h2 className="mt-3 text-6xl font-extrabold">{progress}%</h2>

            <div className="mt-6 h-4 rounded-full bg-white/20">
              <div
                className="h-4 rounded-full bg-white"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="mt-6 text-white/90">{levelData?.kemampuan}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[36px] bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold text-[#6D6875]">
          Catatan Perkembangan
        </h2>

        <div className="mt-4 rounded-3xl bg-[#FFF1EB] p-6">
          <p className="leading-relaxed text-gray-600">
            {levelData?.kemampuan || "Belum ada catatan perkembangan."}
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          Update terakhir : {levelData?.tanggalUpdate || "-"}
        </p>
      </section>
    </div>
  );
}
