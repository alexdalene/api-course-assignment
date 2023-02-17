async function getAllCharacters() {
  try {
    document.querySelector(".loading").classList.add("shown");
    const response = await fetch(
      "https://the-one-api.dev/v2/character?limit=20",
      {
        headers: {
          Authorization: "Bearer PsUUdivKcDKJ5XnoSvj5",
        },
      }
    );
    const result = await response.json();
    console.log(result.docs);
    result.docs.forEach((character) => makeCharacter(character));
    document.querySelector(".loading").classList.remove("shown");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Working");
  }
}

getAllCharacters();

function makeCharacter(character) {
  const container = document.querySelector(".character-container");
  container.innerHTML += `
    <div class="grid">
        <div class="character flex-col">
            <div class="flex">
                <h4>${character.name},</h4>
                <p>${character.race}</p>
            </div>
            <a href="${character.wikiUrl}" target="_blank" >Wiki <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
        <button class="character-button"><a href="./details.html?id=${character._id}"><i class="fa-solid fa-circle-info"></i></a></button>
    </div>
    `;
}

const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("change", (e) => {
  console.log(e.target.value);
  getCharacter(e.target.value);
});

async function getCharacter(value) {
  const container = document.querySelector(".character-container");
  try {
    document.querySelector(".loading").classList.add("shown");
    if (!value) {
      container.innerHTML = "";
      getAllCharacters();
      return;
    }
    container.innerHTML = "";
    const response = await fetch(
      `https://the-one-api.dev/v2/character?name=${value}`,
      {
        headers: {
          Authorization: "Bearer PsUUdivKcDKJ5XnoSvj5",
        },
      }
    );
    const result = await response.json();
    console.log(result);
    result.docs.forEach((character) => makeCharacter(character));
    document.querySelector(".loading").classList.remove("shown");
  } catch (error) {
    console.log(error);
  }
}
