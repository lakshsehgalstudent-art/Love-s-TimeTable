const data = {
  mon: [
    {time:"8:45 AM", subject:"HRM", room:"202", teacher:"SC"},
    {time:"2:05 PM", subject:"GE II", room:"T3-21", teacher:"DT"}
  ],
  tue: [],
  wed: [],
  thu: [],
  fri: []
};

function showDay(day) {
  const container = document.getElementById("schedule");
  container.innerHTML = "";

  if (!data[day] || data[day].length === 0) {
    container.innerHTML = "<p>No classes</p>";
    return;
  }

  data[day].forEach(item => {
    container.innerHTML += `
      <div class="card">
        <h3>${item.subject}</h3>
        <p>⏰ ${item.time}</p>
        <p>📍 Room ${item.room}</p>
        <p>👤 ${item.teacher}</p>
      </div>
    `;
  });
}

// default load
showDay('mon');
