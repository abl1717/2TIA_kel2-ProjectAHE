import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBookOpen,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

import api from "../../services/api";

export default function Level() {
  const [siswa, setSiswa] = useState(null);
  const [levelData, setLevelData] = useState(null);
  const [pengajar, setPengajar] = useState(null);
  const [modul, setModul] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    fetchDetailLevel();
  }, [id]);

  const fetchDetailLevel = async () => {
    try {
      const [siswaRes, levelRes, pengajarRes, modulRes] = await Promise.all([
        api.get(`/siswa/${id}`),
        api.get("/level-pembelajaran"),
        api.get("/pengajar"),
        api.get("/modul-pembelajaran"),
      ]);

      const siswaData = siswaRes.data.data;
      const levelAnak = levelRes.data.data.find((item) => {
        return item.siswa_id === Number(id);
      });

      const pengajarData = pengajarRes.data.data.find((item) => {
        return item.id === levelAnak?.pengajar_id;
      });

      const modulData = modulRes.data.data.find((item) => {
        return item.level === levelAnak?.level;
      });

      setSiswa(siswaData);
      setLevelData(levelAnak || null);
      setPengajar(pengajarData || null);
      setModul(modulData || null);
    } catch (error) {
      console.error(
        "Gagal mengambil detail level anak",
        error.response?.data || error,
      );
      setSiswa(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orangtua-glass-panel rounded-3xl p-8 text-center text-[#6D6875]">
        Memuat data level anak...
      </div>
    );
  }

  if (!siswa) {
    return (
      <div className="orangtua-glass-panel rounded-3xl p-8 text-center text-[#6D6875]">
        Data siswa tidak ditemukan.
      </div>
    );
  }

  const getProgress = (level) => {
    switch (level) {
      case "Level 1":
        return 15;
      case "Level 2":
        return 30;
      case "Level 3":
        return 45;
      case "Level 4":
        return 60;
      case "Level 5":
        return 75;
      case "Level 6":
        return 90;
      case "Level 7":
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
        className="orangtua-glass-input flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-[#B5838D] transition hover:scale-105 hover:bg-white/70"
      >
        <FaArrowLeft />
        Kembali
      </button>

      <section className="orangtua-glass-panel relative overflow-hidden rounded-[40px] p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FFB4A2]/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#B5838D]/20 blur-3xl"></div>

        <div className="relative z-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="orangtua-glass-input mb-3 inline-block rounded-full px-4 py-2 text-sm font-bold text-[#E5989B]">
              Detail Level Pembelajaran
            </p>

            <h1 className="text-5xl font-extrabold text-[#6D6875]">
              {siswa.nama_siswa}
            </h1>

            <p className="mt-3 text-gray-500">
              Dibimbing oleh <b>{pengajar ? pengajar.nama_pengajar : "-"}</b>
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="orangtua-glass-card rounded-3xl p-5">
                <FaUserGraduate className="text-3xl text-[#B5838D]" />

                <p className="mt-3 text-sm text-gray-500">Level Saat Ini</p>

                <h3 className="text-2xl font-bold text-[#6D6875]">
                  {levelData?.level || "-"}
                </h3>
              </div>

              <div className="orangtua-glass-card rounded-3xl p-5">
                <FaBookOpen className="text-3xl text-[#FFB4A2]" />

                <p className="mt-3 text-sm text-gray-500">Modul</p>

                <h3 className="text-xl font-bold text-[#6D6875]">
                  {modul?.nama || "-"}
                </h3>
              </div>

              <div className="orangtua-glass-card rounded-3xl p-5">
                <FaChalkboardTeacher className="text-3xl text-[#B5838D]" />

                <p className="mt-3 text-sm text-gray-500">Pengajar</p>

                <h3 className="text-xl font-bold text-[#6D6875]">
                  {pengajar?.nama_pengajar || "-"}
                </h3>
              </div>

              <div className="orangtua-glass-card rounded-3xl p-5">
                <p className="text-sm text-gray-500">Status Data</p>

                <h3 className="mt-3 text-xl font-bold text-[#6D6875]">
                  {levelData ? "Sudah Dicatat" : "Belum Dicatat"}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-gradient-to-br from-[#B5838D]/90 via-[#E5989B]/85 to-[#FFB4A2]/80 p-8 text-white shadow-xl backdrop-blur-xl">
            <p className="text-sm text-white/80">Progress Pembelajaran</p>

            <h2 className="mt-3 text-6xl font-extrabold">{progress}%</h2>

            <div className="mt-6 h-4 rounded-full bg-white/20">
              <div
                className="h-4 rounded-full bg-white transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="mt-6 text-white/90">
              {levelData
                ? `Anak berada pada ${levelData.level}.`
                : "Level pembelajaran anak belum dicatat oleh pengajar."}
            </p>
          </div>
        </div>
      </section>

      <section className="orangtua-glass-panel rounded-[36px] p-8">
        <h2 className="text-2xl font-bold text-[#6D6875]">
          Catatan Perkembangan
        </h2>

        <div className="orangtua-glass-card mt-4 rounded-3xl p-6">
          <p className="leading-relaxed text-gray-600">
            {levelData?.keterangan || "Belum ada catatan perkembangan."}
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          Data ditampilkan berdasarkan catatan level pembelajaran terbaru.
        </p>
      </section>
    </div>
  );
}
