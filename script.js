const mainUrl = "http://localhost:8000/api/v1/titles/"
const topMovieUrl = "http://localhost:8000/api/v1/titles?&sort_by=-imdb_score"
const bestMoviesUrl = "http://localhost:8000/api/v1/titles?&sort_by=-imdb_score&page_size=10"
const genreChoiceUrl = "http://localhost:8000/api/v1/genres/?page_size=100"
const comedyUrl = "http://localhost:8000/api/v1/titles/?genre=comedy&page_size=10&sort_by=-imdb_score"
const fantasyUrl = "http://localhost:8000/api/v1/titles/?genre=fantasy&page_size=10&sort_by=-imdb_score"

function getBestMovie() {
  const bestMovieTitle = document.getElementById("top-movie-title");
  const bestMovieImg = document.getElementById("top-movie-img");
  const bestMovieDescription = document.getElementById("top-movie-description");
  const bestBtn = document.getElementById("myModalBtn");

  fetch(topMovieUrl)
  .then(response => response.json())
  .then((data) => {
    fetch(data['results'][0]['url'])
    .then(response => response.json())
    .then((data) => {
      bestMovieTitle.innerHTML = data["title"];
      bestMovieImg.src = data["image_url"];      
      bestMovieDescription.innerHTML = data["description"];
      bestBtn.addEventListener('click', () => {
        openModal(data['id'])
      });
  });
  })
}

getBestMovie()

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
        fetch(data['results'][i]['url'])
          .then(response => response.json())
          .then((data) => {
        detailsButton.addEventListener('click', () => {
          openModal(data['id'])
        });
         
      });

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
      fetch(data['results'][i]['url'])
          .then(response => response.json())
          .then((data) => {
        detailsButton.addEventListener('click', () => {
          openModal(data['id'])
        });
         
      });

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
      fetch(data['results'][i]['url'])
          .then(response => response.json())
          .then((data) => {
        detailsButton.addEventListener('click', () => {
          openModal(data['id'])
        });
         
      });

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
      for(let i = 0; i < data.results.length; i++){
        const options = document.createElement('option');
        options.value = data.results[i]["id"];
        options.textContent = data.results[i].name;
        categoriesSelect.appendChild(options);  
      }
      // Écouter l'événement de changement de sélection du menu
      categoriesSelect.addEventListener('change', () => {
        const selectedGenreId = categoriesSelect.value;
        const selectedGenreText = categoriesSelect.options[categoriesSelect.selectedIndex].textContent;
        fetchMoviesByGenre(selectedGenreId ,selectedGenreText);
      });
    
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors du chargement des genres de films:', error);
    });
}

// Récupérer les 6 premiers films de la catégorie sélectionnée depuis l'API
function fetchMoviesByGenre(genreId, genreText) {
  const moviesUrl = `http://localhost:8000/api/v1/titles/?genre=${genreText}&page_size=10&sort_by=-imdb_score`;


  fetch(moviesUrl)
    .then(response => response.json())
    .then(data => {
      const genreColumn1 = document.getElementById('genColumn1');
      const genreColumn2 = document.getElementById('genColumn2');
      const genreColumn3 = document.getElementById('genColumn3');

      // Vider les colonnes existantes
      genreColumn1.innerHTML = '';
      genreColumn2.innerHTML = '';
      genreColumn3.innerHTML = '';

      // Afficher les 6 premiers films de la catégorie sélectionnée
      genreColumn1.classList.add('column');
      genreColumn2.classList.add('column');
      genreColumn3.classList.add('column');

      for (let i = 0; i < 6; i++) {
        const imageUrl = data["results"][i]["image_url"];

        const movieTitle = data["results"][i]["title"];

        const genreImg = document.createElement('img');
        genreImg.src = imageUrl;

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const title = document.createElement('h3');
        title.textContent = movieTitle;

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Détails';
        fetch(data['results'][i]['url'])
          .then(response => response.json())
          .then((data) => {
        detailsButton.addEventListener('click', () => {
          openModal(data['id'])
        });
         
      });

        overlay.appendChild(title);
        overlay.appendChild(detailsButton);

        const column = i < 2 ? genreColumn1 : i < 4 ? genreColumn2 : genreColumn3;

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.appendChild(genreImg);
        imageContainer.appendChild(overlay);

        column.appendChild(imageContainer);
      }
    })
    .catch(error => {
      console.error('En attente de la séléection dun genre pour le chargement des images:', error);
    });

}

// Appeler la fonction pour récupérer les genres de films et initialiser le menu déroulant
fetchGenres();
fetchMoviesByGenre();

function openModal(id) {

  const modal = document.getElementById("modalContainer");
  const closebtn = document.getElementsByClassName("close")[0];

  fetchModalData(id)

  modal.style.display = "block";

  closebtn.onclick = function () {
      modal.style.display = "none";
  }

}

function fetchModalData(id) {

  fetch(mainUrl + id)
      .then(response => response.json())
      .then(data => {

          document.getElementById('modalImage').src = data["image_url"];
          document.getElementById('modalTitle').innerHTML = data["title"];
          document.getElementById('modalReleaseDate').innerHTML = data["year"];
          document.getElementById('modalDuration').innerHTML = data["duration"] + " min";
          document.getElementById('modalGenre').innerHTML = data["genres"];
          document.getElementById('modalImdbScore').innerHTML = data["imdb_score"] + " / 10";
          document.getElementById('modalDirector').innerHTML = data["directors"];
          document.getElementById('modalActors').innerHTML = data["actors"] + "...";
          document.getElementById('modalCountry').innerHTML = data["countries"];

          if (typeof data["rated"] === 'string' || data["rated"] instanceof String)
              document.getElementById('modalRated').innerHTML = data["rated"];
          else
              document.getElementById('modalRated').innerHTML = data["rated"] + "+";  

          const modalBoxOffice = document.getElementById('modalBoxOffice');
          if (data["worldwide_gross_income"] == null)
              modalBoxOffice.innerHTML = "N/A"; 
          else
              modalBoxOffice.innerHTML = data["worldwide_gross_income"] + " " + data["budget_currency"];

          let regExp = /[a-zA-Z]/g;
          if (regExp.test(data["long_description"]))
              document.getElementById('modalDescription').innerHTML = data["long_description"];
          else
              document.getElementById('modalDescription').innerHTML = "N/A"; 
      })
}

// Sélectionnez tous les boutons "Voir plus"
const voirPlusButtons = document.querySelectorAll('.btn-voir-plus');
const hiddenElements = document.querySelectorAll('.hiddenElements');

voirPlusButtons.onclick = function () {
  hiddenElements.style.display = "grid";
}
// voirPlusButtons.addEventListener('click', function() {
//   if (hiddenElements.style.display === 'none') {
//     hiddenElements.style.display = 'block';
//   } else {
//     hiddenElements.style.display = 'none';
//   }
// });