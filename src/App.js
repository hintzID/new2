import React, { useState, useEffect } from 'react';
import { db } from './firebase.js'

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ nama: '', umur: '' });

  useEffect(() => {
    const fetchData = async () => {
      const dataRef = db.ref('data');
      dataRef.on('value', (snapshot) => {
        const firebaseData = snapshot.val();
        const convertedData = firebaseData ? Object.entries(firebaseData) : [];
        setData(convertedData);
      });
    };

    fetchData();

    return () => {
      db.ref('data').off('value');
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDataRef = db.ref('data').push();
    newDataRef.set(formData);

    setFormData({ nama: '', umur: '' });
  };

  const handleEdit = (id) => {
    const editedDataRef = db.ref(`data/${id}`);
    editedDataRef.update(formData);

    setFormData({ nama: '', umur: '' });
  };

  const handleDelete = (id) => {
    const deletedDataRef = db.ref(`data/${id}`);
    deletedDataRef.remove();
  };
console.log(db);
  return (
    <div className="container bg-warning text-white">
      <h1 className="mt-4 bg-success p-3 text-center">CRUD Firebase Realtime Database</h1>

      <div className="bg-success pb-3 pt-1">
        <div className="mt-4 text-center">
          <h2 className="bg-info py-2 mx-auto d-inline-block w-50">Tambah Data</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="nama"
                  placeholder="Nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="umur"
                  placeholder="Umur"
                  value={formData.umur}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Tambah</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <h2 className="mt-4">Data</h2>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Umur</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map(([id, item]) => (
            <tr key={id}>
              <td>{item.nama}</td>
              <td>{item.umur}</td>
              <td className="">
                <button className="btn btn-primary" onClick={() => handleEdit(id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
