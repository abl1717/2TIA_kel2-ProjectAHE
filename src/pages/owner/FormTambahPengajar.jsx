import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function FormTambahPengajar({
  onClose,
  onSubmit,
  mode = "tambah",
  dataEdit = null,
}) {
  const [formPengajar, setFormPengajar] = useState({
    nama: "",
    noHp: "",
    alamat: "",
  });

  useEffect(() => {
    if (mode === "edit" && dataEdit) {
      setFormPengajar({
        id: dataEdit.id,
        nama: dataEdit.nama || "",
        noHp: dataEdit.noHp || "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formPengajar.nama || !formPengajar.noHp || !formPengajar.alamat) {
      alert("Lengkapi data pengajar terlebih dahulu.");
      return;
    }

    onSubmit({
      pengajar: formPengajar,
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
                : "Tambahkan data pengajar baru ke dalam sistem SmartAHE."}
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

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="nama"
                placeholder="Nama pengajar"
                value={formPengajar.nama}
                onChange={handlePengajarChange}
                className="glass-input rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
              />

              <input
                type="text"
                name="noHp"
                placeholder="No HP"
                value={formPengajar.noHp}
                onChange={handlePengajarChange}
                className="glass-input rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
              />

              <textarea
                name="alamat"
                placeholder="Alamat pengajar"
                value={formPengajar.alamat}
                onChange={handlePengajarChange}
                rows="4"
                className="glass-input rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787] md:col-span-2"
              ></textarea>
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
              {mode === "edit" ? "Simpan Perubahan" : "Simpan Pengajar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
