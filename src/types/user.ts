import type { OrgProfile } from "./org"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserStatus = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED",
} as const
export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus]

export interface User {
  id: string
  fullName: string
  status: UserStatusType
}

export interface UserProfile {
  id: string
  name: string
  organizations: OrgProfile[]
}
