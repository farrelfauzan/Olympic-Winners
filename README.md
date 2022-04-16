# Olympic-Winners-poolapack

Step by Step untuk menjalankan app

1. Clone Repository
2. Run pada terminal: npm install untuk menginstall package yang ada
3. Buat database pada MySQL
4. Run Server di terminal dengan npm start

Step by Step untuk melakukan CRUD pada localhost:3000 (Semua kegiatan dilakukan menggunakan API platform seperti postman atau insomnia)

Buka postman dan lakukan beberapa method yang ada dibawah ini

1. Hit localhost:3000/Olympic/allWinners dengan method get untuk mendapatkan data semua pemenang olympic pada database
2. Hit localhost:3000/Olympic/addAthlete dengan method post untuk menambahkan data pada tabel database dan masukkan isi body sesuai dengan nama kolom
3. Hit localhost:3000/Olympic/updateAthlete/:id dengan method put untuk mengupdate data pada tabel database sesuai dengan parameter id yang diinginkan, kemudian masukkan body untuk mengupdate kolom yang diinginkan
4. Hit localhost:3000/Olympic/deleteAthlete/:id dengan method delete untuk menghapus data pada tabel database sesuai dengan parameter id yang diinginkan
5. Hit localhost:3000/api/winners/all dan isi payload pada body dalam bentuk json

contoh:
{
  "startRow": 100,
  "endRow": 200,
  "rowGroupCols": [],
  "valueCols": [],
  "pivotCols": [],
  "pivotMode": false,
  "groupKeys": [],
  "filterModel": {
    "country.name": {
      "values": [
        "Sweden"
      ],
      "filterType": "set"
    }
  },
  "sortModel": [
    {
      "sort": "desc",
      "colId": "date"
    }
  ]
}


# App Deploy Using heroku

Karena dengan melakukan hit localhost:3000/api/winners/all pada link http://3.1.238.179:8080/ tidak bisa, maka digunakan heroku sebagai tempat deploy app.

Untuk memunculkan tabel, fitur filtering, sorting dan paginig pada link http://3.1.238.179:8080/ bisa dihit dengan https://olympic-000.herokuapp.com/api/


