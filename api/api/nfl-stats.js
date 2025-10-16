export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ 
    teams: {
      'Kansas City Chiefs': { name: 'Kansas City Chiefs', elo: 1550 },
      'San Francisco 49ers': { name: 'San Francisco 49ers', elo: 1520 }
    },
    injuries: {},
    status: 'working'
  });
}
