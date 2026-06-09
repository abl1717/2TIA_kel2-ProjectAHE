import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function FormTambahPengajar({
  onClose,
  onSubmit,
  mode = "tambah",
  dataEdit = null,
}) {
  const [formPengajar, setFormPengajar] = useState({
    nama_pengajar: "",
    no_hp: "",
    alamat: "",
  });

  const [formAkunPengajar, setFormAkunPengajar] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (mode === "edit" && dataEdit) {
      setFormPengajar({
        id: dataEdit.id,
        nama_pengajar: dataEdit.nama_pengajar || "",
        no_hp: dataEdit.no_hp || "",
        alamat: dataEdit.alamat || "",
      });
    }
  }, [mode, dataEdit]);

  const handlePengajarChange = (e) => {
    const { name, value } = e.target;

    setFormPengajar({
      ...formPengajar,
      [name]: value,
    });
  };

  const handleAkunPengajarChange = (e) => {
    const { name, value } = e.target;

    setFormAkunPengajar({
      ...formAkunPengajar,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formPengajar.nama_pengajar ||
      !formPengajar.no_hp ||
      !formPengajar.alamat
    ) {
      alert("Lengkapi data pengajar terlebih dahulu.");
      return;
    }

    if (
      mode === "tambah" &&
      (!formAkunPengajar.email || !formAkunPengajar.password)
    ) {
      alert("Lengkapi email dan password akun pengajar.");
      return;
    }

    onSubmit({
      pengajar: formPengajar,
      akunPengajar: formAkunPengajar,
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="glass-panel max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[36px] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#180161]">
              {mode === "edit" ? "Edit Data Pengajar" : "Tambah Data Pengajar"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {mode === "edit"
                ? "Ubah data pengajar yang sudah terdaftar."
                : "Tambahkan data pengajar dan buat akun login pengajar."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-[#EB3678]/10 p-3 text-[#EB3678] transition hover:bg-[#EB3678] hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card rounded-[28px] p-5">
            <h3 className="mb-4 font-bold text-[#180161]">Data Pengajar</h3>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#180161]/70">
                  Nama Pengajar
                </label>

                <input
                  type="text"
                  name="nama_pengajar"
                  placeholder="Masukkan nama pengajar"
                  value={formPengajar.nama_pengajar}
                  onChange={handlePengajarChange}
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#180161]/70">
                  Nomor HP
                </label>

                <input
                  type="text"
                  name="no_hp"
                  placeholder="08xxxxxxxxxx"
                  value={formPengajar.no_hp}
                  onChange={handlePengajarChange}
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#180161]/70">
                  Alamat Pengajar
                </label>

                <textarea
                  name="alamat"
                  placeholder="Masukkan alamat lengkap pengajar"
                  value={formPengajar.alamat}
                  onChange={handlePengajarChange}
                  rows="4"
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                />
              </div>
            </div>
          </div>

          {mode === "tambah" && (
            <div className="glass-card rounded-[28px] p-5">
              <h3 className="mb-4 font-bold text-[#180161]">
                Akun Login Pengajar
              </h3>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#180161]/70">
                    Email Login
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="contoh@email.com"
                    value={formAkunPengajar.email}
                    onChange={handleAkunPengajarChange}
                    className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#180161]/70">
                    Password Login
                  </label>

                  <input
                    type="password"
                    name="password"
                    placeholder="Masukkan password akun"
                    value={formAkunPengajar.password}
                    onChange={handleAkunPengajarChange}
                    className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                  />
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Email dan password ini digunakan pengajar untuk login ke sistem.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="glass-input rounded-2xl px-6 py-3 text-sm font-semibold text-[#180161]"
            >
              Batal
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-[#180161] via-[#4F1787] to-[#EB3678] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105"
            >
              {mode === "edit" ? "Simpan Perubahan" : "Simpan Pengajar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
