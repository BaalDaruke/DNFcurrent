import { useState } from 'react';

export default function Home() {
  const [mode, setMode] = useState<'character' | 'adventure'>('character');
  const [server, setServer] = useState('');
  const [nickname, setNickname] = useState('');
  const [adventureName, setAdventureName] = useState('');
  const [result, setResult] = useState<any>(null);

  const searchCharacter = async () => {
    const res = await fetch(`/api/search?server=${server}&nickname=${nickname}`);
    const data = await res.json();
    setResult(data);
  };

  const searchAdventure = async () => {
    const res = await fetch(`/api/adventure?server=${server}&adventureName=${adventureName}`);
    const data = await res.json();
    console.log('🔍 모험단 검색 결과:', data); // <-- 여기 추가!
    setResult(data);
  };

  return (
    <main className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">DNFcurrent</h1>

      {/* 검색 모드 선택 */}
      <div className="flex space-x-4 mb-2">
        <button
          className={`px-3 py-1 border ${mode === 'character' ? 'bg-blue-600 text-white' : ''}`}
          onClick={() => setMode('character')}
        >
          캐릭터 검색
        </button>
        <button
          className={`px-3 py-1 border ${mode === 'adventure' ? 'bg-blue-600 text-white' : ''}`}
          onClick={() => setMode('adventure')}
        >
          모험단 검색
        </button>
      </div>

      {/* 입력창 */}
      <div className="flex flex-col space-y-2">
        <input
          className="border p-2"
          placeholder="서버명 (예: cain)"
          value={server}
          onChange={(e) => setServer(e.target.value)}
        />

        {mode === 'character' ? (
          <>
            <input
              className="border p-2"
              placeholder="캐릭터명"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button className="bg-blue-600 text-white py-2" onClick={searchCharacter}>
              캐릭터 검색
            </button>
          </>
        ) : (
          <>
            <input
              className="border p-2"
              placeholder="모험단명"
              value={adventureName}
              onChange={(e) => setAdventureName(e.target.value)}
            />
            <button className="bg-blue-600 text-white py-2" onClick={searchAdventure}>
              모험단 검색
            </button>
          </>
        )}
      </div>

      {/* 결과 표시 */}
      {mode === 'adventure' && result?.rows && (
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-bold">🎮 캐릭터 리스트</h2>
          {result.rows.map((char: any) => (
            <div key={char.characterId} className="p-2 border rounded">
              <p>이름: {char.characterName}</p>
              <p>직업: {char.jobGrowName}</p>
              <p>레벨: {char.level}</p>
            </div>
          ))}
        </div>
      )}

      {mode === 'character' && result?.characterName && (
        <div className="mt-6 p-4 border rounded">
          <p><strong>이름:</strong> {result.characterName}</p>
          <p><strong>레벨:</strong> {result.level}</p>
          <p><strong>직업:</strong> {result.jobGrowName}</p>
        </div>
      )}
    </main>
  );
}
