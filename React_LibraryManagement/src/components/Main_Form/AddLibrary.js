import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LibraryServices from '../Service/LibraryService';
import Form from 'react-bootstrap/Form';
import CityServices from '../Service/CityService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
 
const AddLibrary = () => {
    const initialLibraryData ={
        name:"",
        address:"",
        phoneNo:"",
        email:"",
        cityId:"",
    };
    const[currentData, setCurrentData] = useState(initialLibraryData);
    const[viewCityData, setViewCityData] = useState([]);


    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setCurrentData({...currentData,[name]:value});
    };

    const postLibrary = () =>{
        LibraryServices.createLibrary(currentData).then((response)=>{
            toast.success("Library created successfully!");
            if(response.status === 200){
                setCurrentData(initialLibraryData);
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


    const[errors, setErrors] = useState({
        name:"",
        address:"",
        phoneNo:"",
        email:"",
    });
 
  return (
    <div>
        <div className='container mt-5 mb-4'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h2 className='text-center' style={{fontWeight:"bold"}}> ADD LIBRARY</h2>
                        <div className='card-body'>
                                <Form.Group className="mb-3">
                                    <Form.Select enabled value={currentData.cityId} onChange={handleInputChange} name='cityId'>
                                    <option>Select City</option>
                                    {viewCityData.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                        
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <div className='form-group mb-2'>
                                    <input name='name' className='form-control'
                                    value={currentData.name}
                                    onChange={handleInputChange}
                                    type="text" placeholder='Enter Library Name' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.name}</span>
                                </div>
                                <div className='form-group mb-2'>
                                    <input name='address' className='form-control'
                                    value={currentData.address}
                                    onChange={handleInputChange}
                                    type="text" placeholder='Enter Address' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.address}</span>
                                </div>
                                <div className='form-group mb-2'>
                                    <input name='phoneNo' className='form-control'
                                    value={currentData.phoneNo}
                                    onChange={handleInputChange} maxLength={10}
                                    type="text" placeholder='Enter Phone No.' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.phoneNo}</span>
                                </div>
                                <div className='form-group mb-2'>
                                    <input name='email' className='form-control'
                                    value={currentData.email}
                                    onChange={handleInputChange}
                                    type="text" placeholder='Enter Email' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.email}</span>
                                </div>
                                <button onClick={postLibrary} className='btn btn-success'>Save</button> {" "}
                                <Link to={"/Library"} className='btn btn-danger' href=''>Cancel</Link>
                        </div>
                    </div>
                </div>
        </div>
        <ToastContainer />
 
    </div>
  )
}
 
export default AddLibrary;