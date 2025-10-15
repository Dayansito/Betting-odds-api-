export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { sport } = req.query;
  const API_KEY = process.env.ODDS_API_KEY;

  // Check if key exists
  if (!API_KEY) {
    return res.status(500).json({ 
      error: 'Environment variable ODDS_API_KEY not found',
      hasKey: false
    });
  }

  try {
    const apiUrl = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${API_KEY}&regions=us&markets=h2h&oddsFormat=american`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Return everything including any errors
    return res.status(response.status).json({
      ...data,
      debugInfo: {
        hasKey: true,
        keyLength: API_KEY.length,
        keyStart: API_KEY.substring(0, 4),
        keyEnd: API_KEY.substring(API_KEY.length - 4),
        responseStatus: response.status
      }
    });
  } catch (error) {
    return res.status(500).json({ 
      error: 'Fetch failed',
      message: error.message 
    });
  }
}
```
