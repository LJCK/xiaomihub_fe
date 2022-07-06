import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { red, green } from '@mui/material/colors';
import axios from 'axios'

const Table=()=>{

  const [tableStatus,setTableStatus] = useState([])
  const { id } = useParams()

  useEffect(()=>{
    axios.get(`http://localhost:3001/sensors/checkStatus?level=${id}`,tableStatus).then((res)=>{setTableStatus(res.data.deskOccupancy)})
  },[])

  return (
    <>
    <h1>Level {id}</h1>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {tableStatus.map((item,index)=>{
        return <Grid item xs={2} sm={4} md={4} key={index}>
          {item.status =="unoccupied" ? <TableRestaurantIcon sx={{color:green[500], fontSize: 40}}/> :<TableRestaurantIcon sx={{color:red[500], fontSize: 40}}/>}
          
          <h3>Table {item.tableID}</h3>
          <h3>Expiry Time {item.expiryTime}</h3>
        </Grid>
      })}
    </Grid>
      
      
    </>
  )
}

export default Table