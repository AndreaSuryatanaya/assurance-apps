# PRD — Insurance Application Demo

**Versi:** 0.1  
**Status:** Draft untuk ditinjau

## 1. Ringkasan

Aplikasi web responsif yang memperlihatkan alur calon nasabah individu mengajukan asuransi. Demo mencakup delapan kategori produk dari referensi, pengisian data pemohon dan objek yang diasuransikan, pemeriksaan ringkasan, lalu konfirmasi bahwa pengajuan telah terkirim.

Antarmuka aplikasi menggunakan bahasa Inggris. Data demo disimpan di memori sebagai JSON, tanpa backend atau database.

## 2. Tujuan

- Membantu calon nasabah menjelajahi kategori produk asuransi.
- Memperlihatkan alur pengajuan yang mudah diikuti.
- Mengumpulkan data umum dan data khusus produk dalam formulir bertahap.
- Menampilkan konfirmasi setelah pengajuan dikirim.

## 3. Pengguna dan platform

- **Pengguna utama:** calon nasabah individu.
- **Platform:** web responsif untuk desktop dan perangkat mobile.
- **Bahasa antarmuka:** Inggris.

## 4. Kategori produk

1. Motor Vehicle Insurance
2. Engineering Insurance
3. Marine Insurance
4. Neon Sign
5. Mobile Phone
6. Liability Insurance
7. Property Insurance
8. Business Interruption

Untuk **Motor Vehicle Insurance**, demo menampilkan pilihan:

- Comprehensive
- Total Loss Only (TLO)
- Special Insurance “Magic Car”

## 5. Alur utama

1. Pengguna melihat katalog kategori produk.
2. Pengguna memilih produk dan melihat ringkasan perlindungannya.
3. Pengguna mengisi data pemohon.
4. Pengguna mengisi data objek atau risiko yang akan diasuransikan.
5. Pengguna menambahkan dokumen melalui unggahan simulasi.
6. Pengguna memeriksa dan mengonfirmasi ringkasan pengajuan.
7. Aplikasi menampilkan konfirmasi pengajuan terkirim dan nomor referensi demo.

Alur berakhir setelah pengajuan terkirim. Demo tidak mencakup pembayaran atau keputusan underwriting.

## 6. Data formulir

### Data umum pemohon

- Nama lengkap
- Email
- Nomor telepon
- Alamat

### Data umum pengajuan

- Produk dan jenis perlindungan
- Periode perlindungan yang diinginkan
- Lokasi objek yang diasuransikan
- Nilai perlindungan yang diminta, jika relevan
- Catatan tambahan
- Konfirmasi bahwa informasi yang diberikan benar

### Data khusus produk

| Produk | Data tambahan yang disarankan |
|---|---|
| Motor Vehicle | Merek, model, tahun, nomor registrasi, penggunaan, nilai kendaraan |
| Engineering | Jenis proyek atau peralatan, lokasi, nilai proyek/peralatan, periode pekerjaan |
| Marine | Jenis barang atau kapal, nilai barang, asal dan tujuan, tanggal pengiriman |
| Neon Sign | Lokasi, jenis dan ukuran papan, nilai penggantian, informasi pemasangan |
| Mobile Phone | Merek dan model, IMEI, tanggal dan harga pembelian |
| Liability | Jenis usaha atau aktivitas, lokasi, perlindungan dan batas yang diminta |
| Property | Jenis dan alamat properti, penggunaan, nilai bangunan atau isi, informasi konstruksi dasar |
| Business Interruption | Jenis dan lokasi usaha, perkiraan pendapatan atau laba, lama perlindungan |

Dokumen yang diminta akan disimulasikan di antarmuka; demo tidak perlu mengirim atau menyimpan berkas sungguhan.

## 7. Perilaku dan batasan demo

- Data produk dan pengajuan dikelola sebagai JSON in-memory.
- Tidak ada akun pengguna, backend, database, pembayaran, atau integrasi eksternal.
- Data pengajuan dapat hilang saat halaman dimuat ulang.
- Setelah submit, tampilkan konfirmasi seperti **Application Submitted** dan nomor referensi demo.
- Jangan menampilkan harga sebagai penawaran nyata. Jika angka ilustrasi ditambahkan kemudian, beri label **Illustrative estimate**.
- Tidak ada klaim bahwa pengajuan telah disetujui atau polis telah diterbitkan.

## 8. Kebutuhan pengalaman pengguna

- Gunakan formulir bertahap dengan indikator progres.
- Tampilkan hanya pertanyaan yang relevan dengan produk terpilih.
- Sediakan ringkasan yang bisa diperiksa sebelum submit.
- Berikan validasi yang jelas pada kolom wajib dan format email/nomor telepon.
- Pastikan formulir dan tombol mudah digunakan pada layar mobile.
- Gunakan pesan konfirmasi yang membedakan pengajuan terkirim dari persetujuan asuransi.

## 9. Kriteria keberhasilan demo

- Pengguna dapat menemukan dan memilih salah satu dari delapan kategori.
- Pengguna dapat menyelesaikan formulir yang sesuai dengan kategori pilihannya.
- Pengguna dapat memeriksa ringkasan sebelum mengirim.
- Setelah submit, pengguna melihat konfirmasi dan nomor referensi demo.
- Tata letak tetap dapat digunakan di desktop dan mobile.
