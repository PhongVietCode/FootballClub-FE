/* eslint-disable @typescript-eslint/no-unused-vars */
const MemberRole = {
  ADMIN: "ADMIN",
  VICE_ADMIN: "VICE_ADMIN",
  MEMBER: "MEMBER",
} as const
export type MemberRoleType = (typeof MemberRole)[keyof typeof MemberRole]
const MemberStatus = {
  ACTIVE: "ACTIVE",
  KICKED: "KICKED",
  DELETED: "DELETED",
} as const
export type MemberStatusType = (typeof MemberStatus)[keyof typeof MemberStatus]

export interface MemberProfile {
  id: string
  elo: number
  name: string
  role: MemberRoleType
  status: MemberStatusType
}
