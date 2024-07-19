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
    
    const[errors, setErrors] = useState({
        name:"",
        address:"",
        phoneNo:"",
        email:"",
        cityId: "",
    });
 
    const[currentData, setCurrentData] = useState(initialLibraryData);
    const[viewCityData, setViewCityData] = useState([]);

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


    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setCurrentData({...currentData,[name]:value});
        switch (name) {
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
            case 'cityId':
              setErrors({ ...errors, cityId: validateCityId(value) });
              break;
            default:
              break;
        };
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

      const validateCityId = (cityId) => {
        if (!cityId) {
          return 'Select City!';
        } 
        return '';
      };

    const postLibrary = (event) =>{
        event.preventDefault();
        const { name, email, phoneNo, address, cityId } = currentData;
        const newErrors = {};
    
        newErrors.name = validateName(name);
        newErrors.email = validateEmail(email);
        newErrors.phoneNo = validatePhoneNo(phoneNo);
        newErrors.address = validateAddress(address);
        newErrors.cityId = validateCityId(cityId);
        
    
        setErrors(newErrors);
        if (Object.values(newErrors).every(error => error === '')) {
            console.log('Form submitted successfully:', currentData);
            LibraryServices.createLibrary(currentData).then((response)=>{
              if(response.status === 200){
                  toast.success("Library created successfully!");
                    setCurrentData(initialLibraryData);
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
      setCurrentData(initialLibraryData);
    }

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
                                    <span style={{display: 'flex', color: 'red'}}>{errors.cityId}</span>
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
                                <button onClick={postCancel} className='btn btn-danger'>Cancel</button> 
                        </div>
                    </div>
                </div>
        </div>
 
    </div>
  )
}
 
export default AddLibrary;