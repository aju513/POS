import React from "react";
import { Button, Modal } from "react-bootstrap";

const SupplierShowModal = ({ show, handleClose, data }) => {
  if (data.address) {
    console.log(data.address.province);
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody>
              <tr>
                <th>Name:</th>
                <td>{data && data.name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{data && data.email}</td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>{data && data.phone}</td>
              </tr>
              <tr>
                <th>Status:</th>
                <td>{data && data.status}</td>
              </tr>
              <tr>
                <th>Province:</th>
                <td>
                  {data.address !== undefined
                    ? data.address.province?.name
                    : ""}
                </td>
              </tr>
              <tr>
                <th>District:</th>
                <td>
                  {data.address !== undefined
                    ? data.address.district?.name
                    : ""}
                </td>
              </tr>
              <tr>
                <th>Municipality:</th>
                <td>
                  {data.address !== undefined
                    ? data.address.municipality?.name
                    : ""}
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SupplierShowModal;
