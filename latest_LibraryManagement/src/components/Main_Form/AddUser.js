import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserServices from '../Service/UserService';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
 
const AddUser = () => {
    const initialUserData ={
        fullName:"",
        address:"",
        phoneNo:"",
        aadharNo: "",
        email:"",
    };

    const[errors, setErrors] = useState({
        fullName:"",
        address:"",
        phoneNo:"",
        aadharNo: "",
        email:"",
    });

    const[currentData, setCurrentData] = useState(initialUserData);

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
            case 'aadharNo':
              setErrors({ ...errors, aadharNo: validateAadharNo(value) });
              break;
            case 'address':
              setErrors({ ...errors, address: validateAddress(value) });
              break;
            case 'fullName':
              setErrors({ ...errors, fullName: validateFullName(value) });
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

      const validateAadharNo = (aadharNo) => {
        if (!aadharNo) {
          return 'Aadhar number is required';
        } else if (!/^\d{12}$/.test(aadharNo)) {
          return 'Aadhar number must be 12 digits';
        }
        return '';
      };

      const validateAddress = (address) => {
        if (!address) {
          return 'Address is required';
        } else if (!/^[a-zA-Z0-9\s]*$/.test(address)) {
          return 'Address should only contain alphanumeric characters and spaces';
        }
        return '';
      };

      const validateFullName = (fullName) => {
        if (!fullName) {
          return 'Full Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
          return 'Full Name should only contain alphabetic characters';
        }
        return '';
      };

    const postUsers = (event) =>{
        event.preventDefault();
        const { fullName, email, phoneNo, aadharNo, address } = currentData;
        const newErrors = {};
    
        newErrors.fullName = validateFullName(fullName);
        newErrors.email = validateEmail(email);
        newErrors.phoneNo = validatePhoneNo(phoneNo);
        newErrors.aadharNo = validateAadharNo(aadharNo);
        newErrors.address = validateAddress(address);
        
    
        setErrors(newErrors);
        if (Object.values(newErrors).every(error => error === '')) {
            console.log('Form submitted successfully:', currentData);
            UserServices.createUser(currentData).then((response)=>{
                toast.success("User Created successfully!!!");
                if(response.status === 200){
                    setCurrentData(initialUserData);
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
      setCurrentData(initialUserData);
    }

    
  return (
    <div>
        <div className='container mt-5 mb-4'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h2 className='text-center' style={{fontWeight:"bold"}}> ADD USER </h2>
                        <div className='card-body'>
                                <div className='form-group mb-2'>
                                    <input name='fullName' className='form-control'
                                    value={currentData.fullName}
                                    onChange={handleInputChange} maxLength={20}
                                    type="text" placeholder='Enter Full Name' />
                                    <span style={{display: 'flex', color: 'red'}}>{errors.fullName}</span>
                                </div>
                                <div className='form-group mb-2'>
                                    <input name='address' className='form-control'
                                    value={currentData.address}
                                    onChange={handleInputChange} maxLength={20}
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
                                    <input name='aadharNo' className='form-control'
                                    value={currentData.aadharNo}
                                    onChange={handleInputChange} maxLength={12}
                                        type="text" placeholder='Enter Aadhar No.' />
                                        <span style={{display: 'flex', color: 'red'}}>{errors.aadharNo}</span>
                                </div>
                                <div className='form-group mb-2'>
                                    <input name='email' className='form-control'
                                    value={currentData.email}
                                    onChange={handleInputChange} maxLength={30}
                                        type="text" placeholder='Enter Email' />
                                        <span style={{display: 'flex', color: 'red'}}>{errors.email}</span>
                                </div>
                                <button onClick={postUsers} className='btn btn-success'>Save</button> {" "}
                                <button onClick={postCancel} className='btn btn-danger'>Cancel</button>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}
 
export default AddUser;