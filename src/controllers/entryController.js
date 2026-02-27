const supabase = require("../config/supabaseClient");
const calculateBurnout = require("../services/scoreService");
const validateEntry = require("../services/validateEntry");

// THIS is createEntry 👇
exports.createEntry = async (req, res) => {
  try {
    const data = req.body;

    // validation
    const validationError = validateEntry(data);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // calculate score
    const burnout_score = calculateBurnout(data);

    // insert into Supabase
    const { error } = await supabase
      .from("entries")
      .insert([{ ...data, burnout_score }]);

    if (error) throw error;

    res.json({
      message: "Entry saved successfully",
      burnout_score
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};