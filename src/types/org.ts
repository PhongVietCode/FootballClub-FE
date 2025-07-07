import type { Address } from "./address"
import type { MemberProfile } from "./member"

export interface CreateOrgResponse {
  id: string
  name: string
}
export interface OrgProfile {
  id: string
  name: string
  logoUrl: string | null
  member: MemberProfile
}
export interface OrgDetail {
  id: string
  name: string
  logoUrl: string | null
  members: MemberProfile[]
  addresses: Address[]
}
