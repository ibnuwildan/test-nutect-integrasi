import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const From = () => {
  const [barang, setBarang] = useState([]);
  const [inputData, setInputData] = useState({
    foto: null,
    nama: "",
    hargaBeli: 0,
    hargaJual: 0,
    stok: 0,
  });
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Validasi input hanya angka
    if (name === "hargaBeli" || name === "hargaJual" || name === "stok") {
      if (!/^\d+$/.test(value)) {
        return;
      }
    }
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setInputData({
      ...inputData,
      foto: event.target.files[0],
    });
  };

  const handleAddBarang = (event) => {
    // Validasi jenis file
    event.preventDefault();
    if (inputData.foto) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(inputData.foto.type)) {
        alert("Jenis file gambar tidak valid. Harap pilih file JPG atau PNG.");
        return;
      }
    }
    // Validasi ukuran file
    if (inputData.foto && inputData.foto.size > 100000) {
      alert("Ukuran file gambar terlalu besar. Harap pilih file dengan ukuran maksimum 100KB.");
      return;
    }

    const isNameExist = barang.some((item) => item.get("nama") === inputData.nama);
    if (isNameExist) {
      alert("Nama barang sudah ada dalam daftar!");
      return;
    }

    const formData = new FormData();
    formData.append("foto", inputData.foto);
    formData.append("nama", inputData.nama);
    formData.append("hargaBeli", inputData.hargaBeli);
    formData.append("hargaJual", inputData.hargaJual);
    formData.append("stok", inputData.stok);
    if (editIndex === -1) {
      setBarang([...barang, formData]);
    } else {
      const updatedBarang = [...barang];
      updatedBarang[editIndex] = formData;
      setBarang(updatedBarang);
      setEditIndex(-1);
    }

    setInputData({
      foto: null,
      nama: "",
      hargaBeli: 0,
      hargaJual: 0,
      stok: 0,
    });
  };

  const handleEditBarang = (index) => {
    const selectedBarang = barang[index];
    setInputData({
      foto: selectedBarang.get("foto"),
      nama: selectedBarang.get("nama"),
      hargaBeli: selectedBarang.get("hargaBeli"),
      hargaJual: selectedBarang.get("hargaJual"),
      stok: selectedBarang.get("stok"),
    });
    setEditIndex(index);
  };

  const handleDeleteBarang = (index) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus barang ini?");
    if (confirmDelete) {
      const updatedBarang = [...barang];
      updatedBarang.splice(index, 1);
      setBarang(updatedBarang);
    }
  };

  return (
    <div className="container pt-3">
      <h1>Daftar Barang</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nama Barang</th>
            <th>Harga Beli</th>
            <th>Harga Jual</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {barang.map((item, index) => (
            <tr key={index}>
              <td>{item.get("foto") ? item.get("foto").name : "N/A"}</td>
              <td>{item.get("nama")}</td>
              <td>{item.get("hargaBeli")}</td>
              <td>{item.get("hargaJual")}</td>
              <td>{item.get("stok")}</td>
              <td>
                <Button className="btn btn-warning me-2" onClick={() => handleEditBarang(index)}>
                  Edit
                </Button>
                <Button className="btn btn-danger" onClick={() => handleDeleteBarang(index)}>
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h1>Tambah Barang</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Foto</Form.Label>
          <Form.Control type="file" name="foto" onChange={handleFileChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Nama Brang</Form.Label>
          <Form.Control type="text" name="nama" value={inputData.nama} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Harga Beli</Form.Label>
          <Form.Control type="number" name="hargaBeli" value={inputData.hargaBeli} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Harga Jual</Form.Label>
          <Form.Control type="number" name="hargaJual" value={inputData.hargaJual} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Stok</Form.Label>
          <Form.Control type="number" name="stok" value={inputData.stok} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleAddBarang}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default From;
