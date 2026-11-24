# BuktiUji

BuktiUji adalah aplikasi web lokal untuk menyusun kasus uji, menjalankan pengujian manual, dan menyimpan laporan yang dapat diverifikasi. Aplikasi ditujukan untuk mahasiswa, asisten praktikum, atau tim kecil yang membutuhkan jejak uji lebih rapi daripada catatan terpisah.

## Fitur

1. **Pustaka kasus uji** — buat dan sunting hingga 30 kasus berisi fitur, prasyarat, langkah, dan hasil harapan.
2. **Sesi berbasis snapshot** — mulai sesi dari template saat ini dan kunci isinya dengan SHA-256.
3. **Eksekusi terpandu** — tandai setiap kasus lulus, gagal, atau terblokir serta simpan catatan bukti.
4. **Riwayat dan laporan** — lihat ringkasan, verifikasi snapshot, lalu ekspor JSON atau Markdown.
5. **Penyimpanan portabel** — autosave di `localStorage` dan impor/ekspor proyek JSON.

## Jaminan perilaku

Setiap sesi menyimpan salinan mendalam daftar kasus saat sesi dimulai. Representasi JSON kanonis snapshot dihitung memakai SHA-256. Perubahan template berikutnya tidak mengubah sesi lama, sedangkan proyek impor ditolak bila snapshot diubah tanpa hash yang cocok. Tes juga membuktikan urutan properti objek tidak mengubah hash.

Jaminan ini menjaga konsistensi internal, bukan tanda tangan digital. Orang yang sengaja mengganti snapshot sekaligus menghitung ulang hash tetap dapat membuat berkas yang terlihat valid.

## Menjalankan

Syarat: Node.js 20 atau lebih baru.

```bash
npm start
```

Buka <http://127.0.0.1:4173>. Tidak ada dependensi eksternal. Untuk port lain:

```bash
PORT=8080 npm start
```

Alur:

1. Atur nama proyek dan kasus pada tab **Kasus uji**.
2. Buka **Jalankan**, beri nama sesi, lalu mulai.
3. Beri status dan catatan pada seluruh kasus, kemudian selesaikan sesi.
4. Buka **Riwayat** untuk memverifikasi snapshot dan mengunduh laporan.

Contoh tersedia di [`examples/proyek-contoh.json`](examples/proyek-contoh.json).

## Pengujian

```bash
npm test
npm run check
```

Enam tes mencakup alur penuh, kekekalan snapshot setelah template berubah, deteksi manipulasi, sesi belum lengkap, status/kasus tidak valid, dan kestabilan hash.

## Struktur

```text
buktiuji/
├── assets/logo.svg
├── examples/proyek-contoh.json
├── src/core.js
├── src/app.js
├── tests/core.test.js
├── index.html
├── styles.css
└── server.js
```

Logika inti dipisahkan dari DOM agar snapshot dan transisi status dapat diuji langsung. Antarmuka menyediakan fokus keyboard terlihat, label eksplisit, status berbasis teks, tata letak responsif, dan dukungan `prefers-reduced-motion`.

## Batasan

- Bukti berupa catatan teks; belum ada unggahan screenshot.
- Tidak ada sinkronisasi atau kolaborasi serentak.
- Hash menjaga konsistensi internal, bukan identitas penguji.
- Hanya satu sesi belum selesai per proyek.

## Lisensi

MIT.
