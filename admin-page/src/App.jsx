import "./assets/css/styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { RouterProvider, useNavigate } from "react-router-dom";
import Projectrouter from "./components/router/Projectrouter";
import { useEffect, useState } from "react";
import Publicrouter from "./components/router/PublicRouter";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.token !== undefined) {
      setAuth(true);
      if (localStorage.token !== undefined) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.token}`;
      }
    }
  }, []); // Make sure to include navigate in the dependency array
  return (
    <>
      {auth ? (
        <RouterProvider router={Projectrouter} />
      ) : (
        <RouterProvider router={Publicrouter} />
      )}
    </>
  );
}

export default App;
