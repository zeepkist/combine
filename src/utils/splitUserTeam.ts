const removeBadTasteTeams = (input: string) =>
  ['CTR SUCKS'].includes(input) ? undefined : input

export const splitUserTeam = (input: string) => {
  if (input.startsWith('[')) {
    const [team, ...username] = input.split(']')
    const formattedUsername = username.join(']').trim()
    const formattedTeam = removeBadTasteTeams(team.slice(1))

    if (!formattedUsername) {
      return {
        username: input
      }
    }

    if (!formattedTeam) {
      return {
        username: formattedUsername
      }
    }

    return {
      team: formattedTeam,
      username: formattedUsername
    }
  } else {
    return {
      username: input
    }
  }
}
