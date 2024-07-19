import React, { useEffect, useState, forwardRef } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import CityServices from '../Service/CityService';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Col, Row } from 'react-bootstrap';


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
        const result = await CityServices.deleteCityById(id)
        .then((response) => {
            toast.success("City deleted successfully!");
            loadCity();
          })
          .catch((error) => {
            console.log("error", error);
            toast.error(error.response.data)
          });
    };

  return (
    <div  style={{ width: '80%', margin: '20px auto' }}>
        <h2 style={{ fontWeight: 'bold' }}>City List</h2>
        
       
        <Row>
        <Col>
        <div style={{float:"right"}}>
            <Link to="/AddCity">
                <Button variant="primary">Add City</Button>
            </Link>
        </div>
       </Col>     

      </Row>
        <br/>
        <Table stripped bordered hover variant="light">
            <thead style={{backgroundColor:"#1976d2",height:"40px", verticalAlign: "middle"}}>
                <th style={{textAlign:"center"}}>S.No.</th>
                <th style={{textAlign:"center"}}>City Name</th>
                <th style={{textAlign:"center"}}>Created At</th>
                <th style={{textAlign:"center"}}>Action</th>
            </thead>
            <tbody>
                {
                    city.map((row, index) => 
                    (
                        <tr key={row.id} style={{textAlign:"center", verticalAlign: "middle"}}>
                            <td component="th">
                                {index+1}
                            </td>
                            <td component="th">
                                {row.name}
                            </td>
                            <td component="th">
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
        </Table>
    </div>
  )
}
