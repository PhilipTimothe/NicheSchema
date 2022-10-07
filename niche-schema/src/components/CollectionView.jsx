import React, { useState } from 'react'
import uniqid from 'uniqid';

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

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



export const CollectionView = (props => {
  const { data, columnsSchema } = props;
  const [errors, setErrors] = useState(0)

    return (
      <>
        {Array.isArray(props.data) ?
          props.data.forEach((document) => document) : 

          
          <Card id={uniqid} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {'Document ID:'}  {props.id}
              </Typography>

                {Object.entries(data[props.id]).map((fields) => 
                <>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {fields[0]}
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
                        <TableRow>
                          {Object.keys(data[props.id][fields[0]]).map((key) => {
                            let schema = columnsSchema[fields[0]]
                            let details = data[props.id][fields[0]][key]
                            let error = 0
                            
                            if (schema[key].hasOwnProperty('required') && schema[key]['required'] === true) {
                              if (details === null) {
                                console.log('error')
                                error++
                              }
                              if (schema[key]['type'].includes('|')) {
                                let currentType = schema[key]['type'].split(' | ')
                                if (!currentType.includes(details)) {
                                  console.log('error')
                                  error++
                                }
                              } else if (schema[key]['type'] !== typeof details) {
                                console.log('error')
                                error++
                              }
                              // need a timestamp conditional/ converter possibly
                            }

                            if (typeof details === 'object' && details.hasOwnProperty('seconds')) {
                              // need to debug date input ****
                              let dateValues = Object.values(details)
                              // return <TableCell align="right">{new Date((dateValues[0], dateValues[1]))}</TableCell>
                              return <TableCell align="right">here</TableCell>
                              
                            } else {
                              return <TableCell align="right">{details}</TableCell>
                            }

                          })
                          }
                          </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </CardContent>

          <CardActions>
            <Button id={uniqid} size="small">View</Button>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="outlined" severity="error">
                Document Errors
              </Alert>
            </Stack>
          </CardActions>
        </Card>}
      </>
    )
  })