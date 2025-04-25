export default async function handler(req: any, res: any) {
    const { server, adventureName } = req.query;
    const apiKey = process.env.NEOPLE_API_KEY;
  
    const url = `https://api.neople.co.kr/df/servers/${server}/characters?characterName=${adventureName}&wordType=adventureName&limit=30&apikey=${apiKey}`;

  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: '데이터 요청 실패' });
    }
  }
  