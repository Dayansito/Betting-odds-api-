export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const API_KEY = process.env.SPORTSDATA_API_KEY;
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'SportsData API key not configured' });
  }

  try {
    const currentYear = new Date().getFullYear();
    const season = currentYear; // NFL season year
    
    // Fetch standings from SportsData.io
    const standingsUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Standings/${season}?key=${API_KEY}`;
    const standingsResponse = await fetch(standingsUrl);
    
    if (!standingsResponse.ok) {
      throw new Error(`SportsData API error: ${standingsResponse.status}`);
    }
    
    const standingsData = await standingsResponse.json();
    
    const teams = {};
    
    // Process each team
    standingsData.forEach(team => {
      const wins = team.Wins || 0;
      const losses = team.Losses || 0;
      const pointsFor = team.PointsFor || 0;
      const pointsAgainst = team.PointsAgainst || 0;
      
      const totalGames = wins + losses;
      const winPct = totalGames > 0 ? wins / totalGames : 0.5;
      const pointDiff = totalGames > 0 ? (pointsFor - pointsAgainst) / totalGames : 0;
      
      // Calculate Elo rating
      // Base of 1300, adjusted by win% (up to 400 points) and point differential (up to 3 points per game)
      const elo = 1300 + (winPct * 400) + (pointDiff * 3);
      
      teams[team.Name] = {
        name: team.Name,
        abbreviation: team.Key,
        wins: wins,
        losses: losses,
        winPct: (winPct * 100).toFixed(1),
        pointsFor: pointsFor,
        pointsAgainst: pointsAgainst,
        pointDiff: pointsFor - pointsAgainst,
        elo: Math.round(elo)
      };
    });

    // Fetch injuries from SportsData.io
    let injuries = {};
    try {
      const injuriesUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Injuries/${season}?key=${API_KEY}`;
      const injuriesResponse = await fetch(injuriesUrl);
      
      if (injuriesResponse.ok) {
        const injuriesData = await injuriesResponse.json();
        
        // Group injuries by team
        injuriesData.forEach(injury => {
          if (injury.Status === 'Out' || injury.Status === 'Doubtful') {
            const teamName = injury.Team;
            
            if (!injuries[teamName]) {
              injuries[teamName] = [];
            }
            
            injuries[teamName].push({
              player: injury.Name,
              position: injury.Position,
              status: injury.Status,
              detail: injury.InjuryBodyPart || ''
            });
          }
        });
      }
    } catch (injuryError) {
      console.error('Injury fetch failed:', injuryError);
    }

    return res.status(200).json({ 
      teams, 
      injuries,
      timestamp: new Date().toISOString(),
      teamCount: Object.keys(teams).length,
      source: 'SportsData.io'
    });
    
  } catch (error) {
    console.error('SportsData API Error:', error);
    return res.status(500).json({ 
      error: error.message,
      details: 'Failed to fetch NFL stats from SportsData.io'
    });
  }
}
