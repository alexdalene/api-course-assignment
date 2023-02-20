async function getAllMovies() {
  try {
    document.querySelector(".loading").classList.add("shown");
    const response = await fetch("https://the-one-api.dev/v2/movie", {
      headers: {
        Authorization: "Bearer PsUUdivKcDKJ5XnoSvj5",
      },
    });
    const result = await response.json();
    console.log(result.docs);
    result.docs.forEach((movie) => makeMovie(movie));
    document.querySelector(".loading").classList.remove("shown");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Working");
  }
}

getAllMovies();

function makeMovie(movie) {
  const container = document.querySelector(".character-container");
  container.innerHTML += `
        <div class="character-grid">
            <ul class="character">
                    <li><h4>${movie.name}</h4></li>
            </ul>
            <ul>
            <li><p>${Math.ceil(movie.runtimeInMinutes / 60)} hours</p></li>
            </ul>
            <ul>
              <a href="./details_movies.html?id=${movie._id}">
                <div class="character-button flex flex-center">
                  <i class="fa-solid fa-circle-info"></i>
                 </div>
              </a>
              </ul>
        </div>
        `;
}
