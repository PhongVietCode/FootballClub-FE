import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <div className="flex w-svw h-svh">
      <div className="flex-1 flex justify-center items-center text-4xl">welcome to football club</div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
