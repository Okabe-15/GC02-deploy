# Issac Movie Client

Project client React untuk aplikasi movie. Project ini terdiri dari public site dan CMS.

## Menjalankan Project

Masuk ke folder `public` atau `cms`, lalu jalankan:

```bash
npm install
npm run dev
```

## API yang Digunakan

- `POST /users/login` untuk login
- `POST /users/add-user` untuk menambah staff
- `GET /movies` untuk melihat movie di CMS
- `POST /movies` untuk menambah movie
- `PUT /movies/:id` untuk mengubah movie
- `DELETE /movies/:id` untuk menghapus movie
- `PATCH /movies/:id` untuk upload image
- `GET /genres` untuk melihat genre
- `GET /pub/movies` untuk halaman public
- `GET /pub/movies/:id` untuk detail movie
