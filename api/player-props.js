export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { sport, eventId } = req.query;
  const API_KEY = process.env.ODDS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }
const markets = 'h2h,spreads,totals,h2h_q1,h2h_q2,h2h_q3,h2h_q4,h2h_h1,h2h_h2,spreads_q1,spreads_q2,spreads_q3,spreads_q4,spreads_h1,spreads_h2,totals_q1,totals_q2,totals_q3,totals_q4,totals_h1,totals_h2,player_pass_tds,player_pass_yds,player_pass_completions,player_rush_yds,player_rush_attempts,player_receptions,player_reception_yds,player_anytime_td,player_first_td,player_last_td,player_kicking_points';

const url = `https://api.the-odds-api.com/v4/sports/${sport}/events/${eventId}/odds/?apiKey=${API_KEY}&regions=us,us2&markets=${markets}&oddsFormat=american`;
  try {
    let url;
    
    if (eventId) {
      // Get props for specific game
      url = `https://api.the-odds-api.com/v4/sports/${sport}/events/${eventId}/odds/?apiKey=${API_KEY}&regions=us,us2&markets=player_pass_tds,player_rush_tds,player_reception_tds,player_anytime_td&oddsFormat=american`;
    } else {
      // Get all upcoming games first
      url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${API_KEY}&regions=us,us2&markets=h2h&oddsFormat=american`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
