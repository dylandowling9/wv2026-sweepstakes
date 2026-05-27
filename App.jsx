import { useState, useEffect, useRef, useCallback } from "react";

const GROUP_A = [
  { id:"a1",  name:"France",       flag:"🇫🇷", rank:1  },
  { id:"a2",  name:"Spain",        flag:"🇪🇸", rank:2  },
  { id:"a3",  name:"Argentina",    flag:"🇦🇷", rank:3  },
  { id:"a4",  name:"England",      flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", rank:4  },
  { id:"a5",  name:"Portugal",     flag:"🇵🇹", rank:5  },
  { id:"a6",  name:"Brazil",       flag:"🇧🇷", rank:6  },
  { id:"a7",  name:"Netherlands",  flag:"🇳🇱", rank:7  },
  { id:"a8",  name:"Belgium",      flag:"🇧🇪", rank:8  },
  { id:"a9",  name:"Germany",      flag:"🇩🇪", rank:9  },
  { id:"a10", name:"Croatia",      flag:"🇭🇷", rank:10 },
  { id:"a11", name:"Morocco",      flag:"🇲🇦", rank:11 },
  { id:"a12", name:"Colombia",     flag:"🇨🇴", rank:12 },
  { id:"a13", name:"Senegal",      flag:"🇸🇳", rank:13 },
  { id:"a14", name:"USA",          flag:"🇺🇸", rank:14 },
  { id:"a15", name:"Mexico",       flag:"🇲🇽", rank:15 },
  { id:"a16", name:"Uruguay",      flag:"🇺🇾", rank:16 },
  { id:"a17", name:"Switzerland",  flag:"🇨🇭", rank:17 },
  { id:"a18", name:"Japan",        flag:"🇯🇵", rank:18 },
  { id:"a19", name:"Iran",         flag:"🇮🇷", rank:19 },
  { id:"a20", name:"South Korea",  flag:"🇰🇷", rank:20 },
  { id:"a21", name:"Ecuador",      flag:"🇪🇨", rank:21 },
  { id:"a22", name:"Austria",      flag:"🇦🇹", rank:22 },
  { id:"a23", name:"Turkey",       flag:"🇹🇷", rank:23 },
  { id:"a24", name:"Australia",    flag:"🇦🇺", rank:24 },
];

const GROUP_B = [
  { id:"b1",  name:"Canada",       flag:"🇨🇦", rank:25 },
  { id:"b2",  name:"Norway",       flag:"🇳🇴", rank:26 },
  { id:"b3",  name:"Panama",       flag:"🇵🇦", rank:27 },
  { id:"b4",  name:"Egypt",        flag:"🇪🇬", rank:28 },
  { id:"b5",  name:"Algeria",      flag:"🇩🇿", rank:29 },
  { id:"b6",  name:"Scotland",     flag:"🏴󠁧󠁢󠁳󠁣󠁹󠁿", rank:30 },
  { id:"b7",  name:"Paraguay",     flag:"🇵🇾", rank:31 },
  { id:"b8",  name:"Sweden",       flag:"🇸🇪", rank:32 },
  { id:"b9",  name:"Czechia",      flag:"🇨🇿", rank:33 },
  { id:"b10", name:"Ivory Coast",  flag:"🇨🇮", rank:34 },
  { id:"b11", name:"Tunisia",      flag:"🇹🇳", rank:35 },
  { id:"b12", name:"Bosnia",       flag:"🇧🇦", rank:36 },
  { id:"b13", name:"South Africa", flag:"🇿🇦", rank:37 },
  { id:"b14", name:"Saudi Arabia", flag:"🇸🇦", rank:38 },
  { id:"b15", name:"Qatar",        flag:"🇶🇦", rank:39 },
  { id:"b16", name:"Uzbekistan",   flag:"🇺🇿", rank:40 },
  { id:"b17", name:"Iraq",         flag:"🇮🇶", rank:41 },
  { id:"b18", name:"Jordan",       flag:"🇯🇴", rank:42 },
  { id:"b19", name:"DR Congo",     flag:"🇨🇩", rank:43 },
  { id:"b20", name:"Ghana",        flag:"🇬🇭", rank:44 },
  { id:"b21", name:"Haiti",        flag:"🇭🇹", rank:45 },
  { id:"b22", name:"Curaçao",      flag:"🇨🇼", rank:46 },
  { id:"b23", name:"New Zealand",  flag:"🇳🇿", rank:47 },
  { id:"b24", name:"Cape Verde",   flag:"🇨🇻", rank:48 },
];

const ALL_TEAMS = [...GROUP_A, ...GROUP_B];
const teamByName = (n) => n ? ALL_TEAMS.find(t => t.name.toLowerCase() === n.toLowerCase()) : null;

const GROUP_FIXTURES = [
  { id:"g1",  date:"Jun 11", home:"Mexico",       away:"South Africa",  wc_group:"A", type:"group" },
  { id:"g2",  date:"Jun 11", home:"South Korea",  away:"Czechia",       wc_group:"A", type:"group" },
  { id:"g3",  date:"Jun 18", home:"Czechia",      away:"South Africa",  wc_group:"A", type:"group" },
  { id:"g4",  date:"Jun 18", home:"Mexico",       away:"South Korea",   wc_group:"A", type:"group" },
  { id:"g5",  date:"Jun 25", home:"Czechia",      away:"Mexico",        wc_group:"A", type:"group" },
  { id:"g6",  date:"Jun 25", home:"South Africa", away:"South Korea",   wc_group:"A", type:"group" },
  { id:"g7",  date:"Jun 12", home:"Canada",       away:"Bosnia",        wc_group:"B", type:"group" },
  { id:"g8",  date:"Jun 13", home:"Qatar",        away:"Switzerland",   wc_group:"B", type:"group" },
  { id:"g9",  date:"Jun 18", home:"Switzerland",  away:"Bosnia",        wc_group:"B", type:"group" },
  { id:"g10", date:"Jun 18", home:"Canada",       away:"Qatar",         wc_group:"B", type:"group" },
  { id:"g11", date:"Jun 26", home:"Bosnia",       away:"Qatar",         wc_group:"B", type:"group" },
  { id:"g12", date:"Jun 26", home:"Switzerland",  away:"Canada",        wc_group:"B", type:"group" },
  { id:"g13", date:"Jun 13", home:"Brazil",       away:"Morocco",       wc_group:"C", type:"group" },
  { id:"g14", date:"Jun 13", home:"Haiti",        away:"Scotland",      wc_group:"C", type:"group" },
  { id:"g15", date:"Jun 19", home:"Morocco",      away:"Scotland",      wc_group:"C", type:"group" },
  { id:"g16", date:"Jun 19", home:"Brazil",       away:"Haiti",         wc_group:"C", type:"group" },
  { id:"g17", date:"Jun 26", home:"Scotland",     away:"Brazil",        wc_group:"C", type:"group" },
  { id:"g18", date:"Jun 26", home:"Morocco",      away:"Haiti",         wc_group:"C", type:"group" },
  { id:"g19", date:"Jun 12", home:"USA",          away:"Paraguay",      wc_group:"D", type:"group" },
  { id:"g20", date:"Jun 13", home:"Australia",    away:"Turkey",        wc_group:"D", type:"group" },
  { id:"g21", date:"Jun 19", home:"USA",          away:"Australia",     wc_group:"D", type:"group" },
  { id:"g22", date:"Jun 20", home:"Paraguay",     away:"Turkey",        wc_group:"D", type:"group" },
  { id:"g23", date:"Jun 25", home:"Turkey",       away:"USA",           wc_group:"D", type:"group" },
  { id:"g24", date:"Jun 25", home:"Paraguay",     away:"Australia",     wc_group:"D", type:"group" },
  { id:"g25", date:"Jun 14", home:"Germany",      away:"Curaçao",       wc_group:"E", type:"group" },
  { id:"g26", date:"Jun 14", home:"Ivory Coast",  away:"Ecuador",       wc_group:"E", type:"group" },
  { id:"g27", date:"Jun 20", home:"Germany",      away:"Ivory Coast",   wc_group:"E", type:"group" },
  { id:"g28", date:"Jun 20", home:"Ecuador",      away:"Curaçao",       wc_group:"E", type:"group" },
  { id:"g29", date:"Jun 26", home:"Ecuador",      away:"Germany",       wc_group:"E", type:"group" },
  { id:"g30", date:"Jun 26", home:"Curaçao",      away:"Ivory Coast",   wc_group:"E", type:"group" },
  { id:"g31", date:"Jun 14", home:"Netherlands",  away:"Japan",         wc_group:"F", type:"group" },
  { id:"g32", date:"Jun 14", home:"Sweden",       away:"Tunisia",       wc_group:"F", type:"group" },
  { id:"g33", date:"Jun 20", home:"Japan",        away:"Tunisia",       wc_group:"F", type:"group" },
  { id:"g34", date:"Jun 21", home:"Netherlands",  away:"Sweden",        wc_group:"F", type:"group" },
  { id:"g35", date:"Jun 27", home:"Tunisia",      away:"Netherlands",   wc_group:"F", type:"group" },
  { id:"g36", date:"Jun 27", home:"Sweden",       away:"Japan",         wc_group:"F", type:"group" },
  { id:"g37", date:"Jun 15", home:"Belgium",      away:"Egypt",         wc_group:"G", type:"group" },
  { id:"g38", date:"Jun 15", home:"Iran",         away:"New Zealand",   wc_group:"G", type:"group" },
  { id:"g39", date:"Jun 21", home:"Belgium",      away:"Iran",          wc_group:"G", type:"group" },
  { id:"g40", date:"Jun 21", home:"Egypt",        away:"New Zealand",   wc_group:"G", type:"group" },
  { id:"g41", date:"Jun 27", home:"New Zealand",  away:"Belgium",       wc_group:"G", type:"group" },
  { id:"g42", date:"Jun 27", home:"Iran",         away:"Egypt",         wc_group:"G", type:"group" },
  { id:"g43", date:"Jun 15", home:"Spain",        away:"Cape Verde",    wc_group:"H", type:"group" },
  { id:"g44", date:"Jun 15", home:"Saudi Arabia", away:"Uruguay",       wc_group:"H", type:"group" },
  { id:"g45", date:"Jun 21", home:"Spain",        away:"Saudi Arabia",  wc_group:"H", type:"group" },
  { id:"g46", date:"Jun 22", home:"Uruguay",      away:"Cape Verde",    wc_group:"H", type:"group" },
  { id:"g47", date:"Jun 28", home:"Cape Verde",   away:"Saudi Arabia",  wc_group:"H", type:"group" },
  { id:"g48", date:"Jun 28", home:"Uruguay",      away:"Spain",         wc_group:"H", type:"group" },
  { id:"g49", date:"Jun 16", home:"France",       away:"Senegal",       wc_group:"I", type:"group" },
  { id:"g50", date:"Jun 16", home:"Iraq",         away:"Norway",        wc_group:"I", type:"group" },
  { id:"g51", date:"Jun 22", home:"France",       away:"Iraq",          wc_group:"I", type:"group" },
  { id:"g52", date:"Jun 22", home:"Norway",       away:"Senegal",       wc_group:"I", type:"group" },
  { id:"g53", date:"Jun 28", home:"Senegal",      away:"Iraq",          wc_group:"I", type:"group" },
  { id:"g54", date:"Jun 28", home:"Norway",       away:"France",        wc_group:"I", type:"group" },
  { id:"g55", date:"Jun 16", home:"Argentina",    away:"Algeria",       wc_group:"J", type:"group" },
  { id:"g56", date:"Jun 16", home:"Austria",      away:"Jordan",        wc_group:"J", type:"group" },
  { id:"g57", date:"Jun 22", home:"Argentina",    away:"Austria",       wc_group:"J", type:"group" },
  { id:"g58", date:"Jun 23", home:"Jordan",       away:"Algeria",       wc_group:"J", type:"group" },
  { id:"g59", date:"Jun 29", home:"Algeria",      away:"Austria",       wc_group:"J", type:"group" },
  { id:"g60", date:"Jun 29", home:"Jordan",       away:"Argentina",     wc_group:"J", type:"group" },
  { id:"g61", date:"Jun 17", home:"Portugal",     away:"DR Congo",      wc_group:"K", type:"group" },
  { id:"g62", date:"Jun 17", home:"Uzbekistan",   away:"Colombia",      wc_group:"K", type:"group" },
  { id:"g63", date:"Jun 23", home:"Portugal",     away:"Uzbekistan",    wc_group:"K", type:"group" },
  { id:"g64", date:"Jun 23", home:"Colombia",     away:"DR Congo",      wc_group:"K", type:"group" },
  { id:"g65", date:"Jun 29", home:"Colombia",     away:"Portugal",      wc_group:"K", type:"group" },
  { id:"g66", date:"Jun 29", home:"DR Congo",     away:"Uzbekistan",    wc_group:"K", type:"group" },
  { id:"g67", date:"Jun 17", home:"England",      away:"Croatia",       wc_group:"L", type:"group" },
  { id:"g68", date:"Jun 17", home:"Ghana",        away:"Panama",        wc_group:"L", type:"group" },
  { id:"g69", date:"Jun 23", home:"England",      away:"Ghana",         wc_group:"L", type:"group" },
  { id:"g70", date:"Jun 24", home:"Croatia",      away:"Panama",        wc_group:"L", type:"group" },
  { id:"g71", date:"Jun 29", home:"Panama",       away:"England",       wc_group:"L", type:"group" },
  { id:"g72", date:"Jun 29", home:"Croatia",      away:"Ghana",         wc_group:"L", type:"group" },
];

const KNOCKOUT_FIXTURES_TEMPLATE = [
  { id:"k1",  date:"Jun 28", label:"R32 Match 1",  type:"R32", home:"", away:"" },
  { id:"k2",  date:"Jun 28", label:"R32 Match 2",  type:"R32", home:"", away:"" },
  { id:"k3",  date:"Jun 29", label:"R32 Match 3",  type:"R32", home:"", away:"" },
  { id:"k4",  date:"Jun 29", label:"R32 Match 4",  type:"R32", home:"", away:"" },
  { id:"k5",  date:"Jun 30", label:"R32 Match 5",  type:"R32", home:"", away:"" },
  { id:"k6",  date:"Jun 30", label:"R32 Match 6",  type:"R32", home:"", away:"" },
  { id:"k7",  date:"Jul 1",  label:"R32 Match 7",  type:"R32", home:"", away:"" },
  { id:"k8",  date:"Jul 1",  label:"R32 Match 8",  type:"R32", home:"", away:"" },
  { id:"k9",  date:"Jul 2",  label:"R32 Match 9",  type:"R32", home:"", away:"" },
  { id:"k10", date:"Jul 2",  label:"R32 Match 10", type:"R32", home:"", away:"" },
  { id:"k11", date:"Jul 3",  label:"R32 Match 11", type:"R32", home:"", away:"" },
  { id:"k12", date:"Jul 3",  label:"R32 Match 12", type:"R32", home:"", away:"" },
  { id:"k13", date:"Jul 4",  label:"R32 Match 13", type:"R32", home:"", away:"" },
  { id:"k14", date:"Jul 4",  label:"R32 Match 14", type:"R32", home:"", away:"" },
  { id:"k15", date:"Jul 5",  label:"R32 Match 15", type:"R32", home:"", away:"" },
  { id:"k16", date:"Jul 5",  label:"R32 Match 16", type:"R32", home:"", away:"" },
  { id:"k17", date:"Jul 7",  label:"R16 Match 1",  type:"R16", home:"", away:"" },
  { id:"k18", date:"Jul 7",  label:"R16 Match 2",  type:"R16", home:"", away:"" },
  { id:"k19", date:"Jul 8",  label:"R16 Match 3",  type:"R16", home:"", away:"" },
  { id:"k20", date:"Jul 8",  label:"R16 Match 4",  type:"R16", home:"", away:"" },
  { id:"k21", date:"Jul 9",  label:"R16 Match 5",  type:"R16", home:"", away:"" },
  { id:"k22", date:"Jul 9",  label:"R16 Match 6",  type:"R16", home:"", away:"" },
  { id:"k23", date:"Jul 10", label:"R16 Match 7",  type:"R16", home:"", away:"" },
  { id:"k24", date:"Jul 10", label:"R16 Match 8",  type:"R16", home:"", away:"" },
  { id:"k25", date:"Jul 12", label:"QF Match 1",   type:"QF",  home:"", away:"" },
  { id:"k26", date:"Jul 12", label:"QF Match 2",   type:"QF",  home:"", away:"" },
  { id:"k27", date:"Jul 13", label:"QF Match 3",   type:"QF",  home:"", away:"" },
  { id:"k28", date:"Jul 13", label:"QF Match 4",   type:"QF",  home:"", away:"" },
  { id:"k29", date:"Jul 15", label:"Semi-Final 1", type:"SF",  home:"", away:"" },
  { id:"k30", date:"Jul 15", label:"Semi-Final 2", type:"SF",  home:"", away:"" },
  { id:"k31", date:"Jul 18", label:"3rd Place",    type:"3rd", home:"", away:"" },
  { id:"k32", date:"Jul 19", label:"🏆 Final",     type:"F",   home:"", away:"" },
];

const KNOCKOUT_PTS = { R32:4, R16:6, QF:8, SF:10, "3rd":0, F:15 };
const STORAGE_KEY  = "wc2026-sweepstakes-v2";
const WHEEL_COLORS = ["#1B4F8A","#C9A84C","#1a6b3a","#8B1A1A","#4A4A7A","#7A4A1A","#1A6B6B","#6B1A4A","#3A6B1A","#6B4A1A","#1A3A6B","#6B1A1A","#4A1A6B","#1A6B4A","#6B6B1A","#1A4A6B","#6B3A1A","#1A1A6B","#4A6B1A","#6B1A6B","#1A6B1A","#6B4A4A","#4A4A1A","#1A4A4A"];

const BLANK = () => ({
  phase:"setup",
  playerNames:Array(24).fill(""),
  draftOrder:[],
  players:[],
  remainingA:[...GROUP_A],
  remainingB:[...GROUP_B],
  currentPickIdx:0,
  fixtureResults:{},
  knockoutFixtures:KNOCKOUT_FIXTURES_TEMPLATE.map(f=>({...f})),
});

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (!s.knockoutFixtures) s.knockoutFixtures = KNOCKOUT_FIXTURES_TEMPLATE.map(f=>({...f}));
      if (!s.fixtureResults)   s.fixtureResults = {};
      return s;
    }
  } catch {}
  return BLANK();
}

function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); return true; }
  catch { return false; }
}

function calcPoints(player, fixtureResults, knockoutFixtures) {
  if (!player.teamA || !player.teamB) return 0;
  let total = 0;
  const tA = player.teamA.name, tB = player.teamB.name;
  const allFix = [...GROUP_FIXTURES, ...knockoutFixtures];
  Object.entries(fixtureResults).forEach(([fid, res]) => {
    const fix = allFix.find(f => f.id === fid);
    if (!fix || !res) return;
    if (fix.type === "group") {
      const { homeGoals: h, awayGoals: a } = res;
      [tA, tB].forEach(name => {
        const isB = !!GROUP_B.find(t => t.name === name);
        const mult = isB ? 2 : 1;
        const isHome = fix.home === name, isAway = fix.away === name;
        if (!isHome && !isAway) return;
        if (h === a) { total += 1 * mult; return; }
        if ((isHome && h > a) || (isAway && a > h)) total += 3 * mult;
      });
    } else {
      const pts = KNOCKOUT_PTS[fix.type] || 0;
      if (res.winner === tA || res.winner === tB) total += pts;
    }
  });
  return total;
}

// ── WHEEL ────────────────────────────────────────────────────────────────────
function SpinWheel({ teams, onResult, group }) {
  const canvasRef = useRef(null);
  const spinRef   = useRef({ angle:0, velocity:0, spinning:false });
  const [spinning, setSpinning]         = useState(false);
  const [justAssigned, setJustAssigned] = useState(null);

  const draw = useCallback((angle) => {
    const canvas = canvasRef.current;
    if (!canvas || !teams.length) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height, cx = W/2, cy = H/2;
    const r = Math.min(cx, cy) - 8;
    const slice = (2 * Math.PI) / teams.length;
    ctx.clearRect(0, 0, W, H);
    const grd = ctx.createRadialGradient(cx,cy,r*.7,cx,cy,r+8);
    grd.addColorStop(0,"transparent");
    grd.addColorStop(1, group==="A"?"rgba(91,155,213,0.3)":"rgba(213,91,91,0.3)");
    ctx.fillStyle=grd; ctx.beginPath(); ctx.arc(cx,cy,r+8,0,2*Math.PI); ctx.fill();
    teams.forEach((team,i) => {
      const s=angle+i*slice, e=s+slice;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,s,e); ctx.closePath();
      ctx.fillStyle=WHEEL_COLORS[i%WHEEL_COLORS.length]; ctx.fill();
      ctx.strokeStyle="rgba(0,0,0,0.5)"; ctx.lineWidth=1.5; ctx.stroke();
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(s+slice/2); ctx.textAlign="right";
      const fs=teams.length>16?9:teams.length>8?11:13;
      ctx.font=`bold ${fs}px 'DM Sans',sans-serif`; ctx.fillStyle="#fff";
      ctx.shadowColor="rgba(0,0,0,0.8)"; ctx.shadowBlur=4;
      ctx.fillText(`${team.flag} ${team.name}`,r-10,4); ctx.restore();
    });
    ctx.beginPath(); ctx.arc(cx,cy,22,0,2*Math.PI); ctx.fillStyle="#111"; ctx.fill();
    ctx.strokeStyle="#C9A84C"; ctx.lineWidth=3; ctx.stroke();
    ctx.fillStyle="#C9A84C"; ctx.font="bold 14px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("⚽",cx,cy); ctx.shadowBlur=0;
    ctx.beginPath(); ctx.moveTo(W-2,cy); ctx.lineTo(W-22,cy-12); ctx.lineTo(W-22,cy+12); ctx.closePath();
    ctx.fillStyle="#C9A84C"; ctx.shadowColor="#C9A84C"; ctx.shadowBlur=8; ctx.fill(); ctx.shadowBlur=0;
  }, [teams, group]);

  useEffect(() => { setJustAssigned(null); draw(spinRef.current.angle); }, [draw, teams]);

  const spin = () => {
    if (spinning || !teams.length) return;
    setJustAssigned(null);
    spinRef.current.velocity = 25 + Math.random()*15;
    setSpinning(true);
    const go = () => {
      const s = spinRef.current;
      s.angle += s.velocity * 0.016; s.velocity *= 0.985;
      draw(s.angle);
      if (s.velocity > 0.1) { requestAnimationFrame(go); }
      else {
        setSpinning(false);
        const slice=(2*Math.PI)/teams.length;
        const norm=((-s.angle)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);
        const winner=teams[Math.floor(norm/slice)%teams.length];
        setJustAssigned(winner);
        setTimeout(()=>onResult(winner),1800);
      }
    };
    requestAnimationFrame(go);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      <canvas ref={canvasRef} width={360} height={360}
        style={{borderRadius:"50%",cursor:spinning?"not-allowed":"pointer",display:"block"}} onClick={spin}/>
      {justAssigned ? (
        <div style={{background:"linear-gradient(135deg,#1a1400,#222)",border:"2px solid #C9A84C",borderRadius:12,padding:"14px 32px",textAlign:"center",animation:"popIn .4s cubic-bezier(.34,1.56,.64,1)"}}>
          <div style={{fontSize:40}}>{justAssigned.flag}</div>
          <div style={{fontSize:22,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,color:"#C9A84C"}}>{justAssigned.name}</div>
          <div style={{fontSize:12,color:"#888",marginTop:4}}>Assigning automatically…</div>
        </div>
      ) : (
        <button onClick={spin} disabled={spinning||!teams.length}
          style={{padding:"12px 36px",background:spinning?"#333":"linear-gradient(135deg,#C9A84C,#e8c46a)",color:"#111",border:"none",borderRadius:8,fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:2,cursor:spinning?"not-allowed":"pointer",boxShadow:spinning?"none":"0 4px 20px rgba(201,168,76,0.4)"}}>
          {spinning?"SPINNING…":"SPIN THE WHEEL"}
        </button>
      )}
    </div>
  );
}

// ── FIXTURE MODAL ─────────────────────────────────────────────────────────────
function FixtureModal({ fixture, existing, onSave, onClear, onClose }) {
  const isGroup = fixture.type === "group";
  const [homeG, setHomeG]   = useState(existing?.homeGoals ?? "");
  const [awayG, setAwayG]   = useState(existing?.awayGoals ?? "");
  const [winner, setWinner] = useState(existing?.winner ?? "");
  const [homeText, setHomeText] = useState(fixture.home || "");
  const [awayText, setAwayText] = useState(fixture.away || "");
  const homeT = teamByName(fixture.home);
  const awayT = teamByName(fixture.away);

  const save = () => {
    if (isGroup) {
      const h=parseInt(homeG), a=parseInt(awayG);
      if (isNaN(h)||isNaN(a)||h<0||a<0) return;
      onSave({ homeGoals:h, awayGoals:a });
    } else {
      if (!winner) return;
      onSave({ winner, homeOverride:homeText, awayOverride:awayText });
    }
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:"#111",border:"1px solid #333",borderRadius:16,padding:28,width:400,maxWidth:"95vw"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"#C9A84C",letterSpacing:2}}>{fixture.label||`Group ${fixture.wc_group}`}</div>
            <div style={{color:"#666",fontSize:12}}>{fixture.date}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#666",fontSize:22,cursor:"pointer"}}>✕</button>
        </div>

        {isGroup ? (
          <div style={{marginBottom:20}}>
            <div style={{display:"flex",gap:12,alignItems:"center",justifyContent:"center"}}>
              <div style={{textAlign:"center",flex:1}}>
                <div style={{fontSize:28,marginBottom:4}}>{homeT?.flag||"🏴"}</div>
                <div style={{fontSize:12,color:"#aaa",marginBottom:8}}>{fixture.home}</div>
                <input type="number" min="0" max="20" value={homeG} onChange={e=>setHomeG(e.target.value)}
                  style={{width:64,padding:"10px 4px",background:"#1a1a1a",border:"1px solid #444",color:"#fff",borderRadius:6,textAlign:"center",fontSize:28,fontWeight:700}}/>
              </div>
              <div style={{color:"#444",fontFamily:"'Bebas Neue',sans-serif",fontSize:22}}>VS</div>
              <div style={{textAlign:"center",flex:1}}>
                <div style={{fontSize:28,marginBottom:4}}>{awayT?.flag||"🏴"}</div>
                <div style={{fontSize:12,color:"#aaa",marginBottom:8}}>{fixture.away}</div>
                <input type="number" min="0" max="20" value={awayG} onChange={e=>setAwayG(e.target.value)}
                  style={{width:64,padding:"10px 4px",background:"#1a1a1a",border:"1px solid #444",color:"#fff",borderRadius:6,textAlign:"center",fontSize:28,fontWeight:700}}/>
              </div>
            </div>
            {homeG!==""&&awayG!==""&&(
              <div style={{textAlign:"center",marginTop:12,fontSize:13,color:"#888"}}>
                {parseInt(homeG)>parseInt(awayG)?`${fixture.home} win`:parseInt(awayG)>parseInt(homeG)?`${fixture.away} win`:"Draw"}
              </div>
            )}
          </div>
        ) : (
          <div style={{marginBottom:20}}>
            <div style={{color:"#888",fontSize:12,marginBottom:8}}>Enter team names if not set:</div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <input value={homeText} onChange={e=>setHomeText(e.target.value)} placeholder="Home team"
                style={{flex:1,padding:"7px 10px",background:"#1a1a1a",border:"1px solid #333",color:"#fff",borderRadius:6,fontSize:13}}/>
              <input value={awayText} onChange={e=>setAwayText(e.target.value)} placeholder="Away team"
                style={{flex:1,padding:"7px 10px",background:"#1a1a1a",border:"1px solid #333",color:"#fff",borderRadius:6,fontSize:13}}/>
            </div>
            <div style={{color:"#888",fontSize:12,marginBottom:8}}>Winner (after ET/pens if needed):</div>
            <div style={{display:"flex",gap:8}}>
              {[homeText||"Home",awayText||"Away"].filter(Boolean).map(t=>(
                <button key={t} onClick={()=>setWinner(t)}
                  style={{flex:1,padding:"10px",borderRadius:8,border:winner===t?"2px solid #C9A84C":"1px solid #333",background:winner===t?"#1a1400":"#1a1a1a",color:winner===t?"#C9A84C":"#aaa",cursor:"pointer",fontSize:13,fontWeight:winner===t?700:400}}>
                  {teamByName(t)?.flag||"🏴"} {t}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{display:"flex",gap:8}}>
          {existing&&<button onClick={onClear} style={{padding:"10px 16px",background:"#1a0a0a",border:"1px solid #8B1A1A",color:"#d55b5b",borderRadius:8,cursor:"pointer",fontSize:13}}>Clear</button>}
          <button onClick={save} style={{flex:1,padding:"10px",background:"linear-gradient(135deg,#C9A84C,#e8c46a)",color:"#111",border:"none",borderRadius:8,fontWeight:700,cursor:"pointer",fontSize:14}}>
            Save Result ✓
          </button>
        </div>
      </div>
    </div>
  );
}

// ── RESET MODAL ───────────────────────────────────────────────────────────────
function ResetModal({ onConfirm, onCancel }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000}}>
      <div style={{background:"#111",border:"1px solid #8B1A1A",borderRadius:16,padding:32,width:360,textAlign:"center"}}>
        <div style={{fontSize:36,marginBottom:12}}>⚠️</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:"#d55b5b",letterSpacing:2,marginBottom:8}}>RESET EVERYTHING?</div>
        <div style={{color:"#888",fontSize:13,marginBottom:24}}>All players, teams and scores will be wiped. Cannot be undone.</div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={onCancel} style={{flex:1,padding:"10px",background:"#1a1a1a",color:"#aaa",border:"1px solid #333",borderRadius:8,cursor:"pointer"}}>Cancel</button>
          <button onClick={onConfirm} style={{flex:1,padding:"10px",background:"#8B1A1A",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700}}>Yes, Reset</button>
        </div>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [state, setState]           = useState(() => loadState());
  const [activeTab, setActiveTab]   = useState("leaderboard");
  const [showReset, setShowReset]   = useState(false);
  const [saveFlash, setSaveFlash]   = useState("");
  const [fixModal, setFixModal]     = useState(null);
  const [fixFilter, setFixFilter]   = useState("all");
  const [grpFilter, setGrpFilter]   = useState("all");

  // Auto-save on every state change
  useEffect(() => {
    const ok = saveState(state);
    setSaveFlash(ok ? "saved" : "error");
    const t = setTimeout(() => setSaveFlash(""), 2000);
    return () => clearTimeout(t);
  }, [state]);

  const update = patch => setState(prev => ({ ...prev, ...patch }));

  const { phase, playerNames, draftOrder, players, remainingA, remainingB,
          currentPickIdx, fixtureResults, knockoutFixtures } = state;

  const snakeA = draftOrder;
  const snakeB = [...draftOrder].reverse();
  const isPhaseA = phase === "wheelA";
  const pickOrder = isPhaseA ? snakeA : snakeB;
  const currentPlayer = pickOrder[currentPickIdx];
  const remaining = isPhaseA ? remainingA : remainingB;

  const doReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(BLANK());
    setShowReset(false);
  };

  const generateDraft = () => {
    const names = playerNames.map((n,i)=>n.trim()||`Player ${i+1}`);
    const shuffled = [...names].sort(()=>Math.random()-.5);
    update({ draftOrder:shuffled, players:shuffled.map((name,i)=>({id:i,name,teamA:null,teamB:null})),
      phase:"draft", remainingA:[...GROUP_A], remainingB:[...GROUP_B], currentPickIdx:0,
      fixtureResults:{}, knockoutFixtures:KNOCKOUT_FIXTURES_TEMPLATE.map(f=>({...f})) });
  };

  const handlePick = (team) => {
    const key = isPhaseA ? "teamA" : "teamB";
    const updatedPlayers = players.map(p => p.name===currentPlayer ? {...p,[key]:team} : p);
    const next = currentPickIdx + 1;
    const patch = { players:updatedPlayers,
      [isPhaseA?"remainingA":"remainingB"]: (isPhaseA?remainingA:remainingB).filter(t=>t.id!==team.id) };
    if (next < pickOrder.length) { patch.currentPickIdx = next; }
    else if (isPhaseA) { patch.phase="wheelB"; patch.currentPickIdx=0; }
    else { patch.phase="leaderboard"; }
    update(patch);
  };

  const saveResult = (fid, result) => {
    const { homeOverride, awayOverride, ...res } = result;
    const newKO = homeOverride !== undefined
      ? knockoutFixtures.map(f => f.id===fid ? {...f,home:homeOverride||f.home,away:awayOverride||f.away} : f)
      : knockoutFixtures;
    update({ fixtureResults:{...fixtureResults,[fid]:res}, knockoutFixtures:newKO });
    setFixModal(null);
  };

  const clearResult = (fid) => {
    const r = {...fixtureResults}; delete r[fid];
    update({ fixtureResults:r });
    setFixModal(null);
  };

  const allFixtures = [...GROUP_FIXTURES, ...knockoutFixtures];
  const sortedPlayers = [...players].sort((a,b) => calcPoints(b,fixtureResults,knockoutFixtures)-calcPoints(a,fixtureResults,knockoutFixtures));
  const played = Object.keys(fixtureResults).length;

  const getFiltered = () => {
    let list = allFixtures;
    if (fixFilter==="group")    list = list.filter(f=>f.type==="group");
    if (fixFilter==="knockout") list = list.filter(f=>f.type!=="group");
    if (fixFilter==="played")   list = list.filter(f=>fixtureResults[f.id]);
    if (fixFilter==="unplayed") list = list.filter(f=>!fixtureResults[f.id]);
    if (grpFilter!=="all")      list = list.filter(f=>f.wc_group===grpFilter||f.type!=="group");
    return list;
  };

  const accentColor = isPhaseA ? "#5b9bd5" : "#d55b5b";

  const NavBar = ({ title, tabs }) => (
    <div style={{background:"#111",borderBottom:"2px solid #C9A84C",padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100,flexWrap:"wrap",gap:8}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"#C9A84C",letterSpacing:2}}>⚽ {title}</div>
      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
        {tabs?.map(tab=>(
          <button key={tab} onClick={()=>setActiveTab(tab)}
            style={{padding:"5px 12px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:activeTab===tab?"#C9A84C":"#1a1a1a",color:activeTab===tab?"#111":"#888"}}>
            {tab[0].toUpperCase()+tab.slice(1)}
          </button>
        ))}
        {saveFlash==="saved" && <span style={{color:"#3a3",fontSize:11}}>✓ Saved</span>}
        {saveFlash==="error" && <span style={{color:"#a33",fontSize:11}}>Save failed</span>}
        <button onClick={()=>setShowReset(true)}
          style={{padding:"5px 12px",background:"#1a0a0a",border:"1px solid #8B1A1A",color:"#d55b5b",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:600}}>⟳ Reset</button>
      </div>
    </div>
  );

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;600;700&display=swap');
    *{box-sizing:border-box} body{margin:0}
    @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes popIn{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}
    ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#333;border-radius:4px}
    input::placeholder{color:#444} input[type=number]::-webkit-inner-spin-button{opacity:1}
  `;

  // ── SETUP ──
  if (phase==="setup") return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#fff",fontFamily:"'DM Sans',sans-serif",padding:24}}>
      <style>{css}</style>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:48,color:"#C9A84C",letterSpacing:4}}>⚽ WC 2026</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:3}}>SWEEPSTAKES DRAFT</div>
          <div style={{color:"#666",fontSize:13,marginTop:4}}>Enter all 24 player names to begin</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
          {playerNames.map((name,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{color:"#444",fontSize:12,width:20,textAlign:"right"}}>{i+1}</span>
              <input value={name} placeholder={`Player ${i+1}`}
                onChange={e=>{const a=[...playerNames];a[i]=e.target.value;update({playerNames:a});}}
                style={{flex:1,padding:"9px 12px",background:"#161616",border:"1px solid #2a2a2a",borderRadius:8,color:"#fff",fontSize:13,outline:"none"}}
                onFocus={e=>e.target.style.border="1px solid #C9A84C"}
                onBlur={e=>e.target.style.border="1px solid #2a2a2a"}/>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={generateDraft} style={{flex:1,padding:16,background:"linear-gradient(135deg,#C9A84C,#e8c46a)",color:"#111",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:3,cursor:"pointer",boxShadow:"0 4px 24px rgba(201,168,76,0.4)"}}>
            RANDOMISE DRAFT ORDER →
          </button>
          <button onClick={()=>setShowReset(true)} style={{padding:"16px 20px",background:"#1a0a0a",border:"1px solid #8B1A1A",color:"#d55b5b",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600}}>⟳ Reset</button>
        </div>
      </div>
      {showReset&&<ResetModal onConfirm={doReset} onCancel={()=>setShowReset(false)}/>}
    </div>
  );

  // ── DRAFT ORDER ──
  if (phase==="draft") return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#fff",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{css}</style>
      <NavBar title="WC 2026 SWEEPSTAKES"/>
      <div style={{maxWidth:800,margin:"0 auto",padding:24}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:"#C9A84C",letterSpacing:3}}>SNAKE DRAFT ORDER</div>
          <div style={{color:"#888",fontSize:13}}>Group A: left → right · Group B: right → left</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:28}}>
          {[{list:snakeA,color:"#5b9bd5",label:"🔵 GROUP A"},{list:snakeB,color:"#d55b5b",label:"🔴 GROUP B"}].map(({list,color,label})=>(
            <div key={label}>
              <div style={{color,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,marginBottom:10}}>{label}</div>
              {list.map((name,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"8px 12px",background:i%2?"#0d0d0d":"#111",borderRadius:6,marginBottom:4,animation:`fadeIn .3s ${i*.04}s both`}}>
                  <span style={{color,fontWeight:700,width:24,fontSize:13}}>{i+1}</span>
                  <span style={{fontSize:14}}>{name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={()=>update({phase:"wheelA",currentPickIdx:0})} style={{width:"100%",padding:16,background:"linear-gradient(135deg,#C9A84C,#e8c46a)",color:"#111",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:3,cursor:"pointer",boxShadow:"0 4px 24px rgba(201,168,76,0.4)"}}>
          START THE DRAW → SPIN THE WHEEL
        </button>
      </div>
      {showReset&&<ResetModal onConfirm={doReset} onCancel={()=>setShowReset(false)}/>}
    </div>
  );

  // ── WHEEL ──
  if (phase==="wheelA"||phase==="wheelB") return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#fff",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{css}</style>
      <NavBar title={isPhaseA?"GROUP A DRAW":"GROUP B DRAW"}/>
      <div style={{maxWidth:900,margin:"0 auto",padding:24}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:accentColor,letterSpacing:4,marginBottom:4}}>
            {isPhaseA?"GROUP A":"GROUP B"} · PICK {currentPickIdx+1} OF {pickOrder.length}
          </div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,letterSpacing:2}}>
            NOW PICKING: <span style={{color:accentColor}}>{currentPlayer}</span>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 380px",gap:24,alignItems:"start"}}>
          <div>
            <div style={{color:"#666",fontSize:11,letterSpacing:2,marginBottom:10,textTransform:"uppercase"}}>Pick Order</div>
            <div style={{maxHeight:380,overflowY:"auto"}}>
              {pickOrder.map((name,i)=>{
                const p=players.find(x=>x.name===name);
                const assigned=isPhaseA?p?.teamA:p?.teamB;
                const isCur=i===currentPickIdx, isPast=i<currentPickIdx;
                return (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 12px",background:isCur?`${accentColor}22`:"#0d0d0d",border:isCur?`1px solid ${accentColor}`:"1px solid transparent",borderRadius:8,marginBottom:4,opacity:isPast?.5:1}}>
                    <span style={{color:isCur?accentColor:"#444",fontWeight:700,width:22,fontSize:12}}>{i+1}</span>
                    <span style={{flex:1,fontSize:13,color:isCur?"#fff":"#aaa"}}>{name}</span>
                    {assigned&&<span style={{fontSize:13}}>{assigned.flag} {assigned.name}</span>}
                    {isCur&&!assigned&&<span style={{fontSize:11,color:accentColor,fontWeight:700}}>← PICKING</span>}
                  </div>
                );
              })}
            </div>
            <div style={{marginTop:16}}>
              <div style={{color:"#666",fontSize:11,letterSpacing:2,marginBottom:8,textTransform:"uppercase"}}>Remaining: {remaining.length}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {(isPhaseA?GROUP_A:GROUP_B).map(t=>{
                  const taken=!remaining.find(r=>r.id===t.id);
                  return <span key={t.id} style={{fontSize:11,padding:"3px 8px",borderRadius:12,background:taken?"#1a1a1a":"#222",color:taken?"#444":"#aaa",textDecoration:taken?"line-through":"none"}}>{t.flag} {t.name}</span>;
                })}
              </div>
            </div>
          </div>
          <SpinWheel key={`${phase}-${currentPickIdx}`} teams={remaining} onResult={handlePick} group={isPhaseA?"A":"B"}/>
        </div>
      </div>
      {showReset&&<ResetModal onConfirm={doReset} onCancel={()=>setShowReset(false)}/>}
    </div>
  );

  // ── LEADERBOARD / FIXTURES / TEAMS ──
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#fff",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{css}</style>
      <NavBar title="WC 2026 SWEEPSTAKES" tabs={["leaderboard","fixtures","teams"]}/>
      <div style={{padding:20,maxWidth:1000,margin:"0 auto"}}>

        {/* LEADERBOARD */}
        {activeTab==="leaderboard"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:2,color:"#C9A84C"}}>🏆 LIVE LEADERBOARD</div>
              <div style={{color:"#666",fontSize:12}}>{played}/{allFixtures.length} fixtures played</div>
            </div>
            {sortedPlayers.map((p,i)=>{
              const pts=calcPoints(p,fixtureResults,knockoutFixtures);
              const medal=i===0?"🥇":i===1?"🥈":i===2?"🥉":null;
              let gA=0,gB=0,koA=0,koB=0;
              Object.entries(fixtureResults).forEach(([fid,res])=>{
                const fix=allFixtures.find(f=>f.id===fid);
                if(!fix||!res) return;
                if(fix.type==="group"){
                  [[p.teamA?.name,false],[p.teamB?.name,true]].forEach(([name,isB])=>{
                    if(!name) return;
                    const mult=isB?2:1;
                    const isHome=fix.home===name,isAway=fix.away===name;
                    if(!isHome&&!isAway) return;
                    const {homeGoals:h,awayGoals:a}=res;
                    const score=h===a?1*mult:((isHome&&h>a)||(isAway&&a>h))?3*mult:0;
                    if(isB) gB+=score; else gA+=score;
                  });
                } else {
                  const kp=KNOCKOUT_PTS[fix.type]||0;
                  if(p.teamA&&res.winner===p.teamA.name) koA+=kp;
                  if(p.teamB&&res.winner===p.teamB.name) koB+=kp;
                }
              });
              return (
                <div key={p.id} style={{background:i===0?"linear-gradient(135deg,#1a1400,#151500)":"#111",border:i===0?"1px solid #C9A84C":"1px solid #1e1e1e",borderRadius:12,padding:"14px 18px",marginBottom:8,display:"grid",gridTemplateColumns:"36px 1fr auto",alignItems:"center",gap:12,animation:`fadeIn .3s ${i*.03}s both`}}>
                  <div style={{fontSize:20,textAlign:"center"}}>{medal||<span style={{color:"#444",fontWeight:700,fontSize:14}}>#{i+1}</span>}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:15}}>{p.name}</div>
                    <div style={{fontSize:12,display:"flex",gap:10,marginTop:3}}>
                      <span style={{color:"#5b9bd5"}}>{p.teamA?.flag} {p.teamA?.name||"—"}</span>
                      <span style={{color:"#d55b5b"}}>{p.teamB?.flag} {p.teamB?.name||"—"}</span>
                    </div>
                    <div style={{fontSize:11,color:"#555",marginTop:4,display:"flex",gap:10}}>
                      <span>A-grp:{gA}</span><span>B-grp:{gB}</span><span>A-KO:{koA}</span><span>B-KO:{koB}</span>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:i===0?"#C9A84C":"#fff"}}>{pts}</div>
                    <div style={{fontSize:10,color:"#555"}}>PTS</div>
                  </div>
                </div>
              );
            })}
            <div style={{color:"#444",fontSize:12,textAlign:"center",marginTop:12}}>Enter results in the Fixtures tab to update scores</div>
          </div>
        )}

        {/* FIXTURES */}
        {activeTab==="fixtures"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:2,color:"#C9A84C"}}>⚽ FIXTURES</div>
              <div style={{color:"#888",fontSize:12}}>{played} of {allFixtures.length} played</div>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
              {["all","group","knockout","played","unplayed"].map(f=>(
                <button key={f} onClick={()=>setFixFilter(f)} style={{padding:"4px 12px",borderRadius:14,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:fixFilter===f?"#C9A84C":"#1a1a1a",color:fixFilter===f?"#111":"#666"}}>
                  {f[0].toUpperCase()+f.slice(1)}
                </button>
              ))}
              <div style={{width:1,background:"#222",margin:"0 4px"}}/>
              {["all","A","B","C","D","E","F","G","H","I","J","K","L"].map(g=>(
                <button key={g} onClick={()=>setGrpFilter(g)} style={{padding:"4px 10px",borderRadius:14,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:grpFilter===g?"#5b9bd5":"#1a1a1a",color:grpFilter===g?"#fff":"#666"}}>
                  {g==="all"?"All":g}
                </button>
              ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {getFiltered().map(fix=>{
                const res=fixtureResults[fix.id];
                const isGrp=fix.type==="group", hasRes=!!res;
                const hT=teamByName(fix.home), aT=teamByName(fix.away);
                const resultStr=hasRes?(isGrp?`${res.homeGoals} – ${res.awayGoals}`:`✓ ${res.winner}`):"";
                return (
                  <div key={fix.id} onClick={()=>setFixModal(fix)}
                    style={{display:"grid",gridTemplateColumns:"80px 1fr auto 1fr 100px",alignItems:"center",gap:8,padding:"10px 14px",background:hasRes?"#0d1a0d":"#111",border:hasRes?"1px solid #1a3a1a":"1px solid #1e1e1e",borderRadius:10,cursor:"pointer",transition:"border-color .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="#C9A84C"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor=hasRes?"#1a3a1a":"#1e1e1e"}>
                    <div style={{fontSize:11,color:"#555"}}>{fix.date}{fix.wc_group?` G${fix.wc_group}`:""}</div>
                    <div style={{textAlign:"right",fontSize:13,color:"#ddd"}}>{hT?.flag||""} {fix.home||"TBD"}</div>
                    <div style={{textAlign:"center",minWidth:64}}>
                      {hasRes
                        ? <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:isGrp?18:12,color:"#C9A84C",letterSpacing:1}}>{resultStr}</span>
                        : <span style={{fontSize:11,color:"#444",border:"1px solid #2a2a2a",borderRadius:4,padding:"2px 8px"}}>Enter</span>}
                    </div>
                    <div style={{textAlign:"left",fontSize:13,color:"#ddd"}}>{aT?.flag||""} {fix.away||"TBD"}</div>
                    <div style={{textAlign:"right",fontSize:11,color:"#555"}}>{fix.label||`Grp ${fix.wc_group}`}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TEAMS */}
        {activeTab==="teams"&&(
          <div>
            <div style={{marginBottom:20,fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:2,color:"#C9A84C"}}>TEAM ASSIGNMENTS</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {players.map(p=>(
                <div key={p.id} style={{background:"#111",border:"1px solid #1e1e1e",borderRadius:10,padding:"12px 16px"}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>{p.name}</div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    <div style={{background:"#0d1f3c",borderRadius:6,padding:"4px 10px",fontSize:13,color:"#5b9bd5"}}>{p.teamA?.flag} {p.teamA?.name||"—"}</div>
                    <div style={{background:"#2a0d0d",borderRadius:6,padding:"4px 10px",fontSize:13,color:"#d55b5b"}}>{p.teamB?.flag} {p.teamB?.name||"—"}</div>
                  </div>
                  <div style={{fontSize:13,color:"#C9A84C",fontWeight:700,marginTop:6}}>{calcPoints(p,fixtureResults,knockoutFixtures)} pts</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {fixModal&&(
        <FixtureModal fixture={fixModal} existing={fixtureResults[fixModal.id]}
          onSave={res=>saveResult(fixModal.id,res)}
          onClear={()=>clearResult(fixModal.id)}
          onClose={()=>setFixModal(null)}/>
      )}
      {showReset&&<ResetModal onConfirm={doReset} onCancel={()=>setShowReset(false)}/>}
    </div>
  );
}
