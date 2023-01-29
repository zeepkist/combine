import {
  Data,
  generateTotalsFormula,
  insertKey,
  pointsDistribution
} from '../utils/index.js'

export const handlePoints = (data: Data[], levels: Set<string>): Data[] => {
  /*
  // Assign points to users based on their time for each level
  for (const level of levels) {
    data = [...data]
      .sort((a, b) => {
        console.log(a[level], b[level], a[level] - b[level])
        if (!a[level] || !b[level]) return 0
        return a[level] - b[level]
      })
      .map((item, index) => ({
        ...item,
        [level]: item[level] || undefined,
        [`${level}Points`]: pointsDistribution[index] || 0
      }))
  }

  // Generate the total points formula for each user
  return data.map((item, index) => {
    const formula = generateTotalsFormula(levels.size, index)
    return insertKey('Points', formula, item, 2)
  }).sort((a, b) => b.Points - a.Points)
  */

  return data.map((item, index) => {
    const formula = generateTotalsFormula(levels.size, index)
    return insertKey('Points', formula, item, 2)
  })
}
