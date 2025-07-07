export const TeamColor = {
  RED: "RED",
  WHITE: "WHITE",
  BLUE: "BLUE",
  GREEN: "GREEN",
  BLACK: "BLACK",
  YELLOW: "YELLOW",
  ORANGE: "ORANGE",
} as const
export type TeamColorEnum = (typeof TeamColor)[keyof typeof TeamColor]
