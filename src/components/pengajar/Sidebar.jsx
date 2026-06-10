import { FaClipboardList, FaSignOutAlt, FaHome } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogin");
    navigate("/");
  };

  const menus = [
    { name: "Dashboard", path: "/pengajar/dashboard", icon: <FaHome /> },
    {
      name: "Level Pembelajaran",
      path: "/pengajar/level-pembelajaran",
      icon: <FaClipboardList />,
    },
  ];

  const menuClass = ({ isActive }) =>
    `flex h-14 items-center rounded-2xl px-3 transition-colors duration-100
    ${
      isActive
        ? "bg-white/70 text-[#471353] font-bold shadow-md backdrop-blur-xl"
        : "text-white/90 hover:bg-white/25 hover:text-white"
    }`;

  return (
    <aside
      id="sidebar"
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
      className="group fixed left-0 top-0 z-50 flex h-screen w-20 flex-col overflow-hidden rounded-r-[34px] border-r border-white/25 bg-gradient-to-b from-[#6b1d7c]/90 via-[#a52781]/80 to-[#ed6a45]/75 px-3 py-5 shadow-[0_30px_90px_rgba(71,19,83,0.35)] backdrop-blur-2xl transition-[width] duration-150 ease-out hover:w-64"
    >
      <div className="pointer-events-none absolute -left-20 top-8 h-48 w-48 rounded-full bg-white/15 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-16 right-0 h-44 w-44 rounded-full bg-[#ed6a45]/25 blur-3xl"></div>
      <div className="pointer-events-none absolute inset-0 bg-white/5"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-white/15 shadow-lg backdrop-blur-xl transition-[width,height] duration-150 group-hover:h-20 group-hover:w-20">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 rounded-full object-contain transition-[width,height] duration-150 group-hover:h-14 group-hover:w-14"
          />
        </div>

        <div className="mt-3 w-full text-center text-white opacity-0 transition-opacity duration-100 group-hover:opacity-100">
          <h1 className="whitespace-nowrap text-lg font-bold">SmartAHE</h1>

          <p className="whitespace-nowrap text-xs text-white/80">
            Pengajar Dashboard
          </p>
        </div>
      </div>

      <nav className="relative z-10 mt-8 flex-1">
        <ul className="space-y-3">
          {menus.map((menu, index) => (
            <li key={index}>
              <NavLink to={menu.path} className={menuClass}>
                <span className="flex h-10 min-w-10 items-center justify-center text-xl">
                  {menu.icon}
                </span>

                <span className="ml-3 whitespace-nowrap text-sm font-semibold opacity-0 transition-opacity duration-100 group-hover:opacity-100">
                  {menu.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative z-10 rounded-[24px] border border-white/25 bg-white/12 p-2 text-white shadow-lg backdrop-blur-xl">
        <button
          onClick={handleLogout}
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-white/18 px-2 text-white transition-colors duration-100 hover:bg-white/65 hover:text-[#471353] group-hover:justify-start"
        >
          <span className="flex h-9 min-w-9 items-center justify-center text-lg">
            <FaSignOutAlt />
          </span>

          <span className="ml-3 hidden whitespace-nowrap text-sm font-bold group-hover:block">
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
