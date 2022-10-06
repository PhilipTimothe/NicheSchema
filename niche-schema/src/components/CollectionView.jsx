import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const CollectionView = (props => {
  const { data } = props;

    return (
      <>
        {Array.isArray(props.data) ?
          props.data.forEach((document) => document) : 

          
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              
              <Typography variant="h5" component="div">
                {'Document ID:'}  {props.id}
              </Typography>

                {Object.entries(data[props.id]).map((fields) => 
                <>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {fields[0]}
                    {/* {console.log(data[props.id][fields[0]])} */}
                    {/* {console.log(Object.keys(data[props.id][fields[0]]).map((title) => title))} */}
                    {/* {console.log(data[props.id][fields[0]])} */}
                  </Typography>
                
              
                          
                </>
              )}

            
            </CardContent>
          <CardActions>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>}
      </>
    )
  })

  {/* {Object.keys(data[props.id][fields[0]]).map((title) => 
                          <TableCell align="right">{title}</TableCell>)} */}