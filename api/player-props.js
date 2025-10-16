const API_KEY = process.env.ODDS_API_KEY;

export default async function handler(req, res) {
    // CORS headers - allows browser to access this API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    try {
        const { eventId } = req.query;
        
        if (!eventId) {
            return res.status(400).json({ 
                error: 'Missing eventId parameter',
                message: 'Please provide an eventId in the query string'
            });
        }
        
        // MUST be exactly this for NFL
        const sport = 'americanfootball_nfl';
        
        // Valid markets (player_first_td is NOT valid, removed it)
        const markets = 'h2h,spreads,totals,player_pass_tds,player_pass_yds,player_pass_completions,player_pass_attempts,player_rush_yds,player_rush_attempts,player_receptions,player_reception_yds,player_anytime_td,player_last_td,player_kicking_points';
        
        const url = `https://api.the-odds-api.com/v4/sports/${sport}/events/${eventId}/odds/?apiKey=${API_KEY}&regions=us,us2&markets=${markets}&oddsFormat=american`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        // Return the data
        res.status(200).json(data);
        
    } catch (error) {
        console.error('Error in player-props API:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
