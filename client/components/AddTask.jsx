import axios from "axios";
import { Formik, Form, Field, useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/adduser.css";
import * as Yup from "yup";

const dataErrores = Yup.object().shape({
  fecha: Yup.date().required("Campo Obligatorio"),
  assigned_to: Yup.string().required("* Campo Obligatorio"),
  descripcion: Yup.string().required("*Porfavor ingrese una descripción."),
});

const AddTask = () => {
  const navigate = useNavigate();
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      task: "",
      assigned_to: "",
      status: "Pending",
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
        console.log("Carga exitosa");
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

    <Formik enableReinitialize={true} validationSchema={dataErrores}>
      {({ errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <label htmlFor="fecha" className="form-label mt-3" style={{ fontWeight: "bold" }}>
            Fecha
          </label>
          <Field
            name="fecha"
            type="date"
            className="form-control"
            onChange={handleChange}
          />

          <label htmlFor="assigned_to" className="form-label mt-3" style={{ fontWeight: "bold" }}>
            Asignar a:
          </label>
          <Field
            name="assigned_to"
            as="select"
            className="form-control"
            onChange={handleChange}
          >
            <option value=" ">Selecciona un tipo</option>
            <option value=" ">opcion1</option>
            <option value=" ">opcion2</option>
          </Field>
          {touched.assigned_to && errors.assigned_to && (
            <div className="form-text text-danger">{errors.assigned_to}</div>
          )}

          <label
            htmlFor="task"
            className="form-label mt-3" style={{ fontWeight: "bold" }}
            placeholder="Ingrese una breve descripción"
          >
            Descripción
          </label>
          <Field
            name="task"
            as="textarea"
            className="form-control"
            onChange={handleChange}
          />

          <div className="form-group d-flex justify-content-center gap-3 mt-5 mb-5">
            <button type="submit" className="btn btn-primary mb-5">
              Crear cuenta
            </button>
            <Link type="submit" className="btn btn-warning mb-5" to="/">
              Volver
            </Link>
          </div>

        </Form>
      )}
    </Formik>
    </div>
    </div>
  );
};

export default AddTask;
