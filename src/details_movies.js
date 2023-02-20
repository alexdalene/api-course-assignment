const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const postId = params.get("id");

async function getMovie() {
  try {
    const response = await fetch(`https://the-one-api.dev/v2/movie/${postId}`, {
      headers: {
        Authorization: "Bearer PsUUdivKcDKJ5XnoSvj5",
      },
    });
    const result = await response.json();
    console.log(result);
    result.docs.forEach((movie) => makeMovie(movie));
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Working");
  }
}

// async function getChapters() {
//   try {
//     const response = await fetch(
//       `https://the-one-api.dev/v2/movie/${postId}/chapter`
//     );
//     const result = await response.json();
//     console.log(result);
//     result.docs.forEach((chapter) => makeChapters(chapter));
//   } catch (error) {
//     console.log(error);
//   }
// }

// getChapters();
getMovie();

function makeMovie(movie) {
  const hero = document.querySelector(".hero-movie");
  hero.innerHTML = `
    <h1>${movie.name}</h1>
    `;

  const container = document.querySelector(".movie-info");
  const revenue = Math.ceil(
    movie.boxOfficeRevenueInMillions - movie.budgetInMillions
  );
  if (movie.name.includes("Series")) {
    container.innerHTML = `
    <div class="scores">
        <p><i class="fa-solid fa-star"></i> ${Math.floor(
          movie.rottenTomatoesScore
        )} / 100</p>
        <p><i class="fa-solid fa-dollar-sign"></i> ${
          movie.budgetInMillions
        } million</p>
    </div>
    <div class="revenue">
        <p>This series made a total of <br >
        <strong>${revenue}</strong> <br >
        million dollars in revenue.</p>
    </div>
    <div class="awards">
        <p>This series won <br >
        <strong>${movie.academyAwardWins} / ${
      movie.academyAwardNominations
    }</strong> <br >
        Academy Award nominations.</p>
    </div>
    `;
  } else {
    container.innerHTML = `
    <div class="scores">
        <p><i class="fa-solid fa-star"></i> ${Math.floor(
          movie.rottenTomatoesScore
        )} / 100</p>
        <p><i class="fa-solid fa-dollar-sign"></i> ${
          movie.budgetInMillions
        } million</p>
    </div>
    <div class="revenue">
        <p>This movie made a total of <br >
        <strong>${revenue}</strong> <br >
        million dollars in revenue.</p>
    </div>
    <div class="awards">
        <p>This movie won <br >
        <strong>${movie.academyAwardWins} / ${
      movie.academyAwardNominations
    }</strong> <br >
        Academy Award nominations.</p>
    </div>
    `;
  }
}
