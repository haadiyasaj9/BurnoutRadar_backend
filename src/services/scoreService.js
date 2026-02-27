function calculateBurnout(data) {
  let score = 0;

  score += (10 - data.sleep_hours) * 3;
  score += data.stress * 3;
  score += data.work_hours * 2;
  score += (10 - data.mood) * 2;
  score += data.screen_time * 1;

  // clamp between 0–100
  return Math.max(0, Math.min(score, 100));
}

module.exports = calculateBurnout;