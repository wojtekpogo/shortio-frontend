import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import ReactDOM from "react-dom";
import Button from '@mui/material/Button';
import { Card, TextField, Box, ButtonBase } from '@mui/material';
import { Container } from '@mui/system';
import { useForm } from 'react-hook-form';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useCopyToClipboard from './hooks';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearIcon from '@mui/icons-material/Clear';
 
const ariaLabel = { 'aria-label': 'description' };
 
const styles = {
  "buttonStyle": {
    "width": "400px",
 
    "&:hover": {
      "box-shadow": "1px 1px 7px 1px  #00193A",
    }
  },
  "pTag":{
    "color":"green"
  },
 
  "paperstyle": {
 
  }
}
export default function Url() {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isCopied, copyFn, setIsCopied] = useCopyToClipboard()
  const [longUrl, setLongUrl] = React.useState('');
  const [shortUrl, setShortUrl] = React.useState('');
  const [inputValue, setInputValue]= React.useState('');
 
  const handleClick = (e) => {
    const url = { longUrl }
    console.log(url)
    setIsCopied(false)
    fetch("https://polar-waters-03317.herokuapp.com/api/url/generate-short", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(url),
    })
      .then((response) => response.text())
      .then((text) => setShortUrl(text));
  };


  const clearInput = () => {
    setLongUrl("");
}
  

  function copyElementText(id) {
    var text = document.getElementById(id).innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
}
 
  var urlEntry = 'https://polar-waters-03317.herokuapp.com/api/url/'
 
  return (
    <Container maxWidth="xs">
      <h2>Enter a long URL to make it short!</h2>
 
      <form onSubmit={handleSubmit(handleClick)}>
        <Box mb={2}>
          <TextField
            id='input'
            variant='outlined'
            label='https://'
            fullWidth
            autoComplete='https://'
            {...register("longUrl", {
              required: "Cannot be empty!", pattern: {
                value: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                message: "Invalid Url",
              }
            })}
            error={Boolean(errors.longUrl)}
            helperText={errors?.longUrl ? errors.longUrl.message : null}
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </Box>
        <Button type="submit" style={styles.buttonStyle} variant="contained" color='success'>Generate Short URL</Button>
        
      </form>
      
      <Box mb={6} paddingTop>
      <Button style={styles.buttonStyle} variant="outlined" color='primary' onClick={clearInput} ><ClearIcon />Clear</Button>
      </Box>
      

      {shortUrl && <>
        <p>https://polar-waters-03317.herokuapp.com/api/url/{shortUrl}</p>
        <IconButton onClick={() => copyFn(`${urlEntry}${shortUrl}`)}><ContentCopyIcon /></IconButton>
        {isCopied && <p style={styles.pTag}>Copied!</p>}

      </>
      }
    </Container >
  );
}