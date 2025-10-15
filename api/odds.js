export default async function handler(req, res) {
  const { sport } = req.query;
  const API_KEY = process.env.ODDS_API_KEY;

  // Debug: Check if API key exists
  if (!API_KEY) {
    return res.status(500).json({ 
      error: 'API key not found in environment variables',
      debug: 'ODDS_API_KEY is undefined'
    });
  }

  // Debug: Show first/last 4 chars of key
  const keyPreview = `${API_KEY.substring(0, 4)}...${API_KEY.substring(API_KEY.length - 4)}`;
  
  try {
    const apiUrl = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${API_KEY}&regions=us&markets=h2h&oddsFormat=american`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // If there's an error from the API, return it with debug info
    if (data.message || data.error_code) {
      return res.status(response.status).json({
        ...data,
        debug: {
          keyPreview: keyPreview,
          keyLength: API_KEY.length,
          sport: sport
        }
      });
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.json(data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch odds',
      message: error.message 
    });
  }
}
```

5. Click **"Commit changes"**
6. Vercel will auto-redeploy

---

**Then test again:**
```
https://betting-odds-axule7arj-dayan-ruizs-projects-8361d205.vercel.app/api/odds?sport=americanfootball_nfl
