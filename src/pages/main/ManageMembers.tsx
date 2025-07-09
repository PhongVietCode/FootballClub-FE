import CreateMemberDialog from "@/components/custom/create-member"
import { useOrgId } from "@/hooks/use-org"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search } from "lucide-react"
import UpdateMemberDialog from "@/components/custom/update-member-dialog"
import { useLazyGetListMemberQuery } from "@/api/member"
import { Input } from "@/components/ui/input"
import DeleteMemberDialog from "@/components/custom/delete-member-dialog"
const ManageMembers = () => {
  const orgId = useOrgId()
  const [nameFilter, setNameFilter] = useState("")

  const [getOrgDetail, { data, isLoading }] = useLazyGetListMemberQuery()
  const filteredMember = data?.result.filter((member) => {
    return member.name
      ? member.name.toLowerCase().includes(nameFilter.toLowerCase())
      : false
  })
  useEffect(() => {
    if (orgId) {
      getOrgDetail({ organizationId: orgId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId])
  return (
    <div className="size-full overflow-scroll">
      <div className="sticky top-0 bg-white z-50 p-4">
        <div className="flex flex-row justify-between">
          <div className="font-semibold text-[18px]">Danh sách thành viên:</div>
          <CreateMemberDialog />
        </div>
        <div className="mx-2 mt-4 mb-1 ring-1 rounded-md flex flex-row items-center pr-2">
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
      </div>
      <div className="p-4">
        {isLoading ? (
          <div>Đang tải danh sách</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Tên</TableHead>
                  <TableHead>Elo</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMember?.map((member, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell className="text-left">{member.elo}</TableCell>
                      <TableCell className="text-left">{member.role}</TableCell>
                      <TableCell>
                        <div className="my-1 flex flex-row gap-4">
                          <UpdateMemberDialog member={member} />
                          <DeleteMemberDialog memberId={member.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
  )
}

export default ManageMembers
