const supabase = require("../config/supabaseClient");


// =======================
// GET DASHBOARD DATA
// =======================
exports.getDashboard = async (req, res) => {
  try {

    // latest burnout score
    const { data: latestEntry, error: latestError } =
      await supabase
        .from("entries")
        .select("burnout_score")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    if (latestError && latestError.code !== "PGRST116")
      throw latestError;

    // last 7 entries
    const { data: last7, error } = await supabase
      .from("entries")
      .select("created_at, mood, sleep_hours, stress")
      .order("created_at", { ascending: false })
      .limit(7);

    if (error) throw error;

    const ordered = (last7 || []).reverse();

    const weekly_mood = ordered.map(e => ({
      date: e.created_at,
      mood: e.mood
    }));

    const sleep_data = ordered.map(e => ({
      date: e.created_at,
      hours: e.sleep_hours
    }));

    const stress_data = ordered.map(e => ({
      date: e.created_at,
      stress: e.stress
    }));

    res.json({
      burnout_score: latestEntry?.burnout_score || 0,
      weekly_mood,
      sleep_data,
      stress_data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// =======================
// GET LATEST ENTRY
// =======================
exports.getLatestEntry = async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116")
      throw error;

    res.json({
      success: true,
      data: data || null
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};