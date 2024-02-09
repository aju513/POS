import React from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import axios from "axios";
import Constants from "../../Constants";

const Nav = () => {
  const handleSidebar = () => {
    $("body").toggleClass("sb-sidenav-toggled");
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You sure you want to logout.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${Constants.BASE_URL}/logout`).then((res) => {
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          localStorage.removeItem("phone");
          localStorage.removeItem("photo");
          localStorage.removeItem("token");
          window.location.reload();
        });
      }
    });
  };
  return (
    <>
      <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand ps-3" href="index.html">
          Start Bootstrap
        </a>

        <button
          class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#!"
          onClick={handleSidebar}
        >
          <i class="fas fa-bars"></i>
        </button>

        <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div class="input-group">
            <input
              class="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button class="btn btn-primary" id="btnNavbarSearch" type="button">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>

        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="javascript:void(0)"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-user fa-fw"></i>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a class="dropdown-item" href="javascript:void(0)">
                  Settings
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#!">
                  Activity Log
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="javascript:void(0)"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
