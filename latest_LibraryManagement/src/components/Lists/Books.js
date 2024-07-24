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
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Col, Row } from "react-bootstrap";

export default function Books() {
  const navigate = useNavigate();
  const initialBookData = {
    bookId:"",
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

  const[errors, setErrors] = useState({
    title:"",
    authorName:"",
    publisherName:"",
    publisherNo:"",
    publisherEmail:"",
    bookType:"",
    price:"",
    quantity:"",
    cityId: "",
    libraryId:"",
});

  const newBookData = {
    libraryId: "",
    cityId: "",
  }

  const [books, setBooks] = useState([]);
  const [currentData, setCurrentData] = useState(initialBookData);

  const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [viewLibraryData, setViewLibraryData] = useState([]);
    const[viewCityData, setViewCityData] = useState([]);
    
  
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
  
    const getBooks = async (id) => {
      handleShow();
      const result = await BookServices.getBooks(id);
      setCurrentData({
        bookId:result.data.id,
        title: result.data.title,
        authorName: result.data.authorName,
        publisherName: result.data.publisherName,
        publisherNo: result.data.publisherNo,
        publisherEmail: result.data.publisherEmail,
        bookType: result.data.bookType,
        libraryId: result.data.library.id,
        cityId: result.data.library.city.id,
        price:result.data.price,
        quantity:result.data.quantity,
      });
      getLibraryByCityId(result.data.library.city.id);
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
  
  const getLibraryByCityId = (cityId) =>{
      LibraryServices.getLibraryByCityId(cityId).then((response) =>{
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
  
    const handleInputChange1 = (event) => {
      const{name, value} = event.target;
      setCurrentData1({...currentData1,[name]:value});
  };

  const deleteBook = async (id) => {
    const result = await BookServices.deleteBookById(id)
    .then((response) => {
      toast.success("Book deleted successfully!");
      getBooksByFilter();
    })
    .catch((error) => {
      console.log("error", error);
      toast.error(error.response.data)
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentData({ ...currentData, [name]: value });

    if (name === 'cityId') {
      setCurrentData({ ...currentData, cityId: value, libraryId: "" });
      getLibraryByCityId(value);
    }

    switch (name) {
      case 'publisherEmail':
        setErrors({ ...errors, publisherEmail: validatePublisherEmail(value) });
        break;
      case 'publisherNo':
        setErrors({ ...errors, publisherNo: validatePublisherNo(value) });
        break;
      case 'bookType':
        setErrors({ ...errors, bookType: validateBookType(value) });
        break;
      case 'authorName':
        setErrors({ ...errors, authorName: validateAuthorName(value) });
        break;
      case 'publisherName':
        setErrors({ ...errors, publisherName: validatePublisherName(value) });
        break;
      case 'title':
        setErrors({ ...errors, title: validateTitle(value) });
        break;
      case 'price':
        setErrors({ ...errors, price: validatePrice(value) });
        break;
      case 'quantity':
        setErrors({ ...errors, quantity: validateQuantity(value) });
        break;
      case 'cityId':
        setErrors({ ...errors, cityId: validateCityId(value) });
        break;
      case 'libraryId':
        setErrors({ ...errors, libraryId: validateLibraryId(value) });
        break;
      default:
        break;
    }
  };

  const validatePublisherEmail = (publisherEmail) => {
    if (!publisherEmail) {
      return 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(publisherEmail)) {
      return 'Invalid email format';
    }
    return '';
  };

const validatePublisherNo = (publisherNo) => {
    if (!publisherNo) {
      return 'Publisher phone number is required';
    } else if (!/^\d{10}$/.test(publisherNo)) {
      return 'Publisher phone number must be 10 digits';
    }
    return '';
  };

const validatePrice = (price) => {
    if (!price) {
      return 'Price is required';
    } else if(parseInt(price) <= 0){
        return 'Price must be greater than 0'
    }else if (!/^\d+$/.test(price)) {
        return 'Price must contain digits';
      }
    return '';
  };

const validateQuantity = (quantity) => {
    if (!quantity) {
      return 'Quantity is required';
    }else if(parseInt(quantity) <= 0){
        return 'Quantity must be greater than 0'
    }else if (!/^\d+$/.test(quantity)) {
        return 'Quantity must contain digits';
      }
    return '';
  };

  const validatePublisherName = (authorName) => {
    if (!authorName) {
      return 'Publisher Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(authorName)) {
      return 'Publisher Name should only contain alphabetic characters';
    }
    return '';
  };

  const validateTitle = (title) => {
    if (!title) {
      return 'Title is required';
    } else if (!/^[a-zA-Z\s]+$/.test(title)) {
      return 'Title should only contain alphabetic characters';
    }
    return '';
  };

  const validateAuthorName = (authorName) => {
    if (!authorName) {
      return 'Author Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(authorName)) {
      return 'Author Name should only contain alphabetic characters';
    }
    return '';
  };

  const validateBookType = (bookType) => {
    if (!bookType) {
      return 'Book Type is required';
    } else if (!/^[a-zA-Z\s]+$/.test(bookType)) {
      return 'Book Type should only contain alphabetic characters';
    }
    return '';
  };

  const validateCityId = (cityId) => {
    if (!cityId) {
      return 'Select City!';
    } 
    return '';
  };

  const validateLibraryId = (libraryId) => {
    if (!libraryId) {
      return 'Select Library!';
    } 
    return '';
  };

  const updateBook = (event) => {
    event.preventDefault();
    const { authorName, publisherName, publisherEmail, publisherNo, title, bookType, price, quantity, cityId, libraryId } = currentData;
    const newErrors = {};

    newErrors.authorName = validateAuthorName(authorName);
    newErrors.publisherName = validatePublisherName(publisherName);
    newErrors.publisherEmail = validatePublisherEmail(publisherEmail);
    newErrors.publisherNo = validatePublisherNo(publisherNo);
    newErrors.bookType = validateBookType(bookType);
    newErrors.title = validateTitle(title);
    newErrors.price = validatePrice(price);
    newErrors.quantity = validateQuantity(quantity);
    newErrors.cityId = validateCityId(cityId);
    newErrors.libraryId = validateLibraryId(libraryId);

    setErrors(newErrors);
    if (Object.values(newErrors).every(error => error === '')) {
        console.log('Form submitted successfully:', currentData);
        
        BookServices.updateBook(currentData.bookId, currentData)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Book updated successfully!");
              console.log(response.data);
              handleClose();
              // loadBooks();
              getBooksByFilter();
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
    } else {
        console.log('Form has errors. Please correct them.');
      }
    };

 

    console.log("editData",currentData);
    console.log("viewLibraryData",viewLibraryData);
    console.log("viewCityData",viewCityData);
  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h2 style={{ fontWeight: "bold" }}>Books List</h2>
      <br/>
      <Row>
      <Col>
      <Form.Group className="mb-3">
        <Form.Select enabled value={currentData1.cityId} onChange={handleInputChange1} name='cityId'>
        <option value="">Select City</option>
        {viewCityData.map((item) => (
            <option value={item.id}>{item.name}</option>
            
            ))}
        </Form.Select>
    </Form.Group>
      </Col>
      <Col>
      <Form.Group className="mb-3">
        <Form.Select enabled value={currentData1.libraryId} onChange={handleInputChange1} name='libraryId'>
        <option value="">Select Library</option>
        {viewLibraryData.map((item) => (
            <option value={item.id}>{item.name}</option>
            
            ))}
        </Form.Select>
      </Form.Group>
      </Col>
       <Col>
       <div style={{float:"right"}}>
        <Link to="/AddBooks">
          <Button variant="primary">Add Book</Button>
        </Link>
      </div>
       </Col>     

      </Row>
      
      <Table stripped bordered hover variant="light">
          {books.length > 0 ? ( 
            <>
        <thead style={{ backgroundColor: "#1976d2", height: "40px", textAlign: "center", verticalAlign: "middle" }}>
          <th>S.No.</th>
          <th>Book Name</th>
          <th>Author Name</th>
          <th>Publisher Name</th>
          <th>Publisher Phone No</th>
          <th>Publisher Email</th>
          <th>Book Type</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Created At</th>
          <th>Action</th>
        </thead>
        <tbody>
          {
            books.map((row, index) => (
              <tr key={row.id} style={{ textAlign: "center", verticalAlign: "middle" }}>
                <td component="th">
                  {index+1}
                </td>
                <td component="th">
                  {row.title}
                </td>
                <td component="th">
                  {row.authorName}
                </td>
                <td component="th">
                  {row.publisherName}
                </td>
                <td component="th">
                  {row.publisherNo}
                </td>
                <td component="th">
                  {row.publisherEmail}
                </td>
                <td component="th">
                  {row.bookType}
                </td>
                <td component="th">
                  {row.quantity}
                </td>
                <td component="th">
                  {row.price}
                </td>
                <td component="th">
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
            ))
          }
        </tbody>
        </>
          ):(
            <p style={{fontWeight: "bold"}}>No Record Found</p>
          )}
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
          <Modal.Title style={{ fontWeight: "bold" }}>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3">
            <Form.Select enabled value={currentData?.cityId} onChange={handleInputChange} name='cityId'
            title="Select City">
            <option value={``}>Select City</option>
            {viewCityData.map((item) => (
                <option value={item.id}>{item.name}</option>
                ))}
            </Form.Select>
            <span style={{display: 'flex', color: 'red'}}>{errors.cityId}</span>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Select enabled value={currentData?.libraryId} onChange={handleInputChange} name='libraryId'
            title="Select Library">
            <option value={``}>Select Library</option>
            {viewLibraryData.map((item) => (
                <option value={item.id}>{item.name}</option>
                
                ))}
            </Form.Select>
            <span style={{display: 'flex', color: 'red'}}>{errors.libraryId}</span>
        </Form.Group>
            <div className='form-group mb-2'>
                <input name='title' className='form-control'
                value={currentData.title}
                onChange={handleInputChange}
                maxLength={15}
                    type="text" placeholder='Enter Book Title' 
                    title="Enter the title of the book here"/>
                    <span style={{display: 'flex', color: 'red'}}>{errors.title}</span>
            </div>
            <div className='form-group mb-2'>
                <input name='authorName' className='form-control'
                value={currentData.authorName}
                onChange={handleInputChange}
                maxLength={15}
                    type="text" placeholder='Enter Author Name' 
                    title="Enter the author name here"/>
                    <span style={{display: 'flex', color: 'red'}}>{errors.authorName}</span>
            </div>
            <div className='form-group mb-2'>
                <input name='publisherName' className='form-control'
                value={currentData.publisherName}
                onChange={handleInputChange}
                maxLength={15}
                    type="text" placeholder='Enter Publisher Name' 
                    title="Enter the publisher name here"/>
                     <span style={{display: 'flex', color: 'red'}}>{errors.publisherName}</span>
            </div>
            <div className='form-group mb-2'>
                <input name='publisherNo' className='form-control'
                value={currentData.publisherNo}
                onChange={handleInputChange}
                maxLength={10}
                    type="text" placeholder='Enter Publisher No' 
                    title="Enter the publisher number here" />
                    <span style={{display: 'flex', color: 'red'}}>{errors.publisherNo}</span>
            </div>
            <div className='form-group mb-2'>
                <input name='publisherEmail' className='form-control'
                value={currentData.publisherEmail}
                onChange={handleInputChange}
                maxLength={20}
                    type="text" placeholder='Enter Publisher Email'
                    title="Enter the publisher email here" />
                    <span style={{display: 'flex', color: 'red'}}>{errors.publisherEmail}</span>
            </div>
            <div className='form-group mb-2'>
                <input name='bookType' className='form-control'
                value={currentData.bookType}
                onChange={handleInputChange}
                maxLength={10}
                    type="text" placeholder='Enter Book Type'
                    title="Enter the book type here" />
                    <span style={{display: 'flex', color: 'red'}}>{errors.bookType}</span>
            </div>
            <div className='form-group mb-2'>
                <input name='price' className='form-control'
                value={currentData.price}
                onChange={handleInputChange}
                maxLength={4}
                    type="text" placeholder='Enter Price' 
                    title="Enter the price here" />
                    <span style={{display: 'flex', color: 'red'}}>{errors.price}</span>
            </div>
            <div className='form-group mb-2'>
                <input name='quantity' className='form-control'
                value={currentData.quantity}
                onChange={handleInputChange}
                maxLength={4}
                    type="text" placeholder='Enter Quantity'
                    title="Enter the quantity here" />
                    <span style={{display: 'flex', color: 'red'}}>{errors.quantity}</span>
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
    </div>
  );
}
