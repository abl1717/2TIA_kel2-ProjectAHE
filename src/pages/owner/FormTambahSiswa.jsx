import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function FormTambahSiswa({
  onClose,
  onSubmit,
  orangTuaList,
  pengajarList,
  mode = "tambah",
  dataEdit = null,
}) {
  const [tipeOrangTua, setTipeOrangTua] = useState("lama");

  const [formSiswa, setFormSiswa] = useState({
    nama: "",
    jenisKelamin: "",
    tanggalLahir: "",
    alamat: "",
    idOrangTua: "",
    idPengajar: "",
  });

  const [formOrangTua, setFormOrangTua] = useState({
    nama: "",
    noHp: "",
    alamat: "",
  });

  const [formAkunOrangTua, setFormAkunOrangTua] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (mode === "edit" && dataEdit) {
      setFormSiswa({
        id: dataEdit.id,
        nama: dataEdit.nama_siswa || "",
        jenisKelamin: dataEdit.jenis_kelamin || "",
        tanggalLahir: dataEdit.tanggal_lahir || "",
        alamat: dataEdit.alamat || "",
        idOrangTua: dataEdit.idOrangTua || dataEdit.orang_tua_id || "",
        idPengajar: dataEdit.idPengajar || "",
      });

      setTipeOrangTua("lama");
    }
  }, [mode, dataEdit]);

  const handleSiswaChange = (e) => {
    const { name, value } = e.target;

    setFormSiswa({
      ...formSiswa,
      [name]: value,
    });
  };

  const handleOrangTuaChange = (e) => {
    const { name, value } = e.target;

    setFormOrangTua({
      ...formOrangTua,
      [name]: value,
    });
  };

  const handleAkunOrangTuaChange = (e) => {
    const { name, value } = e.target;

    setFormAkunOrangTua({
      ...formAkunOrangTua,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tipeOrangTua === "lama" && !formSiswa.idOrangTua) {
      alert("Pilih orang tua terlebih dahulu.");
      return;
    }

    if (
      tipeOrangTua === "baru" &&
      (!formOrangTua.nama || !formOrangTua.noHp || !formOrangTua.alamat)
    ) {
      alert("Lengkapi data orang tua baru.");
      return;
    }

    if (
      tipeOrangTua === "baru" &&
      (!formAkunOrangTua.email || !formAkunOrangTua.password)
    ) {
      alert("Lengkapi email dan password akun orang tua.");
      return;
    }

    if (
      !formSiswa.nama ||
      !formSiswa.jenisKelamin ||
      !formSiswa.tanggalLahir ||
      !formSiswa.alamat ||
      !formSiswa.idPengajar
    ) {
      alert("Lengkapi data siswa dan pilih pengajar terlebih dahulu.");
      return;
    }

    onSubmit({
      tipeOrangTua,
      siswa: {
        ...formSiswa,
        idOrangTua: formSiswa.idOrangTua ? Number(formSiswa.idOrangTua) : "",
        idPengajar: Number(formSiswa.idPengajar),
      },
      orangTua: formOrangTua,
      akunOrangTua: formAkunOrangTua,
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="glass-panel max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[36px] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#180161]">
              {mode === "edit" ? "Edit Data Siswa" : "Tambah Data Siswa"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {mode === "edit"
                ? "Ubah data siswa yang sudah terdaftar."
                : "Daftarkan siswa baru, hubungkan dengan orang tua, dan pilih pengajarnya."}
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
            <h3 className="mb-4 font-bold text-[#180161]">Data Orang Tua</h3>

            {mode === "tambah" && (
              <div className="mb-5 grid gap-4 sm:grid-cols-2">
                <label className="glass-input flex cursor-pointer items-center gap-3 rounded-2xl p-4 text-sm font-semibold text-[#180161]">
                  <input
                    type="radio"
                    name="tipeOrangTua"
                    checked={tipeOrangTua === "lama"}
                    onChange={() => setTipeOrangTua("lama")}
                  />
                  Orang Tua Sudah Terdaftar
                </label>

                <label className="glass-input flex cursor-pointer items-center gap-3 rounded-2xl p-4 text-sm font-semibold text-[#180161]">
                  <input
                    type="radio"
                    name="tipeOrangTua"
                    checked={tipeOrangTua === "baru"}
                    onChange={() => setTipeOrangTua("baru")}
                  />
                  Orang Tua Baru
                </label>
              </div>
            )}

            {tipeOrangTua === "lama" || mode === "edit" ? (
              <select
                name="idOrangTua"
                value={formSiswa.idOrangTua}
                onChange={handleSiswaChange}
                className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
              >
                <option value="">Pilih orang tua</option>
                {orangTuaList.map((orangTua) => (
                  <option key={orangTua.id} value={orangTua.id}>
                    {orangTua.nama_orang_tua} - {orangTua.no_hp}
                  </option>
                ))}
              </select>
            ) : (
              <div className="space-y-5">
                <div>
                  <h4 className="mb-3 text-sm font-bold text-[#180161]">
                    Profil Orang Tua
                  </h4>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#180161]/70">
                        Nama Orang Tua
                      </label>

                      <input
                        type="text"
                        name="nama"
                        placeholder="Masukkan nama orang tua"
                        value={formOrangTua.nama}
                        onChange={handleOrangTuaChange}
                        className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#180161]/70">
                        No HP Orang Tua
                      </label>

                      <input
                        type="text"
                        name="noHp"
                        placeholder="Masukkan nomor HP"
                        value={formOrangTua.noHp}
                        onChange={handleOrangTuaChange}
                        className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#180161]/70">
                        Alamat Orang Tua
                      </label>

                      <input
                        type="text"
                        name="alamat"
                        placeholder="Masukkan alamat orang tua"
                        value={formOrangTua.alamat}
                        onChange={handleOrangTuaChange}
                        className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-bold text-[#180161]">
                    Akun Login Orang Tua
                  </h4>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#180161]/70">
                        Email Login
                      </label>

                      <input
                        type="email"
                        name="email"
                        placeholder="Masukkan email login"
                        value={formAkunOrangTua.email}
                        onChange={handleAkunOrangTuaChange}
                        className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#180161]/70">
                        Password Login
                      </label>

                      <input
                        type="password"
                        name="password"
                        placeholder="Masukkan password login"
                        value={formAkunOrangTua.password}
                        onChange={handleAkunOrangTuaChange}
                        className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-500">
                    Email dan password ini digunakan orang tua untuk login ke
                    sistem.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="glass-card rounded-[28px] p-5">
            <h3 className="mb-4 font-bold text-[#180161]">Data Siswa</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#180161]/70">
                  Nama Siswa
                </label>

                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama siswa"
                  value={formSiswa.nama}
                  onChange={handleSiswaChange}
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#180161]/70">
                  Jenis Kelamin
                </label>

                <select
                  name="jenisKelamin"
                  value={formSiswa.jenisKelamin}
                  onChange={handleSiswaChange}
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#180161]/70">
                  Tanggal Lahir Siswa
                </label>

                <input
                  type="date"
                  name="tanggalLahir"
                  value={formSiswa.tanggalLahir}
                  onChange={handleSiswaChange}
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#180161]/70">
                  Pengajar
                </label>

                <select
                  name="idPengajar"
                  value={formSiswa.idPengajar}
                  onChange={handleSiswaChange}
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                >
                  <option value="">Pilih pengajar</option>
                  {pengajarList.map((pengajar) => (
                    <option key={pengajar.id} value={pengajar.id}>
                      {pengajar.nama_pengajar}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#180161]/70">
                  Alamat Siswa
                </label>

                <textarea
                  name="alamat"
                  placeholder="Masukkan alamat siswa"
                  value={formSiswa.alamat}
                  onChange={handleSiswaChange}
                  rows="3"
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                ></textarea>
              </div>
            </div>
          </div>

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
              {mode === "edit" ? "Simpan Perubahan" : "Simpan Siswa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
