import MUIDataTable from "mui-datatables";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
axios.defaults.withCredentials = true;

const TaskList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [task, setTask] = useState([]);
  const [datos, setDatos] = useState([]);

  const getData = async () => {
    const dateFormat = (date) => {
      return moment.utc(date).format("DD-MM-YYYY");
    };

    const respuesta = await axios.get(`http://127.0.0.1:8000/taskList/`);
    const users = axios
      .get("http://127.0.0.1:8000/register/", {
        withCredentials: true,
      })
      .then((response) => {
        setDatos(response.data);
        const usernames = datos.map((obj) => obj.username);
        setUser(usernames);
      });

    const respuestaFormateada = respuesta.data.map((item, index) => {
      item.created_at = dateFormat(item.created_at);
      item.updated_at = dateFormat(item.updated_at);
      item.assigned_to = asignarUser(item.assigned_to);
      return item;
    });
    setTask(respuestaFormateada);
    console.log(respuestaFormateada)
  };

  const asignarUser = (asignado) => {
    if(asignado === "1"){
        return 'Carlos'
    }
  }
  

  const handleRedirect = (ruta) => {
    navigate(`/data/${ruta}`);
  };

  const eliminarDatos = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar estos datos? Esta acción no se puede deshacer."
    );

    if (confirmacion) {
      const res = await axios.delete(`http://127.0.0.1:8000/taskList/${id}`);
      console.log(res.data);
      alert("Se han eliminado los datos con éxito.");
    }
  };

  const columns = [
    {
      name: "created_at",
      label: "FECHA",
      options: {
        sortOrder: "desc",
        searchable: false,
        filter: true,
        filterType: "Date",
      },
    },
    {
      name: "name",
      label: "DESCRIPCION",
      options: {
        sort: false,
      },
    },
    {
      name: "status",
      label: "ESTADO",
    },
    {
      name: "assigned_to",
      label: "ASIGNADO",
    },
    {
      name: "_id",
      label: "ACCIONES",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <button
                className="btn btn btn-outline-dark"
                onClick={() => handleRedirect(tableMeta.rowData[6])}
              >
                <i className="bi bi-clipboard2"></i>
              </button>
              <button
                className="btn btn btn-outline-dark ms-2"
                onClick={() => handleRedirect(`${tableMeta.rowData[6]}/edit`)}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => eliminarDatos(tableMeta.rowData[6])}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "stacked",
    filter: true,
    download: false,
    print: false,
    rowsPerPageOptions: [5, 10, 20, 30],
    sort: true,
    jumpToPage: true,
    selectableRows: "none",
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-background">
      <div>
        <MUIDataTable
          title={"Lista de tareas"}
          data={task}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

export default TaskList;
