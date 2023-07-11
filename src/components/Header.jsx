import React, { useEffect, useState } from "react"
import {
  AppBar,
  Toolbar,
  styled,
  InputBase,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Tune,
  HelpOutlineOutlined,
  SettingsOutlined,
  AppsOutlined,
  AccountCircleOutlined,
  Logout,
} from "@mui/icons-material"
import { gmailLogo } from "../constants/constants"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const StyledAppBar = styled(AppBar)({
  background: "#F5F5F5",
  boxShadow: "none",
})

const SearchWrapper = styled(Box)({
  background: "#EAF1FB",
  marginLeft: 80,
  borderRadius: 8,
  minWidth: 690,
  maxWidth: 730,
  height: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  "& > div": {
    width: "100%",
    padding: "0 5px",
  },
})

const OptionsWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "end",
  "& >svg": {
    marginLeft: 20,
  },
})

const AccountBox = styled(Box)({
  display: "flex",

  "& > svg ": {
    padding: "10px",
    width: "70px",
    height: "70px",
  },
  "& > div": {
    padding: "10px",
    marginLeft: "5px",
  },
})

const SignOutBox = styled(Box)({
  display: "flex",
  padding: "10px 5px",
  justifyContent: "center",
  alignItems: "flex-end",
  cursor: "pointer",
  "& > p": {
    fontSize: 15,
    marginLeft: "5px",
  },
})

const Header = ({ toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [userData, setUserData] = useState(null)
  const navigate =useNavigate()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_INDEX_URL}/mail/user/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setUserData(response.data))
      .catch((err) => console.log(err))
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSignOut=()=>{
    navigate('/login')
    localStorage.removeItem("token")
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <MenuIcon color="action" onClick={toggleDrawer} />
        <img
          src={gmailLogo}
          alt="logo"
          style={{ width: 110, marginLeft: "15px" }}
        />
        <SearchWrapper>
          <SearchIcon color="action" />
          <InputBase placeholder="Search mail" />
          <Tune color="action" />
        </SearchWrapper>
        <OptionsWrapper>
          <HelpOutlineOutlined color="action" />
          <SettingsOutlined color="action" />
          <AppsOutlined color="action" />
          <AccountCircleOutlined color="action" onClick={handleClick} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                borderRadius: "10px",
                marginTop: "17px",
              },
            }}
          >
            <MenuItem>
              <AccountBox>
                <AccountCircleOutlined color="disabled" />
                <Box>
                  <Typography fontSize={14}>{userData?.name}</Typography>
                  <Typography fontSize={12} color={"grey"}>
                    {userData?.email}
                  </Typography>
                </Box>
              </AccountBox>
            </MenuItem>

            <SignOutBox onClick={handleSignOut}>
              <Logout />

              <Typography style={{ textDecoration: "none" }}>
                Sign Out
              </Typography>
            </SignOutBox>
          </Menu>
        </OptionsWrapper>
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
