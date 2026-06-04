import { FaClipboardList, FaSignOutAlt, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar({ setSidebarOpen }) {
  const menus = [
    { name: "Dashboard", path: "/pengajar/dashboard", icon: <FaHome /> },
    {
      name: "Level Pembelajaran",
      path: "/pengajar/level-pembelajaran",
      icon: <FaClipboardList />,
    },
  ];

  const menuClass = ({ isActive }) =>
    `flex items-center rounded-2xl px-4 py-4 transition-all duration-300
    ${
      isActive
        ? "bg-white text-[#471353] shadow-md font-bold"
        : "text-white/90 hover:bg-white hover:text-[#471353] hover:shadow-md"
    }`;

  return (
    <aside
      id="sidebar"
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
      className="group fixed left-0 top-0 z-50 flex min-h-screen w-24 flex-col overflow-hidden rounded-r-[32px] bg-gradient-to-b from-[#6b1d7c] via-[#a52781] to-[#ed6a45] px-4 py-8 shadow-xl transition-all duration-300 hover:w-60"
    >
      <div className="flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-16 w-16 rounded-full object-contain transition-all duration-300 group-hover:h-20 group-hover:w-20"
        />

        <div className="mt-3 w-full text-center text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          <h1 className="whitespace-nowrap text-lg font-bold">SmartAHE</h1>
          <p className="whitespace-nowrap text-xs text-white/80">
            Pengajar Dashboard
          </p>
        </div>
      </div>

      <nav className="mt-10">
        <ul className="space-y-4">
          {menus.map((menu, index) => (
            <li key={index}>
              <NavLink to={menu.path} className={menuClass}>
                <span className="flex min-w-10 justify-center text-2xl">
                  {menu.icon}
                </span>

                <span className="ml-2 whitespace-nowrap text-sm opacity-0 transition-all duration-300 group-hover:opacity-100">
                  {menu.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto rounded-3xl bg-white/10 p-3 text-white backdrop-blur-sm transition-all duration-300 group-hover:p-4">
        <button
          onClick={() => (window.location.href = "/")}
          className="flex w-full items-center justify-center rounded-2xl bg-white/10 px-3 py-4 text-white transition-all duration-300 hover:bg-white hover:text-[#471353] group-hover:justify-start group-hover:px-4"
        >
          <span className="flex min-w-10 justify-center text-xl">
            <FaSignOutAlt />
          </span>

          <span className="ml-2 hidden whitespace-nowrap text-sm font-semibold group-hover:block">
            Keluar
          </span>
        </button>

        <div className="mt-3 hidden text-center group-hover:block">
          <p className="whitespace-nowrap text-xs font-semibold">
            Asyiknya Belajar Baca
          </p>

          <p className="mt-1 whitespace-nowrap text-[10px] text-white/70">
            © 2026 All Right Reserved
          </p>
        </div>
      </div>
    </aside>
  );
}
