const mainUrl = "http://localhost:8000/api/v1/titles"
const topMovieUrl = "http://localhost:8000/api/v1/titles?&sort_by=-imdb_score"
const bestMoviesUrl = "http://localhost:8000/api/v1/titles?&sort_by=-imdb_score&page_size=10"
const genreChoiceUrl = "http://localhost:8000/api/v1/genres/?page_size=25"
const comedyUrl = "http://localhost:8000/api/v1/titles/?genre=comedy&page_size=10&sort_by=-imdb_score"
const fantasyUrl = "http://localhost:8000/api/v1/titles/?genre=fantasy&page_size=10&sort_by=-imdb_score"


function getBestMovie() {
  const bestMovieTitle = document.getElementById("top-movie-title");
  const bestMovieImg = document.getElementById("top-movie-img");
  const bestMovieDescription = document.getElementById("top-movie-description");
  const bestBtn = document.getElementsByClassName("bestbtn");

  fetch(topMovieUrl)
  .then(response => response.json())
  .then((data) => {
    fetch(data['results'][0]['url'])
    .then(response => response.json())
    .then((data) => {
      bestMovieTitle.innerHTML = data["title"];
      bestMovieImg.src = data["image_url"];
      
      bestMovieDescription.innerHTML = data["description"];
  });
  })
}

getBestMovie()

function fetchMovies(url){
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const column1 = document.getElementById('column1');
      const column2 = document.getElementById('column2');
      const column3 = document.getElementById('column3');
    
      column1.classList.add('column');
      column2.classList.add('column');
      column3.classList.add('column');

      for (let i = 1; i <= 6; i++) {
      imageUrl = data["results"][i]["image_url"];
      movieTitle = data["results"][i]["title"];
      const img = document.createElement('img');
      img.src = imageUrl;

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');

      const title = document.createElement('h3');
      title.textContent = movieTitle;

      const detailsButton = document.createElement('button');
      detailsButton.textContent = "Détails";

      overlay.appendChild(title);
      overlay.appendChild(detailsButton);
      const column = i <= 2 ? column1 : i <= 4 ? column2 : column3;
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      imageContainer.appendChild(img);
      imageContainer.appendChild(overlay);
      column.appendChild(imageContainer);
      
        }
      })

    .catch(error => {
      console.error('une erreur s\'est produite lors du chargement des images:', error);
    });
  
}

function bestMovies() {
  fetch(bestMoviesUrl)
    .then(response => response.json())
    .then(data => {
      const column1 = document.getElementById('column1');
      const column2 = document.getElementById('column2');
      const column3 = document.getElementById('column3');

      column1.classList.add('column');
      column2.classList.add('column');
      column3.classList.add('column');

      for (let i = 1; i <= 6; i++) {
        const imageUrl = data.results[i].image_url;
        const movieTitle = data.results[i].title;

        const img = document.createElement('img');
        img.src = imageUrl;

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const title = document.createElement('h3');
        title.textContent = movieTitle;

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Détails';

        overlay.appendChild(title);
        overlay.appendChild(detailsButton);

        const column = i <= 2 ? column1 : i <= 4 ? column2 : column3;

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.appendChild(img);
        imageContainer.appendChild(overlay);

        column.appendChild(imageContainer);
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors du chargement des images:', error);
    });
}

bestMovies();

function comedy(){
  fetch(comedyUrl)
  .then(response => response.json())
  .then(data => {
    const comedyColumn1 = document.getElementById('comcolumn1');
    const comedyColumn2 = document.getElementById('comcolumn2');
    const comedyColumn3 = document.getElementById('comcolumn3');
  
    comedyColumn1.classList.add('column');
    comedyColumn2.classList.add('column');
    comedyColumn3.classList.add('column');

    for (let i = 0; i < 6; i++) {
    imageUrl = data["results"][i]["image_url"];
    movieTitle = data["results"][i]["title"];
      const comedyImg = document.createElement('img');
      comedyImg.src = imageUrl;

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');

      const title = document.createElement('h3');
      title.textContent = movieTitle;

      const detailsButton = document.createElement('button');
      detailsButton.textContent = "Détails";

      overlay.appendChild(title);
      overlay.appendChild(detailsButton);
      const column = i < 2 ? comedyColumn1 : i < 4 ? comedyColumn2 : comedyColumn3;
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      imageContainer.appendChild(comedyImg);
      imageContainer.appendChild(overlay);
      column.appendChild(imageContainer);
    }
    })
  
  .catch(error => {
    console.error('une erreur s\'est produite lors du chargement des images:', error);
  });


}
comedy()

function fantasy(){
  fetch(fantasyUrl)
  .then(response => response.json())
  .then(data => {
    const fantasyColumn1 = document.getElementById('fancolumn1');
    const fantasyColumn2 = document.getElementById('fancolumn2');
    const fantasyColumn3 = document.getElementById('fancolumn3');
  
    fantasyColumn1.classList.add('column');
    fantasyColumn2.classList.add('column');
    fantasyColumn3.classList.add('column');

    for (let i = 0; i < 6; i++) {
    imageUrl = data["results"][i]["image_url"];
    movieTitle = data["results"][i]["title"];
      const fantasyImg = document.createElement('img');
      fantasyImg.src = imageUrl;

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');

      const title = document.createElement('h3');
      title.textContent = movieTitle;

      const detailsButton = document.createElement('button');
      detailsButton.textContent = "Détails";

      overlay.appendChild(title);
      overlay.appendChild(detailsButton);
      const column = i < 2 ? fantasyColumn1 : i < 4 ? fantasyColumn2 : fantasyColumn3;
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      imageContainer.appendChild(fantasyImg);
      imageContainer.appendChild(overlay);
      column.appendChild(imageContainer);
    }
    })
  
  .catch(error => {
    console.error('une erreur s\'est produite lors du chargement des images:', error);
  });

}
fantasy()

// Récupérer les genres de films disponibles depuis l'API
function fetchGenres() {
  fetch(genreChoiceUrl)
    .then(response => response.json())
    .then(data => {
      const categoriesSelect = document.getElementById('categories');

      // Ajouter les options du menu avec les genres de films
      for(let i=0; i<=25; i++){
        genre = data["results"][i]
        const option = document.createElement('option');
        option.value = genre["id"];
        option.textContent = genre["name"];
        categoriesSelect.appendChild(option);
      ;
    }
      // Écouter l'événement de changement de sélection du menu
      categoriesSelect.addEventListener('change', () => {
        const selectedGenre = categoriesSelect.textContent;
        console.log(selectedGenre)
        fetchMoviesByGenre(selectedGenre);
      });
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors du chargement des genres de films:', error);
    });
}

// Récupérer les 6 premiers films de la catégorie sélectionnée depuis l'API
function fetchMoviesByGenre(genre) {
  const moviesUrl = `http://localhost:8000/api/v1/titles/?genre=${genre}&page_size=10&sort_by=-imdb_score`;

  fetch(moviesUrl)
    .then(response => response.json())
    .then(data => {
      const column1 = document.getElementById('column1');
      const column2 = document.getElementById('column2');
      const column3 = document.getElementById('column3');

      // Vider les colonnes existantes
      column1.innerHTML = '';
      column2.innerHTML = '';
      column3.innerHTML = '';

      // Afficher les 6 premiers films de la catégorie sélectionnée
      column1.classList.add('column');
      column2.classList.add('column');
      column3.classList.add('column');

      for (let i = 1; i <= 6; i++) {
        const imageUrl = data.results[i].image_url;
        const movieTitle = data.results[i].title;

        const img = document.createElement('img');
        img.src = imageUrl;

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const title = document.createElement('h3');
        title.textContent = movieTitle;

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Détails';

        overlay.appendChild(title);
        overlay.appendChild(detailsButton);

        const column = i <= 2 ? column1 : i <= 4 ? column2 : column3;

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.appendChild(img);
        imageContainer.appendChild(overlay);

        column.appendChild(imageContainer);
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors du chargement des images:', error);
    });

}

// Appeler la fonction pour récupérer les genres de films et initialiser le menu déroulant
fetchGenres();


// // Get the modal
// const modal = document.getElementById("myModal");

// // Get the button that opens the modal
// const btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// const span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }



// const topMovie = document.querySelector(".top_movie_infos");
// topMovie.appendChild(bestMovieImg);
// topMovie.appendChild(bestMovietitle);

// const reponse = await fetch(`http://localhost:8000/api/v1/titles/`);
// const datas = await reponse.json();
// //. const avis: pour l'exmple

// fetch(` http://localhost:8000/api/v1/genres/`).then(function () {
//   console.log("Le scirpt continuera après avoir reçu la réponse");
// });
