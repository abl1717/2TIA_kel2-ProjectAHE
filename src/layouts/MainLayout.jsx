import { Outlet } from "react-router-dom";
import React, { useState } from "react";

const Header = React.lazy(() => import("../components/owner/Header"));
const Sidebar = React.lazy(() => import("../components/owner/Sidebar"));

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="owner-bg relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed -left-32 top-10 h-80 w-80 rounded-full bg-[#EB3678]/20 blur-3xl"></div>
      <div className="pointer-events-none fixed right-0 top-0 h-96 w-96 rounded-full bg-[#FB773C]/20 blur-3xl"></div>
      <div className="pointer-events-none fixed bottom-0 left-1/3 h-96 w-96 rounded-full bg-[#4F1787]/15 blur-3xl"></div>

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
