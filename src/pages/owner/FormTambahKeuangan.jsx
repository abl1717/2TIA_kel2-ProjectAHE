import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function FormTambahKeuangan({
  onClose,
  onSubmit,
  mode = "tambah",
  dataEdit = null,
}) {
  const [formKeuangan, setFormKeuangan] = useState({
    tanggal: "",
    keterangan: "",
    jenis: "",
    jumlah: "",
  });

  useEffect(() => {
    if (mode === "edit" && dataEdit) {
      setFormKeuangan({
        id: dataEdit.id,
        tanggal: dataEdit.tanggal || "",
        keterangan: dataEdit.keterangan || "",
        jenis: dataEdit.jenis || "",
        jumlah: dataEdit.jumlah || "",
      });
    }
  }, [mode, dataEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormKeuangan({
      ...formKeuangan,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formKeuangan.tanggal ||
      !formKeuangan.keterangan ||
      !formKeuangan.jenis ||
      !formKeuangan.jumlah
    ) {
      alert("Lengkapi data keuangan terlebih dahulu.");
      return;
    }

    onSubmit({
      keuangan: {
        ...formKeuangan,
        jumlah: Number(formKeuangan.jumlah),
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="glass-panel max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[36px] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#180161]">
              {mode === "edit" ? "Edit Data Keuangan" : "Tambah Data Keuangan"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {mode === "edit"
                ? "Ubah data pemasukan atau pengeluaran."
                : "Tambahkan data pemasukan atau pengeluaran SmartAHE."}
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
            <h3 className="mb-4 font-bold text-[#180161]">Data Keuangan</h3>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#180161]/70">
                  Tanggal Transaksi
                </label>

                <input
                  type="date"
                  name="tanggal"
                  value={formKeuangan.tanggal}
                  onChange={handleChange}
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#180161]/70">
                  Jenis Transaksi
                </label>

                <select
                  name="jenis"
                  value={formKeuangan.jenis}
                  onChange={handleChange}
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                >
                  <option value="">Pilih jenis transaksi</option>
                  <option value="Pemasukan">Pemasukan</option>
                  <option value="Pengeluaran">Pengeluaran</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#180161]/70">
                  Jumlah Transaksi (Rp)
                </label>

                <input
                  type="number"
                  name="jumlah"
                  placeholder="Masukkan nominal"
                  value={formKeuangan.jumlah}
                  onChange={handleChange}
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#180161]/70">
                  Keterangan Transaksi
                </label>

                <input
                  type="text"
                  name="keterangan"
                  placeholder="Contoh: Pembayaran SPP Juni"
                  value={formKeuangan.keterangan}
                  onChange={handleChange}
                  className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
                />
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
              {mode === "edit" ? "Simpan Perubahan" : "Simpan Keuangan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
