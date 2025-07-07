import { useLazyGetOrgDetailQuery } from "@/api/org"
import CreateMemberDialog from "@/components/custom/create-member"
import { useOrgId } from "@/hooks/use-org"
import { useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const ManageMembers = () => {
  const orgId = useOrgId()
  const [getOrgDetail, { data, isLoading }] = useLazyGetOrgDetailQuery()
  useEffect(() => {
    if (orgId) {
      getOrgDetail({ id: orgId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId])
  return (
    <div className="size-full p-4">
      <div className="flex flex-row justify-between">
        <div className="font-semibold text-[18px]">Danh sách thành viên:</div>
        <CreateMemberDialog />
      </div>
      {isLoading ? (
        <div>Đang tải danh sách</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Tên</TableHead>
              <TableHead>Elo</TableHead>
              <TableHead>Vai trò</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.result.members.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-left">{item.elo}</TableCell>
                  <TableCell className="text-left">{item.role}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default ManageMembers
