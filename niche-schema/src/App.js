import "./App.css";
import React, { useState, useEffect } from "react";
import { getAllSpecs } from "./firebase.jsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { CollectionView } from "./components/CollectionView";

function App() {
  const [schema, setSchema] = useState("");
  const [collectionData, setCollectionData] = useState("");
  const [showDocuments, setShowDocuments] = useState(false);

  const loadData = async () => {
    let temp = {};

    await fetch("https://beagleschema.demcrepl.repl.co/specs/user/schema")
      .then((response) => response.json())
      .then((data) => setSchema(data));

    const specs = await getAllSpecs(`User`);
    specs.forEach((doc) => {
      if (!temp.hasOwnProperty(doc.id)) {
        temp[doc.id] = doc.data();
      }
    });

    await setCollectionData(temp);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleShowDocuments = () => {
    setShowDocuments((current) => !current);
  };

  return (
    <>
      <CssBaseline />
      <Container className="App" maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {/* tree menu structure */}
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                height: 240,
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
              }}
            >
              <TreeItem onClick={handleShowDocuments} nodeId="1" label="User">
                <TreeItem nodeId="2" label={Object.keys(collectionData)[0]} />
              </TreeItem>
            </TreeView>
          </Grid>

          <Grid item xs={8}>
            {showDocuments &&
              (collectionData ? (
                <CollectionView
                  data={collectionData}
                  columnsSchema={schema}
                  id={Object.keys(collectionData)[0]}
                ></CollectionView>
              ) : (
                ""
              ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
