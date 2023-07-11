import { Star, StarBorder } from "@mui/icons-material"
import { Box, Checkbox, Typography, styled } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Wrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "0 0 0 10px",
  backgroundColor: "#f2f6fc",
  cursor: "pointer",
  "& > div": {
    display: "flex",
    width: "100%",
    "& > p": {
      fontSize: 14,
    },
  },
})

const Indicator = styled(Typography)({
  fontSize: "12px !important",
  background: "#ddd",
  color: "#222",
  padding: "0 4px ",
  borderRadius: 4,
  marginRight: 6,
})

const Date = styled(Typography)({
  marginLeft: "auto",
  marginRight: 20,
  fontSize: 12,
  color: "#5f6368",
})

const Email = ({ email, selectedEmails, setRefreshScreen,setSelectedEmails,openDrawer }) => {
  const navigate = useNavigate()
  
  const toggleStarredMails = () => {
    axios.post(
      `https://gmail-clone-t23y.onrender.com/mail/starred`,
      { id: email._id, value: !email.starred },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    
     setRefreshScreen((prevState) => !prevState)
  }

  const onValueChange=()=>{
    if(selectedEmails.includes(email._id)){
      setSelectedEmails(prevState=>prevState.filter(id=>id!==email._id))
    }else{
      setSelectedEmails(prevState=>[...prevState,email._id])
    }
  }

  return (
    <Wrapper>
      <Checkbox
        size="small"
        checked={selectedEmails.includes(email._id)}
        onChange={() => onValueChange()}
      />
      {email.starred ? (
        <Star
          fontSize="small"
          style={{ marginRight: 10, color: "gold" }}
          onClick={() => toggleStarredMails()}
        />
      ) : (
        <StarBorder
          fontSize="small"
          style={{ marginRight: 10 }}
          onClick={() => toggleStarredMails()}
        />
      )}
      <Box onClick={() => navigate(`/mail/view/${email._id}`, { state: { email: email },openDrawer:{openDrawer} })}>
        <Typography style={{ width: 200, overflow: "hidden" }}>
          {email.name}
        </Typography>
        <Indicator>Inbox</Indicator>
        <Typography>
          {email.subject} {email.body && "-"} {email.body}{" "}
        </Typography>
        <Date>
          {new window.Date(email.date).getDate()}&nbsp;
          {new window.Date(email.date).toLocaleString("default", {
            month: "long",
          })}
          &nbsp;
        </Date>
      </Box>
    </Wrapper>
  )
}

export default Email
