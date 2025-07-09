import { Outlet } from "react-router"

const ContestLayout = () => {
  return (
    <div className="p-4 h-full">
      <div className="flex flex-row items-center justify-center">
        {/* <ChevronLeft
          onClick={() => {
            navigate(-1)
          }}
        /> */}
        <div className="font-semibold text-2xl text-center">
          Thông tin chi tiết trận đấu
        </div>
        {/* <div /> */}
      </div>
      <Outlet />
    </div>
  )
}

export default ContestLayout
