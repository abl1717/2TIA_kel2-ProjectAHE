import React from "react";
import { Outlet } from "react-router-dom";

const Navbar = React.lazy(() => import("../components/orangtua/Navbar"));
const Footer = React.lazy(() => import("../components/orangtua/Footer"));

export default function OrangTuaLayout() {
  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
