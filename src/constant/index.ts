import { TeamColor } from "@/types/team"
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
export const getTeamColorStyle = (color: string) => {
  switch (color) {
    case TeamColor.RED:
      return {
        bgColor: "#EF4B4B",
        textColor: "#ffffff",
        name: "Đỏ",
      }
    case TeamColor.WHITE:
      return {
        bgColor: "white",
        textColor: "#000000",
        name: "Trắng",
      }
    case TeamColor.BLUE:
      return {
        bgColor: "#687FE5",
        textColor: "#ffffff",
        name: "Xanh dương",
      }
    case TeamColor.GREEN:
      return {
        bgColor: "#BF9264",
        textColor: "#ffffff",
        name: "Lục",
      }
    case TeamColor.BLACK:
      return {
        bgColor: "#41444B",
        textColor: "#ffffff",
        name: "Đen",
      }
    case TeamColor.YELLOW:
      return {
        bgColor: "#FADA7A",
        textColor: "#52575D",
        name: "Vàng",
      }
    case TeamColor.ORANGE:
      return {
        bgColor: "#F6995C",
        textColor: "#ffffff",
        name: "Cam",
      }
    default:
      return {
        bgColor: "white",
        textColor: "black",
        name: "Trắng",
      }
  }
}
