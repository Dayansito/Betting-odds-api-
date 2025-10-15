export default async function handler(req, res) {
  const { sport } = req.query;
  const API_KEY = process.env.ODDS_API_KEY;

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${API_KEY}&regions=us&markets=h2h&oddsFormat=american`;
    const response = await fetch(url);
    const data = await response.json();
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
