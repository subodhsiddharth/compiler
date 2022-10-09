import React , { useState } from 'react';
import CodeIcon from '@mui/icons-material/Code';
<<<<<<< Updated upstream
import copy from "copy-to-clipboard"; 
import axios from 'axios' ;
import './App.css';
import {Button , TextField , Select , MenuItem, Typography, InputLabel, FormControl } from '@mui/material';
=======
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import SquareIcon from '@mui/icons-material/Square';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from "copy-to-clipboard"; 
import axios from 'axios' ;
import {Button , TextField , Select , MenuItem, Typography, FormControl } from '@mui/material';
>>>>>>> Stashed changes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import qs from 'qs' ;

function App() {
  const [ codeText , setCodeText ] = useState("") ;
<<<<<<< Updated upstream
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
=======
  const [ lang , setLang ] = useState("py") ;
  const [ inp , setInp ] = useState() ;
  const [ result , setResult ] = useState() ;
  const [ copyButton , setCopyButton ] = useState(<ContentCopyIcon sx={{ fontSize: 20 }} /> ) ;
  const [ isLoaded, setIsLoaded] = useState(false); 
  const [ compile , setCompile ] = useState(<ChevronRightIcon sx={{ fontSize: 40 }} />) ;
  const url = "https://codex-api.herokuapp.com/" ;

  // loading data from localStorage and adding tab in input field
  window.onload = () =>{
    var localCodeText = localStorage.getItem('codeText') ;
    var localCodeLang = localStorage.getItem('codeLang') ;
    var localCodeInp = localStorage.getItem('codeInp') ;

    document.getElementById('codeBlock').addEventListener('keydown', function(e) {
      if (e.keyCode === 9 ) {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
  
        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
      }
    });

    if( localCodeLang && localCodeText ){
      setCodeText( localCodeText );
      setLang( localCodeLang ) ;
      document.getElementById('codeBlock').value = localStorage.getItem('codeText');
      document.getElementById('lang-select').value = localStorage.getItem('codeLang');

      if( localCodeInp ){
        setInp( localCodeInp );
        document.getElementById('codeInp').value = localStorage.getItem('codeInp');
      }
    }
  }

  // copy to clipboard funtion
  const copyToClipboard = () => {
    copy(codeText);
    setCopyButton(<FilePresentRoundedIcon sx={{ fontSize: 20 }} />) ;
  }

  // scroll after loading of output
  function scrollToBottom() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }

  // save to local storage function 
  function saveToLocalStorage(){
    localStorage.setItem('codeText', codeText );
    localStorage.setItem('codeLang', lang );
    localStorage.setItem('codeInp', inp );
  };

  // send data to server using axios
  const send = () => {
      setCompile(<SquareIcon sx={{ fontSize: 20 }} />) ;
      setIsLoaded(false) ;
      saveToLocalStorage() ;

      if( codeText === "" ){
        setResult("Code can't be empty")
        setIsLoaded(true);
        setCompile(<ChevronRightIcon sx={{ fontSize: 40 }} />) ;
        scrollToBottom() ;
>>>>>>> Stashed changes
        return ;
      }

      var data = qs.stringify({
        code: codeText ,
        language: lang ,
        input: inp ,
      });

<<<<<<< Updated upstream
  axios.post("https://codex-api.herokuapp.com/", data)
=======
  axios.post(url, data )
>>>>>>> Stashed changes
  .then( res => {
    if( res.data.success )
      setResult(res.data.output);
    else
      setResult(res.data.error);
<<<<<<< Updated upstream
      setIsLoaded(true);
=======
    setIsLoaded(true);
    setCompile(<ChevronRightIcon sx={{ fontSize: 40 }} />) ;
    scrollToBottom() ;
>>>>>>> Stashed changes
  })
  .catch(err => { 
    setResult(err) ;
    setIsLoaded(true);
<<<<<<< Updated upstream
=======
    setCompile(<ChevronRightIcon sx={{ fontSize: 40 }} />) ;
    scrollToBottom() ;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    
=======
>>>>>>> Stashed changes
  });
  

  return (
  <>
    <ThemeProvider theme={compilerTheme}>
      <header>
        <CodeIcon sx={{ fontSize: 40 }} />
        <Typography 
            variant="h1" color="grey" align="center" 
            fontWeight={900} fontFamily="-apple-system">
<<<<<<< Updated upstream
             C3-PO Compiler
=======
             Segmentation
>>>>>>> Stashed changes
        </Typography>
      </header>

      <main>
            <div id = "out-in-box">
              <Box id = "in-box" >
<<<<<<< Updated upstream
                  <FormControl style={{ margin: "2px", minWidth: "100px" }}>
                  <InputLabel id="lang-select">Lang</InputLabel>
                  <Select
                      id="lang-select"
                      value = {lang}
                      onChange={(event) => {
                        setLang( event.target.value);
                      }}>
=======
                  <FormControl style={{ margin: "2px", minWidth: "100px" }} >
                  <Select
                    id="lang-select"
                    value = {lang}
                    displayEmpty
                    onChange={(event) => {
                      setLang( event.target.value);
                    }}>
>>>>>>> Stashed changes
                    <MenuItem value="cpp">C++</MenuItem>
                    <MenuItem value="c">C</MenuItem>
                    <MenuItem value="py">Python</MenuItem>
                    <MenuItem value="java">Java</MenuItem>
<<<<<<< Updated upstream
                  </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={copyToClipboard}>
=======
                    <MenuItem value="go">GoLang</MenuItem>
                    <MenuItem value="cs">C#</MenuItem>
                    <MenuItem value="js">NodeJs</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" color="primary" indicatorColor="primary" onClick={copyToClipboard}>
>>>>>>> Stashed changes
                  {copyButton}
                </Button>
            </Box>

            <Box id = "in-box"  >
<<<<<<< Updated upstream
              <TextField id="code" multiline rows={16} placeholder ="/* Write your code here !! */"
                onChange={(event) => {
                setCodeText( event.target.value);
                setCopyButton("Copy")
=======
              <TextField id="codeBlock" multiline rows={16} placeholder ="/* Write your code here !! */"
                onChange={(event) => {
                  if( event.target.value === "\t" )
                  setCodeText(" ");
                  else
                    setCodeText( event.target.value );
                setCopyButton(<ContentCopyIcon sx={{ fontSize: 20 }} />)
>>>>>>> Stashed changes
              }}/>
            </Box>

            <Box id = "in-box"  >
<<<<<<< Updated upstream

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
=======
                <TextField id="codeInp"  multiline rows={3} placeholder = "Enter Input" 
                  variant="outlined" onChange={(event) => {
                  setInp( event.target.value);
                }}
                
                
                />

              <Button variant="contained" color="primary" onClick={send}>
                  {compile}
              </Button>
            </Box>
            {
              isLoaded 
                &&
              <Box id = "out-box" >
                <TextField id="output" multiline rows={5} placeholder= "Output" value = { result} variant="outlined" />
              </Box>
            }
            </div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
export default App;
=======
export default App;
>>>>>>> Stashed changes
