const API_KEY = process.env.ODDS_API_KEY;

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const { eventId } = req.query;
    const sport = 'americanfootball_nfl';  // ← MUST BE EXACT
    const markets = 'h2h,spreads,totals,player_pass_tds,player_pass_yds,player_rush_yds,player_reception_yds,player_anytime_td,player_first_td';
    
    const url = `https://api.the-odds-api.com/v4/sports/${sport}/events/${eventId}/odds/?apiKey=${API_KEY}&regions=us,us2&markets=${markets}&oddsFormat=american`;

    const response = await fetch(url);
    const data = await response.json();
    
    res.json(data);
}
