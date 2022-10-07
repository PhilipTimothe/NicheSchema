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
  const { data, columnsSchema } = props;

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
                    {console.log(Object.keys(data[props.id][fields[0]]))}
                  </Typography>

                  <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        {Object.keys(data[props.id][fields[0]]).map((title) => 
                          <TableCell align="right">{title}</TableCell>)}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(data[props.id][fields[0]]).map((key) => (
                        <TableRow
                          key={data[props.id][fields[0]][key]}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {key}
                          </TableCell>
                          <TableCell align="right">{key}</TableCell>
                          <TableCell align="right">{key}</TableCell>
                          <TableCell align="right">{key}</TableCell>
                          <TableCell align="right">{key}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                  
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