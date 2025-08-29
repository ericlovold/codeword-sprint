export type Streamer = (prompt:string,onChunk:(c:string)=>void)=>Promise<void>;
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));

export const mockStreamer: Streamer = async (prompt,onChunk) => {
  const reply = `Hi! You said: "${prompt}". This is a mock streaming reply from Codeword.`;
  for (const ch of reply) { onChunk(ch); await sleep(12); }
};

export const wsStreamer: Streamer = async (prompt,onChunk) => {
  const url = process.env.EXPO_PUBLIC_CHAT_URL;
  if (!url) return mockStreamer(prompt,onChunk);
  const ws = new WebSocket(url);
  await new Promise<void>((resolve,reject)=>{
    const t=setTimeout(()=>reject(new Error("WS connect timeout")),4000);
    ws.onopen=()=>{ clearTimeout(t); ws.send(JSON.stringify({type:"prompt",prompt})); resolve(); };
    ws.onerror=(e)=>{ clearTimeout(t); reject(e as any); };
  });
  await new Promise<void>((resolve)=>{
    ws.onmessage=(ev)=>{
      try{
        const m=JSON.parse(String(ev.data));
        if(m.type==="chunk") onChunk(m.data);
        if(m.type==="done"){ ws.close(); resolve(); }
      }catch{}
    };
    ws.onclose=()=>resolve();
  });
};
