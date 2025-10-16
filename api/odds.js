const API_KEY = process.env.ODDS_API_KEY;

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const sport = 'americanfootball_nfl';  // ← MUST BE EXACT
    const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${API_KEY}&regions=us,us2&markets=h2h&oddsFormat=american`;

    const response = await fetch(url);
    const data = await response.json();
    
    res.json(data);
}

