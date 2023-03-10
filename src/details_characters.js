const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const postId = params.get("id");

async function getCharacter() {
  try {
    const response = await fetch(
      `https://the-one-api.dev/v2/character/${postId}`,
      {
        headers: {
          Authorization: "Bearer PsUUdivKcDKJ5XnoSvj5",
        },
      }
    );
    const result = await response.json();
    result.docs.forEach((character) => makeCharacter(character));
  } catch (error) {
    console.log(error);
    document.querySelector(".specific-character").innerHTML = "<h1>ERROR</h1>";
  }
}

getCharacter();

function makeCharacter(character) {
  document.title = `LotR - ${character.name}`;
  const hero = document.querySelector(".hero-character");
  hero.innerHTML = `
    <h1>${character.name}</h1>
    `;
  const container = document.querySelector(".specific-character");
  if (!character.birth) {
    character.birth = "Unknown";
  }
  if (!character.death) {
    character.death = "Unknown";
  }
  container.innerHTML += `
             <div>
                <p><strong>Birth</strong>: ${character.birth}</p>
                <p><strong>Death</strong>: ${character.death}</p>
              </div>
              <div>
                <p><strong>Race</strong>: ${character.race}</p>
                <p><strong>Gender</strong>: ${character.gender}</p>
              </div>
              <a href="${character.wikiUrl}" target="_blank" >Wiki <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
      `;
}
