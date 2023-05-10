import React from "react";
import { Link } from "react-router-dom";
import "./styles/taskmenu.css";

const TaskMenu = () => {
  return (
    <div className="container text-center vh-100 " id="backgroundImg">
      <div className="row">
        <div
          className="col mx-5 text-white shadow-lg rounded mw-100 fs-5 mt-5"
          id="botonesInicio"
          style={{
            height: "90px",
            width: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={"/tasklist"}>
            Ver Tareas
            <div>
              <i className="bi bi-list-task mx-3"></i>
            </div>
          </Link>
        </div>
        <div
          className="col mx-5 text-white shadow-lg rounded mw-100 fs-5 mt-5"
          id="botonesInicio"
          style={{
            height: "90px",
            width: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={"add/task"}>
            Agregar Tareas
            <i className="bi bi-file-earmark-plus-fill mx-3"></i>
          </Link>
        </div>
        <div
          className="col mx-5 text-white shadow-lg rounded mw-100 fs-5 mt-5"
          id="botonesInicio"
          style={{
            height: "90px",
            width: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={"add/user"}>
            Agregar Usuarios <i className="bi bi-person-fill-add mx-3"></i>
          </Link>
        </div>
      </div>
      <div className="row mt-5" id="botonesInicio">
      </div>
    </div>
  );
};

export default TaskMenu;
