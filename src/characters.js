async function getAllCharacters(input) {
  try {
    const container = document.querySelector(".character-container");
    container.innerHTML = "";
    document.querySelector(".loading").classList.add("shown");
    const response = await fetch(
      `https://the-one-api.dev/v2/character?race=${input}`,
      {
        headers: {
          Authorization: "Bearer PsUUdivKcDKJ5XnoSvj5",
        },
      }
    );
    const result = await response.json();
    result.docs.forEach((character) => makeCharacter(character));
    document.querySelector(".loading").classList.remove("shown");
  } catch (error) {
    console.log(error);
    document.querySelector(".container").innerHTML += "<h1>ERROR</h1>";
  }
}

function makeCharacter(character) {
  document.querySelector(".character-container").classList.remove("hide");
  const container = document.querySelector(".character-container");
  container.innerHTML += `
    <div class="character-grid">
        <ul class="character">
                <li><h4>${character.name},</h4></li>
                <li><p>${character.race}</p></li>
        </ul>
        <ul>
        <a href="${character.wikiUrl}" target="_blank" >Wiki <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </ul>
        <ul>
          <a href="./details_characters.html?id=${character._id}">
            <div class="character-button flex flex-center">
              <i class="fa-solid fa-circle-info"></i>
             </div>
          </a>
          </ul>
    </div>
    `;
}

const radioOptions = document.querySelectorAll(
  ".race-container details div input"
);

const submitButton = document.querySelector("#submit-button");
const searchInput = document.querySelector("#search-input");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".race-container details").open = false;
  if (!searchInput.value) {
    radioOptions.forEach((node) => {
      if (node.checked) {
        let input = node.value;
        console.log(input);
        getAllCharacters(input);
      }
    });
  }
});

searchInput.addEventListener("change", (e) => {
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
    result.docs.forEach((character) => makeCharacter(character));
    document.querySelector(".loading").classList.remove("shown");
  } catch (error) {
    console.log(error);
    document.querySelector(".container").innerHTML += "<h1>ERROR</h1>";
  }
}
