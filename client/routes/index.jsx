import { createBrowserRouter} from 'react-router-dom'
import AddUser from '../components/addUser';
import Layout from '../layouts/Layout';
import ErrorPage from '../screens/ErrorPage';
import Inicio from '../screens/Inicio';
import RegistrarUsuario from '../screens/RegistrarUsuario';


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
      ],
    },
  ]);
  