import React, { useState } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { Box } from "@mui/material"
import Emails from "../components/Emails"


const MainPage = () => {
  const [openDrawer, setOpenDrawer] = useState(true)
  

 

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState)
  }

  return (
    <>
      <Header toggleDrawer={toggleDrawer}   />
      <Box>
        <Sidebar openDrawer={openDrawer} />
        <Emails openDrawer={openDrawer} />
      </Box>
    </>
  )
}

export default MainPage
