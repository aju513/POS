import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
          <div class="sb-sidenav-menu">
            <div class="nav">
              <div class="sb-sidenav-menu-heading">Core</div>
              <Link class="nav-link" to="/">
                <div class="sb-nav-link-icon">
                  <i class="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </Link>
              <div class="sb-sidenav-menu-heading">Management</div>
              <a
                class="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseCategory"
                aria-expanded="false"
                aria-controls="collapseCategory"
              >
                <div class="sb-nav-link-icon">
                  <i class="fas fa-columns"></i>
                </div>
                Category
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="collapseCategory"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav class="sb-sidenav-menu-nested nav">
                  <Link class="nav-link" to="/category/">
                    Show Category
                  </Link>
                  <Link class="nav-link" to="/category/create">
                    Add Category
                  </Link>
                </nav>
              </div>
              <a
                class="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div class="sb-nav-link-icon">
                  <i class="fas fa-columns"></i>
                </div>
                Sub Category
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav class="sb-sidenav-menu-nested nav">
                  <Link class="nav-link" to="/sub-category">
                    Show SubCategory
                  </Link>
                  <Link class="nav-link" to="/sub-category/create">
                    Add SubCategory
                  </Link>
                </nav>
              </div>
              <a
                class="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseBrands"
                aria-expanded="false"
                aria-controls="collapseBrands"
              >
                <div class="sb-nav-link-icon">
                  <i class="fas fa-columns"></i>
                </div>
                Brands
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="collapseBrands"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav class="sb-sidenav-menu-nested nav">
                  <Link class="nav-link" to="/brand">
                    Show Brand
                  </Link>
                  <Link class="nav-link" to="/brand/create">
                    Add Brand
                  </Link>
                </nav>
              </div>
              <a
                class="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSupplier"
                aria-expanded="false"
                aria-controls="collapseSupplier"
              >
                <div class="sb-nav-link-icon">
                  <i class="fas fa-columns"></i>
                </div>
                Suppliers
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="collapseSupplier"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav class="sb-sidenav-menu-nested nav">
                  <Link class="nav-link" to="/supplier">
                    Show Supplier
                  </Link>
                  <Link class="nav-link" to="/supplier/create">
                    Add Supplier
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
