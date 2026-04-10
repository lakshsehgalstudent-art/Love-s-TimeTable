const data = {

  mon: [
    {time:"14:05", display:"2:05 PM", subject:"GE II", room:"T321", teacher:"DT"},
    {time:"15:05", display:"3:05 PM", subject:"EVS", room:"216", teacher:"-"}
  ],

  tue: [
    {time:"09:45", display:"9:45 AM", subject:"HRM Tutorial", room:"G1", teacher:"SC"},
    {time:"10:45", display:"10:45 AM", subject:"HRM", room:"G2", teacher:"SB"},
    {time:"14:05", display:"2:05 PM", subject:"DSC 2.1", room:"202", teacher:"DM"},
    {time:"15:05", display:"3:05 PM", subject:"DSC 2.2", room:"202", teacher:"SB"}
  ],

  wed: [
    {time:"08:45", display:"8:45 AM", subject:"GE II", room:"T321", teacher:"DT"},
    {time:"09:45", display:"9:45 AM", subject:"DSC 2.3", room:"202", teacher:"SB"},
    {time:"10:45", display:"10:45 AM", subject:"DSC 2.2", room:"219", teacher:"SB"},
    {time:"11:45", display:"11:45 AM", subject:"HRM Tutorial", room:"205", teacher:"SB"},
    {time:"14:05", display:"2:05 PM", subject:"HRM Tutorial", room:"X7", teacher:"SC"}
  ],

  thu: [
    {time:"08:45", display:"8:45 AM", subject:"AEC", room:"202", teacher:"EVS"},
    {time:"09:45", display:"9:45 AM", subject:"DSC 2.3", room:"202", teacher:"SC"},
    {time:"10:45", display:"10:45 AM", subject:"Tutorial", room:"CR-307", teacher:"-"},
    {time:"11:45", display:"11:45 AM", subject:"Tutorial", room:"207", teacher:"-"}
  ],

  fri: [
    {time:"08:45", display:"8:45 AM", subject:"DSC 2.1", room:"201", teacher:"DM"},
    {time:"09:45", display:"9:45 AM", subject:"Break", room:"-", teacher:"-"},
    {time:"10:45", display:"10:45 AM", subject:"Tutorial", room:"SB-205", teacher:"-"},
    {time:"11:45", display:"11:45 AM", subject:"DSC 2.2", room:"321", teacher:"SB"},
    {time:"14:05", display:"2:05 PM", subject:"GE II", room:"T301", teacher:"DT"},
    {time:"15:05", display:"3:05 PM", subject:"GE (ANG)", room:"-", teacher:"ANG"}
  ],

  sat: [
    {time:"10:00", display:"Morning", subject:"SEC", room:"-", teacher:"-"},
    {time:"12:00", display:"Midday", subject:"VAC", room:"-", teacher:"-"},
    {time:"15:00", display:"Afternoon", subject:"AEC", room:"-", teacher:"-"}
  ]

};

/* ---------- TIME HELPERS ---------- */

function toMinutes(t) {
  const [h,m] = t.split(":").map(Number);
  return h*60 + m;
}

function getNow() {
  const d = new Date();
  return d.getHours()*60 + d.getMinutes();
}

function getToday() {
  const days = ["sun","mon","tue","wed","thu","fri","sat"];
  return days[new Date().getDay()];
}

function formatTime(diff){
  const h = Math.floor(diff/60);
  const m = diff%60;
  if(h > 0) return `${h} hr ${m} min`;
  return `${m} min`;
}

/* ---------- TAG ---------- */

function getTag(subject){
  if(subject.toLowerCase().includes("break")) return "break";
  if(subject.toLowerCase().includes("tutorial")) return "tutorial";
  return "lecture";
}

/* ---------- MAIN ---------- */

function showDay(day, btn=null) {

  const container = document.getElementById("schedule");
  container.innerHTML = "";

  document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
  if(btn) btn.classList.add("active");

  const now = getNow();
  let nextClass = null;
  let currentCard = null;

  data[day].forEach((item, index) => {

    const t = toMinutes(item.time);
    const isCurrent = now >= t && now < t + 60;

    if(t > now && !nextClass) nextClass = t;

    const tag = getTag(item.subject);

    const cardId = `card-${index}`;

    container.innerHTML += `
      <div id="${cardId}" class="card ${isCurrent?'current':''}">
        
        <div class="time">${item.display}</div>

        <div class="info">
          <h3>${item.subject}</h3>
          <p>📍 ${item.room} | 👤 ${item.teacher}</p>
        </div>

        <div class="tag ${tag}">
          ${isCurrent ? '🔴 LIVE' : tag.toUpperCase()}
        </div>

        ${isCurrent ? `
          <img class="shinchan" 
          src="https://media.tenor.com/6i7l1D9cZ4QAAAAi/shinchan.gif">
        ` : ''}
      </div>
    `;

    if(isCurrent) currentCard = cardId;

  });

  /* 🔥 NO CLASS */
  if(!currentCard){
    container.innerHTML += `
      <div class="sleep">
        😴 No class right now
      </div>
    `;
  }

  /* 🔥 AUTO SCROLL */
  if(currentCard){
    setTimeout(() => {
      document.getElementById(currentCard).scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 300);
  }

  /* 🔥 POPUP */
  const popup = document.getElementById("nextClassPopup");

  if(nextClass){
    const diff = nextClass - now;
    popup.innerHTML = `⏳ Next class in ${formatTime(diff)}`;
  } else {
    popup.innerHTML = "🎉 No more classes today";
  }
}

/* ---------- AUTO LOAD ---------- */

window.onload = () => {
  const today = getToday();
  const btn = document.querySelector(`button[onclick*="${today}"]`);
  showDay(today, btn);
};
