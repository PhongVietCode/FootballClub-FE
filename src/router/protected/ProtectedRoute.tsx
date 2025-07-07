import { useAppDispatch } from "@/hooks"
import { setToken } from "@/store/authSlice"
import { useEffect } from "react"
import {  Outlet, useNavigate } from "react-router"

const ProtectedRoute = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      navigate("/login")
    } else {
      dispatch(setToken(token || ""))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Outlet />
}

export default ProtectedRoute
