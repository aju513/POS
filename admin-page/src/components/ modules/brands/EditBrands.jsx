import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partials/Breadcrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Constants from "../../../Constants";

const EditBrands = () => {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const handleInput = (e) => {
    if (e.target.name == "name") {
      let slug = e.target.value;

      slug = slug.toLowerCase();
      slug = slug.replaceAll(" ", "-");

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
  const getCategoryValue = () => {
    axios
      .get(`${Constants.BASE_URL}/category/${params.id}`)
      .then((res) => {
        setInput(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
          console.log(errors);
        }
      });
  };
  const editCategoryOnClick = () => {
    console.log("afdsd");
    axios
      .put(`${Constants.BASE_URL}/category/${params.id}`, input)
      .then((res) => {
        navigate("/category");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
          console.log(errors);
        }
      });
  };
  useEffect(() => {
    getCategoryValue();
  }, []);
  return (
    <>
      <Breadcrumb title={"Edit Category"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader title={"Edit Category"} />
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
                    {input.photo != undefined && (
                      <div>
                        <div class="card">
                          <div class="card-body">
                            <img
                              src={input.photo}
                              class="card-img-top"
                              alt="image"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-primary"
                    onClick={editCategoryOnClick}
                  >
                    Edit Category
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

export default EditBrands;
