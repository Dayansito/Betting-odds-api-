export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Fetch NFL standings from ESPN
    const standingsResponse = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/standings');
    const standingsData = await standingsResponse.json();
    
    const teams = {};
    
    // Process each conference
    if (standingsData.children && Array.isArray(standingsData.children)) {
      standingsData.children.forEach(conference => {
        if (conference.standings && conference.standings.entries) {
          conference.standings.entries.forEach(entry => {
            try {
              const team = entry.team;
              const stats = entry.stats || [];
              
              // Extract stats
              const wins = stats.find(s => s.name === 'wins')?.value || 0;
              const losses = stats.find(s => s.name === 'losses')?.value || 0;
              const pointsFor = stats.find(s => s.name === 'pointsFor')?.value || 0;
              const pointsAgainst = stats.find(s => s.name === 'pointsAgainst')?.value || 0;
              
              const totalGames = wins + losses;
              const winPct = totalGames > 0 ? wins / totalGames : 0.5;
              const pointDiff = totalGames > 0 ? (pointsFor - pointsAgainst) / totalGames : 0;
              
              // Calculate Elo rating
              // Base of 1300, adjusted by win% and point differential
              const elo = 1300 + (winPct * 400) + (pointDiff * 3);
              
              teams[team.displayName] = {
                name: team.displayName,
                abbreviation: team.abbreviation || team.displayName,
                wins: wins,
                losses: losses,
                winPct: (winPct * 100).toFixed(1),
                pointsFor: pointsFor,
                pointsAgainst: pointsAgainst,
                pointDiff: pointsFor - pointsAgainst,
                elo: Math.round(elo)
              };
            } catch (err) {
              console.error('Error processing team:', err);
            }
          });
        }
      });
    }

    // Fetch injuries
    let injuries = {};
    try {
      const injuriesResponse = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/injuries');
      const injuriesData = await injuriesResponse.json();
      
      if (injuriesData.teams && Array.isArray(injuriesData.teams)) {
        injuriesData.teams.forEach(team => {
          try {
            const teamName = team.team.displayName;
            const keyInjuries = team.injuries
              .filter(inj => inj.status === 'Out' || inj.status === 'Doubtful')
              .map(inj => ({
                player: inj.longName || inj.athlete?.displayName || 'Unknown',
                position: inj.position || 'N/A',
                status: inj.status,
                detail: inj.details?.type || ''
              }));
            
            if (keyInjuries.length > 0) {
              injuries[teamName] = keyInjuries;
            }
          } catch (err) {
            console.error('Error processing injuries:', err);
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
      teamCount: Object.keys(teams).length
    });
    
  } catch (error) {
    console.error('NFL Stats API Error:', error);
    return res.status(500).json({ 
      error: error.message,
      details: 'Failed to fetch NFL stats from ESPN'
    });
  }
}
