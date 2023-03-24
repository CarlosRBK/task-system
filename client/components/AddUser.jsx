import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles/adduser.css'

const AddUser = () => {
  
  const navigate = useNavigate();
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: "",
      password1: "",
      password2:"",
    },
    onSubmit: (values) => {
      console.log(values)
      const resp = axios.post(
        "http://127.0.0.1:8000/registerUser/",
        values,
        { withCredentials: true }
      );
      console.log(resp);
      if (resp.data === 200) {
        console.log(resp);
      } else {
        navigate("/");
      }
    },
  });

  return (
    <div className="container text-center vh-100 ">
    <div className="container mt-5" id="backgroundImg" style={{width:'300px', height:'auto'}}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputEmail1" className="form-label mt-3" style={{fontWeight: 'bold'}}>Nombre</label>
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
        <label htmlFor="exampleInputEmail1" className="form-label mt-3" style={{fontWeight: 'bold'}}>Contraseña</label>
        <input
            className="form-control item"
            id="password1"
            type="password"
            placeholder="Contraseña"
            name="password1"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputEmail1" className="form-label mt-3" style={{fontWeight: 'bold'}}>Confirmar contraseña</label>
        <input
            className="form-control item"
            id="password2"
            type="password"
            placeholder="Confirmar Contraseña"
            name="password2"
            onChange={handleChange}
          />
        </div>

        <div className="form-group d-flex justify-content-center gap-3 mt-5 mb-5">
          <button type="submit" className="btn btn-primary mb-5" >
            Crear cuenta
          </button>
          <Link
            type="submit"
            className="btn btn-warning mb-5"
            to="/"
          >
            Volver
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddUser;
