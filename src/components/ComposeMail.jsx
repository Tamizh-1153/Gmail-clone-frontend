import React, { useState } from "react"
import {
  Dialog,
  Box,
  Typography,
  styled,
  InputBase,
  TextField,
  Button,
} from "@mui/material"
import { Close, DeleteOutlined } from "@mui/icons-material"
import axios from "axios"

const dialogStyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0px 0px",
}

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  background: "#f2f6fc",
  "& > p": {
    fontSize: 14,
    fontWeight: 500,
  },
})

const RecipientsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0px 15px",
  "& > div": {
    fontSize: 14,
    borderBottom: "1px solid lightgrey",
    marginTop: 10,
  },
})

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  textAlign: "center",
})

const SendButton = styled(Button)({
  background: "#0b57d0",
  color: "#fff",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: 18,
  width: 100,
})

const ComposeMail = ({ openDialog, setOpenDialog }) => {
  const [data, setData] = useState({})
  
  const closeComposeMail = (e) => {
    e.preventDefault()

    if(data.to==null){
      setOpenDialog(false)
    }else{

    axios
      .post(`http://localhost:5000/mail/drafts`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setOpenDialog(false)
         setData({})
        
      })
      .catch((error) => console.log(error))
    }  
  }

  const sendMail = (e) => {
    e.preventDefault()

    axios
      .post(`${REACT_APP_SERVER_INDEX_URL}/mail/send`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setOpenDialog(false)
        setData({})
      })
      .catch((error) => console.log(error))

    setOpenDialog(false)
  }

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>New Message</Typography>
        <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
      </Header>
      <RecipientsWrapper>
        <InputBase
          name="to"
          placeholder="Recipients"
          onChange={(e) => onValueChange(e)}
        />
        <InputBase
          placeholder="Subject"
          name="subject"
          onChange={(e) => onValueChange(e)}
        />
      </RecipientsWrapper>
      <TextField
        name="body"
        multiline
        rows={20}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        onChange={(e) => onValueChange(e)}
      />
      <Footer>
        <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
        <DeleteOutlined style={{cursor:'pointer'}} onClick={() => setOpenDialog(false)} />
      </Footer>
    </Dialog>
  )
}

export default ComposeMail
