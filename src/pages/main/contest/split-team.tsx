import { useLazySplitTeamQuery, useUpdateContestMutation } from "@/api/contest"
import ListRender from "@/components/common/list-render"
import { Button } from "@/components/ui/button"
import type { TeamSplitResponse } from "@/types/contest"
import { TeamColor } from "@/types/team"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"

const SplitTeamPage = () => {
  const { contestId } = useParams()
  const navigate = useNavigate()
  const [splitTeam, { data: teamSplitted, isLoading: isSplitting }] =
    useLazySplitTeamQuery()
  const [updateContest, { isLoading: isUpdating }] = useUpdateContestMutation()
  const handleSplitTeam = async (preferRefetch: boolean) => {
    if (contestId) {
      await splitTeam({ id: contestId }, preferRefetch)
    }
  }
  const handleUpdateContest = async () => {
    console.log("hello")
    try {
      if (contestId && teamSplitted) {
        await updateContest({
          id: contestId,
          teamSplitted: teamSplitted.result.map((team) => ({
            totalElo: team.totalElo,
            color: team.color,
            playerIds: team.players.map((p) => p.id),
          })),
        }).unwrap()
        navigate(`/contests/${contestId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleSplitTeam(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contestId])
  return (
    <div>
      <div>Kết quả chia đội</div>
      {isSplitting ? (
        <div>Đang chia đội...</div>
      ) : (
        <div>
          {!teamSplitted ? (
            <div>Không thể chia đội. Vui lòng ấn chia lại</div>
          ) : (
            <>
              {teamSplitted.result.length === 0 ? (
                <div className="text-center">Chia không thành công. Hãy chia lại</div>
              ) : (
                <TeamSplitContainer data={teamSplitted.result} />
              )}
            </>
          )}
        </div>
      )}
      <div className="p-4 flex flex-row gap-4 justify-center">
        <Button
          onClick={() => {
            handleSplitTeam(false)
          }}
          className="w-[200px] border-1 border-solid border-blue-500 bg-transparent text-blue-600 hover:text-white"
          disabled={isSplitting}>
          Chia lại
        </Button>
        <Button
          onClick={handleUpdateContest}
          disabled={isUpdating}
          className="w-[200px]">
          Chốt
        </Button>
      </div>
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
  const getColor = () => {
    switch (team.color) {
      case TeamColor.RED:
        return {
          bgColor: "#FF3F33",
          textColor: "white",
          name: "Đỏ",
        }
      case TeamColor.WHITE:
        return {
          bgColor: "white",
          textColor: "black",
          name: "Trắng",
        }
      case TeamColor.BLUE:
        return {
          bgColor: "#687FE5",
          textColor: "white",
          name: "Xanh dương",
        }
      case TeamColor.GREEN:
        return {
          bgColor: "#347433",
          textColor: "white",
          name: "Lục",
        }
      default:
        return {
          bgColor: "white",
          textColor: "black",
          name: "Trắng",
        }
    }
  }
  return (
    <div
      style={{
        backgroundColor: getColor().bgColor,
        color: getColor().textColor,
      }}
      className="p-4 rounded-md border-solid border-gray-400 border-[1px]">
      <ListRender
        data={team.players}
        renderItem={(player, index) => (
          <div key={index} className="flex flex-row justify-between py-2">
            <span>{player.name}</span>
            <span>{player.elo}</span>
          </div>
        )}
      />
      <div
        className={`flex flex-row justify-between border-t-[2px] border-solid py-2 border-[${
          getColor().textColor
        }]`}>
        <div>Tổng elo: </div>
        <div>{team.totalElo}</div>
      </div>
    </div>
  )
}

export default SplitTeamPage
