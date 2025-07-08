import { Outlet } from "react-router"

const ContestLayout = () => {
  return (
    <div className="p-4 h-full">
      <div className="font-semibold text-2xl text-center"> Thông tin chi tiết trận đấu</div>
      <Outlet />
    </div>
  )
}

export default ContestLayout
