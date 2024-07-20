import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CityServices from '../Service/CityService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Form } from 'react-bootstrap';
 
const AddCity = () => {
    const initialCityData ={
        cityName:""
    };

    const[errors, setErrors] = useState({
        cityName: "",
    });
    
    const[currentData, setCurrentData] = useState(initialCityData);

    const handleInputChange = (event) => {
        const{name, value} = event.target;
        // setErrors((prevErrors) => ({
        //     ...prevErrors,
        //     [name]: "",
        // }));
        setCurrentData({...currentData,[name]:value});
        switch (name) {
            case 'cityName':
              setErrors({ ...errors, cityName: validateCityName(value) });
              break;
            default:
              break;
        };
    };

    const validateCityName = (cityName) => {
        if (!cityName) {
          return 'City Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(cityName)) {
          return 'City Name should only contain alphabetic characters';
        }
        return '';
      };

    const postCity = (event) =>{
        event.preventDefault();
        const { cityName } = currentData;
        const newErrors = {};
    
        newErrors.cityName = validateCityName(cityName);
        
        setErrors(newErrors);
        if (Object.values(newErrors).every(error => error === '')) {
            console.log('Form submitted successfully:', currentData);
            CityServices.createCity(currentData).then((response)=>{
                toast.success("City created successfully!");
                if(response.status === 200){
                    setCurrentData(initialCityData);
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
        setCurrentData(initialCityData);
    }


    // const postCity = () =>{
    //     CityServices.createCity(currentData).then((response)=>{
    //         toast.success("City created successfully!");
    //         if(response.status === 200){
    //             setCurrentData(initialCityData);
    //         }
    //     }).catch((error)=>{
    //         console.log("error", error)
    //         if (error.response && error.response.status === 400) {
    //             const errorResponse = error.response.data;
    //             if (errorResponse.errorState) {
    //                 setErrors({});
    //                 console.log(
    //                     "errorResponse_errorState :- " + errorResponse.errorState
    //                 );
                    
    //                 Object.keys(errorResponse.errorState).forEach((key) => {
    //                     const errorMessage = errorResponse.errorState[key][0];
    //                     setErrors((prevErrors) => ({
    //                         ...prevErrors,
    //                         [key]: errorMessage,
    //                     }));
    //                 });
    //             } else {
    //                 setErrors({});
    //             }
    //         }
    //         toast.error(error.response.data);
    //     })
    // }
 
  return (
    <div>
    <div className='container mt-5 mb-4'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center' style={{fontWeight:"bold"}}> ADD CITY</h2>
                    <div className='card-body'>
                            <div className='form-group mb-2'>
                                {/* <Form.Group className="mb-3" controlId="formTaskName">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter City Name"
                                    name="cityName" maxLength={15}
                                    value={currentData.cityName}
                                        onChange={handleInputChange}/>
                                    <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                                <span style={{display: "flex", color: "red"}}>{errors.cityName}</span>
                                </Form.Group>  */}
                                <input name='cityName' className='form-control'
                                    value={currentData.cityName}
                                    onChange={handleInputChange} maxLength={15}
                                    type="text" placeholder='Enter City Name' />
                                    <span style={{display: "flex", color: "red"}}>{errors.cityName}</span>
                            </div>
                            <button onClick={postCity} className='btn btn-success'>Save</button> {" "}
                            <button onClick={postCancel} className='btn btn-danger'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
 
export default AddCity;