import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function FormCatatLevel({
  onClose,
  onSubmit,
  siswaList,
  pengajarLogin,
  mode = "tambah",
  dataEdit = null,
}) {
  const [formLevel, setFormLevel] = useState({
    idSiswa: "",
    idPengajar: pengajarLogin?.id || "",
    level: "",
    keterangan: "",
  });

  useEffect(() => {
    if (mode === "edit" && dataEdit) {
      setFormLevel({
        id: dataEdit.id,
        idSiswa: dataEdit.idSiswa || dataEdit.siswa_id || "",
        idPengajar:
          dataEdit.idPengajar ||
          dataEdit.pengajar_id ||
          pengajarLogin?.id ||
          "",
        level: dataEdit.level || "",
        keterangan: dataEdit.keterangan || "",
      });
    }
  }, [mode, dataEdit, pengajarLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormLevel({
      ...formLevel,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formLevel.idSiswa ||
      !formLevel.idPengajar ||
      !formLevel.level ||
      !formLevel.keterangan
    ) {
      alert("Lengkapi data level pembelajaran terlebih dahulu.");
      return;
    }

    onSubmit({
      levelPembelajaran: {
        ...formLevel,
        idSiswa: Number(formLevel.idSiswa),
        idPengajar: Number(formLevel.idPengajar),
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="pengajar-glass-panel max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[36px] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#240a29]">
              {mode === "edit"
                ? "Edit Level Pembelajaran"
                : mode === "bantu"
                  ? "Bantu Catat Level Siswa"
                  : "Catat Level Pembelajaran"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {mode === "edit"
                ? "Ubah level dan keterangan pembelajaran siswa."
                : mode === "bantu"
                  ? "Catat perkembangan siswa dari pengajar lain tanpa memindahkan pengajar utama."
                  : "Tambahkan data level dan keterangan progres pembelajaran siswa."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-[#cf30a2]/10 p-3 text-[#cf30a2] transition hover:bg-[#cf30a2] hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="pengajar-glass-card rounded-[28px] p-5">
            <h3 className="mb-4 font-bold text-[#240a29]">
              Data Level Pembelajaran
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <select
                name="idSiswa"
                value={formLevel.idSiswa}
                onChange={handleChange}
                className="pengajar-glass-input rounded-2xl px-5 py-3 text-sm text-[#240a29] outline-none focus:border-[#cf30a2]"
              >
                <option value="">Pilih siswa</option>
                {siswaList.map((siswa) => (
                  <option key={siswa.id} value={siswa.id}>
                    {siswa.nama_siswa}
                    {siswa.levelData?.pengajar?.nama_pengajar
                      ? ` - Pengajar: ${siswa.levelData.pengajar.nama_pengajar}`
                      : ""}
                  </option>
                ))}
              </select>

              <select
                name="level"
                value={formLevel.level}
                onChange={handleChange}
                className="pengajar-glass-input rounded-2xl px-5 py-3 text-sm text-[#240a29] outline-none focus:border-[#cf30a2]"
              >
                <option value="">Pilih level</option>
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="Level 3">Level 3</option>
                <option value="Level 4">Level 4</option>
                <option value="Level 5">Level 5</option>
                <option value="Level 6">Level 6</option>
                <option value="Level 7">Level 7</option>
              </select>

              <input
                type="text"
                value={pengajarLogin?.nama_pengajar || "-"}
                disabled
                className="pengajar-glass-input cursor-not-allowed rounded-2xl px-5 py-3 text-sm text-gray-500 outline-none md:col-span-2"
              />

              <textarea
                name="keterangan"
                value={formLevel.keterangan}
                onChange={handleChange}
                placeholder="Contoh: Anak sedang belajar halaman 12 tentang suku kata sederhana."
                rows="4"
                className="pengajar-glass-input rounded-2xl px-5 py-3 text-sm text-[#240a29] outline-none placeholder:text-gray-400 focus:border-[#cf30a2] md:col-span-2"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="pengajar-glass-input rounded-2xl px-6 py-3 text-sm font-semibold text-[#240a29]"
            >
              Batal
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-[#6b1d7c] via-[#cf30a2] to-[#ed6a45] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105"
            >
              {mode === "edit"
                ? "Simpan Perubahan"
                : mode === "bantu"
                  ? "Simpan Catatan Bantuan"
                  : "Simpan Level"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
