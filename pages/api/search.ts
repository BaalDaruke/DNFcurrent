export default async function handler(req: any, res: any) {
    const { server, nickname } = req.query;
    const apiKey = process.env.NEOPLE_API_KEY;
  
    const searchUrl = `https://api.neople.co.kr/df/servers/${server}/characters?characterName=${nickname}&limit=1&apikey=${apiKey}`;
    const searchRes = await fetch(searchUrl);
    const searchJson = await searchRes.json();
  
    if (searchJson.rows.length === 0) {
      return res.status(404).json({ error: '캐릭터를 찾을 수 없음' });
    }
  
    const characterId = searchJson.rows[0].characterId;
  
    const detailUrl = `https://api.neople.co.kr/df/servers/${server}/characters/${characterId}?apikey=${apiKey}`;
    const detailRes = await fetch(detailUrl);
    const detailJson = await detailRes.json();
  
    return res.status(200).json(detailJson);
  }
  