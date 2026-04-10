const data = {

  mon: [
    {time:"10:45", display:"10:45 AM", subject:"HRM", room:"R202", teacher:"Sunita Chhabra"},
    {time:"11:45", display:"11:45 AM", subject:"Corporate Accounting", room:"R301", teacher:"Devendra Malapati"},
    {time:"12:45", display:"12:45 PM", subject:"Lunch Break 🎉", room:"-", teacher:"-"},
    {time:"13:05", display:"1:05 PM", subject:"GE II", room:"Th321", teacher:"Drishti Joshi"},
    {time:"14:05", display:"2:05 PM", subject:"EVS", room:"R216", teacher:"-"},
    {time:"15:05", display:"3:05 PM", subject:"EVS", room:"R216", teacher:"-"}
  ],

  tue: [
    {time:"10:45", display:"10:45 AM", subject:"Claw Tut G1", room:"R205", teacher:"Sindhu Mani"},
    {time:"11:45", display:"11:45 AM", subject:"HRM Tut G1", room:"R202", teacher:"Sunita Chhabra"},
    {time:"12:45", display:"12:45 PM", subject:"Lunch Break 🎉", room:"-", teacher:"-"},
    {time:"13:05", display:"1:05 PM", subject:"Corporate Accounting", room:"R202", teacher:"Devendra Malapati"},
    {time:"14:05", display:"2:05 PM", subject:"Company Law", room:"R202", teacher:"Sindhu Mani"},
    {time:"15:05", display:"3:05 PM", subject:"VAC Semester II", room:"-", teacher:"-"},
    {time:"16:05", display:"4:05 PM", subject:"VAC Semester II", room:"-", teacher:"-"}
  ],

  wed: [
    {time:"08:45", display:"8:45 AM", subject:"GE II", room:"Th321", teacher:"Drishti Joshi"},
    {time:"09:45", display:"9:45 AM", subject:"HRM", room:"R202", teacher:"Sunita Chhabra"},
    {time:"10:45", display:"10:45 AM", subject:"Company Law", room:"R219", teacher:"Sindhu Mani"},
    {time:"11:45", display:"11:45 AM", subject:"Company Law Tutorial G2", room:"R205", teacher:"Sindhu Mani"},
    {time:"12:45", display:"12:45 PM", subject:"Lunch Break 🎉", room:"-", teacher:"-"},
    {time:"13:05", display:"1:05 PM", subject:"HRM Tut G2", room:"R207", teacher:"Sunita Chhabra"},
    {time:"14:05", display:"2:05 PM", subject:"Break 🎉", room:"-", teacher:"-"},
    {time:"15:05", display:"3:05 PM", subject:"Break 🎉", room:"-", teacher:"-"}
  ],

  thu: [
    {time:"08:45", display:"8:45 AM", subject:"EVS", room:"R202", teacher:"-"},
    {time:"09:45", display:"9:45 AM", subject:"HRM", room:"R202", teacher:"Sunita Chhabra"},
    {time:"10:45", display:"10:45 AM", subject:"Corporate Accounting Tut", room:"R207", teacher:"P. Chengarayulu"},
    {time:"11:45", display:"11:45 AM", subject:"HRM Tut G3", room:"R207", teacher:"Sunita Chhabra"},
    {time:"12:45", display:"12:45 PM", subject:"Lunch Break 🎉", room:"-", teacher:"-"},
    {time:"13:05", display:"1:05 PM", subject:"Corporate Accounting Tut", room:"-", teacher:"P. Chengarayulu"}
  ],

  fri: [
    {time:"08:45", display:"8:45 AM", subject:"Corporate Accounting", room:"R201", teacher:"Devendra Malapati"},
    {time:"09:45", display:"9:45 AM", subject:"Break 🎉", room:"-", teacher:"-"},
    {time:"10:45", display:"10:45 AM", subject:"Company Law Tut G3", room:"R205", teacher:"Sindhu Mani"},
    {time:"11:45", display:"11:45 AM", subject:"Company Law", room:"R321", teacher:"Sindhu Mani"},
    {time:"12:45", display:"12:45 PM", subject:"Lunch Break 🎉", room:"-", teacher:"-"},
    {time:"13:05", display:"1:05 PM", subject:"GE II Practical", room:"-", teacher:"-"},
    {time:"14:05", display:"2:05 PM", subject:"GE II Practical", room:"-", teacher:"-"},
    {time:"15:05", display:"3:05 PM", subject:"GE II Practical", room:"-", teacher:"-"}
  ],

  sat: [
    {time:"08:45", display:"8:45 AM", subject:"SEC Semester II", room:"-", teacher:"-"},
    {time:"09:45", display:"9:45 AM", subject:"SEC Semester II", room:"-", teacher:"-"},
    {time:"10:45", display:"10:45 AM", subject:"SEC Semester II", room:"-", teacher:"-"},
    {time:"11:45", display:"11:45 AM", subject:"SEC Semester II", room:"-", teacher:"-"},
    {time:"12:45", display:"12:45 PM", subject:"Lunch Break 🎉", room:"-", teacher:"-"},
    {time:"13:05", display:"1:05 PM", subject:"VAC Semester II", room:"-", teacher:"-"},
    {time:"14:05", display:"2:05 PM", subject:"VAC Semester II", room:"-", teacher:"-"},
    {time:"15:05", display:"3:05 PM", subject:"AEC Semester II", room:"-", teacher:"-"},
    {time:"16:05", display:"4:05 PM", subject:"AEC Semester II", room:"-", teacher:"-"}
  ]

};

/* ---------- HELPERS ---------- */

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
        <div class="divider"></div>

        <div class="content">
          <div class="subject">${item.subject}</div>

          <div class="bottomRow">
            <div class="room">📍 ${item.room}</div>
            <div class="teacher">👤 ${item.teacher}</div>
          </div>
        </div>

        <div class="tag ${isCurrent ? 'live' : tag}">
          ${isCurrent ? '🔴 LIVE' : tag.toUpperCase()}
        </div>

      </div>
    `;

    if(isCurrent) currentCard = cardId;

  });

  if(currentCard){
    setTimeout(() => {
      document.getElementById(currentCard).scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 300);
  }

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
