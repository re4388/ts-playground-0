function baseCharge(usage) {
  if (usage < 0) {
    return usd(0)
  }
  const amount = withinBand(usage, 0, 100) * 0.03 + withinBand(usage, 100, 200) * 0.05 + topBand(usage) * 0.07
  return usd(amount)
}

// function bottomBand(usage) {
//   return Math.min(usage, 100)
// }


function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

function topBand(usage) {
  return usage > 200 ? usage - 200 : 0
}

// When looking to parameterize some related functions, my approach is to take one of the functions and add parameters to it, with an eye to the other cases. With range-oriented things like this, usually the place to start is with the middle range. So I’ll work on middleBand to change it to use parameters, and then adjust other callers to fit.
