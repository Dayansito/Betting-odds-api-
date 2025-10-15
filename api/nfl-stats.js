export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // Fetch NFL standings from ESPN
    const standingsResponse = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/standings');
    
    if (!standingsResponse.ok) {
      throw new Error('Failed to fetch standings');
    }
    
    const standingsData = await standingsResponse.json();
    
    // Calculate Elo ratings based on standings
    const teams = {};
    
    // ESPN returns standings in a specific structure
    if (standingsData.children && Array.isArray(standingsData.children)) {
      standingsData.children.forEach(conference => {
        if (conference.standings && conference.standings.entries) {
          conference.standings.entries.forEach(entry => {
            try {
              const team = entry.team;
              const stats = entry.stats || [];
              
              // Safely find wins and losses
              const winsObj = stats.find(s => s.name === 'wins');
              const lossesObj = stats.find(s => s.name === 'losses');
              const pointsForObj = stats.find(s => s.name === 'pointsFor');
              const pointsAgainstObj = stats.find(s => s.name === 'pointsAgainst');
              
              const wins = winsObj ? winsObj.value : 0;
              const losses = lossesObj ? lossesObj.value : 0;
              const pointsFor = pointsForObj ? pointsForObj.value : 0;
              const pointsAgainst = pointsAgainstObj ? pointsAgainstObj.value : 0;
              
              const totalGames = wins + losses;
              const winPct = totalGames > 0 ? wins / totalGames : 0.5;
              const pointDiff = totalGames > 0 ? (pointsFor - pointsAgainst) / totalGames : 0;
              
              // Simple Elo calculation
              const elo = 1200 + (winPct * 300) + (pointDiff * 2);
              
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

    // Fetch injuries (may fail, so we'll handle it separately)
    let injuries = {};
    try {
      const injuriesResponse = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/injuries');
      if (injuriesResponse.ok) {
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
      }
    } catch (injuryError) {
      console.error('Injury fetch failed:', injuryError);
      // Continue without injury data
    }

    return res.status(200).json({ 
      teams, 
      injuries,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('NFL Stats API Error:', error);
    return res.status(500).json({ 
      error: error.message,
      details: 'Failed to fetch NFL stats from ESPN'
    });
  }
}
