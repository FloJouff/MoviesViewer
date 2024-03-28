const BASE_URL = "http://localhost:8000/api/v1/"
const MAIN_URL = BASE_URL+"titles/"
const TOP_MOVIE_URL = BASE_URL+"titles?&sort_by=-imdb_score"
const BEST_MOVIE_URL = BASE_URL + "titles?&sort_by=-imdb_score&page_size=10"
const GENRE_CHOICE_URL = BASE_URL + "genres/?page_size=100"
const COMEDY_URL = BASE_URL+"titles/?genre=comedy&page_size=10&sort_by=-imdb_score"
const SCI_FI_URL = BASE_URL+"titles/?genre=Sci-Fi&page_size=10&sort_by=-imdb_score"


function getBestMovie() {
  const bestMovieTitle = document.getElementById("top-movie-title");
  const bestMovieImg = document.getElementById("top-movie-img");
  const bestMovieDescription = document.getElementById("top-movie-description");
  const bestBtn = document.getElementById("myModalBtn");

  fetch(TOP_MOVIE_URL)
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

function fetchMovies(categorie, url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const column1 = document.getElementById(categorie+"-column1");
      const column2 = document.getElementById(categorie+"-column2");
      const column3 = document.getElementById(categorie+"-column3");

      column1.classList.add('column');
      column2.classList.add('column');
      column3.classList.add('column');

      for (let i = 0; i < 6; i++) {
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

        const column = i < 2 ? column1 : i < 4 ? column2 : column3;

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

// Récupérer les genres de films disponibles depuis l'API
function fetchGenres() {
  fetch(GENRE_CHOICE_URL)
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
  const moviesUrl = `${BASE_URL}titles/?genre=${genreText}&page_size=10&sort_by=-imdb_score`;

  fetch(moviesUrl)
    .then(response => response.json())
    .then(data => {
      const genreColumn1 = document.getElementById('genColumn1');
      const genreColumn2 = document.getElementById('genColumn2');
      const genreColumn3 = document.getElementById('genColumn3');

      // Vérifier si data.results est défini et s'il contient des éléments
      if (data.results && data.results.length > 0) {
        // Afficher les 6 premiers films de la catégorie sélectionnée
        genreColumn1.classList.add('column');
        genreColumn2.classList.add('column');
        genreColumn3.classList.add('column');

        for (let i = 0; i < Math.min(6, data.results.length); i++) {
          if (data.results[i].image_url) {
            const imageUrl = data.results[i].image_url;
            const movieTitle = data.results[i].title;

            const genreImg = document.createElement('img');
            genreImg.src = imageUrl;
            genreImg.onerror = function() {
              genreImg.src='images/page-not-found.jpg'
            };

            const overlay = document.createElement('div');
            overlay.classList.add('overlay');

            const title = document.createElement('h3');
            title.textContent = movieTitle;

            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'Détails';
            fetch(data.results[i].url)
              .then(response => response.json())
              .then((data) => {
                detailsButton.addEventListener('click', () => {
                  openModal(data.id)
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
        }
      }
    })
    .catch(error => {
      console.error('En attente de la séléction d\'un genre pour le chargement des images:', error);
    });
}


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

  fetch(MAIN_URL + id)
      .then(response => response.json())
      .then(data => {

          document.getElementById('modalImage').src = data["image_url"];
          document.getElementById('modalImage').onerror = function() {
            document.getElementById('modalImage').src='images/page-not-found.jpg'
          };
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
const voirPlusButtonsMob = document.querySelectorAll('.btn-voir-plus');
const hiddenElements = document.querySelectorAll('.hiddenElements');
const hiddenElements2 = document.querySelectorAll('.hiddenElements2');
const movieGrid = document.querySelectorAll('.movies-grid');
const voirMoins = document.querySelectorAll('.btn-container-moins');
const voirMoinsTab = document.querySelectorAll('.btn-container-moins-tab')
const voirPlusTab = document.querySelectorAll('.btn-container-tab');
const columns = document.querySelectorAll('.column');

voirPlusButtonsMob.forEach(button => {
  button.addEventListener('click', () => {
    hiddenElements.forEach(element => {
      element.style.display = "flex";
    });
    hiddenElements2.forEach(element => {
      element.style.display = "flex";
    });
    voirPlusButtonsMob.forEach(btn => {
      btn.style.display = "none";
    });
    movieGrid.forEach(grid => {
      grid.style.flexDirection ="column";
    });
    voirMoins.forEach(element => {
      element.style.display = "flex";
    });
  });
});

const voirMoinsButtonsMob = document.querySelectorAll('.btn-voir-moins');

voirMoinsButtonsMob.forEach(button => {
  button.addEventListener('click', () => {
    hiddenElements.forEach(element => {
      element.style.display = "none";
    });
    hiddenElements2.forEach(element => {
      element.style.display = "none";
    });
    voirPlusButtonsMob.forEach(btn => {
      btn.style.display = "flex";
    });
    movieGrid.forEach(grid => {
      grid.style.flexDirection ="column";
    });
    voirMoins.forEach(element => {
      element.style.display = "none";
    });
  });
});

const voirPlusButtonsTab = document.querySelectorAll('.btn-voir-plus-tab');

voirPlusButtonsTab.forEach(button => {
  button.addEventListener('click', () => {
    hiddenElements2.forEach(element => {
      element.style.display = "flex";
    });
    voirPlusButtonsTab.forEach(btn => {
      btn.style.display = "none";
    });
    movieGrid.forEach(grid => {
      grid.style.flexDirection ="column";
    });
    columns.forEach(col => {
      col.style.flexDirection ="row";
    });
    voirMoinsTab.forEach(element => {
      element.style.display = "flex";
    });
  });
});

const voirMoinsButtonsTab = document.querySelectorAll('.btn-voir-moins-tab');

voirMoinsButtonsTab.forEach(button => {
  button.addEventListener('click', () => {
    movieGrid.forEach(grid => {
      grid.style.flexDirection ="row";
    });
    columns.forEach(col => {
      col.style.flexDirection ="column";
    });
    hiddenElements2.forEach(element => {
      element.style.display = "none";
    });
    voirPlusButtonsTab.forEach(btn => {
      btn.style.display = "flex";
    });
    voirMoinsTab.forEach(element => {
      element.style.display = "none";
    });
  });
});

getBestMovie()
fetchMovies("best-movies", BEST_MOVIE_URL)
fetchMovies("comedy", COMEDY_URL)
fetchMovies("Sci-Fi", SCI_FI_URL)
fetchGenres()
fetchMoviesByGenre()