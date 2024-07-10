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
    const [currentData, setCurrentData] = useState([]);
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
        const result = await UserServices.deleteUserById(id);
        toast.success("User deleted successfully!");
        loadUsers();
    }

    const getUser = async(id) => {
        handleShow();
        const result = await UserServices.getUser(id);
        setCurrentData(result.data);
    };

    const updateUser = () =>{
        UserServices.updateUser(currentData.id, currentData).then((response)=>{
            toast.success("User updated successfully!");
            if(response.status === 200){
                console.log(response.data);
                handleClose();
                loadUsers();
            }
        }).catch((error)=>{
            console.log("error", error)
        })
    }

    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setCurrentData({...currentData,[name]:value});
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div  style={{ width: '80%', margin: '20px auto' }}>
        <h2 style={{ fontWeight: 'bold' }}>Users List</h2>
        <input name='fullName' className='form-control'
                                value={fullName}
                                onChange={onChangeSearch}
                                    type="text" placeholder='Search Here' />
        <Table stripped bordered hover variant="light" style={{marginTop: "30px"}}>
            <thead style={{backgroundColor:"#1976d2",height:"40px"}}>
                <th style={{textAlign:"center"}}>User Id</th>
                <th style={{textAlign:"center"}}>User Name</th>
                <th style={{textAlign:"center"}}>User Address</th>
                <th style={{textAlign:"center"}}>User Phoneno.</th>
                <th style={{textAlign:"center"}}>User Email</th>
                <th style={{textAlign:"center"}}>Confirmation Code</th>
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
                                {row.confirmationCode}
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
            <div  style={{display:'table-caption', width: '80%', margin: '20px auto'}}>
            <Link to="/AddUser">
                    <Button variant="primary">Add User</Button>
                </Link>
            </div>
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
                    type="text" placeholder='Enter Full Name' />
            </div>
            <div className='form-group mb-2'>
                <input name='address' className='form-control'
                value={currentData.address}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Address' />
            </div>
            <div className='form-group mb-2'>
                <input name='phoneNo' className='form-control'
                value={currentData.phoneNo}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Phone No.' />
            </div>
            <div className='form-group mb-2'>
                <input name='email' className='form-control'
                value={currentData.email}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Email' />
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
      <ToastContainer/>
    </div>
  )
}
