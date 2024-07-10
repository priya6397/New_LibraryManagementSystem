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
        libraryId:"",
        cityId: "",
    };

    const[currentData, setCurrentData] = useState(initialBookData);
    const[viewLibraryData, setViewLibraryData] = useState([]);
    const[viewCityData, setViewCityData] = useState([]);

    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setCurrentData({...currentData,[name]:value});
    };

    const postBook = () =>{
        BookServices.createBook(currentData).then((response)=>{
            toast.success("Book added successfully!");
            if(response.status === 200){
                setCurrentData(initialBookData);
                console.log(response.data);
            }
        }).catch((error)=>{
            console.log("error", error)
            if (error.response && error.response.status === 400) {
                const errorResponse = error.response.data;
                if (errorResponse.errorState) {
                  setErrors({});
                  console.log(
                    "errorResponse_errorState :- " + errorResponse.errorState
                  );
       
                  Object.keys(errorResponse.errorState).forEach((key) => {
                    const errorMessage = errorResponse.errorState[key][0];
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      [key]: errorMessage,
                    }));
                  });
                } else {
                  setErrors({});
                }
            }
            toast.error(error.response.data);
        })
    }

    const[errors, setErrors] = useState({
        title:"",
        authorName:"",
        publisherName:"",
        publisherNo:"",
        publisherEmail:"",
        bookType:"",
        price:"",
        quantity:"",
        libraryId:"",
    });

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

    const handleSubmit = (e) => {
        e.preventDefault(); 
      
        const selectedCityId = currentData.cityId;
        const selectedLibraryId = currentData.libraryId;
        if (!selectedCityId) {
          alert('Please select a city.');
          return;
        }else if (!selectedLibraryId) {
          alert('Please select a library.');
          return;
        }
    };
 
  return (
    <div>
    <div className='container mt-5 mb-4'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center' style={{fontWeight:"bold"}}> ADD BOOK</h2>
                    <div className='card-body'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Select enabled value={currentData.cityId} onChange={handleInputChange} name='cityId'>
                                <option>Select City</option>
                                {viewCityData.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                    
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Select enabled value={currentData.libraryId} onChange={handleInputChange} name='libraryId'>
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
                                    type="text" placeholder='Enter Book Title' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.title}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='authorName' className='form-control'
                                value={currentData.authorName}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Author Name' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.authorName}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='publisherName' className='form-control'
                                value={currentData.publisherName}
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Publisher Email' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.publisherEmail}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='bookType' className='form-control'
                                value={currentData.bookType}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Book Type' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.bookType}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='price' className='form-control'
                                value={currentData.price}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Price' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.price}</span>
                            </div>
                            <div className='form-group mb-2'>
                                <input name='quantity' className='form-control'
                                value={currentData.quantity}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Quantity' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.quantity}</span>
                            </div>
                            <button onClick={postBook} className='btn btn-success'>Save</button> {" "}
                            <Link to={"/Books"} className='btn btn-danger' href=''>Cancel</Link>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    <ToastContainer/>
</div>
  )
}
 
export default AddBook;