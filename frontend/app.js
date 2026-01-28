fetch("/api/health")
  .then(res => res.json())
  .then(data => {
    console.log("From API:", data);
  });

  
async function aniBuildTable() {
  let table = document.getElementById("animal-table");
  const aniAnimalList = await (await fetch("/api/animals")).json();
  for (let index = 0; index < aniAnimalList.length; index++) {
    let row = `
      <tr>
        <td>${aniAnimalList[index].common_name}</td>
        <td>${aniAnimalList[index].scientific_name}</td>
      </tr>
    `;
    table.innerHTML += row;
    
  }
}

aniBuildTable();