import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function FormTambahModul({ modul, jenis, onClose, onSubmit }) {
  const [jumlah, setJumlah] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jumlah || Number(jumlah) <= 0) {
      alert("Jumlah modul harus lebih dari 0.");
      return;
    }

    if (jenis === "Keluar" && Number(jumlah) > modul.stok) {
      alert("Stok modul tidak mencukupi.");
      return;
    }

    onSubmit({
      idModul: modul.id,
      namaModul: modul.namaModul,
      level: modul.level,
      jenis,
      jumlah: Number(jumlah),
      keterangan:
        keterangan ||
        (jenis === "Masuk"
          ? `Penambahan stok ${modul.namaModul}`
          : `Pengeluaran stok ${modul.namaModul}`),
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-xl rounded-[36px] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#180161]">
              {jenis === "Masuk" ? "Modul Masuk" : "Modul Keluar"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {jenis === "Masuk"
                ? "Tambahkan stok modul pembelajaran."
                : "Kurangi stok modul karena penjualan atau pemberian ke siswa."}
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="glass-card rounded-[28px] p-5">
            <h3 className="mb-4 font-bold text-[#180161]">Detail Modul</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Nama Modul</span>
                <span className="font-bold text-[#180161]">
                  {modul.namaModul}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Level</span>
                <span className="font-bold text-[#180161]">{modul.level}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Stok Saat Ini</span>
                <span className="font-bold text-[#180161]">{modul.stok}</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[28px] p-5">
            <h3 className="mb-4 font-bold text-[#180161]">Transaksi Modul</h3>

            <div className="space-y-4">
              <input
                type="number"
                min="1"
                placeholder={
                  jenis === "Masuk"
                    ? "Jumlah stok yang ditambahkan"
                    : "Jumlah stok yang dikeluarkan"
                }
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
              />

              <textarea
                rows="3"
                placeholder="Keterangan transaksi"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                className="glass-input w-full rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#4F1787]"
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
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
