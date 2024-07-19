import React, { useEffect, useState } from 'react';
import BookServices from '../Service/BookService';
import { Link } from 'react-router-dom'; 
import Form from 'react-bootstrap/Form';
import LibraryServices from '../Service/LibraryService';
import CityServices from '../Service/CityService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const AddBook = () => {
    const initialBookData ={
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

    const[currentData, setCurrentData] = useState(initialBookData);
    const[viewCityData, setViewCityData] = useState([]);
    const[viewLibraryData, setViewLibraryData] = useState([]);

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
        LibraryServices.getLibraryByCityId(currentData.cityId).then((response) =>{
            setViewLibraryData(response.data)
        }).catch((error) => {
            console.log("error", error);
        })
    }
    useEffect(()=>{
        getLibraryByCityId();
    }, [currentData?.cityId]);



    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setCurrentData({...currentData,[name]:value});
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
        };
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

    const postBook = (event) =>{
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
            BookServices.createBook(currentData).then((response)=>{
                if(response.status === 200){
                    setCurrentData(initialBookData);
                    toast.success("Book added successfully!!!");
                    console.log(response.data);
                }
            }).catch((error)=>{
                console.log("error", error)
                toast.error(error.response.data);
            })
        } else {
            console.log('Form has errors. Please correct them.');
        }
    }

    const postCancel = () => {
      setCurrentData(initialBookData);
    }
 
  return (
    <div>
    <div className='container mt-5 mb-4'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center' style={{fontWeight:"bold"}}> ADD BOOK</h2>
                    <div className='card-body'>
                            <Form.Group className="mb-3">
                                <Form.Select enabled value={currentData.cityId} onChange={handleInputChange} name='cityId'>
                                <option>Select City</option>
                                {viewCityData.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                    
                                    ))}
                                </Form.Select>
                                     <span style={{display: 'flex', color: 'red'}}>{errors.cityId}</span>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Select enabled value={currentData.libraryId} onChange={handleInputChange} name='libraryId'>
                                <option>Select Library</option>
                                {viewLibraryData.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                    
                                    ))}
                                </Form.Select>
                                <span style={{display: 'flex', color: 'red'}}>{errors.libraryId}</span>
                            </Form.Group>
                            <div className='form-group mb-2'>
                                <input name='title' className='form-control'
                                value={currentData.title}
                                onChange={handleInputChange} maxLength={15}
                                    type="text" placeholder='Enter Book Title' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.title}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='authorName' className='form-control'
                                value={currentData.authorName}
                                onChange={handleInputChange} maxLength={15}
                                    type="text" placeholder='Enter Author Name' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.authorName}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='publisherName' className='form-control'
                                value={currentData.publisherName}
                                onChange={handleInputChange} maxLength={15}
                                    type="text" placeholder='Enter Publisher Name' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.publisherName}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='publisherNo' className='form-control'
                                value={currentData.publisherNo} maxLength={10}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Publisher No' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.publisherNo}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='publisherEmail' className='form-control'
                                value={currentData.publisherEmail}
                                onChange={handleInputChange} maxLength={20}
                                    type="text" placeholder='Enter Publisher Email' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.publisherEmail}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='bookType' className='form-control'
                                value={currentData.bookType}
                                onChange={handleInputChange} maxLength={10}
                                    type="text" placeholder='Enter Book Type' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.bookType}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='price' className='form-control'
                                value={currentData.price}
                                onChange={handleInputChange}
                                maxLength={4}
                                    type="text" placeholder='Enter Price' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.price}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='quantity' className='form-control'
                                value={currentData.quantity}
                                onChange={handleInputChange}
                                maxLength={4}
                                    type="text" placeholder='Enter Quantity' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.quantity}</span>
                            </div>
                            <button onClick={postBook} className='btn btn-success'>Save</button> {" "}
                            <button onClick={postCancel} className='btn btn-danger'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    <ToastContainer/>
</div>
  )
}
 
export default AddBook;