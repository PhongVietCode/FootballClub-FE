import { useGetContestDetailQuery } from "@/api/contest"
import ListRender from "@/components/common/list-render"
import { Button } from "@/components/ui/button"
import { getTeamColorStyle } from "@/constant"
import type { TeamSplitResponse } from "@/types/contest"
import { Outlet, useLocation, useNavigate, useParams } from "react-router"

const ContestDetail = () => {
  const { contestId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  const { data, isLoading, isFetching } = useGetContestDetailQuery({
    id: contestId || "",
  })
  const date = new Date(data?.result.dateTime || "")
  if (isLoading || isFetching) {
    return <div>Đang tải dữ liệu</div>
  }
  return (
    <div className="flex-1 px-4 flex flex-col h-full overflow-hidden">
      <div className="font-semibold text-xl py-4">Thông tin chi tiết</div>
      <div>
        <div>
          Địa điểm: {data?.result.addressName} - {data?.result.address}
        </div>
        <div>
          Ngày:{" "}
          <span className="font-semibold text-lg">
            {date.toLocaleDateString("vi")}
          </span>
        </div>
        <div>
          Giờ:{" "}
          <span className="font-semibold text-lg">{`${date.toLocaleTimeString(
            "vi"
          )}`}</span>
        </div>
      </div>
      {data?.result.teams == null || data.result.teams.length === 0 ? (
        <div className="py-4">
          <Button onClick={() => navigate(`/contests/${contestId}/pick-mem`)}>
            Tiến hành chia đội
          </Button>
        </div>
      ) : (
        <>
          <div className="my-4">
            <TeamSplitContainer data={data.result.teams} />
          </div>
          <div className="text-red-600 italic text-[18px]">
            Lưu ý: Mặc đúng màu áo rõ ràng theo quy định và đến đúng giờ. Mọi
            sai phạm sẽ bị xử lý theo quy định của pháp luật.
          </div>
        </>
      )}
      <Outlet />
    </div>
  )
}
const TeamSplitContainer = ({ data }: { data: TeamSplitResponse[] }) => {
  const teamCount = data.length
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${teamCount}, 1fr)`, // Set columns equal to teamCount
        gap: "1rem", // Optional: adds spacing between grid items
      }}>
      {data.map((team, index) => (
        <TeamResult team={team} key={index} />
      ))}
    </div>
  )
}
const TeamResult = ({ team }: { team: TeamSplitResponse }) => {
  return (
    <div
      style={{
        backgroundColor: getTeamColorStyle(team.color).bgColor,
        color: getTeamColorStyle(team.color).textColor,
      }}
      className="p-4 rounded-md border-solid border-gray-400 border-[1px]">
      <div
        style={{
          color: getTeamColorStyle(team.color).textColor,
          textAlign: "center",
          fontSize: 18,
          fontWeight: "600",
        }}>
        {getTeamColorStyle(team.color).name}
      </div>
      <ListRender
        data={team.players}
        renderItem={(player, index) => (
          <div
            key={index}
            className={`flex flex-row justify-between py-2 font-semibold border-b-[2px] border-solid border-[${
              getTeamColorStyle(team.color).textColor
            }]`}>
            <span>{player.name}</span>
            <span>{player.elo}</span>
          </div>
        )}
      />
      <div className={`flex flex-row justify-between pt-2`}>
        <div>Tổng elo: </div>
        <div>{team.totalElo}</div>
      </div>
    </div>
  )
}
export default ContestDetail
