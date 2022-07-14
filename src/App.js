import React , { useState } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import copy from "copy-to-clipboard"; 
import axios from 'axios' ;
import './App.css';
import {Button , TextField , Select , MenuItem, Typography, InputLabel, FormControl } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import qs from 'qs' ;

function App() {
  const [ codeText , setCodeText ] = useState("") ;
  const [ lang , setLang ] = useState("") ;
  const [ inp , setInp ] = useState() ;
  const [ result , setResult ] = useState() ;
  const [ copyButton , setCopyButton ] = useState("copy") ;
  const [IsLoaded, setIsLoaded] = useState(false); 

  const copyToClipboard = () => {
    copy(codeText);
    setCopyButton("Copied") ;
  }

  const send = () => {
      if( codeText === "" ){
        setResult("Error : Code can't be empty")
        setIsLoaded(true);
        return ;
      }
      else if( lang === "" ){
        setResult("Error : Select language")
        setIsLoaded(true);
        return ;
      }

      var data = qs.stringify({
        code: codeText ,
        language: lang ,
        input: inp ,
      });

  axios.post("https://codex-api.herokuapp.com/", data)
  .then( res => {
    if( res.data.success )
      setResult(res.data.output);
    else
      setResult(res.data.error);
      setIsLoaded(true);
  })
  .catch(err => { 
    setResult(err) ;
    setIsLoaded(true);
  });
  }

  const compilerTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        light: '#9b9b9b',
        main: '#ffffff',
        dark: '#e5e5e5',
        contrastText: '#111111',
      }
    },
    typography: {
      font :
        '"Helvetica Neue"',
      fontSize: "1rem",
      fontWeightBold: "2rem",
    },
    
  });
  

  return (
  <>
    <ThemeProvider theme={compilerTheme}>
      <header>
        <CodeIcon sx={{ fontSize: 40 }} />
        <Typography 
            variant="h1" color="grey" align="center" 
            fontWeight={900} fontFamily="-apple-system">
             C3-PO Compiler
        </Typography>
      </header>

      <main>
            <div id = "out-in-box">
              <Box id = "in-box" >
                  <FormControl style={{ margin: "2px", minWidth: "100px" }}>
                  <InputLabel id="lang-select">Lang</InputLabel>
                  <Select
                      id="lang-select"
                      value = {lang}
                      onChange={(event) => {
                        setLang( event.target.value);
                      }}>
                    <MenuItem value="cpp">C++</MenuItem>
                    <MenuItem value="c">C</MenuItem>
                    <MenuItem value="py">Python</MenuItem>
                    <MenuItem value="java">Java</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={copyToClipboard}>
                  {copyButton}
                </Button>
            </Box>

            <Box id = "in-box"  >
              <TextField id="code" multiline rows={16} placeholder ="/* Write your code here !! */"
                onChange={(event) => {
                setCodeText( event.target.value);
                setCopyButton("Copy")
              }}/>
            </Box>

            <Box id = "in-box"  >

                <TextField id="code"  multiline rows={3} placeholder = "Enter Input" 
                  variant="outlined" onChange={(event) => {
                  setInp( event.target.value);
                }}/>

              <Button variant="contained" color="primary" onClick={send}>
                  RUN
              </Button>
            </Box>

            {
              IsLoaded &&
            <Box id = "out-box" >
              <TextField id="output"  multiline rows={5} placeholder= "Output" value = {result} variant="outlined" />
            </Box>
            }

          </div>
      </main>

      <footer>
        <Typography variant="h3" color="grey" align="center">
          Developed By <a href="http://subodhsiddharth.me/">Subodh Siddharth</a>
        </Typography>
      </footer>

      </ThemeProvider>
    </>
  );
}
export default App;