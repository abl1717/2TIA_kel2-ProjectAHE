import { Outlet } from "react-router-dom";
import React, { useState } from "react";

const Header = React.lazy(() => import("../components/pengajar/Header"));
const Sidebar = React.lazy(() => import("../components/pengajar/Sidebar"));

export default function PengajarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="pengajar-bg relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed -left-32 top-10 h-80 w-80 rounded-full bg-[#cf30a2]/20 blur-3xl"></div>
      <div className="pointer-events-none fixed right-0 top-0 h-96 w-96 rounded-full bg-[#ed6a45]/20 blur-3xl"></div>
      <div className="pointer-events-none fixed bottom-0 left-1/3 h-96 w-96 rounded-full bg-[#6b1d7c]/15 blur-3xl"></div>

      <Sidebar setSidebarOpen={setSidebarOpen} />

      <main
        className={`relative z-10 min-h-screen transition-[margin] duration-200 ease-out ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="min-h-screen p-5">
          <Header />

          <div className="mt-5">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
