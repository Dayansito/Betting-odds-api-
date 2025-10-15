export default async function handler(req, res) {
  const { sport } = req.query;
  const API_KEY = process.env.ODDS_API_KEY;

  try {
    const response = await fetch(
      `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${API_KEY}&regions=us&markets=h2h&oddsFormat=american`
    );
    
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch odds' });
  }
}
