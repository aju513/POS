import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partials/Breadcrumb";
import { ListAltOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import CardHeader from "../../partials/miniComponent/CardHeader";

const AddSupplier = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [addressInput, setAddressInput] = useState({
    district_id: "",
    municipality_id: "",
  });
  const [errors, setErrors] = useState([]);

  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const handleInput = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(input, addressInput);
  };
  const handleAddressInput = (e) => {
    setAddressInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "province_id") {
      setAddressInput((prev) => ({
        ...prev,
        district_id: "",
        municipality_id: "",
      }));
      setMunicipalities([]);
    }
    if (e.target.name === "district_id") {
      setAddressInput((prev) => ({
        ...prev,
        municipality_id: "",
      }));
    }
    console.log(input, addressInput);
  };
  const handlePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      setInput((prev) => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };
  const handleAddSupplier = (e) => {
    e.preventDefault();

    axios
      .post(`${Constants.BASE_URL}/supplier`, [input, addressInput])
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        // navigate("/category");
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
          console.log(errors);
        }
      });
  };
  const getProvinceData = () => {
    axios.get(`${Constants.BASE_URL}/province`).then((res) => {
      setProvince(res.data);
    });
  };
  const getDistrictData = () => {
    axios
      .get(`${Constants.BASE_URL}/district/${addressInput.province_id}`)
      .then((res) => {
        setDistricts(res.data);
      });
  };
  const getMunicipalityData = () => {
    axios
      .get(`${Constants.BASE_URL}/municipality/${addressInput.district_id}`)
      .then((res) => {
        setMunicipalities(res.data);
      });
  };
  useEffect(() => {
    getProvinceData();
  }, []);
  useEffect(() => {
    if (addressInput.province_id) {
      getDistrictData();
    }
    if (addressInput.district_id) {
      getMunicipalityData();
    }
  }, [addressInput]);
  return (
    <>
      {/* companyname,phone,email,status,details */}
      <Breadcrumb title={"Add Supplier"} />
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <CardHeader title={"Add Supplier"} />
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
                        {errors.name !== undefined ? errors.name[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="w-100">
                    Phone
                    <input
                      className={
                        errors.phone !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type="tel"
                      placeholder=""
                      value={input.phone}
                      name="phone"
                      onChange={handleInput}
                    />
                    <p className="login-error-msg">
                      <small>
                        {errors.phone !== undefined ? errors.phone[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="w-100">
                    Email Address
                    <input
                      className={
                        errors.email !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type="text"
                      placeholder=""
                      value={input.email}
                      name="email"
                      onChange={handleInput}
                    />
                    <p className="login-error-msg">
                      <small>
                        {errors.email !== undefined ? errors.email[0] : null}
                      </small>
                    </p>
                  </label>
                </div>

                <div className="col-md-6">
                  <label htmlFor="" className="w-100">
                    <p>Status</p>
                    <select
                      className={
                        errors.serial !== undefined
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
                      <option value={1} selected>
                        Active
                      </option>
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
                    Logo
                    <input
                      className={
                        errors.logo != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type="file"
                      placeholder=""
                      name="logo"
                      onChange={handlePhoto}
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-primary"
                    onClick={handleAddSupplier}
                  >
                    Add Supplier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <CardHeader title={"Add Supplier Address"} />
            <div className="card-body">
              {/* name,slug,description,serial,photo,status */}
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="" className="w-100">
                    <p>Province</p>
                    <select
                      className={
                        errors.province_id !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      placeholder="Select province"
                      value={input.province_id}
                      name="province_id"
                      onChange={handleAddressInput}
                      required
                    >
                      <option disabled="true" selected>
                        Select province
                      </option>
                      {province.map((ele, index) => (
                        <option value={ele.id}>{ele.name}</option>
                      ))}
                    </select>
                    <p className="login-error-msg">
                      <small>
                        {errors.province_id !== undefined
                          ? errors.province_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-12">
                  <label htmlFor="" className="w-100">
                    <p>District</p>
                    <select
                      className={
                        errors.district_id !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      placeholder="Select district"
                      value={addressInput.district_id}
                      name="district_id"
                      onChange={handleAddressInput}
                      required
                      disabled={districts.length <= 0 ? true : false}
                    >
                      <option selected value="" disabled>
                        Select district
                      </option>
                      {districts.map((ele, index) => (
                        <option value={ele.id} key={index}>
                          {ele.name}
                        </option>
                      ))}
                    </select>
                    <p className="login-error-msg">
                      <small>
                        {errors.district_id !== undefined
                          ? errors.district_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-12">
                  <label htmlFor="" className="w-100">
                    <p>Municipality</p>
                    <select
                      className={
                        errors.municipality_id !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      placeholder="Select Municipality"
                      value={addressInput.municipality_id}
                      name="municipality_id"
                      onChange={handleAddressInput}
                      required
                      disabled={municipalities.length <= 0 ? true : false}
                    >
                      <option value="" disabled="true" selected>
                        Select Municipality
                      </option>
                      {municipalities.map((ele, index) => (
                        <option value={ele.id} key={index}>
                          {ele.name}
                        </option>
                      ))}
                    </select>
                    <p className="login-error-msg">
                      <small>
                        {errors.municipality_id !== undefined
                          ? errors.municipality_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSupplier;
