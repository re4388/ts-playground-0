function trackSummary(points) {
  const totalTime = calculateTime()
  const totalDistance = calculateDistance()

  const pace = totalTime / 60 / totalDistance


  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace
  }

  // I’d like to move calculateDistance to the top level so I can calculate distances for tracks without all the other parts of the summary.
  function calculateDistance() {
    let result = 0
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i - 1], points[i])
    }
    return result
  }

  function distance(p1, p2) {
    // haversine formula see http://www.movable-type.co.uk/scripts/latlong.html const EARTH_RADIUS = 3959; // in miles
    const dLat = radians(p2.lat) - radians(p1.lat)
    const dLon = radians(p2.lon) - radians(p1.lon)
    const a = Math.pow(Math.sin(dLat / 2), 2)
      + Math.cos(radians(p2.lat))
      * Math.cos(radians(p1.lat))
      * Math.pow(Math.sin(dLon / 2), 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return EARTH_RADIUS * c
  }

  function radians(degrees) {
    return degrees * Math.PI / 180
  }


  function calculateTime() {
  }

}

// 先 copy 一個出來，不要 break current code
function top_calculateDistance() {
  let result = 0
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i - 1], points[i])
  }
  return result
}
