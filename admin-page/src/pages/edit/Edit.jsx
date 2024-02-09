import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import DataTable from "../../components/datatable/DataTable";
import "./edit.scss";
import InputField from "../../components/form/InputField";
import { Navbar } from "../../components/navbar/Navbar";
import { Container } from "@mui/material";
import { Row } from "react-bootstrap";

const Edit = () => {
  const [value, setValue] = useState({});
  const inputs = [
    {
      label: "Title",
      placeholder: "Enter Title",
      colSize: "6",
    },
    {
      label: "Display",
      colSize: "6",
      type: "checkbox",
    },
  ];
  return (
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <Form className="form">
          <Container>
            <Row>
              {inputs.map((inp) => (
                <InputField
                  colSize={inp.colSize}
                  label={inp.label}
                  placeholder={inp.placeholder}
                  type={inp.type ? inp.type : "text"}
                />
              ))}
            </Row>
          </Container>
        </Form>
      </div>
    </div>
  );
};

export default Edit;
