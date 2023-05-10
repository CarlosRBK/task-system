import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/adduser.css";

const AddUser = () => {

  const navigate = useNavigate();
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: "",
      first_name: '',
      last_name: ' ',
      password: "",
      phone_number: 0,
      address: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const resp = axios.post("http://127.0.0.1:8000/register/", values, {
        withCredentials: true,
      });
      console.log(resp);
      if (resp.data === 200) {
        console.log(resp);
      } else {
        // navigate("/");
        console.log("hola");
      }
    },
  });

  return (
    <div className="container text-center vh-100 ">
      <div
        className="container mt-5"
        id="backgroundImg"
        style={{ width: "300px", height: "auto" }}
      >
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3"></div>
          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label mt-3"
              style={{ fontWeight: "bold" }}
            >
              User Name
            </label>
            <input
              className="form-control item"
              id="username"
              type="username"
              placeholder="Nombre de Usuario"
              name="username"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label mt-3"
              style={{ fontWeight: "bold" }}
            >
              Nombre
            </label>
            <input
              className="form-control item"
              id="first_name"
              type="string"
              placeholder="Nombre"
              name="first_name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label mt-3"
              style={{ fontWeight: "bold" }}
            >
              Apellido
            </label>
            <input
              className="form-control item"
              id="last_name"
              type="string"
              placeholder="Nombre de Usuario"
              name="last_name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label mt-3"
              style={{ fontWeight: "bold" }}
            >
              Contraseña
            </label>
            <input
              className="form-control item"
              id="password"
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label mt-3"
              style={{ fontWeight: "bold" }}
            >
              Ciudad
            </label>
            <input
              className="form-control item"
              id="address"
              type="string"
              placeholder="Dirección"
              name="address"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label mt-3"
              style={{ fontWeight: "bold" }}
            >
              Numero
            </label>
            <input
              className="form-control item"
              id="phone_number"
              type="number"
              placeholder="numero de celular"
              name="phone_number"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label mt-3"
              style={{ fontWeight: "bold" }}
            >
              Numero
            </label>
            <input
              className="form-control item"
              id="email"
              type="string"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="form-group d-flex justify-content-center gap-3 mt-5 mb-5">
            <button type="submit" className="btn btn-primary mb-5">
              Crear cuenta
            </button>
            <Link type="submit" className="btn btn-warning mb-5" to="/">
              Volver
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
