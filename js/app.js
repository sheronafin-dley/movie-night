// An array stores the collection.
// Each object describes one title.
const movies = [
    {
        id: 1,
        title: "Jujutsu Kaisen: Shibuya Incident",
        genre: "Anime",
        isEpisodeScreening: true,
        image: "images/jujutsu-kaisen.jfif",
        description:
            "Join our anime night for selected episodes from the Shibuya Incident arc.",
        screening:
            "October 17, 2026, at 7:00 PM | Movie Night Anime Lounge"
    },
    {
        id: 2,
        title: "Death Note",
        genre: "Anime",
        isEpisodeScreening: true,
        image: "images/death-note.jfif",
        description:
            "Explore a tense battle of intelligence during a screening of selected Death Note episodes.",
        screening:
            "October 17, 2026, at 5:00 PM | Movie Night Anime Lounge"
    },
    {
        id: 3,
        title: "Cruella",
        genre: "Crime / Drama",
        isEpisodeScreening: false,
        image: "images/cruella.jfif",
        description:
            "Make it a film night with Cruella and its bold fashion-inspired visual style.",
        screening:
            "October 16, 2026, at 6:00 PM | Movie Night Screening Room"
    },
    {
        id: 4,
        title: "Spider-Man: Brand New Day",
        genre: "Superhero",
        isEpisodeScreening: false,
        image: "images/spider-man.jfif",
        description:
            "A featured superhero title in our demonstration movie lineup.",
        screening:
            "Sample screening time to be announced."
    },
    {
        id: 5,
        title: "Terrifier",
        genre: "Horror",
        isEpisodeScreening: false,
        image: "images/terrifier.jfif",
        description:
            "Our horror selection for viewers interested in a frightening film night.",
        screening:
            "October 16, 2026, at 9:00 PM | Movie Night Screening Room"
    }
];

// Reusable function with a meaningful condition.
function getScreeningType(movie) {
    if (movie.isEpisodeScreening) {
        return "Special episode screening";
    } else {
        return "Film";
    }
}

// Select elements from the page.
const movieGrid = document.querySelector("#movieGrid");
const genreFilter = document.querySelector("#genreFilter");
const resultsCount = document.querySelector("#resultsCount");
const movieModal = document.querySelector("#movieModal");

// Build a Bootstrap card for each matching title.
function renderMovies(selectedGenre) {
    movieGrid.innerHTML = "";

    let visibleCount = 0;

    for (const movie of movies) {
        if (selectedGenre === "All" || movie.genre === selectedGenre) {
            visibleCount++;

            const column = document.createElement("div");
            column.className = "col";

            // This template uses only our own fixed project data.
            column.innerHTML = `
                <article class="card movie-card h-100">
                    <img src="${movie.image}"
                         class="card-img-top movie-poster"
                         alt="${movie.title} poster"
                         loading="lazy">

                    <div class="card-body d-flex flex-column">
                        <div>
                            <span class="badge screening-badge mb-3">
                                ${getScreeningType(movie)}
                            </span>
                        </div>

                        <h2 class="card-title h5">${movie.title}</h2>
                        <p class="movie-category">${movie.genre}</p>

                        <button class="btn btn-primary mt-auto"
                                type="button"
                                data-movie-id="${movie.id}"
                                data-bs-toggle="modal"
                                data-bs-target="#movieModal"
                                aria-label="View details for ${movie.title}">
                            View Details
                        </button>
                    </div>
                </article>
            `;

            movieGrid.appendChild(column);
        }
    }

    resultsCount.textContent =
        `Showing ${visibleCount} of ${movies.length} titles`;
}

// Populate the existing Modal with the chosen title.
function populateMovieDetails(movie) {
    document.querySelector("#modalTitle").textContent = movie.title;

    const poster = document.querySelector("#modalPoster");
    poster.src = movie.image;
    poster.alt = `${movie.title} poster`;

    document.querySelector("#modalType").textContent =
        getScreeningType(movie);

    document.querySelector("#modalGenre").textContent =
        `Genre: ${movie.genre}`;

    document.querySelector("#modalDescription").textContent =
        movie.description;

    document.querySelector("#modalScreening").textContent =
        movie.screening;
}

// These elements exist only on the Movies page.
// The check lets index.html safely use the same app.js file.
if (movieGrid && genreFilter && resultsCount && movieModal) {
    renderMovies("All");

    genreFilter.addEventListener("change", function () {
        renderMovies(genreFilter.value);
    });

    // Bootstrap provides the button that opened the Modal.
    movieModal.addEventListener("show.bs.modal", function (event) {
        const triggerButton = event.relatedTarget;

        if (!triggerButton) {
            return;
        }

        const selectedId = Number(triggerButton.dataset.movieId);
        const selectedMovie = movies.find(function (movie) {
            return movie.id === selectedId;
        });

        if (selectedMovie) {
            populateMovieDetails(selectedMovie);
        } else {
            event.preventDefault();
        }
    });
}