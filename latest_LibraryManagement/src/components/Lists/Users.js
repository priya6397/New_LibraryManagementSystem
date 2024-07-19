import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import UserServices from '../Service/UserService';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Pagination from '@mui/material/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function Users() {
    const initialUserData = {
        fullName: "",
        address: "",
        phoneNo: "",
        aadharNo:"",
        email: "",
      };
      
      const[errors, setErrors] = useState({ 
        fullName: "",
        address: "",
        phoneNo: "",
        aadharNo:"",
        email: "",
    });
    
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    const [fullName, setfullName] = useState("");

    const onChangeSearch = (e) => {
        const fullName = e.target.value;
        setfullName(fullName);
      };

    const [count, setCount] = useState(0);
    const getRequestParams = (fullName, page, pageSize) => {
        let params = {};
        if (fullName) {
          params["fullName"] = fullName;
        }
        if (page) {
          params["page"] = page - 1;
        }
        if (pageSize) {
          params["size"] = pageSize;
        }
        return params;
    };

    const [users, setUsers] = useState([]);
    const [currentData, setCurrentData] = useState([initialUserData]);
    useEffect(()=>{
        loadUsers();
    }, [page, pageSize, fullName]);

    const loadUsers = async()=>{
        const params = getRequestParams(
            fullName,
            page,
            pageSize
        );
        const result = await UserServices.getPaginationWithSearch(params);
        const{users, currentPage, totalPages, totalItems} = result.data;
        if(users === 0 || users === undefined){
            setUsers([]);
        }else{
            setUsers(users);
        }
        setCount(totalPages);
        // setUsers(result.data);
        console.log("hii", result.data);
    }

    const UserIssuedBook = (id) => {
        navigate("/UserIssueBooks",{
            state: {id: id},
        });
    }

    const deleteUser = async(id) => {
        const result = await UserServices.deleteUserById(id)
        .then((response) => {
            toast.success("User deleted successfully!");
            loadUsers();
          })
          .catch((error) => {
            console.log("error", error);
            toast.error(error.response.data)
          });
    }

    const getUser = async(id) => {
        handleShow();
        const result = await UserServices.getUser(id);
        setCurrentData(result.data);
    };

    const updateUser = (event) =>{
        event.preventDefault();
        const { fullName, address, phoneNo, aadharNo, email } = currentData;
        const newErrors = {};
    
        newErrors.fullName = validateFullName(fullName);
        newErrors.email = validateEmail(email);
        newErrors.phoneNo = validatePhoneNo(phoneNo);
        newErrors.aadharNo = validateAadharNo(aadharNo);
        newErrors.address = validateAddress(address);

        setErrors(newErrors);
    if (Object.values(newErrors).every(error => error === '')) {
        console.log('Form submitted successfully:', currentData);
        //const updatedData = { ...currentData}; //... spread operator stores data
        UserServices.updateUser(currentData.id, currentData).then((response)=>{
          if(response.status === 200){
              toast.success("User updated successfully!");
                console.log(response.data);
                handleClose();
                loadUsers();
            }
        }).catch((error)=>{
            console.log("error", error)
        })
    } else {
        console.log('Form has errors. Please correct them.');
    }
    }

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
     
      const validateAadharNo = (aadharNo) => {
        if (!aadharNo) {
          return 'Aadhar number is required';
        } else if (!/^\d{12}$/.test(aadharNo)) {
          return 'Aadhar number must be 12 digits';
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
    
      const validateFullName = (fullName) => {
        if (!fullName) {
          return 'Full Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
          return 'Full Name should only contain alphabetic characters';
        }
        return '';
      };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div  style={{ width: '80%', margin: '20px auto' }}>
        <h2 style={{ fontWeight: 'bold' }}>Users List</h2>
        <br/>
        <div >
            <Link to="/AddUser">
                <Button variant="primary">Add User</Button>
            </Link>
        </div>
        <br/>
        <input name='fullName' className='form-control'
                                value={fullName}
                                onChange={onChangeSearch}
                                    type="text" placeholder='Search Here' />
        <Table stripped bordered hover variant="light" style={{marginTop: "30px"}}>
        {users.length > 0 ? ( 
            <>
            <thead style={{backgroundColor:"#1976d2",height:"40px"}}>
                <th style={{textAlign:"center"}}>User Id</th>
                <th style={{textAlign:"center"}}>User Name</th>
                <th style={{textAlign:"center"}}>User Address</th>
                <th style={{textAlign:"center"}}>User Phoneno.</th>
                <th style={{textAlign:"center"}}>User Email</th>
                <th style={{textAlign:"center"}}>Aadhar Number</th>
                <th style={{textAlign:"center"}}>Created At</th>
                <th style={{textAlign:"center"}}>Action</th>
            </thead>
            <tbody>
                {
                    users.map((row) => 
                    (
                        <tr key={row.id}>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.id}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.fullName}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.address}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.phoneNo}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.email}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.aadharNo}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.createdAt}
                            </td>
                            <td>
                            <Tooltip title="Issued Books">
                            <IconButton
                            aria-label="issued_books"
                            size="large"
                            onClick={() => UserIssuedBook(row.id)}
                            color="info"
                            >
                            <BookmarkAddedIcon fontSize="inherit" />
                            </IconButton>
                            </Tooltip>

                            <Tooltip title="Edit">
                            <IconButton
                            aria-label="edit"
                            size="large"
                            onClick={() => getUser(row.id)}
                            color="info"
                            >
                            <EditNoteIcon fontSize="inherit" />
                            </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete">
                            <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={() => deleteUser(row.id)}
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
        </Table>
        <Pagination count={count} page={page} onChange={handleChange} />
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight: "bold"}}>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='form-group mb-2'>
                <input name='fullName' className='form-control'
                value={currentData.fullName}
                onChange={handleInputChange}
                maxLength={15}
                    type="text" placeholder='Enter Full Name' />
                     <span style={{display: 'flex', color: 'red'}}>{errors.fullName}</span>
            </div>
            <div className='form-group mb-2'>
                <input name='address' className='form-control'
                value={currentData.address}
                onChange={handleInputChange}
                maxLength={20}
                    type="text" placeholder='Enter Address' />
                     <span style={{display: 'flex', color: 'red'}}>{errors.address}</span>
            </div>
            <div className='form-group mb-2'>
                <input name='phoneNo' className='form-control'
                value={currentData.phoneNo}
                onChange={handleInputChange}
                maxLength={10}
                    type="text" placeholder='Enter Phone No.' />
                     <span style={{display: 'flex', color: 'red'}}>{errors.phoneNo}</span>
            </div>
            <div className='form-group mb-2'>
                <input name='aadharNo' className='form-control'
                value={currentData.aadharNo}
                onChange={handleInputChange}
                maxLength={12}
                    type="text" placeholder='Enter Aadhar No.' />
                     <span style={{display: 'flex', color: 'red'}}>{errors.aadharNo}</span>
            </div>
            <div className='form-group mb-2'>
                <input name='email' className='form-control'
                value={currentData.email}
                onChange={handleInputChange}
                maxLength={20}
                    type="text" placeholder='Enter Email' />
                     <span style={{display: 'flex', color: 'red'}}>{errors.email}</span>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Update User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
