import { useLazySplitTeamQuery, useUpdateContestMutation } from "@/api/contest"
import ListRender from "@/components/common/list-render"
import { Button } from "@/components/ui/button"
import { getTeamColorStyle } from "@/constant"
import type { TeamSplitResponse } from "@/types/contest"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TeamColor } from "@/types/team"
const SplitTeamPage = () => {
  const { contestId } = useParams()
  const navigate = useNavigate()
  const [splitTeam, { data: teamSplitted, isLoading: isSplitting }] =
    useLazySplitTeamQuery()
  const [updateContest, { isLoading: isUpdating }] = useUpdateContestMutation()
  const [teamColor, setTeamColor] = useState<string[]>([])
  const handleSplitTeam = async (preferRefetch: boolean) => {
    try {
      if (contestId) {
        const res = await splitTeam({ id: contestId }, preferRefetch).unwrap()
        setTeamColor(res.result.map((team) => team.color))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdateContest = async () => {
    try {
      if (contestId && teamSplitted) {
        await updateContest({
          id: contestId,
          teamSplitted: teamSplitted.result.map((team, index) => ({
            totalElo: team.totalElo,
            color: teamColor[index],
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
      <div className="py-2">Kết quả chia đội</div>
      {isSplitting ? (
        <div>Đang chia đội...</div>
      ) : (
        <div>
          {!teamSplitted ? (
            <div>Không thể chia đội. Vui lòng ấn chia lại</div>
          ) : (
            <>
              {teamSplitted.result.length === 0 ? (
                <div className="text-center">
                  Chia không thành công. Hãy chia lại
                </div>
              ) : (
                <TeamSplitContainer
                  data={teamSplitted.result}
                  teamColor={teamColor}
                  setTeamColor={setTeamColor}
                />
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
const TeamSplitContainer = ({
  data,
  teamColor,
  setTeamColor,
}: {
  data: TeamSplitResponse[]
  teamColor: string[]
  setTeamColor: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const teamCount = data.length
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${teamCount}, 1fr)`, // Set columns equal to teamCount
        gap: "1rem", // Optional: adds spacing between grid items
      }}>
      {data.map((team, index) => (
        <div>
          <TeamResult team={team} teamColor={teamColor[index]} key={index} />
          <ColorSelect
            defaultColor={team.color}
            onChange={(value) => {
              setTeamColor((colors) => {
                const newColor = [...colors]
                newColor[index] = value
                return newColor
              })
            }}
          />
        </div>
      ))}
    </div>
  )
}
const ColorSelect = ({
  defaultColor,
  onChange,
}: {
  defaultColor: string
  onChange: (value: string) => void
}) => {
  return (
    <Select defaultValue={defaultColor} onValueChange={onChange}>
      <SelectTrigger className="w-full mt-2">
        <SelectValue placeholder="Màu Team" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(TeamColor).map((color) => (
          <SelectItem value={color}>{color}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
const TeamResult = ({
  team,
  teamColor,
}: {
  team: TeamSplitResponse
  teamColor: string
}) => {
  return (
    <div
      style={{
        backgroundColor: getTeamColorStyle(teamColor).bgColor,
        color: getTeamColorStyle(teamColor).textColor,
      }}
      className="p-4 rounded-md border-solid border-gray-400 border-[1px]">
      <div
        style={{
          color: getTeamColorStyle(teamColor).textColor,
          textAlign: "center",
          fontSize: 18,
          fontWeight: "600",
        }}>
        {getTeamColorStyle(teamColor).name}
      </div>
      <ListRender
        data={team.players}
        renderItem={(player, index) => (
          <div
            key={index}
            className={`flex flex-row justify-between py-2 font-semibold border-b-[2px] border-solid border-[${
              getTeamColorStyle(teamColor).textColor
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

export default SplitTeamPage
