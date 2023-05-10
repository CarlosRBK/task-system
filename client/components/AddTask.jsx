import axios from "axios";
import { Formik, Form, Field, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/adduser.css";
import * as Yup from "yup";

const dataErrores = Yup.object().shape({
  assigned_to: Yup.string().required("* Campo Obligatorio"),
  name: Yup.string().required("*Porfavor ingrese una descripción."),
});

const AddTask = () => {
  const [datos, setDatos] = useState([]);
  const [name, setName] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/register/", {
        withCredentials: true,
      })
      .then((response) => {
        setDatos(response.data);
        const usernames = datos.map((obj) => obj.username);
        setName(usernames);
        console.log(response.data);
      });
  }, []);

  const navigate = useNavigate();
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: "",
      assigned_to: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const resp = axios.post("http://127.0.0.1:8000/taskList/", values, {
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
              <label
                htmlFor="assigned_to"
                className="form-label mt-3"
                style={{ fontWeight: "bold" }}
              >
                Asignar a:
              </label>
              <Field
                name="assigned_to"
                as="select"
                className="form-control"
                onChange={handleChange}
              >
                <option value=" ">ASIGNAR A:</option>
                {datos.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.username}
                  </option>
                ))}
              </Field>
              {touched.assigned_to && errors.assigned_to && (
                <div className="form-text text-danger">
                  {errors.assigned_to}
                </div>
              )}

              <label
                htmlFor="name"
                className="form-label mt-3"
                style={{ fontWeight: "bold" }}
                placeholder="Ingrese una breve descripción"
              >
                Descripción
              </label>
              <Field
                name="name"
                as="textarea"
                className="form-control"
                onChange={handleChange}
              />

              <div className="form-group d-flex justify-content-center gap-3 mt-5 mb-5">
                <button type="submit" className="btn btn-primary mb-5">
                  Asignar
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
