import * as React from "react"
import { useAppSelector } from "."
import type { RootState } from "@/store"

export function useOrgId() {
  const choosenOrg = useAppSelector((state: RootState) => state.user.choosenOrg)
  const [orgId] = React.useState(
    choosenOrg ? choosenOrg.id : localStorage.getItem("orgId")
  )

  return orgId || ""
}
