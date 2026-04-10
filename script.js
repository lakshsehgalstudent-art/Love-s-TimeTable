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

/* 🔥 AUTO SELECT TODAY + HIGHLIGHT */
window.onload = () => {
  const today = getToday();
  const btn = document.querySelector(`button[onclick*="${today}"]`);
  showDay(today, btn);
};
