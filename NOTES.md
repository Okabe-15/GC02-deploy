# Catatan Week 2

## Struktur Project

Client dibagi menjadi dua folder, yaitu `public` dan `cms`. Public bisa dibuka tanpa login untuk melihat movie. CMS digunakan untuk menambah, mengubah, dan menghapus data sehingga harus login terlebih dahulu.

Base URL API disimpan di file `constant/baseUrl.js` supaya tidak perlu menulis URL server berulang kali.

## Alur Login CMS

1. Email dan password disimpan menggunakan `useState`.
2. Ketika form disubmit, `handleLogin` menjalankan POST ke `/users/login`.
3. Server mengirimkan `access_token` jika email dan password benar.
4. Token disimpan ke localStorage dengan key `token`.
5. Setelah berhasil, user diarahkan ke halaman Home menggunakan `navigate("/")`.
6. `BaseLayout` mengecek token. Kalau token tidak ada, user dikembalikan ke `/login`.
7. Saat Logout ditekan, token dihapus dari localStorage lalu kembali ke Login.

## Home CMS

Ketika halaman Home dibuka, axios menjalankan GET ke `/movies`. Token dikirim pada header Authorization. Hasil dari API dimasukkan ke state `movies`, lalu ditampilkan ke dalam table menggunakan `movies.map()`.

Setiap movie memiliki action Edit, Upload Image, dan Delete. Edit membawa id movie melalui URL. Delete menjalankan DELETE ke `/movies/:id`, lalu movie yang sudah dihapus dikeluarkan dari state supaya table berubah tanpa refresh.

## Add Movie

State `form` menyimpan title, synopsis, trailer URL, image URL, rating, dan genre. Data genre diambil dari `/genres` ketika halaman dibuka, lalu ditampilkan sebagai option pada select.

Function `getFormData` digunakan untuk mengubah isi state sesuai input yang sedang diisi. Ketika form disubmit, semua isi state dikirim dengan POST ke `/movies`. Setelah berhasil, halaman kembali ke Home.

## Edit Movie

Id movie diambil dari URL menggunakan `useParams`. Setelah itu halaman menjalankan GET `/movies/:id` untuk mengambil data lama. Hasilnya dimasukkan ke state `form`, sehingga input langsung menampilkan data movie yang akan diedit.

Saat disubmit, data dari state dikirim menggunakan PUT ke `/movies/:id`. Add Movie dan Edit Movie memakai component `MovieForm` yang sama. Perbedaannya berada pada data form dan function submit yang dikirim melalui props.

## Upload Image

Halaman Upload Image mengambil detail movie berdasarkan id agar title dan gambar lama bisa ditampilkan. File dipilih menggunakan input `type="file"` dan disimpan ke state `image`.

File tidak dikirim sebagai JSON. File dimasukkan ke `FormData` dengan nama field `image`, kemudian dikirim menggunakan PATCH ke `/movies/:id`.

## Genre dan Add Staff

Halaman Genre menjalankan GET ke `/genres`, menyimpan hasilnya ke state, lalu menampilkannya dalam table.

Halaman Add Staff mempunyai state form untuk username, email, password, phone number, dan address. Setelah form disubmit, data dikirim menggunakan POST ke `/users/add-user`.

## Public Site

Public Home mengambil data dari `/pub/movies`. Query yang dikirim berisi page, search, filter genre, sortBy, dan sort. Jika salah satu state tersebut berubah, data movie diambil ulang menggunakan `useEffect`.

Pagination dibuat dari jumlah `totalPages` yang diberikan server. Tombol Previous dan Next mengubah `currentPage`. Daftar movie ditampilkan menggunakan component Card.

Saat Card dipilih, id movie dikirim melalui route `/detail/:id`. Halaman Detail mengambil satu movie dari `/pub/movies/:id` lalu menampilkan gambar, title, rating, synopsis, dan link trailer.

## Routing

React Router digunakan supaya perpindahan halaman tidak melakukan refresh. Public mempunyai route Home dan Detail. CMS mempunyai route Login, Home, Add Movie, Edit Movie, Upload Image, Genre, dan Add Staff. Semua halaman CMS selain Login berada di dalam `BaseLayout` agar Navbar dan pengecekan token digunakan bersama.
