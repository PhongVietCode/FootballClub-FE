import { useAppSelector } from "@/hooks"

const OrgControll = () => {
  const { choosenOrg } = useAppSelector((state) => state.user)
  return (
    <div className="px-4">
      <span className="">{choosenOrg?.name}</span>
    </div>
  )
}

export default OrgControll
