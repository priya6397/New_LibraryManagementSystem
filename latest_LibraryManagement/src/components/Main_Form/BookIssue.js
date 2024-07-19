import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BookServices from '../Service/BookService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Form from 'react-bootstrap/Form';
 
const BookIssue = () => {
    const location = useLocation();
    const path = location.state;

    const initialIssueData ={
        bookId:path?.id,
        userId:"",
        aadharNo:"",
        expiryDate:""
    };

    const[errors, setErrors] = useState({
        bookId:path?.id,
        userId:"",
        aadharNo:"",
        expiryDate:""
    });
    const[currentData, setCurrentData] = useState(initialIssueData);
    const today = new Date().toISOString().split('T')[0];
    
    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setCurrentData({...currentData,[name]:value});

        switch (name) {
            case 'userId':
              setErrors({ ...errors, userId: validateUserId(value) });
              break;
            case 'aadharNo':
              setErrors({ ...errors, aadharNo: validateAadharNo(value) });
              break;
            case 'expiryDate':
              setErrors({ ...errors, expiryDate: validateDate(value) });
              break;
            default:
              break;
        };
    };

    const validateUserId = (userId) => {
        if (!userId) {
          return 'UserId is required';
        } else if(parseInt(userId) <= 0){
            return 'UserId must be greater than 0'
        }else if (!/^\d+$/.test(userId)) {
            return 'UserId must contain digits';
          }
        return '';
      };

      const validateAadharNo = (aadharNo) => {
        if (!aadharNo) {
          return 'Aadhar No. is required';
        } else if(parseInt(aadharNo) <= 0){
            return 'Aadhar No. must be greater than 0'
        }else if (!/^\d{12}$/.test(aadharNo)) {
            return 'Aadhar No. must contain digits';
          }
        return '';
      };

      const validateDate = (expiryDate) => {
        if (!expiryDate) {
          return 'Select Date!';
        } 
        return '';
      };

    const postIssueBook = (event) =>{
        event.preventDefault();
        const { userId, aadharNo, expiryDate } = currentData;
        const newErrors = {};
    
        newErrors.userId = validateUserId(userId);
        newErrors.aadharNo = validateAadharNo(aadharNo);
        newErrors.expiryDate = validateDate(expiryDate);

        setErrors(newErrors);
        if (Object.values(newErrors).every(error => error === '')) {
            console.log('Form submitted successfully:', currentData);
            
        BookServices.createIssueBook(currentData).then((response)=>{
            if(response.status === 200){
                toast.success("Book issued successfully!!!");
                setCurrentData(initialIssueData);
                console.log(response.data);
                setErrors({});
            }
        }).catch((error)=>{
            console.log("error", error)
            // if (error.response && error.response.status === 400) {
            //     const errorResponse = error.response.data;
            //     if (errorResponse.errorState) {
            //         setErrors({});
            //         console.log(
            //             "errorResponse_errorState :- " + errorResponse.errorState
            //         );
                    
            //         Object.keys(errorResponse.errorState).forEach((key) => {
            //             const errorMessage = errorResponse.errorState[key][0];
            //             setErrors((prevErrors) => ({
            //                 ...prevErrors,
            //                 [key]: errorMessage,
            //             }));
            //         });
            //     } else {
            //         setErrors({});
            //     // }
            // }
            if(error.response.status === 404){
                
                toast.error(error.response.data.message);
            }

            if(error.response.status === 400){
                toast.error(error.response.data);
            }
        })
        } else {
            console.log('Form has errors. Please correct them.');
        }
    }

    const postCancel = () => {
        setCurrentData(initialIssueData);
      }


  return (
    <div>
    <div className='container mt-5'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center' style={{fontWeight:"bold"}}> Issue Book</h2>
                    <div className='card-body'>
                        <div className='form-group mb-2'>
                            <input name='id' className='form-control' disabled value={path?.id}
                                type="text" placeholder='Enter Book Id' />
                        </div>
                        <div className='form-group mb-2'>
                            <input name='title' className='form-control' disabled value={path?.title}
                                type="text" placeholder='Enter Book Name' />
                        </div>
                        <div className='form-group mb-2'>
                            <input name='userId' className='form-control'
                            value={currentData.userId}
                            onChange={handleInputChange}
                                type="text" placeholder='Enter User Id' />
                                <span style={{display: 'flex', color: 'red'}}>{errors.userId}</span>
                        </div>
                        <div className='form-group mb-2'>
                            <input name='aadharNo' className='form-control'
                            value={currentData.aadharNo}
                            onChange={handleInputChange}
                                type="text" placeholder='Enter Aadhar Number' />
                                <span style={{display: 'flex', color: 'red'}}>{errors.aadharNo}</span>
                        </div>
                        <div className='form-group mb-2'>
                            <input name='expiryDate' className='form-control'
                            value={currentData.expiryDate}
                            onChange={handleInputChange}
                            min={today}
                                type="date" title='Enter Expiry Date' />
                                <span style={{display: 'flex', color: 'red'}}>{errors.expiryDate}</span>
                        </div>
                        <button onClick={postIssueBook} className='btn btn-success'>Save</button> {" "}
                        <button onClick={postCancel} className='btn btn-danger'>Cancel</button> 
                    </div>
                </div>
            </div>
        </div>
</div>
  )
}
 
export default BookIssue;