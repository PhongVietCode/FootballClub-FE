import type { Player } from "./player"

export interface Contest{
    id: string
    address: string
    addressName: string
    teamCount: number
    localDateTime: string
    teams: TeamSplitResponse[]
}
export interface TeamUpdateRequest {
    color: string
    totalElo: number
    playerIds: string[]
}
export interface TeamSplitResponse {
    color: string
    totalElo: number
    players: Player[]
}