const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("200");
// });

app.get("/", (req, res) => {
  response(200, "API v1 ready to go", "SUCCES", res);
});

// app.get("/cek", (req, res) => {
//   res.send("hoho");
// });

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "mahasiswa get list", res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "get detail mahasiswa", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;

  console.log(req.body);
  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, "${namaLengkap}", "${kelas}", "${alamat}")`;

  db.query(sql, (err, fields) => {
    if (err) throw err;
    if (fields.affectedRows) {
      console.log("data masuk");
    } else {
      console.log("ga masuk");
    }
  });
  res.send("ok");
  // response(200, "INI POSTING", "Data Added Successfully", res);
});

app.put("/mahasiswa", (req, res) => {
  res.send("INI PUT ATAU UPDATE DATA");
});

app.delete("/mahasiswa", (req, res) => {
  res.send("INI DELETE DATA");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
