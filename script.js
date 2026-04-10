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
    {time:"14:00", display:"Afternoon", subject:"AEC", room:"-", teacher:"-"}
  ]

};


// convert HH:MM → minutes
function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// current IST time
function getCurrentIST() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}


function showDay(day) {
  const container = document.getElementById("schedule");
  container.innerHTML = "";

  const now = getCurrentIST();

  if (!data[day] || data[day].length === 0) {
    container.innerHTML = "<p>No classes</p>";
    return;
  }

  data[day].forEach(item => {

    const classTime = toMinutes(item.time);

    // detect current class (within 60 mins window)
    const isCurrent = Math.abs(now - classTime) < 60;

    const isBreak = item.subject.toLowerCase().includes("break");

    container.innerHTML += `
      <div class="card ${isCurrent ? 'current' : ''}" 
           style="${isBreak ? 'opacity:0.5;' : ''}">

        <h3>${isBreak ? '☕' : '📘'} ${item.subject}</h3>
        <p>⏰ ${item.display}</p>
        <p>📍 Room ${item.room}</p>
        <p>👩‍🏫 ${item.teacher}</p>

        ${isCurrent ? `
          <img 
            src="https://media.tenor.com/6i7l1D9cZ4QAAAAi/shinchan.gif" 
            style="position:absolute; right:10px; top:10px; width:60px;">
        ` : ""}

      </div>
    `;
  });
}


// default load
showDay('mon');
