# 🚀 Fitur Utama Kaze POS

Kaze POS adalah sistem Point of Sale (POS) modern tingkat enterprise yang dibangun kondengan **React 19**, **Vite**, dan **Electron**. Aplikasi ini dirancang untuk memberikan pengalaman kasir yang premium, cepat, dan handal.

## 💎 1. Antarmuka Pengguna Premium
- **Desain Modern**: Menggunakan estetika *glassmorphism* dan layout yang bersih untuk efisiensi kerja maksimal.
- **Responsif & Fluid**: Animasi halus menggunakan `framer-motion` untuk pengalaman pengguna yang interaktif.
- **Dark Mode & Tema RGB**: Dukungan penuh untuk mode gelap dan kustomisasi warna tema secara real-time.

## 🖥️ 2. Layar Pelanggan (Customer Display)
- **Sinkronisasi Otomatis**: Menampilkan detail belanjaan dan total harga kepada pelanggan di layar kedua menggunakan `BroadcastChannel`.
- **Media Promosi**: Mendukung tampilan visual di sisi pelanggan saat transaksi berlangsung.

## 👨‍🍳 3. Kitchen Display System (KDS)
- **Manajemen Pesanan Dapur**: Antarmuka khusus untuk bagian dapur guna memantau dan memproses pesanan yang masuk secara real-time.

## 👥 4. Manajemen Anggota (Membership)
- **Database Pelanggan**: Terintegrasi untuk menyimpan data pelanggan.
- **Diskon Otomatis**: Sistem diskon yang diaplikasikan secara otomatis berdasarkan nomor telepon anggota yang terdaftar.

## 📦 5. Manajemen Stok & Inventaris
- **Real-time Tracking**: Pemantauan stok barang secara langsung setiap kali ada transaksi.
- **Visual Alert**: Peringatan visual untuk barang dengan stok rendah agar pengadaan bisa dilakukan tepat waktu.

## 💸 6. Integrasi Pembayaran Multi-Metode
- **QRIS Manual**: Dukungan integrasi gambar QRIS statis tanpa biaya transaksi.
- **Midtrans Support**: Kesiapan integrasi dengan Midtrans untuk pembayaran digital yang lebih luas.
- **Kalkulator Tunai**: Fitur pembantu untuk menghitung uang kembalian dengan cepat.

## 📊 7. Laporan & Analitik Visual
- **Dashboard Interaktif**: Visualisasi data penjualan harian, mingguan, dan bulanan menggunakan grafik `Recharts`.
- **Ekspor Excel**: Kemampuan untuk mengekspor riwayat transaksi ke file profesional `.xlsx` (SheetJS).

## 💾 8. Arsitektur Data Hybrid
- **Database Lokal (Offline-First)**: Menggunakan **Dexie.js (IndexedDB)** untuk performa yang sangat cepat dan tetap berfungsi tanpa koneksi internet.
- **Cloud Sync**: Terintegrasi dengan **Supabase** untuk sinkronisasi data dan manajemen backend di cloud.

## 🛡️ 9. Keamanan & Aktivasi
- **Sistem Lisensi**: Fitur aktivasi aplikasi untuk memastikan penggunaan yang legal dan aman.
- **Data Lokal Aman**: Data sensitif disimpan di perangkat lokal tanpa ketergantungan penuh pada server eksternal.

---
*Kaze POS - Memberikan pengalaman retail terbaik dengan teknologi mutakhir.*
