import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MainPage from "./pages/MainPage"
import ViewMail from "./pages/ViewMail"



function App() {
  return(
    <BrowserRouter>
    <Routes>

      <Route path="/" Component={Register} />
      <Route path="/login" Component={Login} />
      <Route path="/forgot-password" Component={ForgotPassword} />
      <Route path="/api/v1/reset_password/:id/:token" Component={ResetPassword} />
      <Route path="/mail/:type" Component={MainPage} />
      <Route path='mail/view/:id' Component={ViewMail} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
