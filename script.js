const playerData = [
    {
      firstName: "Sruthi", lastName: "Gusidi", country: "IN", score: 160,
      joinedAt: new Date().toLocaleString(),
    },
    {
      firstName: "Alyssa", lastName: "Healy", country: "AU", score: 100,
      joinedAt: new Date().toLocaleString(),
    },
    {
      firstName: "Mithali", lastName: "Sharma", country: "IN", score: 99,
      joinedAt: new Date().toLocaleString(),
    },
  ];
  
  function addPlayer(){
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const country = document.getElementById("country").value;
    const score = parseInt(document.getElementById("submit").value);
  
    if(!firstName || !lastName || !country || isNaN(score)){
      alert("Please fill in all fields and enter a valid score!");
      return;
    }
  
    const currentDate = new Date().toLocaleString();
  
    const player = {
      firstName,
      lastName,
      country,
      score,
      joinedAt: currentDate,
    };
  
    playerData.push(player);
  
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("country").value = "";
    document.getElementById("submit").value = "";
  
    showPlayerData();
  }
  
  function showPlayerData(){
    document.getElementById("player_data").innerHTML = "";
  
    playerData.sort((a, b) => b.score - a.score);
  
    let rank = 1;
    for (const player of playerData){
      const playerRow = document.createElement("div");
      playerRow.classList.add("player-row");
  
      playerRow.innerHTML = `
      <p class="rank">${rank++}.</p>
      <p class="name">
        <span class="firstName">${player.firstName}</span>
        <span class="lastName">${player.lastName}</span>
      </p>
      <p class="country"><img src="Flags/${player.country}.png" alt="${player.country} flag">${player.country}</p>
      <p class="score">${player.score}</p>
      <p class="score-bt"><button class="score-btn" onclick="increaseScore(${playerData.indexOf(player)})">+ 5</button>
      <button class="score-btn" onclick="decreaseScore(${playerData.indexOf(player)})">- 5</button>
      </p>
      <button class="delete-btn">Delete</button>
      <p class="joined-at">${player.joinedAt}</p>
    `;
  
      const deleteBtn = playerRow.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        const playerIndex = playerData.indexOf(player);
        if (playerIndex !== -1) {
          playerData.splice(playerIndex, 1);
          showPlayerData();
        }
      });
  
      document.getElementById("player_data").appendChild(playerRow);
    }
  }
  
  
  function increaseScore(playerIndex) {
    playerData[playerIndex].score += 5;
    showPlayerData();
  
    localStorage.setItem("players", JSON.stringify(playerData));
  }
  
  function decreaseScore(playerIndex) {
    playerData[playerIndex].score = Math.max(0, playerData[playerIndex].score - 5);
    showPlayerData();
  
    localStorage.setItem("players", JSON.stringify(playerData));
  }
  
  document.getElementById("add_player").addEventListener("click", addPlayer);
  
  //display
  document.addEventListener("DOMContentLoaded", function() {
  const storedPlayers = localStorage.getItem("players");
  if (storedPlayers) {
    playerData = JSON.parse(storedPlayers); 
    showPlayerData(); 
  }
  });
  
  window.onload = showPlayerData;