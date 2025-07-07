import { Home, Inbox, Settings } from "lucide-react"
export const appConstant = {
  BASE_URL: import.meta.env.VITE_BACKEND_URL || "",
  SIDE_BAR: [
    {
      title: "Trang chủ",
      url: "/home",
      icon: Home,
    },
    {
      title: "Quản lý trận đấu",
      url: "/matches",
      icon: Inbox,
    },
    {
      title: "Quản lý thành viên",
      url: "/manage-members",
      icon: Inbox,
    },
    {
      title: "Thiết lập",
      url: "/setting",
      icon: Settings,
    },
  ],
}
