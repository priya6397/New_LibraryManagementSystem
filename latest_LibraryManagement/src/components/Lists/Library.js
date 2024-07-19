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
import { toast } from 'react-toastify';
import { Col, Row } from "react-bootstrap";


export default function Library() {
  const initialLibraryData = {
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    cityId: "",
  };

  const[errors, setErrors] = useState({ 
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    cityId: "",
});

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

    switch (name) {
      case 'cityId':
        setErrors({ ...errors, cityId: validateCityId(value) });
        break;
      case 'email':
        setErrors({ ...errors, email: validateEmail(value) });
        break;
      case 'phoneNo':
        setErrors({ ...errors, phoneNo: validatePhoneNo(value) });
        break;
      case 'address':
        setErrors({ ...errors, address: validateAddress(value) });
        break;
      case 'name':
        setErrors({ ...errors, name: validateName(value) });
        break;
      default:
        break;
    };
  };

  const validateCityId = (cityId) => {
    if (!cityId) {
      return 'Select City!';
    } 
    return '';
  };

  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };
 
  const validatePhoneNo = (phoneNo) => {
    if (!phoneNo) {
      return 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNo)) {
      return 'Phone number must be 10 digits';
    }
    return '';
  };

  const validateAddress = (address) => {
    if (!address) {
      return 'Address is required';
    } else if (!/^[a-zA-Z0-9\\s]*$/.test(address)) {
      return 'Address should only contain alphanumeric characters';
    }
    return '';
  };

  const validateName = (name) => {
    if (!name) {
      return 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      return 'Name should only contain alphabetic characters';
    }
    return '';
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [viewCityData, setViewCityData] = useState([]);

  // const getLibrary = async (id) => {
  //   handleShow();
  //   const result = await LibraryServices.getLibrary(id);
  //   setCurrentData(result.data);
  // };

  const getLibrary = async (id) => {
    handleShow();
    const result = await LibraryServices.getLibrary(id);
    const libraryData = result.data;
    setCurrentData({
      ...libraryData,
      cityId: libraryData.city ? libraryData.city.id : "",
    });
  };

  const updateLibrary = (event) => {
    event.preventDefault();
    const { name, address, phoneNo, email, cityId } = currentData;
    const newErrors = {};

    newErrors.cityId = validateCityId(cityId);
    newErrors.name = validateName(name);
    newErrors.email = validateEmail(email);
    newErrors.phoneNo = validatePhoneNo(phoneNo);
    newErrors.address = validateAddress(address);

    setErrors(newErrors);
    if (Object.values(newErrors).every(error => error === '')) {
        console.log('Form submitted successfully:', currentData);
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
    } else {
        console.log('Form has errors. Please correct them.');
    }
    
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

      <Row>
        <Col>
        <div style={{float:"right"}}>
        <Link to="/AddLibrary">
          <Button variant="primary">Add Library</Button>
        </Link>
        </div>
       </Col>     

      </Row>
      <br/>
      <Table stripped bordered hover variant="light">
        <thead style={{ backgroundColor: "#1976d2", height: "40px", verticalAlign: "middle", textAlign: "center" }}>
          <th scope="row">
            S.No.
          </th>
          <th scope="row">
            Library Name
          </th>
          <th scope="row">
            Library Address
          </th>
          <th scope="row">
            Library Phoneno
          </th>
          <th scope="row">
            Library Email
          </th>
          <th scope="row">
            Created At
          </th>
          <th scope="row">
            Action
          </th>
        </thead>
        <tbody>
          {library.map((row, index) => (
            <tr key={row.id} style={{textAlign:"center", verticalAlign: "middle"}}>
              <td component="th">
                {index+1}
              </td>
              <td component="th">
                {row.name}
              </td>
              <td component="th">
                {row.address}
              </td>
              <td component="th">
                {row.phoneNo}
              </td>
              <td component="th">
                {row.email}
              </td>
              <td component="th">
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
            <span style={{display: 'flex', color: 'red'}}>{errors.cityId}</span>
          </Form.Group>
          <div className="form-group mb-2">
            <input
              name="name"
              className="form-control"
              value={currentData.name}
              onChange={handleInputChange}
              maxLength={15}
              type="text"
              placeholder="Enter Library Name"
              title="Enter library name here"
            />
            <span style={{display: 'flex', color: 'red'}}>{errors.name}</span>
          </div>
          <div className="form-group mb-2">
            <input
              name="address"
              className="form-control"
              value={currentData.address}
              onChange={handleInputChange}
              maxLength={20}
              type="text"
              placeholder="Enter Address"
              title="Enter address here"
            />
            <span style={{display: 'flex', color: 'red'}}>{errors.address}</span>
          </div>
          <div className="form-group mb-2">
            <input
              name="phoneNo"
              className="form-control"
              value={currentData.phoneNo}
              onChange={handleInputChange}
              maxLength={10}
              type="text"
              placeholder="Enter Phone No."
              title="Enter phone no. here"
            />
            <span style={{display: 'flex', color: 'red'}}>{errors.phoneNo}</span>
          </div>
          <div className="form-group mb-2">
            <input
              name="email"
              className="form-control"
              value={currentData.email}
              onChange={handleInputChange}
              maxLength={20}
              type="text"
              placeholder="Enter Email"
              title="Enter email here"
            />
            <span style={{display: 'flex', color: 'red'}}>{errors.email}</span>
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
    </div>
  );
}
