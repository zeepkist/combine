export interface User {
  steamId?: string
  username: string
  totalPoints: number
}

export interface Data {
  steamId: string
  username?: string // added after processing all events in season so we always have the latest username
  time: number
  points?: number
}

export interface Record {
  SteamId: string
  Username: string
  Time: string
  ZeepkistId: string
  ColorId: string
  HatId: string
}

export interface Metadata {
  [key: string]: {
    name: string
    workshopId: string
  }
}
