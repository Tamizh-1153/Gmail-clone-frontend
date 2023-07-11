import React, { useState } from "react"
import ViewEmail from "../components/ViewEmail"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const ViewMail = () => {

    const [openDrawer, setOpenDrawer] = useState(true)

    const toggleDrawer = () => {
      setOpenDrawer((prevState) => !prevState)
    }

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <Sidebar openDrawer={openDrawer} />
      <ViewEmail openDrawer={openDrawer} />
    </>
  )
}

export default ViewMail
