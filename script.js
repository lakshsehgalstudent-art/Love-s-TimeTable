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
    {time:"10:45", display:"10:45 AM", subject:"DSC 2.2", room:"219", teacher:"SB"}
  ],
  thu: [
    {time:"08:45", display:"8:45 AM", subject:"AEC", room:"202", teacher:"EVS"},
    {time:"09:45", display:"9:45 AM", subject:"DSC 2.3", room:"202", teacher:"SC"}
  ],
  fri: [
    {time:"08:45", display:"8:45 AM", subject:"DSC 2.1", room:"201", teacher:"DM"},
    {time:"09:45", display:"9:45 AM", subject:"Break", room:"-", teacher:"-"},
    {time:"10:45", display:"10:45 AM", subject:"Tutorial", room:"SB-205", teacher:"-"},
    {time:"11:45", display:"11:45 AM", subject:"DSC 2.2", room:"321", teacher:"SB"},
    {time:"14:05", display:"2:05 PM", subject:"GE II", room:"T301", teacher:"DT"}
  ],
  sat: [
    {time:"10:00", display:"Morning", subject:"SEC", room:"-", teacher:"-"}
  ]
};

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

function showDay(day, btn=null) {
  const container = document.getElementById("schedule");
  container.innerHTML = "";

  document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
  if(btn) btn.classList.add("active");

  const now = getNow();
  let nextClass = null;
  let foundCurrent = false;

  data[day].forEach(item => {
    const t = toMinutes(item.time);
    const isCurrent = Math.abs(now - t) < 60;
    if(isCurrent) foundCurrent = true;

    if(t > now && !nextClass) nextClass = t;

    container.innerHTML += `
      <div class="card ${isCurrent?'current':''}">
        <h3>${item.subject.includes("Break")?'☕':'📘'} ${item.subject}</h3>
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
  if(nextClass){
    const diff = nextClass - now;
    popup.innerHTML = `⏳ Next class in ${diff} mins`;
  } else {
    popup.innerHTML = "🎉 No more classes today";
  }
}

const today = getToday();
showDay(today);
