import { createBrowserRouter} from 'react-router-dom'
import AddTask from '../components/AddTask';
import Layout from '../layouts/Layout';
import ErrorPage from '../screens/ErrorPage';
import Inicio from '../screens/Inicio';
import RegistrarUsuario from '../screens/RegistrarUsuario';
import TaskList from '../components/TaskList';


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
            path:'/',
            index: true,
            element: <Inicio />
        },
        {
          path: "add/user",
          element: <RegistrarUsuario />,
        },
        {
          path: "add/task",
          element: <AddTask />,
        },
        {
          path: "tasklist",
          element: <TaskList />,
        },
      ],
    },
  ]);
  