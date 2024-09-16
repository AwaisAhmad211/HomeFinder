import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../src/routes/layouts/Layout'
import HomePage from '../src/routes/homePage/Home'
import ListPage from './routes/lists/ListPage'
import Login from './routes/login/Login'
import SinglePage from './routes/singlePage/SinglePage'

function App() {
    const router = createBrowserRouter([
      {
        path: "/",
        element : <Layout />,
        children : [
          {
            path: "/",
            element : <HomePage />
          },
          {
            path: "/list",
            element: <ListPage />
          },
          {
            path: "/:id",
            element: <SinglePage />
          },
          {
            path: "/login",
            element: <Login />
          },
        ]
      }
    ])
  return <RouterProvider router={router}/>
}

export default App
