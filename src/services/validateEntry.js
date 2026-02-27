function validateEntry(data) {

  const fields = [
    "sleep_hours",
    "work_hours",
    "motivation",
    "productivity",
    "stress",
    "mood",
    "social_interaction",
    "screen_time"
  ];

  // check missing fields
  for (const field of fields) {
    if (data[field] === undefined) {
      return `${field} is required`;
    }
  }

  // validate numbers
  for (const field of fields) {
    const value = Number(data[field]);

    if (isNaN(value)) {
      return `${field} must be a number`;
    }

    if (value < 0 || value > 10) {
      return `${field} must be between 0 and 10`;
    }
  }

  return null;
}

module.exports = validateEntry;