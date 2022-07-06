import React , { useState } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import SquareIcon from '@mui/icons-material/Square';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from "copy-to-clipboard"; 
import axios from 'axios' ;
import './App.css';
import {Button , TextField , Select , MenuItem, Typography, FormControl } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import qs from 'qs' ;

// const url = "https://localhost/server" ;

function App() {
  const [ codeText , setCodeText ] = useState("") ;
  const [ lang , setLang ] = useState("py") ;
  const [ inp , setInp ] = useState() ;
  const [ result , setResult ] = useState() ;
  const [ copyButton , setCopyButton ] = useState(<ContentCopyIcon sx={{ fontSize: 20 }} /> ) ;
  const [ isLoaded, setIsLoaded] = useState(false); 
  const [ compile , setCompile ] = useState(<ChevronRightIcon sx={{ fontSize: 40 }} />) ;

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
        return ;
      }

      var data = qs.stringify({
        code: codeText ,
        language: lang ,
        input: inp ,
      });

  axios.post("https://localhost/server", data )
  .then( res => {
    if( res.data.success )
      setResult(res.data.output);
    else
      setResult(res.data.error);
    setIsLoaded(true);
    setCompile(<ChevronRightIcon sx={{ fontSize: 40 }} />) ;
    scrollToBottom() ;
  })
  .catch(err => { 
    setResult(err) ;
    setIsLoaded(true);
    setCompile(<ChevronRightIcon sx={{ fontSize: 40 }} />) ;
    scrollToBottom() ;
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
                  <FormControl style={{ margin: "2px", minWidth: "100px" }} >
                  <Select
                    id="lang-select"
                    value = {lang}
                    displayEmpty
                    onChange={(event) => {
                      setLang( event.target.value);
                    }}>
                    <MenuItem value="cpp">C++</MenuItem>
                    <MenuItem value="c">C</MenuItem>
                    <MenuItem value="py">Python</MenuItem>
                    <MenuItem value="java">Java</MenuItem>
                    <MenuItem value="go">GoLang</MenuItem>
                    <MenuItem value="cs">C#</MenuItem>
                    <MenuItem value="js">NodeJs</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" color="primary" indicatorColor="primary" onClick={copyToClipboard}>
                  {copyButton}
                </Button>
            </Box>

            <Box id = "in-box"  >
              <TextField id="codeBlock" multiline rows={16} placeholder ="/* Write your code here !! */"
                onChange={(event) => {
                  if( event.target.value === "\t" )
                  setCodeText(" ");
                  else
                    setCodeText( event.target.value );
                setCopyButton(<ContentCopyIcon sx={{ fontSize: 20 }} />)
              }}/>
            </Box>

            <Box id = "in-box"  >
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
