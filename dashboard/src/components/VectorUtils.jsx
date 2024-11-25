export const getVectorFileName = (metricValue, pathPrefix, namePos, nameNeg, nameZero) => {
  if (metricValue > 0) {
    return pathPrefix + namePos
  } else if (metricValue < 0) {
    return pathPrefix + nameNeg
  }

  return pathPrefix + nameZero
}

export const getColor = metricValue => {
  if (metricValue > 0) {
    return '#56CA00'
  } else if (metricValue < 0) {
    return 'red'
  }

  return 'grey'
}

export const getScaleVec = metricValue => {
  const scaleXNorm = 'scaleY(1)'
  const scaleXRev = 'scaleY(-1)'
  const scaleXZero = 'scaleY(0)'

  if (metricValue > 0) {
    return scaleXNorm
  } else if (metricValue < 0) {
    return scaleXRev
  }

  return scaleXZero
}
