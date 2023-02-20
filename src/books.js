async function getAllBooks() {
  try {
    document.querySelector(".loading").classList.add("shown");
    const response = await fetch("https://the-one-api.dev/v2/book", {
      headers: {
        Authorization: "Bearer PsUUdivKcDKJ5XnoSvj5",
      },
    });
    const result = await response.json();
    console.log(result.docs);
    result.docs.forEach((book) => makeBook(book));
    document.querySelector(".loading").classList.remove("shown");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Working");
  }
}

getAllBooks();

function makeBook(book) {
  const container = document.querySelector(".character-container");
  container.innerHTML += `
      <div class="character-grid">
          <ul class="character">
                  <li><h4>${book.name}</h4></li>
          </ul>
          <ul>
            <a href="./details_books.html?id=${book._id}">
              <div class="character-button flex flex-center">
                <i class="fa-solid fa-circle-info"></i>
               </div>
            </a>
            </ul>
      </div>
      `;
}
