import React, { useEffect, useState, forwardRef } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import CityServices from '../Service/CityService';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function City() {

    const [city, setCity] = useState([]);
    useEffect(()=>{
        loadCity();
    }, []);

    const loadCity = async()=>{
    const result = await CityServices.loadCity();
        setCity(result.data);
    }

    const deleteCity = async (id) => {
        const result = await CityServices.deleteCityById(id);
        toast.success("City deleted successfully!!!");
        loadCity();
    };

  return (
    <div  style={{ width: '80%', margin: '20px auto' }}>
        <h2 style={{ fontWeight: 'bold' }}>City List</h2>
        <Table stripped bordered hover variant="light">
            <thead style={{backgroundColor:"#1976d2",height:"40px"}}>
                <th style={{textAlign:"center"}}>S.No.</th>
                <th style={{textAlign:"center"}}>City Name</th>
                <th style={{textAlign:"center"}}>Created At</th>
                <th style={{textAlign:"center"}}>Action</th>
            </thead>
            <tbody>
                {
                    city.map((row, index) => 
                    (
                        <tr key={row.id}>
                            <td component="th" style={{textAlign:"center"}}>
                                {index+1}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.name}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.createdAt}
                            </td>
                            <td>
                                <Tooltip title="Delete">
                                    <IconButton
                                    aria-label="delete"
                                    size="large"
                                    onClick={() => deleteCity(row.id)}
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
                <Link to="/AddCity">
                    <Button variant="primary">Add City</Button>
                </Link>
            </div>
        </Table>
        <ToastContainer/>
    </div>
  )
}
