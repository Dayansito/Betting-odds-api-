const API_KEY = process.env.ODDS_API_KEY;

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const { eventId } = req.query;
    const sport = 'americanfootball_nfl';  // ← MUST BE EXACT
    const markets = 'h2h,spreads,totals,player_pass_tds,player_pass_yds,player_pass_completions,player_pass_attempts,player_rush_yds,player_rush_attempts,player_receptions,player_reception_yds,player_anytime_td,player_last_td,player_kicking_points';
```
    
    const url = `https://api.the-odds-api.com/v4/sports/${sport}/events/${eventId}/odds/?apiKey=${API_KEY}&regions=us,us2&markets=${markets}&oddsFormat=american`;

    const response = await fetch(url);
    const data = await response.json();
    
    res.json(data);
}
