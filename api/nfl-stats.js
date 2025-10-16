export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // Simple fallback data - always returns this
  const teams = {
    'Kansas City Chiefs': { name: 'Kansas City Chiefs', elo: 1550, wins: 0, losses: 0 },
    'San Francisco 49ers': { name: 'San Francisco 49ers', elo: 1520, wins: 0, losses: 0 },
    'Baltimore Ravens': { name: 'Baltimore Ravens', elo: 1500, wins: 0, losses: 0 },
    'Buffalo Bills': { name: 'Buffalo Bills', elo: 1490, wins: 0, losses: 0 },
    'Philadelphia Eagles': { name: 'Philadelphia Eagles', elo: 1480, wins: 0, losses: 0 },
    'Dallas Cowboys': { name: 'Dallas Cowboys', elo: 1460, wins: 0, losses: 0 },
    'Detroit Lions': { name: 'Detroit Lions', elo: 1450, wins: 0, losses: 0 },
    'Miami Dolphins': { name: 'Miami Dolphins', elo: 1440, wins: 0, losses: 0 },
    'Cincinnati Bengals': { name: 'Cincinnati Bengals', elo: 1430, wins: 0, losses: 0 },
    'Jacksonville Jaguars': { name: 'Jacksonville Jaguars', elo: 1420, wins: 0, losses: 0 },
    'Los Angeles Chargers': { name: 'Los Angeles Chargers', elo: 1410, wins: 0, losses: 0 },
    'Cleveland Browns': { name: 'Cleveland Browns', elo: 1400, wins: 0, losses: 0 },
    'Green Bay Packers': { name: 'Green Bay Packers', elo: 1390, wins: 0, losses: 0 },
    'New Orleans Saints': { name: 'New Orleans Saints', elo: 1380, wins: 0, losses: 0 },
    'Seattle Seahawks': { name: 'Seattle Seahawks', elo: 1370, wins: 0, losses: 0 },
    'Los Angeles Rams': { name: 'Los Angeles Rams', elo: 1360, wins: 0, losses: 0 },
    'Pittsburgh Steelers': { name: 'Pittsburgh Steelers', elo: 1350, wins: 0, losses: 0 },
    'Minnesota Vikings': { name: 'Minnesota Vikings', elo: 1340, wins: 0, losses: 0 },
    'Atlanta Falcons': { name: 'Atlanta Falcons', elo: 1330, wins: 0, losses: 0 },
    'Tampa Bay Buccaneers': { name: 'Tampa Bay Buccaneers', elo: 1320, wins: 0, losses: 0 },
    'Las Vegas Raiders': { name: 'Las Vegas Raiders', elo: 1310, wins: 0, losses: 0 },
    'New York Jets': { name: 'New York Jets', elo: 1300, wins: 0, losses: 0 },
    'Tennessee Titans': { name: 'Tennessee Titans', elo: 1290, wins: 0, losses: 0 },
    'Indianapolis Colts': { name: 'Indianapolis Colts', elo: 1280, wins: 0, losses: 0 },
    'New York Giants': { name: 'New York Giants', elo: 1270, wins: 0, losses: 0 },
    'Washington Commanders': { name: 'Washington Commanders', elo: 1260, wins: 0, losses: 0 },
    'Denver Broncos': { name: 'Denver Broncos', elo: 1250, wins: 0, losses: 0 },
    'New England Patriots': { name: 'New England Patriots', elo: 1240, wins: 0, losses: 0 },
    'Houston Texans': { name: 'Houston Texans', elo: 1230, wins: 0, losses: 0 },
    'Chicago Bears': { name: 'Chicago Bears', elo: 1220, wins: 0, losses: 0 },
    'Arizona Cardinals': { name: 'Arizona Cardinals', elo: 1210, wins: 0, losses: 0 },
    'Carolina Panthers': { name: 'Carolina Panthers', elo: 1200, wins: 0, losses: 0 }
  };

  const injuries = {};

  return res.status(200).json({ 
    teams, 
    injuries,
    timestamp: new Date().toISOString()
  });
}
```
