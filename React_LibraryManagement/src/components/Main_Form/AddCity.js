import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CityServices from '../Service/CityService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Form } from 'react-bootstrap';
 
const AddCity = () => {
    const initialCityData ={cityName:""};
    const[currentData, setCurrentData] = useState(initialCityData);

    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
        setCurrentData({...currentData,[name]:value});
    };

    const postCity = () =>{
        CityServices.createCity(currentData).then((response)=>{
            toast.success("City created successfully!");
            if(response.status === 200){
                setCurrentData(initialCityData);
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
        cityName: "",
    });
 
  return (
    <div>
    <div className='container mt-5 mb-4'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center' style={{fontWeight:"bold"}}> ADD CITY</h2>
                    <div className='card-body'>
                            <div className='form-group mb-2'>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formTaskName">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter City name"
                                        name="cityName"
                                        value={currentData.cityName}
                                            onChange={handleInputChange}/>
                                        <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                    <span style={{display: "flex", color: "red"}}>{errors.cityName}</span>
                                    </Form.Group>   
                                </Form>
                            </div>
                            <button onClick={postCity} className='btn btn-success'>Save</button> {" "}
                            <Link to={"/City"} className='btn btn-danger' href=''>Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
    <ToastContainer />
    </div>
  )
}
 
export default AddCity;