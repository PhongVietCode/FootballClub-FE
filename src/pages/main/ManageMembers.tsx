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
import { Search, Trash2 } from "lucide-react"
import UpdateMemberDialog from "@/components/custom/update-member-dialog"
import { useLazyGetListMemberQuery } from "@/api/member"
import { Input } from "@/components/ui/input"
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
    <div className="size-full p-4 overflow-scroll">
      <div className="sticky top-0 bg-white z-50">
        <div className="flex flex-row justify-between">
          <div className="font-semibold text-[18px]">Danh sách thành viên:</div>
          <CreateMemberDialog />
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
      </div>
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
                        <Trash2 className="size-6 hover:bg-red-500 hover:text-white py-1 rounded cursor-pointer" />
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
  )
}

export default ManageMembers
