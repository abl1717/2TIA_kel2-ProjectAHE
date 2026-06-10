import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import {
  FaChalkboardTeacher,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaUsers,
  FaChild,
} from "react-icons/fa";
import api from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", {
        email: dataForm.email,
        password: dataForm.password,
      });

      const user = response.data.user;
      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("userLogin", JSON.stringify(user));

      if (user.role === "owner") {
        navigate("/owner/dashboard");
      } else if (user.role === "pengajar") {
        navigate("/pengajar/dashboard");
      } else if (user.role === "orangtua") {
        navigate("/orangtua/dashboard");
      }
    } catch (error) {
      const pesan =
        error.response?.data?.message || "Email atau password salah.";
      setError(pesan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[42px] border border-white/70 bg-white/65 p-8 shadow-2xl backdrop-blur-2xl md:p-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex w-fit items-center gap-3 rounded-full bg-[#4F1787]/10 px-5 py-3 text-sm font-bold text-[#4F1787]">
          <FaChalkboardTeacher />
          Portal SmartAHE
        </div>

        <h2 className="text-5xl font-extrabold leading-tight text-[#180161]">
          Masuk ke SmartAHE
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-500">
          Gunakan akun yang diberikan oleh owner untuk mengakses dashboard
          sesuai peran Anda.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/70 bg-white/70 px-5 py-4 shadow-md backdrop-blur-xl">
            <FaUserShield className="mx-auto text-2xl text-[#8E27A5]" />
            <p className="mt-2 text-sm font-extrabold text-[#180161]">Owner</p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/70 px-5 py-4 shadow-md backdrop-blur-xl">
            <FaUsers className="mx-auto text-2xl text-[#EB3678]" />
            <p className="mt-2 text-sm font-extrabold text-[#180161]">
              Pengajar
            </p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/70 px-5 py-4 shadow-md backdrop-blur-xl">
            <FaChild className="mx-auto text-2xl text-[#FB773C]" />
            <p className="mt-2 text-sm font-extrabold text-[#180161]">
              Orang Tua
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-5 flex items-center rounded-2xl bg-[#EB3678]/10 p-4 text-sm font-medium text-[#EB3678]">
          <BsFillExclamationDiamondFill className="me-2 text-lg" />
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-5 flex items-center rounded-2xl bg-[#4F1787]/10 p-4 text-sm font-medium text-[#4F1787]">
          <ImSpinner2 className="me-2 animate-spin" />
          Mohon tunggu ya!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-3 block text-base font-bold text-[#180161]">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Masukkan email akun SmartAHE"
            value={dataForm.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/70 bg-white/75 px-5 py-4 text-base text-[#180161] shadow-sm outline-none placeholder:text-gray-400 transition focus:border-[#EB3678]/40 focus:ring-4 focus:ring-[#EB3678]/10"
          />
        </div>

        <div>
          <label className="mb-3 block text-base font-bold text-[#180161]">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Masukkan password"
              value={dataForm.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/70 bg-white/75 px-5 py-4 pr-14 text-base text-[#180161] shadow-sm outline-none placeholder:text-gray-400 transition focus:border-[#EB3678]/40 focus:ring-4 focus:ring-[#EB3678]/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#EB3678]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 text-gray-600">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 accent-[#EB3678]"
            />
            Ingat saya
          </label>

          <button
            type="button"
            className="font-semibold text-[#EB3678] transition hover:text-[#4F1787]"
          >
            Lupa password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-[#8E27A5] via-[#EB3678] to-[#FB773C] py-4 text-xl font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Memproses..." : "Masuk ke Dashboard"}
        </button>
      </form>
    </div>
  );
}
