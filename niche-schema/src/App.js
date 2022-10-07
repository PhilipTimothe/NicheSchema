import './App.css';
import React, { useState, useEffect } from 'react'
import { getAllSpecs } from './firebase.jsx'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { CollectionView } from './components/CollectionView';
// import { LookupForm } from './components/LookupForm'

// import styled from '@emotion/styled'

function App() {
  const [schema, setSchema] = useState('');
  const [collectionData, setCollectionData] = useState('');

  
  const convertSchema = async (schema) => {
    let columns = []
    let data = Object.entries(schema)
    let fields = data.map((fields) => fields[1])
    for (let x = 0; x < fields.length; x++) {
        let temp = []
        let entry = Object.entries(fields[x])
        for (let y = 0; y < entry.length; y++) {
            let values = Object.entries(entry[y][1])
            let result = {
                field: entry[y][0],
                headerName: entry[y][0],
                width: 100
                        }
            for (let i = 0; i < values.length; i++) {
              // alternatively creating an array with acceptable string is better for the next condition.
              if (values[i][0] === 'initialValue' || values[i][0] === 'required') continue
              if (typeof values[i][1] === 'string') {
                  if (values[i][1].includes('|')) {
                      result[values[i][0]] = 'singleSelect'
                      result['valueOptions'] = values[i][1].split(' | ')
                  } else {
                      if (values[i][1] === 'Timestamp' ) {
                          result[values[i][0]] = 'dateTime'
                      } else {
                          result[values[i][0]] = values[i][1]
                      }
                  }
              }
            }
            temp.push(result)
            result = {}
        }
        columns.push(temp)
    }
    setSchema(columns)
  }
  
  const loadData = async () => {
    let temp = {}

    await fetch('https://beagleschema.demcrepl.repl.co/specs/user/schema')
    .then((response) => response.json())
    .then((data) => convertSchema(data));

    const specs = await getAllSpecs(`User`)
    specs.forEach((doc) => {
      if (!temp.hasOwnProperty(doc.id)) {
        temp[doc.id] = doc.data();
      }
    });
    
    await setCollectionData(temp)
  }
  
  useEffect(() => { 
    loadData()
    
  }, []);

  const onClick = () => {
    // console.log(Object.entries(Object.values(collectionData)))
    // console.log(
      // Object.entries(collectionData[Object.keys(collectionData)[0]]).map((data) => Object.entries(data[1]))
    // )
  }

  return (
    <>
      <CssBaseline />
      <Container className='App' maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {/* tree menu structure */}
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
              <TreeItem onClick={onClick} nodeId="1" label="User">
                <TreeItem nodeId="2" label={Object.keys(collectionData)[0]} />
              </TreeItem>
            </TreeView>

          </Grid>

          <Grid item xs={8}>
            {collectionData ? 
            <CollectionView data={collectionData} columnsSchema={schema} id={Object.keys(collectionData)[0]}></CollectionView> :
            ''
          }
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
