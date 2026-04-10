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

function toMinutes(t) {
  const [h,m] = t.split(":").map(Number);
  return h*60 + m;
}

function getNowIST() {
  const now = new Date();
  return now.getHours()*60 + now.getMinutes();
}

function getToday() {
  const days = ["sun","mon","tue","wed","thu","fri","sat"];
  return days[new Date().getDay()];
}

function formatTime(diff) {
  let hours = Math.floor(diff / 60);
  let minutes = diff % 60;

  if(hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function showDay(day, btn=null) {
  const container = document.getElementById("schedule");
  container.innerHTML = "";

  const buttons = document.querySelectorAll(".tabs button");
  buttons.forEach(b => b.classList.remove("active"));
  if(btn) btn.classList.add("active");

  const now = getNowIST();
  let nextClassTime = null;
  let foundCurrent = false;

  data[day].forEach(item => {
    const t = toMinutes(item.time);
    const isCurrent = now >= t && now < t + 60;

    if(isCurrent) foundCurrent = true;
    if(t > now && !nextClassTime) nextClassTime = t;

    container.innerHTML += `
      <div class="card ${isCurrent ? 'current' : ''}">
        <h3>${item.subject.includes("Break") ? '☕' : '📘'} ${item.subject}</h3>
        <p>⏰ ${item.display}</p>
        <p>📍 ${item.room}</p>
        <p>👩‍🏫 ${item.teacher}</p>

        ${isCurrent ? `<img class="shinchan" src="https://media.tenor.com/6i7l1D9cZ4QAAAAi/shinchan.gif">` : ''}
      </div>
    `;
  });

  if(!foundCurrent){
    container.innerHTML += `
      <div class="sleep">
        <img src="https://media.tenor.com/2roX3uxz_68AAAAi/shinchan-sleep.gif">
        <p>No class right now 😴</p>
      </div>
    `;
  }

  const popup = document.getElementById("nextClassPopup");

  if(nextClassTime){
    const diff = nextClassTime - now;
    popup.innerHTML = `⏳ Next class in ${formatTime(diff)}`;
  } else {
    popup.innerHTML = "🎉 No more classes today";
  }
}

/* AUTO LOAD + HIGHLIGHT */
window.onload = () => {
  const today = getToday();
  const btn = document.querySelector(`button[onclick*="${today}"]`);
  showDay(today, btn);
};
