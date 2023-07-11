import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Box, Checkbox, List } from "@mui/material"
import { DeleteOutline } from "@mui/icons-material"
import Email from "./Email"

const Emails = ({ openDrawer }) => {

  const [data, setData] = useState(null)

  const [selectedEmails, setSelectedEmails] = useState([])
  const [refreshScreen, setRefreshScreen] = useState(false)
  const { type } = useParams()

  useEffect(() => {
    axios
      .get(`${REACT_APP_SERVER_INDEX_URL}/mail/${type}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const data = response.data
        setData(data)
      })
      .catch((error) => console.log(error))
      console.log('hi');
  }, [type, refreshScreen])

  const selectAllEmails = (e) => {
    if (e.target.checked) {
      const emails = data.map((email) => email._id)
      console.log(emails);
      setSelectedEmails(emails)
      
    } else {
      setSelectedEmails([])
    }
  }
  console.log(selectedEmails)

  const deleteSelectedEmails =async (e) => {
    if (type === "bin") {
      console.log("entered")
      await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_SERVER_INDEX_URL}/mail/bin`,
        data: selectedEmails,

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      
    } else {
      await axios.post(
        `${process.env.REACT_APP_SERVER_INDEX_URL}/mail/bin`,
        selectedEmails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
    }
    setRefreshScreen(prevState=>!prevState)
  }

  return (
    <Box
      style={
        openDrawer
          ? { marginLeft: 250, width: "calc(100%-250px)" }
          : { width: "100%" }
      }
    >
      <Box
        style={{
          padding: "20px 10px 0 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox size="small" onChange={(e) => selectAllEmails(e)} />
        <DeleteOutline
          onClick={(e) => deleteSelectedEmails(e)}
          style={{ cursor: "pointer" }}
        />
      </Box>
      <List>
        {data?.map((email) => (
          <Email
            key={email._id}
            email={email}
            selectedEmails={selectedEmails}
            setRefreshScreen={setRefreshScreen}
            setSelectedEmails={setSelectedEmails}
            openDrawer={openDrawer}
          />
        ))}
      </List>
    </Box>
  )
}

export default Emails


