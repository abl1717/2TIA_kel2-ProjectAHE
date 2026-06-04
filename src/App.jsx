import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";

const Dashboard = React.lazy(() => import("./pages/owner/Dashboard"));
const Murid = React.lazy(() => import("./pages/owner/Murid"));
const Modul = React.lazy(() => import("./pages/owner/Modul"));
const Pengajar = React.lazy(() => import("./pages/owner/Pengajar"));
const Keuangan = React.lazy(() => import("./pages/owner/Keuangan"));

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const PengajarLayout = React.lazy(() => import("./layouts/PengajarLayout"));
const OrangTuaLayout = React.lazy(() => import("./layouts/OrangTuaLayout"));

const Login = React.lazy(() => import("./pages/auth/Login"));

const Loading = React.lazy(() => import("./components/Loading"));

const DashboardPengajar = React.lazy(
  () => import("./pages/pengajar/Dashboard"),
);
const LevelPembelajaran = React.lazy(() => import("./pages/pengajar/Level"));

const DashboardOrangTua = React.lazy(
  () => import("./pages/orangtua/Dashboard"),
);
const DetailLevelAnak = React.lazy(() => import("./pages/orangtua/Level"));
const PembelajaranOrangTua = React.lazy(
  () => import("./pages/orangtua/Pembelajaran"),
);
const TentangOrangTua = React.lazy(() => import("./pages/orangtua/Tentang"));
const KontakOrangTua = React.lazy(() => import("./pages/orangtua/Kontak"));

export default function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/owner" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="murid" element={<Murid />} />
            <Route path="modul" element={<Modul />} />
            <Route path="pengajar" element={<Pengajar />} />
            <Route path="keuangan" element={<Keuangan />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
          </Route>

          <Route path="/pengajar" element={<PengajarLayout />}>
            <Route path="dashboard" element={<DashboardPengajar />} />
            <Route path="level-pembelajaran" element={<LevelPembelajaran />} />
          </Route>

          <Route path="/orangtua" element={<OrangTuaLayout />}>
            <Route path="dashboard" element={<DashboardOrangTua />} />
            <Route path="detail-anak/:id" element={<DetailLevelAnak />} />
            <Route path="pembelajaran" element={<PembelajaranOrangTua />} />
            <Route path="tentang" element={<TentangOrangTua />} />
            <Route path="kontak" element={<KontakOrangTua />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
