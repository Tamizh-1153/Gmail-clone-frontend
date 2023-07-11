import { ArrowBack, Delete } from "@mui/icons-material"
import { Box, Typography, styled } from "@mui/material"
import React from "react"
import { useLocation } from "react-router-dom"
import { defaultProfilePic } from "../constants/constants"
import axios from "axios"

const IconWrapper = styled(Box)({
  padding: 15,
})

const Subject = styled(Typography)({
  fontSize: 22,
  margin: "10px 0 20px 75px",
  display: "flex",
})

const Indicator = styled(Box)({
  fontSize: "12px !important",
  background: "#ddd",
  color: "#222",
  padding: "2px 4px ",
  borderRadius: 4,
  marginLeft: 6,
  alignSelf: "center",
})
const Container = styled(Box)({
  marginLeft: 15,
  width: "100%",
  "& > div": {
    display: "flex",
    "& > p > span": {
      fontSize: 12,
      color: "#5e5e5e",
    },
  },
})

const Image = styled("img")({
  borderRadius: "50%",
  width: 40,
  height: 40,
  margin: "5px 10px 0 10px",
  background: "#cccccc",
})

const Date = styled(Box)({
  margin: "0 50px 0 auto",
  fontSize: 12,
  color: "#5e5e5e",
})

const ViewEmail = ({ openDrawer }) => {
  const { state } = useLocation()
  const { email } = state

  const deleteEmail = () => {
    axios.post(
      `${process.env.REACT_APP_SERVER_INDEX_URL}/mail/bin`,
      [email._id],
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    window.history.back()
  }

  return (
    <Box style={openDrawer ? { marginLeft: 250 } : { width: "100%" }}>
      <IconWrapper>
        <ArrowBack
          onClick={() => window.history.back()}
          color="action"
          fontSize="small"
          style={{ cursor: "pointer" }}
        />
        <Delete
          color="action"
          style={{ cursor: "pointer", marginLeft: 40 }}
          fontSize="small"
          onClick={() => deleteEmail()}
        />
      </IconWrapper>

      <Subject>
        {email.subject}
        <Indicator component="span">Inbox</Indicator>
      </Subject>

      <Box style={{ display: "flex" }}>
        <Image src={defaultProfilePic} alt="T" />
        <Container>
          <Box>
            <Typography style={{ marginTop: 10 }}>
              {email.name}&nbsp;
              <Box component="span">&#60;{email.from}&#62;</Box>
            </Typography>
            <Date>
              {new window.Date(email.date).getDate()}&nbsp;
              {new window.Date(email.date).toLocaleString("default", {
                month: "long",
              })}
              &nbsp;
              {new window.Date(email.date).getFullYear()}
            </Date>
          </Box>
          <Typography style={{ marginTop: 20 }}>{email.body}</Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default ViewEmail
