import AuthLayout from "@/pages/auth/AuthLayout"
import Login from "@/pages/auth/Login"
import { Route, Routes } from "react-router"
import ProtectedRoute from "./protected/ProtectedRoute"
import MainLayout from "@/pages/main/MainLayout"
import Home from "@/pages/main/Home"
import SignIn from "@/pages/auth/SignIn"
import Org from "@/pages/auth/Org"
import ManageMembers from "@/pages/main/ManageMembers"
import Setting from "@/pages/main/Setting"
import ManageMatches from "@/pages/main/ManageMatches"
import ContestDetail from "@/pages/main/ContestDetail"
import ContestLayout from "@/pages/main/contest/layout"
import SplitTeamPage from "@/pages/main/contest/split-team"
import ContestSplitTeam from "@/pages/main/ContestSplitTeam"

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<Home />} index />
          <Route path="manage-members" element={<ManageMembers />} index />
          <Route path="matches" element={<ManageMatches />} index />
          <Route path="setting" element={<Setting />} index />
          <Route path="/contests" element={<ContestLayout />}>
            <Route path=":contestId" element={<ContestDetail />}>
              <Route path="pick-mem" element={<ContestSplitTeam />} />
              <Route path="split" element={<SplitTeamPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="org" element={<Org />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
