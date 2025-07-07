import type { MemberProfile } from "@/types/member"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const MemberItem = ({ member }: { member: MemberProfile }) => {
  return (
    <div className="flex flex-row justify-between items-center p-1 m-2 rounded-sm">
      <Avatar className="shadow-sm rounded-full flex flex-col justify-center items-center size-12">
        <AvatarImage src={""} />
        <AvatarFallback>MEM</AvatarFallback>
      </Avatar>
      <div>{member.name}</div>
      <div>{member.elo}</div>
      {/* <div>{member.role}</div> */}
      {/* <div>{member.status}</div> */}
    </div>
  )
}