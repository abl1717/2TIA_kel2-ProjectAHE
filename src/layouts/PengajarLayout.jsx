import { Outlet } from "react-router-dom";
import React, { useState } from "react";

const Header = React.lazy(() => import("../components/pengajar/Header"));
const Sidebar = React.lazy(() => import("../components/pengajar/Sidebar"));

export default function PengajarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbeaf7]">
      <Sidebar setSidebarOpen={setSidebarOpen} />

      <main
        className={`min-h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-60" : "ml-24"
        }`}
      >
        <div className="p-5">
          <div className="rounded-[32px] bg-white p-5 shadow-xl">
            <Header />

            <div className="mt-5">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
