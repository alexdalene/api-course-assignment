const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const postId = params.get("id");

async function getBook() {
  try {
    const response = await fetch(`https://the-one-api.dev/v2/book/${postId}`, {
      headers: {
        Authorization: "Bearer PsUUdivKcDKJ5XnoSvj5",
      },
    });
    const result = await response.json();
    console.log(result);
    result.docs.forEach((book) => makeBook(book));
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Working");
  }
}

async function getChapters() {
  try {
    const response = await fetch(
      `https://the-one-api.dev/v2/book/${postId}/chapter`
    );
    const result = await response.json();
    console.log(result);
    result.docs.forEach((chapter) => makeChapters(chapter));
  } catch (error) {
    console.log(error);
  }
}

getChapters();
getBook();

function makeBook(book) {
  const hero = document.querySelector(".hero-book");
  hero.innerHTML = `
    <h1>${book.name}</h1>
    `;
}

function makeChapters(chapter) {
  const container = document.querySelector(".chapters");

  container.innerHTML += `
    <ul class="chapter">
        <li>${chapter.chapterName}</li>
    </ul>
    `;
}
