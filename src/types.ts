export interface RawRecord {
  SteamId: string
  Username: string
  Time: string
  ZeepkistId: string
  ColorId: string
  HatId: string
}

interface User {
  username: string
  team?: string
  steamId: string
}

export interface UserStanding extends User {
  totalPoints: number
}

export type UserStandingMap = Omit<UserStanding, 'steamId'>

export interface UserLevelStanding extends User {
  time: number
  points: number
}

export interface UserLevelStandingMap
  extends Omit<UserLevelStanding, 'username' | 'points'> {
  points?: number
  username?: string // added after processing all events in season so we always have the latest username
}

export interface EventLevel {
  level: string
  standings: UserLevelStanding[]
}

export interface Event {
  users: UserStanding[]
  levels: EventLevel[]
}

export interface Metadata {
  events?: {
    [key: string]: {
      name: string
      workshopId: string
    }
  }
  points?: number[]
  finishPoints?: number
}

export type LevelsMap = Map<string, UserLevelStandingMap[]>

export type UsersMap = Map<string, UserStandingMap>

export type EventsMap = Map<string, LevelsMap>
