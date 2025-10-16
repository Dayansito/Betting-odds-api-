export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const data = {
    teams: {
      'Kansas City Chiefs': { name: 'Kansas City Chiefs', elo: 1550 },
      'San Francisco 49ers': { name: 'San Francisco 49ers', elo: 1520 },
      'Baltimore Ravens': { name: 'Baltimore Ravens', elo: 1500 },
      'Buffalo Bills': { name: 'Buffalo Bills', elo: 1490 },
      'Philadelphia Eagles': { name: 'Philadelphia Eagles', elo: 1480 },
      'Dallas Cowboys': { name: 'Dallas Cowboys', elo: 1460 },
      'Detroit Lions': { name: 'Detroit Lions', elo: 1450 },
      'Miami Dolphins': { name: 'Miami Dolphins', elo: 1440 },
      'Cincinnati Bengals': { name: 'Cincinnati Bengals', elo: 1430 },
      'Jacksonville Jaguars': { name: 'Jacksonville Jaguars', elo: 1420 },
      'Los Angeles Chargers': { name: 'Los Angeles Chargers', elo: 1410 },
      'Cleveland Browns': { name: 'Cleveland Browns', elo: 1400 },
      'Green Bay Packers': { name: 'Green Bay Packers', elo: 1390 },
      'New Orleans Saints': { name: 'New Orleans Saints', elo: 1380 },
      'Seattle Seahawks': { name: 'Seattle Seahawks', elo: 1370 },
      'Los Angeles Rams': { name: 'Los Angeles Rams', elo: 1360 },
      'Pittsburgh Steelers': { name: 'Pittsburgh Steelers', elo: 1350 },
      'Minnesota Vikings': { name: 'Minnesota Vikings', elo: 1340 },
      'Atlanta Falcons': { name: 'Atlanta Falcons', elo: 1330 },
      'Tampa Bay Buccaneers': { name: 'Tampa Bay Buccaneers', elo: 1320 },
      'Las Vegas Raiders': { name: 'Las Vegas Raiders', elo: 1310 },
      'New York Jets': { name: 'New York Jets', elo: 1300 },
      'Tennessee Titans': { name: 'Tennessee Titans', elo: 1290 },
      'Indianapolis Colts': { name: 'Indianapolis Colts', elo: 1280 },
      'New York Giants': { name: 'New York Giants', elo: 1270 },
      'Washington Commanders': { name: 'Washington Commanders', elo: 1260 },
      'Denver Broncos': { name: 'Denver Broncos', elo: 1250 },
      'New England Patriots': { name: 'New England Patriots', elo: 1240 },
      'Houston Texans': { name: 'Houston Texans', elo: 1230 },
      'Chicago Bears': { name: 'Chicago Bears', elo: 1220 },
      'Arizona Cardinals': { name: 'Arizona Cardinals', elo: 1210 },
      'Carolina Panthers': { name: 'Carolina Panthers', elo: 1200 }
    },
    injuries: {}
  };
  
  res.status(200).json(data);
}
