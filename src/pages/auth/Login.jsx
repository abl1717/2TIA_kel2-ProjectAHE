import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaEye, FaEyeSlash } from "react-icons/fa";
import { userData } from "../../data/user";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const user = userData.find((item) => {
      return (
        item.email === dataForm.email && item.password === dataForm.password
      );
    });

    if (!user) {
      setError("Email atau password salah.");
      setLoading(false);
      return;
    }

    localStorage.setItem("userLogin", JSON.stringify(user));

    if (user.role === "owner") {
      navigate("/owner/dashboard");
    } else if (user.role === "pengajar") {
      navigate("/pengajar/dashboard");
    } else if (user.role === "orangtua") {
      navigate("/orangtua/dashboard");
    }

    setLoading(false);
  };

  const errorInfo = error ? (
    <div className="mb-5 flex items-center rounded-2xl bg-[#EB3678]/10 p-4 text-sm font-medium text-[#EB3678]">
      <BsFillExclamationDiamondFill className="me-2 text-lg" />
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="mb-5 flex items-center rounded-2xl bg-[#4F1787]/10 p-4 text-sm font-medium text-[#4F1787]">
      <ImSpinner2 className="me-2 animate-spin" />
      Mohon Tunggu ya!
    </div>
  ) : null;

  return (
    <div className="auth-glass-panel w-full rounded-[36px] p-7 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-extrabold text-[#180161]">
            Selamat Datang!
          </h2>

          <p className="mt-3 text-lg text-gray-500">
            Masuk ke dashboard admin SmartAHE
          </p>
        </div>

        <div className="hidden rounded-3xl bg-gradient-to-br from-[#180161] via-[#4F1787] to-[#EB3678] p-4 text-3xl text-white shadow-lg sm:block">
          <FaChalkboardTeacher />
        </div>
      </div>

      {errorInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="mb-3 block text-base font-bold text-[#180161]">
            Username
          </label>

          <input
            type="text"
            id="email"
            name="email"
            placeholder="Masukkan username"
            onChange={handleChange}
            className="auth-glass-input w-full rounded-2xl px-5 py-3.5 text-base text-[#180161] outline-none placeholder:text-gray-400 transition focus:border-[#4F1787]/50 focus:ring-4 focus:ring-[#4F1787]/10"
          />
        </div>

        <div className="mb-5">
          <label className="mb-3 block text-base font-bold text-[#180161]">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="auth-glass-input w-full rounded-2xl px-5 py-3.5 pr-14 text-base text-[#180161] outline-none placeholder:text-gray-400 transition focus:border-[#4F1787]/50 focus:ring-4 focus:ring-[#4F1787]/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#4F1787]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <label className="flex items-center gap-3 text-gray-600">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 accent-[#4F1787]"
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
          className="w-full rounded-2xl bg-gradient-to-r from-[#180161] via-[#4F1787] to-[#EB3678] py-4 text-xl font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
    </div>
  );
}
