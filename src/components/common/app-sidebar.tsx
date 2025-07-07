import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { appConstant } from "@/constant"
import { useLocation, useNavigate } from "react-router"

export function AppSidebar() {
  const path = useLocation()
  const navigate = useNavigate()
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {/* <SidebarGroup />
        <SidebarGroup /> */}
        <SidebarHeader>
          <div className="font-semibold text-3xl text-center text-blue-700">
            FootballClub
          </div>
        </SidebarHeader>
        <SidebarMenu>
          {appConstant.SIDE_BAR.map((item) => (
            <SidebarMenuItem key={item.title} className="py-2 px-4">
              <SidebarMenuButton
                onClick={() => {
                  sessionStorage.setItem("cur_loc", item.url)
                  navigate(item.url)
                }}
                asChild
                className={`hover:bg-blue-200 ${
                  path.pathname === `${item.url}` &&
                  "bg-blue-500 text-white text-md"
                }`}>
                <div>
                  <item.icon />
                  <span>{item.title}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
