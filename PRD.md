# PRD — Insurance Application Demo

**Versi:** 0.2
**Status:** Draft untuk ditinjau

## 1. Ringkasan

Aplikasi web responsif yang memperlihatkan alur calon nasabah individu mengajukan asuransi. Demo mencakup delapan kategori produk dari referensi, login simulasi dengan role **admin** dan **user**, pengisian data pemohon dan objek yang diasuransikan, pemeriksaan ringkasan, lalu konfirmasi bahwa pengajuan telah terkirim. User dapat melihat riwayat pengajuannya sendiri, sementara admin dapat melihat ringkasan dan seluruh pengajuan demo.

Antarmuka aplikasi menggunakan bahasa Inggris. Autentikasi dan data demo disimulasikan di frontend menggunakan data JSON in-memory, tanpa backend atau database. Riwayat pengajuan hanya tersedia selama aplikasi berjalan dan hilang saat halaman dimuat ulang.

## 2. Tujuan

- Membantu calon nasabah menjelajahi kategori produk asuransi.
- Memperlihatkan alur pengajuan yang mudah diikuti.
- Mengumpulkan data umum dan data khusus produk dalam formulir bertahap.
- Menampilkan konfirmasi setelah pengajuan dikirim.
- Memperlihatkan akses aplikasi berdasarkan role admin dan user.
- Membantu user melihat pengajuan yang dibuat oleh akun demonya.
- Membantu admin melihat ringkasan dan daftar seluruh pengajuan demo.

## 3. Pengguna dan platform

- **User:** calon nasabah individu yang menjelajahi produk, membuat pengajuan, dan melihat riwayat pengajuan milik akun demonya.
- **Admin:** pengguna internal demo yang melihat ringkasan, seluruh pengajuan demo, dan daftar akun user melalui area admin bersidebar.
- **Platform:** web responsif untuk desktop dan perangkat mobile.
- **Bahasa antarmuka:** Inggris.

## 4. Role dan autentikasi demo

- Sediakan login simulasi untuk dua role: `admin` dan `user`.
- Halaman login menerima email dan password. Aplikasi mencocokkan email dengan akun demo dan menggunakan satu password bersama yang sama untuk semua akun.
- Informasi email akun demo dan password bersama ditampilkan di bawah form login agar dapat digunakan saat demo.
- Pemeriksaan kredensial hanya simulasi di frontend; tidak menggunakan autentikasi sungguhan atau layanan identitas.
- User yang belum login tetap dapat menjelajahi katalog dan detail produk.
- Jika user yang belum login memilih **Start application**, arahkan ke halaman login dan simpan tujuan produk yang dipilih agar dapat dilanjutkan setelah login.
- Setelah login, arahkan admin ke **Admin Dashboard**. User yang masuk dari tombol **Start application** langsung menuju formulir produk yang dipilih; login user tanpa konteks pengajuan menuju **User Application Dashboard**.
- Halaman yang membutuhkan login mengarahkan guest ke halaman login. User tidak boleh melihat halaman admin; jika user membuka rute admin, arahkan kembali ke User Application Dashboard.
- User Application Dashboard menampilkan ringkasan dan riwayat pengajuan milik akun demo yang sedang login, serta akses untuk memulai pengajuan baru.
- Area admin menggunakan navigasi sidebar dengan halaman **Overview**, **Submissions**, dan **Users**. Admin dapat melihat ringkasan, seluruh pengajuan, dan 10 akun user dummy. Data bersifat baca-saja; perubahan status atau keputusan underwriting tidak termasuk cakupan.
- Data pengajuan diberi pemilik berupa ID akun demo agar riwayat user dapat difilter berdasarkan akun yang sedang login.

## 5. Kategori produk

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

## 6. Alur utama

1. Guest melihat katalog kategori produk.
2. Guest memilih produk dan melihat ringkasan perlindungannya.
3. Guest memilih **Start application** dan diarahkan ke halaman login.
4. User menyelesaikan login simulasi; aplikasi langsung membuka formulir pengajuan untuk produk yang dipilih sebelum login.
5. User mengisi data pemohon.
6. User mengisi data objek atau risiko yang akan diasuransikan.
7. User menambahkan dokumen melalui unggahan simulasi.
8. User memeriksa dan mengonfirmasi ringkasan pengajuan.
9. Aplikasi membuat nomor referensi demo, mengaitkan pengajuan dengan akun user yang aktif, dan menampilkan konfirmasi pengajuan terkirim.
10. User dapat melihat pengajuan tersebut di riwayat akun demonya. Admin dapat melihatnya di halaman Submissions pada area admin.

Alur berakhir setelah pengajuan terkirim. Demo tidak mencakup pembayaran atau keputusan underwriting.

## 7. Data formulir

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

## 8. Perilaku dan batasan demo

- Login, role, katalog produk, dan pengajuan dikelola sebagai data JSON in-memory di frontend.
- Sediakan akun demo untuk mensimulasikan role admin dan user. Semua akun memakai password demo yang sama dan informasi akun ditampilkan di bawah form login.
- Sediakan 10 data user dummy dan 10 data pengajuan dummy agar area admin memiliki data saat pertama kali dibuka. Pengajuan baru disimpan in-memory selama sesi aplikasi dan hilang saat halaman dimuat ulang; data contoh statis dimuat kembali.
- Tidak ada backend, database, penyimpanan permanen, pembayaran, atau integrasi eksternal.
- Akses user dibatasi ke riwayat milik akun demonya. Admin dapat membaca seluruh pengajuan demo dan daftar user dummy.
- Setelah submit, tampilkan konfirmasi seperti **Application Submitted** dan nomor referensi demo.
- Jangan menampilkan harga sebagai penawaran nyata. Jika angka ilustrasi ditambahkan kemudian, beri label **Illustrative estimate**.
- Tidak ada klaim bahwa pengajuan telah disetujui atau polis telah diterbitkan.

## 9. Kebutuhan pengalaman pengguna

- Gunakan formulir bertahap dengan indikator progres.
- Tampilkan hanya pertanyaan yang relevan dengan produk terpilih.
- Sediakan ringkasan yang bisa diperiksa sebelum submit.
- Berikan validasi yang jelas pada kolom wajib dan format email/nomor telepon.
- Pastikan formulir dan tombol mudah digunakan pada layar mobile.
- Gunakan pesan konfirmasi yang membedakan pengajuan terkirim dari persetujuan asuransi.
- Tampilkan role akun demo yang aktif dengan jelas dan sediakan cara untuk keluar atau berpindah akun demo.
- Jika guest diarahkan ke login dari produk tertentu, pertahankan konteks produk dan langsung buka formulir pengajuan tersebut setelah login user. Login tanpa konteks produk tetap menuju User Application Dashboard.
- Buat riwayat user dan daftar admin mudah dipindai, dengan informasi produk, nomor referensi, tanggal demo, dan status **Submitted**.

## 10. Kriteria keberhasilan demo

- Pengguna dapat menemukan dan memilih salah satu dari delapan kategori.
- Pengguna dapat menyelesaikan formulir yang sesuai dengan kategori pilihannya.
- Pengguna dapat memeriksa ringkasan sebelum mengirim.
- Setelah submit, pengguna melihat konfirmasi dan nomor referensi demo.
- Guest yang menekan **Start application** diarahkan ke login dan langsung masuk ke formulir produk yang dipilih setelah login sebagai user, tanpa melewati dashboard.
- Login sebagai admin membuka Admin Dashboard; login sebagai user dari tombol **Start application** langsung membuka formulir produk terpilih, sedangkan login biasa membuka User Application Dashboard.
- User hanya melihat riwayat pengajuan akun demonya sendiri.
- Admin dapat melihat ringkasan, seluruh pengajuan demo, dan daftar 10 user dummy melalui sidebar, tanpa mengubah data.
- Pengajuan baru tersedia selama aplikasi berjalan dan hilang setelah halaman dimuat ulang; 10 data contoh tetap dimuat ulang.
- Tata letak tetap dapat digunakan di desktop dan mobile.
