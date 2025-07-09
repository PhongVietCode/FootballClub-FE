import { useGetContestListQuery } from "@/api/contest"
import CreateContestDialog from "@/components/custom/create-contest"
import { useOrgId } from "@/hooks/use-org"
import { useNavigate } from "react-router"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DeleteContestDialog from "@/components/custom/delete-contest-dialog"
const ManageMatches = () => {
  const orgId = useOrgId()
  const { data, isLoading, isFetching } = useGetContestListQuery({ id: orgId })
  const navigate = useNavigate()
  return (
    <div className="size-full p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="font-semibold text-[18px]">Danh sách trận đấu</div>
        <CreateContestDialog />
      </div>
      <div>
        {isLoading || isFetching ? (
          <div>Đang tải danh sách trận đấu...</div>
        ) : (
          <>
            {data?.result && (
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Ngày</TableHead>
                    <TableHead className="w-[100px]">Giờ</TableHead>
                    <TableHead className="w-[200px]">Địa chỉ</TableHead>
                    <TableHead className="text-left">Số đội</TableHead>
                    <TableHead className="text-left">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.result.map((contest, index) => {
                    const date = new Date(contest.dateTime || "")
                    return (
                      <TableRow
                        key={index}
                        onClick={() => {
                          navigate(`/contests/${contest.id}`)
                        }}>
                        <TableCell className="font-medium">
                          {date.toLocaleDateString("vi")}
                        </TableCell>
                        <TableCell>{date.toLocaleTimeString("vi")}</TableCell>
                        <TableCell>{contest.addressName}</TableCell>
                        <TableCell className="text-left">
                          {contest.teamCount}
                        </TableCell>
                        <TableCell
                          onClick={(event) => {
                            event.stopPropagation()
                          }}>
                          <div className="my-1 flex flex-row gap-4">
                            <DeleteContestDialog contestId={contest.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// const ContestItem = ({
//   contest,
//   onClick,
// }: {
//   contest: Contest
//   onClick: () => void
// }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="aspect-video relative hover:shadow-lg shadow-sm max-w-[400px] rounded-md overflow-hidden">
//       <div className="z-10 bg-white bottom-0 absolute w-full p-4 flex flex-col justify-end items-end">
//         <div className="w-full flex flex-row justify-between">
//           <div>
//             Địa chỉ: {contest.addressName}
//             <div>{contest.address}</div>
//           </div>
//           <div>Số team: {contest.teamCount}</div>
//         </div>
//         <div>Thời gian: {contest.localDateTime}</div>
//       </div>
//       <div className="size-full absolute overflow-hidden">
//         <img
//           src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg"
//           className="object-contain"
//         />
//       </div>
//     </div>
//   )
// }

export default ManageMatches
