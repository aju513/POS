import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partials/Breadcrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import Constants from "../../../Constants";
import axios from "axios";
import ImageModal from "../../partials/miniComponent/ImageModal";
import ReactPaginate from "react-paginate";
import { SearchOutlined } from "@mui/icons-material";
import { EditOutlined } from "@mui/icons-material";
import { DeleteOutline } from "@mui/icons-material";
import { VisibilityOutlined } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Remove } from "@mui/icons-material";
import CategoryModal from "../../partials/miniComponent/CategoryModal";
import { Link } from "react-router-dom";
const CategoryList = () => {
  const [input, setInput] = useState({
    pages: 5,
    order_by: "asc",
    search: "",
  });
  const [categories, setCategories] = useState([]);
  //modal category show
  const [categoryShow, setCategoryShow] = useState(false);
  const [categoryModalData, setCategoryModalData] = useState({});
  //modal image show
  const [imageshow, setImageShow] = useState(false);
  const [modalPhoto, setModalPhoto] = useState("");
  //pagination
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const handleInput = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const getCategory = (pageNumber) => {
    axios
      .get(
        `${Constants.BASE_URL}/category?page=${
          pageNumber != undefined ? pageNumber.selected + 1 : ""
        }&search=${input.search}&order_by=${input.order_by}&pages=${
          input.pages
        }`
      )
      .then((res) => {
        setCategories(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setStartFrom(res.data.meta.from);
        setTotalItemsCount(res.data.meta.total);
        setActivePage(res.data.meta.current_page);
        console.log(res);
      });
  };
  const handleClose = (photo) => {
    setImageShow((e) => !e);
    setModalPhoto(photo);
  };
  const handleCategoryModalShowOrClose = (data) => {
    setCategoryShow((e) => !e);
    setCategoryModalData(data);
  };

  const handleCategoryDelete = (id) => {
    axios.delete(`${Constants.BASE_URL}/category/${id}`).then((res) => {
      window.location.reload();
    });
  };

  
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <Breadcrumb title={"Category List"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <label htmlFor="" className="w-100">
                    <input
                      className="form-control mt-2"
                      type="search"
                      name="search"
                      onChange={handleInput}
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <label htmlFor="" className="w-100">
                    <select
                      className={"form-control mt-2"}
                      placeholder="Order by"
                      name="order_by"
                      onChange={handleInput}
                    >
                      <option disabled="true">Select Order By</option>
                      <option value={"asc"}>Ascending</option>
                      <option value={"desc"}>Descending</option>
                    </select>
                  </label>
                </div>
                <div className="col-md-2">
                  <label htmlFor="" className="w-100">
                    <select
                      className={"form-control mt-2"}
                      placeholder="Order by"
                      name="pages"
                      onChange={handleInput}
                    >
                      <option disabled="true">Pages</option>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>10</option>
                    </select>
                  </label>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-primary mt-2"
                    onClick={getCategory}
                  >
                    Search
                    <SearchOutlined />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader title={"Category List"} />
            <div className="card-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Name</th>
                    <th scope="col">Serial</th>
                    <th scope="col">Photo</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Date Time</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((ele, index) => {
                    return (
                      <tr>
                        <td>{startFrom + index}</td>
                        <td>{ele.name}</td>
                        <td>{ele.serial}</td>
                        <td>
                          <img
                            src={ele.photo}
                            className="table-thumbnail-image"
                            onClick={() => handleClose(ele.photo)}
                          />
                        </td>
                        <td>{ele.created_by}</td>
                        <td>{ele.created_at}</td>
                        <td>
                          <div className="d-flex">
                            <button
                              className="btn btn-success mx-2"
                              onClick={() =>
                                handleCategoryModalShowOrClose(ele)
                              }
                            >
                              <RemoveRedEyeIcon />
                            </button>
                            <Link to={`edit/${ele.id}`}>
                              <button className="btn btn-primary mx-2">
                                <EditOutlined />
                              </button>
                            </Link>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => handleCategoryDelete(ele.id)}
                            >
                              <DeleteOutline />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  <ImageModal
                    handleClose={handleClose}
                    show={imageshow}
                    img={modalPhoto}
                  />
                  <CategoryModal
                    handleClose={handleCategoryModalShowOrClose}
                    show={categoryShow}
                    data={categoryModalData}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ReactPaginate
        // activeLinkClassName={activePage}
        nextLabel="next >"
        onPageChange={(e) => getCategory(e)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalItemsCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default CategoryList;
