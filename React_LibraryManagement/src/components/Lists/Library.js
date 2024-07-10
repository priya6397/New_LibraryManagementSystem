import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import LibraryServices from "../Service/LibraryService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CityServices from "../Service/CityService";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Tooltip } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';


export default function Library() {
  const initialLibraryData = {
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    cityId: "",
  };

  const [library, setLibrary] = useState([]);
  const [currentData, setCurrentData] = useState(initialLibraryData);

  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = async () => {
    const result = await LibraryServices.loadLibrary();
    setLibrary(result.data);
  };

  const deleteLibrary = async (id) => {
    const result = await LibraryServices.deleteLibraryById(id);
    toast.success("Deleted successfully!!!");
    loadLibrary();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "cityId") {
      const selectedCity = viewCityData.find(
        (city) => city.id === parseInt(value)
      );
      setCurrentData({ ...currentData, city: selectedCity });
    } else {
      setCurrentData({ ...currentData, [name]: value });
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [viewCityData, setViewCityData] = useState([]);

  const getLibrary = async (id) => {
    handleShow();
    const result = await LibraryServices.getLibrary(id);
    setCurrentData(result.data);
  };

  const updateLibrary = () => {
    const updatedData = { ...currentData, cityId: currentData.city?.id }; //... spread operator stores data
    LibraryServices.updateLibrary(currentData.id, updatedData)
      .then((response) => {
        toast.success("Updated successfully!!!");
        if (response.status === 200) {
          console.log(response.data);
          handleClose();
          loadLibrary();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getCities = () => {
    CityServices.loadCity()
      .then((response) => {
        setViewCityData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getCities();
  }, []);

  console.log(currentData, "hii");
  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h2 style={{ fontWeight: "bold" }}>Library List</h2>
      <Table stripped bordered hover variant="light">
        <thead style={{ backgroundColor: "#1976d2", height: "40px" }}>
          <th scope="row" style={{ textAlign: "center" }}>
            S.No.
          </th>
          <th scope="row" style={{ textAlign: "center" }}>
            Library Name
          </th>
          <th scope="row" style={{ textAlign: "center" }}>
            Library Address
          </th>
          <th scope="row" style={{ textAlign: "center" }}>
            Library Phoneno
          </th>
          <th scope="row" style={{ textAlign: "center" }}>
            Library Email
          </th>
          <th scope="row" style={{ textAlign: "center" }}>
            Created At
          </th>
          <th scope="row" style={{ textAlign: "center" }}>
            Action
          </th>
        </thead>
        <tbody>
          {library.map((row, index) => (
            <tr key={row.id}>
              <td component="th" style={{ textAlign: "center" }}>
                {index+1}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.name}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.address}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.phoneNo}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.email}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.createdAt}
              </td>
              <td>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  size="large"
                  onClick={() => getLibrary(row.id)}
                  color="info"
                >
                  <EditNoteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => deleteLibrary(row.id)}
                  color="error"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
        <div
          style={{
            display: "table-caption",
            width: "80%",
            margin: "20px auto",
          }}
        >
          <Link to="/AddLibrary">
            <Button variant="primary">Add Library</Button>
          </Link>
        </div>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold" }}>Edit Library</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Select
              value={currentData?.city?.id || ""}
              onChange={handleInputChange}
              name="cityId"
              title="Select City"
            >
              <option>Select City</option>{" "}
              {viewCityData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}{" "}
            </Form.Select>
          </Form.Group>
          <div className="form-group mb-2">
            <input
              name="name"
              className="form-control"
              value={currentData.name}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Library Name"
              title="Enter library name here"
            />
          </div>
          <div className="form-group mb-2">
            <input
              name="address"
              className="form-control"
              value={currentData.address}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Address"
              title="Enter address here"
            />
          </div>
          <div className="form-group mb-2">
            <input
              name="phoneNo"
              className="form-control"
              value={currentData.phoneNo}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Phone No."
              title="Enter phone no. here"
            />
          </div>
          <div className="form-group mb-2">
            <input
              name="email"
              className="form-control"
              value={currentData.email}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Email"
              title="Enter email here"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateLibrary}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </div>
  );
}
