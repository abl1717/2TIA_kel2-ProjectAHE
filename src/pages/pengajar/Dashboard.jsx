import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaBookOpen,
  FaStar,
  FaChartLine,
} from "react-icons/fa";

import api from "../../services/api";

export default function Dashboard() {
  const [listLevel, setListLevel] = useState([]);
  const [listSiswa, setListSiswa] = useState([]);
  const [listPengajar, setListPengajar] = useState([]);

  useEffect(() => {
    fetchDashboardPengajar();
  }, []);

  const fetchDashboardPengajar = async () => {
    try {
      const [levelRes, siswaRes, pengajarRes] = await Promise.all([
        api.get("/level-pembelajaran"),
        api.get("/siswa"),
        api.get("/pengajar"),
      ]);

      setListLevel(levelRes.data.data.data);
      setListSiswa(siswaRes.data.data.data);
      setListPengajar(pengajarRes.data.data.data);
    } catch (error) {
      console.error(
        "Gagal mengambil dashboard pengajar",
        error.response?.data || error,
      );
      alert("Gagal mengambil data dashboard pengajar.");
    }
  };

  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const pengajarLogin = listPengajar.find((pengajar) => {
    return pengajar.user_id === userLogin?.id;
  });

  const dataLevelPengajar = listLevel.filter((level) => {
    return level.pengajar_id === pengajarLogin?.id;
  });

  const totalMurid = dataLevelPengajar.length;

  const levelBerjalan = dataLevelPengajar.filter((level) => {
    return level.level !== "Level 7";
  }).length;

  const selesaiLevel = dataLevelPengajar.filter((level) => {
    return level.level === "Level 7";
  }).length;

  const getNamaSiswa = (item) => {
    const siswa = item.siswa || listSiswa.find((s) => s.id === item.siswa_id);
    return siswa ? siswa.nama_siswa : "-";
  };

  const jumlahLevel1 = dataLevelPengajar.filter((item) => {
    return item.level === "Level 1";
  }).length;

  const jumlahLevel2 = dataLevelPengajar.filter((item) => {
    return item.level === "Level 2";
  }).length;

  const jumlahLevel3 = dataLevelPengajar.filter((item) => {
    return item.level === "Level 3";
  }).length;

  const jumlahLevel4 = dataLevelPengajar.filter((item) => {
    return item.level === "Level 4";
  }).length;

  const warnaDonat = ["#8e27a5", "#cf30a2", "#ed6a45", "#e382c1"];

  const totalDonat = totalMurid || 1;

  const dataLevelDonat = [
    { level: "Level 1", jumlah: jumlahLevel1 },
    { level: "Level 2", jumlah: jumlahLevel2 },
    { level: "Level 3", jumlah: jumlahLevel3 },
    { level: "Level 4", jumlah: jumlahLevel4 },
  ];

  let awal = 0;

  const gradientDonat = dataLevelDonat
    .map((item, index) => {
      const persen = (item.jumlah / totalDonat) * 100;
      const akhir = awal + persen;
      const warna = warnaDonat[index % warnaDonat.length];

      const potongan = `${warna} ${awal}% ${akhir}%`;
      awal = akhir;

      return potongan;
    })
    .join(", ");

  return (
    <div className="pengajar-bg min-h-screen rounded-[36px] p-5">
      <div className="space-y-6">
        <div className="pengajar-glass-panel relative overflow-hidden rounded-[36px] px-7 py-6">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-12 left-20 h-36 w-36 rounded-full bg-[#cf30a2]/15 blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#240a29]">
                Selamat datang, {pengajarLogin?.nama_pengajar || "Pengajar"}! 👋
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Mari catat perkembangan belajar anak-anak hari ini.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="pengajar-glass-card rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#6b1d7c] to-[#b230cf] p-4 text-2xl text-white shadow-md">
                <FaUserGraduate />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Total Murid
                </p>

                <h2 className="text-3xl font-bold text-[#240a29]">
                  {totalMurid}
                </h2>

                <p className="text-xs text-gray-400">Anak yang diajar</p>
              </div>
            </div>
          </div>

          <div className="pengajar-glass-card rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#cf30a2] to-[#ed6a45] p-4 text-2xl text-white shadow-md">
                <FaBookOpen />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Level Berjalan
                </p>

                <h2 className="text-3xl font-bold text-[#240a29]">
                  {levelBerjalan}
                </h2>

                <p className="text-xs text-gray-400">Sedang dipelajari</p>
              </div>
            </div>
          </div>

          <div className="pengajar-glass-card rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#ed6a45] to-[#cf30a2] p-4 text-2xl text-white shadow-md">
                <FaStar />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Selesai Level
                </p>

                <h2 className="text-3xl font-bold text-[#240a29]">
                  {selesaiLevel}
                </h2>

                <p className="text-xs text-gray-400">Telah diselesaikan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="pengajar-glass-card rounded-3xl p-6">
            <h2 className="text-xl font-bold text-[#240a29]">
              Progres Level Murid
            </h2>

            <div className="mt-6 flex flex-col items-center justify-center gap-10 md:flex-row">
              <div
                className="flex h-48 w-48 items-center justify-center rounded-full shadow-xl"
                style={{
                  background: `conic-gradient(${gradientDonat})`,
                }}
              >
                <div className="pengajar-glass-card flex h-28 w-28 flex-col items-center justify-center rounded-full">
                  <h3 className="text-3xl font-bold text-[#240a29]">
                    {totalMurid}
                  </h3>

                  <p className="text-xs text-gray-400">Total Murid</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <p className="flex items-center gap-3 text-[#240a29]">
                  <span className="h-3 w-3 rounded-full bg-[#8e27a5]"></span>
                  Level 1 <b>{jumlahLevel1} Murid</b>
                </p>

                <p className="flex items-center gap-3 text-[#240a29]">
                  <span className="h-3 w-3 rounded-full bg-[#cf30a2]"></span>
                  Level 2 <b>{jumlahLevel2} Murid</b>
                </p>

                <p className="flex items-center gap-3 text-[#240a29]">
                  <span className="h-3 w-3 rounded-full bg-[#ed6a45]"></span>
                  Level 3 <b>{jumlahLevel3} Murid</b>
                </p>

                <p className="flex items-center gap-3 text-[#240a29]">
                  <span className="h-3 w-3 rounded-full bg-[#e382c1]"></span>
                  Level 4 <b>{jumlahLevel4} Murid</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
