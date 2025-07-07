import { useGetListMemberQuery } from "@/api/member"
import ListRender from "@/components/common/list-render"
import { MemberItem } from "@/components/common/member-item"
import { useOrgId } from "@/hooks/use-org"
import { useDraggable } from "@dnd-kit/core"
import { useEffect, useState } from "react"
import type { MemberProfile } from "@/types/member"
import { Input } from "@/components/ui/input"
import { ArrowRight, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useJoinByListMutation } from "@/api/player"
import { useNavigate, useParams } from "react-router"

const ContestSplitTeam = () => {
  const { contestId } = useParams()
  const orgId = useOrgId()
  const navigate = useNavigate()
  const [nameFilter, setNameFilter] = useState("")
  const { data, isSuccess } = useGetListMemberQuery({
    organizationId: orgId,
  })
  const [joinContestByList, { isLoading }] = useJoinByListMutation()

  const [memberAvail, setMemberAvail] = useState<MemberProfile[]>(
    data?.result || []
  )
  const [memberPicked, setMemberPicked] = useState<MemberProfile[]>([])
  const handleSplitTeam = async () => {
    try {
      if (contestId && orgId) {
        await joinContestByList({
          memberIds: memberPicked.map((member) => member.id),
          contestId: contestId,
          orgId: orgId,
        }).unwrap()
        navigate(`/contests/${contestId}/split`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const filteredMember = memberAvail.filter((member) => {
    return member.name
      ? member.name.toLowerCase().includes(nameFilter.toLowerCase())
      : false
  })
  useEffect(() => {
    if (data?.result) {
      setMemberAvail(data.result)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])
  return (
    <div className="flex-1 flex flex-col">
      <div className="font-semibold text-xl mt-4">Chia team</div>
      <div>Vui lòng chọn thành viên tham dự trận đấu</div>
      <div className="grid grid-cols-2 grid-rows-1 gap-8 w-[95%] self-center my-4  h-[900px]">
        <div className="overflow-scroll pb-2">
          <div className="pt-4 sticky top-0 z-10 bg-white">
            Danh sách thành viên:
          </div>
          <div className="mx-2 my-4 ring-1 rounded-md flex flex-row items-center pr-2">
            <Input
              className="border-none shadow-none focus-visible:ring-0"
              placeholder="Tên thành viên"
              value={nameFilter}
              onChange={(event) => {
                setNameFilter(event.target.value)
              }}
            />
            <Search className="text-gray-500" />
          </div>
          <ListRender
            data={filteredMember}
            renderItem={(item, index) => (
              <DragMember
                id={item.id}
                data={item}
                key={index}
                onPicked={() => {
                  const existedPickedMember = memberPicked.filter(
                    (mem) => mem.id === item.id
                  )[0]
                  if (!existedPickedMember) {
                    setMemberPicked((list) => [...list, item])
                    setMemberAvail((list) =>
                      list.filter((mem) => mem.id !== item.id)
                    )
                  }
                }}>
                <MemberItem member={item} />
              </DragMember>
            )}
          />
        </div>
        <div className="overflow-scroll pb-2">
          <div className="flex flex-row justify-between py-4 sticky top-0 z-10 bg-white">
            <div>Danh sách thành viên tham dự:</div>
            <div>Tổng: {memberPicked.length} thành viên</div>
          </div>
          <div className="h-full pb-2">
            <ListRender
              data={memberPicked}
              renderItem={(item, index) => (
                <DragMember
                  id={item.id}
                  data={item}
                  key={index}
                  isPicked
                  onPicked={() => {
                    const existedAvailMember = memberAvail.filter(
                      (mem) => mem.id === item.id
                    )[0]
                    if (!existedAvailMember) {
                      setMemberAvail((list) => [...list, item])
                      setMemberPicked((list) =>
                        list.filter((mem) => mem.id !== item.id)
                      )
                    }
                  }}>
                  <MemberItem member={item} />
                </DragMember>
              )}
            />
          </div>
        </div>
      </div>
      <div className="p-4 self-center">
        <Button
          className="w-[400px]"
          onClick={handleSplitTeam}
          disabled={isLoading}>
          Xác nhận
        </Button>
      </div>
    </div>
  )
}
const DragMember = ({
  children,
  id,
  data,
  isPicked,
  onPicked,
}: {
  children: React.ReactNode
  id: string
  data: MemberProfile
  isPicked?: boolean
  onPicked: () => void
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: data,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-row items-center group hover:shadow-md shadow-sm rounded hover:ring-1 hover:ring-blue-200 my-2 mx-1"
      onClick={onPicked}>
      <div className="flex-1">{children}</div>
      {isPicked ? (
        <div className="group-hover:bg-red-300 group-hover:text-white p-1 mx-1 rotate-45 rounded-full">
          <Plus />
        </div>
      ) : (
        <div className="group-hover:bg-blue-300 group-hover:text-white p-1 mx-1 rounded">
          <ArrowRight />
        </div>
      )}
    </div>
  )
}
export default ContestSplitTeam
