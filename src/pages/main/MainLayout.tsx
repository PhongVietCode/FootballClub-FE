import { useGetProfileQuery } from "@/api/user"
import { AppSidebar } from "@/components/common/app-sidebar"
import OrgControll from "@/components/custom/org-controll"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useAppDispatch } from "@/hooks"
import { setToken } from "@/store/authSlice"
import { setProfile } from "@/store/userSlice"
import { useEffect } from "react"
import { Navigate, Outlet, useNavigate } from "react-router"

const MainLayout = () => {
  const navigate = useNavigate()
  const { data, isError } = useGetProfileQuery()
  const dispatch = useAppDispatch()
  useEffect(() => {
    const orgId = localStorage.getItem("orgId")
    if (orgId && data) {
      const org = data.result.organizations.filter(
        (item) => item.id === orgId
      )[0]
      dispatch(
        setProfile({
          ...data.result,
          choosenOrg: org,
          orgProfile: data.result.organizations,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      navigate("/login")
    } else {
      dispatch(setToken(token || ""))
    }
    // const curLoc = sessionStorage.getItem("cur_loc")
    // navigate(curLoc ? curLoc : "/home")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isError) {
    return <Navigate to={"/login"} />
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col h-screen">
        <div className="w-full flex flex-row px-2 py-4 sticky top-0 bg-white shadow-sm z-10">
          <SidebarTrigger />
          <div className="flex-1 flex flex-row justify-end items-center gap-4">
            <OrgControll />
          </div>
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default MainLayout
