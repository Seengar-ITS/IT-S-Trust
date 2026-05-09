import React,{useEffect,useState}from'react';import{supabase}from'../lib/supabase.js';import{requireAuth,getUser}from'../lib/auth.js';import*as S from'../styles.js';
export default function Home(){
  const[profile,setProfile]=useState(null);const[reviews,setReviews]=useState([]);
  useEffect(()=>{
    requireAuth(window.location.href);
    const u=getUser();if(!u)return;
    supabase.from('trust_profiles').select('*').eq('user_id',u.sub).single().then(async({data})=>{
      if(data){setProfile(data);}else{const{data:np}=await supabase.from('trust_profiles').insert({user_id:u.sub,score:50,level:'new',verified:false}).select().single();setProfile(np);}
    });
    supabase.from('trust_reviews').select('*').eq('reviewed_id',u.sub).order('created_at',{ascending:false}).limit(5).then(({data})=>setReviews(data||[]));
  },[]);
  const scoreColor=s=>s>=80?'#22c55e':s>=50?'#f59e0b':'#dc2626';
  return React.createElement('div',{style:S.page},React.createElement('h1',{style:S.h1},'IT-S Trust'),
    profile&&React.createElement('div',{style:{...S.card,textAlign:'center',padding:'2rem'}},
      React.createElement('div',{style:{fontSize:'3rem',fontWeight:700,color:scoreColor(profile.score)}},profile.score),
      React.createElement('p',{style:{color:'#e2e8f0',fontWeight:600,marginTop:'0.5rem'}},profile.level.toUpperCase()),
      React.createElement('p',{style:S.muted},profile.verified?'✓ Verified':'Not verified yet')
    ),
    reviews.length>0&&React.createElement('div',null,React.createElement('h2',{style:S.h2},'Recent Reviews'),reviews.map(r=>React.createElement('div',{key:r.id,style:S.card},React.createElement('div',{style:{display:'flex',gap:'0.5rem',marginBottom:'0.3rem'}},'⭐'.repeat(r.rating)),React.createElement('p',null,r.comment||'—'),React.createElement('p',{style:S.muted},r.service||'General'))))
  );
}