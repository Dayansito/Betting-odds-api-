export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // Fetch NFL standings from ESPN
    const standingsResponse = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/standings');
    const standingsData = await standingsResponse.json();
    
    // Fetch injuries
    const injuriesResponse = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/injuries');
    const injuriesData = await injuriesResponse.json();

    // Calculate Elo ratings based on standings
    const teams = {};
    
    if (standingsData.children) {
      standingsData.children.forEach(conference => {
        conference.standings.entries.forEach(entry => {
          const team = entry.team;
          const stats = entry.stats;
          
          // Find wins and losses
          const wins = stats.find(s => s.name === 'wins')?.value || 0;
          const losses = stats.find(s => s.name === 'losses')?.value || 0;
          const pointsFor = stats.find(s => s.name === 'pointsFor')?.value || 0;
          const pointsAgainst = stats.find(s => s.name === 'pointsAgainst')?.value || 0;
          
          // Simple Elo calculation (base 1200 + performance adjustments)
          const winPct = wins / (wins + losses || 1);
          const pointDiff = (pointsFor - pointsAgainst) / (wins + losses || 1);
          const elo = 1200 + (winPct * 300) + (pointDiff * 2);
          
          teams[team.displayName] = {
            name: team.displayName,
            abbreviation: team.abbreviation,
            wins: wins,
            losses: losses,
            winPct: (winPct * 100).toFixed(1),
            pointsFor: pointsFor,
            pointsAgainst: pointsAgainst,
            pointDiff: pointsFor - pointsAgainst,
            elo: Math.round(elo),
            logo: team.logos?.[0]?.href
          };
        });
      });
    }

    // Process injuries
    const injuries = {};
    if (injuriesData.teams) {
      injuriesData.teams.forEach(team => {
        const teamName = team.team.displayName;
        const keyInjuries = team.injuries.filter(inj => 
          inj.status === 'Out' || inj.status === 'Doubtful'
        ).map(inj => ({
          player: inj.longName,
          position: inj.position,
          status: inj.status,
          detail: inj.details?.type
        }));
        
        if (keyInjuries.length > 0) {
          injuries[teamName] = keyInjuries;
        }
      });
    }

    res.status(200).json({ teams, injuries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
