import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import BookServices from "../Service/BookService";
import CityServices from "../Service/CityService";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import LibraryServices from "../Service/LibraryService";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Tooltip } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Books() {
  const navigate = useNavigate();
  const initialBookData = {
    title: "",
    authorName: "",
    publisherName: "",
    publisherNo: "",
    publisherEmail: "",
    bookType: "",
    price: "",
    quantity: "",
    libraryId: "",
  };

  const newBookData = {
    libraryId: "",
    cityId: "",
  }

  const [books, setBooks] = useState([]);
  const [currentData, setCurrentData] = useState(initialBookData);
  
  const [currentData1, setCurrentData1] = useState(newBookData);
  useEffect(() => {
    getBooksByFilter();
  }, [currentData1.cityId, currentData1.libraryId]);

  
  const getBooksByFilter = async () => {
    const result = await BookServices.getBooksByFilter(currentData1.cityId, currentData1.libraryId);
    setBooks(result.data);
  };

  const IssueBook = (id, title) => {
    navigate("/BookIssue", {
      state: { id: id, title: title },
    });
  };

  const deleteBook = async (id) => {
    const result = await BookServices.deleteBookById(id);
    toast.success("Book deleted successfully!");
    getBooksByFilter();
  };

  const getBooks = async (id) => {
    handleShow();
    const result = await BookServices.getBooks(id);
    setCurrentData(result.data);
  };

  const updateBook = () => {
    const updatedData = { ...currentData, libraryId: currentData.library?.id }; //... spread operator stores data
    BookServices.updateBook(currentData.id, updatedData)
      .then((response) => {
        toast.success("Book updated successfully!");
        if (response.status === 200) {
          console.log(response.data);
          handleClose();
          // loadBooks();
          getBooksByFilter();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "libraryId") {
      const selectedLibrary = viewLibraryData.find(
        (library) => library.id === parseInt(value)
      );
      setCurrentData({ ...currentData, library: selectedLibrary });
    } else {
      setCurrentData({ ...currentData, [name]: value });
    }
  };

  const getCities = () =>{
    CityServices.loadCity().then((response) =>{
      setViewCityData(response.data)
    }).catch((error) =>{
      console.log("error",error);
    })
}
useEffect(()=>{
    getCities();
}, []);

const getLibraryByCityId = () =>{
    LibraryServices.getLibraryByCityId(currentData1?.cityId).then((response) =>{
        setViewLibraryData(response.data)
    }).catch((error) => {
        console.log("error", error);
    })
}
useEffect(()=>{
  if(currentData1.cityId !== ""){
    getLibraryByCityId();
  }
}, [currentData1?.cityId]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [viewLibraryData, setViewLibraryData] = useState([]);
  const[viewCityData, setViewCityData] = useState([]);
  
  const handleInputChange1 = (event) => {
    const{name, value} = event.target;
    setCurrentData1({...currentData1,[name]:value});
};

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h2 style={{ fontWeight: "bold" }}>Books List</h2>
      <Form.Group className="mb-3">
        <Form.Select enabled value={currentData1.cityId} onChange={handleInputChange1} name='cityId'>
        <option value="">Select City</option>
        {viewCityData.map((item) => (
            <option value={item.id}>{item.name}</option>
            
            ))}
        </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Select enabled value={currentData1.libraryId} onChange={handleInputChange1} name='libraryId'>
        <option value="">Select Library</option>
        {viewLibraryData.map((item) => (
            <option value={item.id}>{item.name}</option>
            
            ))}
        </Form.Select>
      </Form.Group>
      <Table stripped bordered hover variant="light">
        <thead style={{ backgroundColor: "#1976d2", height: "40px" }}>
          <th style={{ textAlign: "center" }}>S.No.</th>
          <th style={{ textAlign: "center" }}>Book Name</th>
          <th style={{ textAlign: "center" }}>Author Name</th>
          <th style={{ textAlign: "center" }}>Publisher Name</th>
          <th style={{ textAlign: "center" }}>Publisher Phone No</th>
          <th style={{ textAlign: "center" }}>Publisher Email</th>
          <th style={{ textAlign: "center" }}>Book Type</th>
          <th style={{ textAlign: "center" }}>Quantity</th>
          <th style={{ textAlign: "center" }}>Price</th>
          <th style={{ textAlign: "center" }}>Created At</th>
          <th style={{ textAlign: "center" }}>Action</th>
        </thead>
        <tbody>
          {books.map((row, index) => (
            <tr key={row.id}>
              <td component="th" style={{ textAlign: "center" }}>
                {index+1}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.title}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.authorName}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.publisherName}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.publisherNo}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.publisherEmail}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.bookType}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.quantity}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.price}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.createdAt}
              </td>
              <td>
                  <Tooltip title="Issue Book">
                <IconButton
                  aria-label="issue"
                  size="large"
                  onClick={() => IssueBook(row.id, row.title)}
                  color="primary"
                >
                  <BookmarkAddIcon fontSize="inherit" />
                </IconButton>
                </Tooltip>

                <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  size="large"
                  onClick={() => getBooks(row.id)}
                  color="info"
                >
                  <EditNoteIcon fontSize="inherit" />
                </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => deleteBook(row.id)}
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
          <Link to="/AddBooks">
            <Button variant="primary">Add Book</Button>
          </Link>
        </div>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold" }}>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3">
            <Form.Select enabled value={currentData?.library?.id} onChange={handleInputChange} name='libraryId'
            title="Select Library">
            <option>Select Library</option>
            {viewLibraryData.map((item) => (
                <option value={item.id}>{item.name}</option>
                
                ))}
            </Form.Select>
        </Form.Group>
            <div className='form-group mb-2'>
                <input name='title' className='form-control'
                value={currentData.title}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Book Title' 
                    title="Enter the title of the book here"/>
            </div>
            <div className='form-group mb-2'>
                <input name='authorName' className='form-control'
                value={currentData.authorName}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Author Name' 
                    title="Enter the author name here"/>
            </div>
            <div className='form-group mb-2'>
                <input name='publisherName' className='form-control'
                value={currentData.publisherName}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Publisher Name' 
                    title="Enter the publisher name here"/>
            </div>
            <div className='form-group mb-2'>
                <input name='publisherNo' className='form-control'
                value={currentData.publisherNo}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Publisher No' 
                    title="Enter the publisher number here" />
            </div>
            <div className='form-group mb-2'>
                <input name='publisherEmail' className='form-control'
                value={currentData.publisherEmail}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Publisher Email'
                    title="Enter the publisher email here" />
            </div>
            <div className='form-group mb-2'>
                <input name='bookType' className='form-control'
                value={currentData.bookType}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Book Type'
                    title="Enter the book type here" />
            </div>
            <div className='form-group mb-2'>
                <input name='price' className='form-control'
                value={currentData.price}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Price' 
                    title="Enter the price here" />
            </div>
            <div className='form-group mb-2'>
                <input name='quantity' className='form-control'
                value={currentData.quantity}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Quantity'
                    title="Enter the quantity here" />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateBook}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </div>
  );
}
