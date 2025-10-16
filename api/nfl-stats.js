export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const teams = {
    'Kansas City Chiefs': { name: 'Kansas City Chiefs', elo: 1550 },
    'San Francisco 49ers': { name: 'San Francisco 49ers', elo: 1520 },
    'Baltimore Ravens': { name: 'Baltimore Ravens', elo: 1500 },
    'Buffalo Bills': { name: 'Buffalo Bills', elo: 1490 }
  };
  
  res.status(200).json({ teams, injuries: {} });
}
