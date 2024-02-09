import React, { useState } from "react";
import Breadcrumb from "../../partials/Breadcrumb";
import { ListAltOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import CardHeader from "../../partials/miniComponent/CardHeader";

const AddCategory = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleInput = (e) => {
    if (e.target.name == "name") {
      let slug = e.target.value;

      slug = slug.toLowerCase();
      slug = slug.replaceAll(" ", "-");
      console.log(slug);
      setInput((prev) => ({
        ...prev,
        slug: slug,
      }));
    }
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handlePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      setInput((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };
  const handleAddCategory = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${Constants.BASE_URL}/category`, input)
      .then((res) => {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/category");
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
          console.log(errors);
        }
      });
  };
  return (
    <>
      <Breadcrumb title={"Add Category"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader title={"Add Category"} />
            <div className="card-body">
              {/* name,slug,description,serial,photo,status */}
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="" className="w-100">
                    Name
                    <input
                      className={
                        errors.name != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type="text"
                      placeholder=""
                      value={input.name}
                      name="name"
                      onChange={handleInput}
                    />
                    <p className="login-error-msg">
                      <small>
                        {errors.name != undefined ? errors.name[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="w-100">
                    Slug
                    <input
                      className={
                        errors.slug != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type="text"
                      placeholder=""
                      value={input.slug}
                      name="slug"
                      onChange={handleInput}
                    />
                    <p className="login-error-msg">
                      <small>
                        {errors.slug != undefined ? errors.slug[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="w-100">
                    Serial
                    <input
                      className={
                        errors.serial != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type="number"
                      placeholder=""
                      value={input.serial}
                      name="serial"
                      onChange={handleInput}
                    />
                    <p className="login-error-msg">
                      <small>
                        {errors.serial != undefined ? errors.serial[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="w-100">
                    <p>Status</p>
                    <select
                      className={
                        errors.serial != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      placeholder="Select category"
                      value={input.status}
                      name="status"
                      onChange={handleInput}
                    >
                      <option disabled="true">Select Category</option>
                      <option value={0}>Inactive</option>
                      <option value={1}>Active</option>
                    </select>
                    <p className="login-error-msg">
                      <small>
                        {errors.status != undefined ? errors.status[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="w-100">
                    Description
                    <textarea
                      className={
                        errors.description != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type="text"
                      placeholder=""
                      value={input.description}
                      name="description"
                      onChange={handleInput}
                    />
                    <p className="login-error-msg">
                      <small>
                        {errors.description != undefined
                          ? errors.description[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6 mt-4">
                  <label className="w-100">
                    Photo
                    <input
                      className={
                        errors.photo != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type="file"
                      placeholder=""
                      name="photo"
                      onChange={handlePhoto}
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-primary"
                    onClick={handleAddCategory}
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
