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
// Ticket Requests page
const ticketForm = document.querySelector("#ticketForm");

if (ticketForm) {
    const ticketPrice = 1500;

    // Only titles with a scheduled sample screening can be requested.
    const screeningMovieIds = [1, 2, 3, 5];

    const nameInput = document.querySelector("#fullName");
    const emailInput = document.querySelector("#email");
    const movieSelect = document.querySelector("#ticketMovie");
    const screeningSelect = document.querySelector("#screening");
    const quantityInput = document.querySelector("#quantity");
    const formMessage = document.querySelector("#formMessage");
    const confirmation = document.querySelector("#confirmation");

    const requestToast = new bootstrap.Toast(
        document.querySelector("#requestToast"),
        { delay: 6000 }
    );

    function formatMoney(amount) {
        return "J$" + amount.toLocaleString("en-JM", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function getSelectedMovie() {
        return movies.find(function (movie) {
            return movie.id === Number(movieSelect.value);
        });
    }

    function hasAvailableScreening(movie) {
        return Boolean(movie && screeningMovieIds.includes(movie.id));
    }

    function getValidQuantity() {
        const quantity = Number(quantityInput.value);

        if (Number.isInteger(quantity) && quantity >= 1 && quantity <= 6) {
            return quantity;
        }

        return 0;
    }

    // Fill the title dropdown from the existing movies array.
    for (const movie of movies) {
        const option = document.createElement("option");

        option.value = movie.id;
        option.textContent =
            `${movie.title} (${getScreeningType(movie)})`;

        if (!hasAvailableScreening(movie)) {
            option.disabled = true;
            option.textContent += " - screening to be announced";
        }

        movieSelect.appendChild(option);
    }

    function updateScreeningOptions() {
        const movie = getSelectedMovie();

        screeningSelect.innerHTML = "";
        screeningSelect.add(new Option("Choose a screening", ""));
        screeningSelect.disabled = !hasAvailableScreening(movie);

        if (hasAvailableScreening(movie)) {
            screeningSelect.add(new Option(movie.screening, "sample"));
        } else {
            screeningSelect.options[0].textContent = "Choose a title first";
        }
    }

    function updateSummary() {
        const movie = getSelectedMovie();
        const quantity = getValidQuantity();

        const hasScreening =
            hasAvailableScreening(movie) &&
            screeningSelect.value === "sample";

        const total = hasScreening ? quantity * ticketPrice : 0;

        document.querySelector("#ticketTotal").textContent =
            formatMoney(total);

        document.querySelector("#summaryMovie").textContent =
            movie ? movie.title : "No title selected";

        document.querySelector("#summaryScreening").textContent =
            hasScreening ? movie.screening : "No screening selected";

        document.querySelector("#summaryQuantity").textContent =
            quantity ? String(quantity) : "Choose 1 to 6";
    }

    function setFieldState(field, isValid) {
        field.classList.toggle("is-invalid", !isValid);
        field.setAttribute("aria-invalid", String(!isValid));
    }

    function clearPreviousFeedback() {
        confirmation.classList.add("d-none");
        formMessage.textContent = "";
        requestToast.hide();

        for (const field of ticketForm.querySelectorAll("input, select")) {
            field.classList.remove("is-invalid");
            field.removeAttribute("aria-invalid");
        }
    }

    movieSelect.addEventListener("change", function () {
        updateScreeningOptions();
        updateSummary();
    });

    screeningSelect.addEventListener("change", updateSummary);
    quantityInput.addEventListener("input", updateSummary);

    // Editing a request removes confirmation for the previous values.
    ticketForm.addEventListener("input", clearPreviousFeedback);
    ticketForm.addEventListener("change", clearPreviousFeedback);

    ticketForm.addEventListener("submit", function (event) {
        event.preventDefault();

        nameInput.value = nameInput.value.trim();
        emailInput.value = emailInput.value.trim();

        const movie = getSelectedMovie();
        const quantity = getValidQuantity();

        const nameValid = nameInput.value.length >= 2;
        const emailValid =
            emailInput.value !== "" && emailInput.checkValidity();
        const movieValid = hasAvailableScreening(movie);
        const screeningValid =
            movieValid && screeningSelect.value === "sample";
        const quantityValid = quantity !== 0;

        setFieldState(nameInput, nameValid);
        setFieldState(emailInput, emailValid);
        setFieldState(movieSelect, movieValid);
        setFieldState(screeningSelect, screeningValid);
        setFieldState(quantityInput, quantityValid);

        if (
            !nameValid ||
            !emailValid ||
            !movieValid ||
            !screeningValid ||
            !quantityValid
        ) {
            confirmation.classList.add("d-none");
            formMessage.textContent =
                "Please correct the highlighted fields.";

            ticketForm.querySelector(".is-invalid").focus();
            return;
        }

        formMessage.textContent = "";

        const total = quantity * ticketPrice;
        const ticketWord = quantity === 1 ? "ticket" : "tickets";

        // textContent displays the name safely as text.
        confirmation.textContent =
            `Thank you, ${nameInput.value}. Your demonstration request ` +
            `for ${quantity} ${ticketWord} to ${movie.title} is complete. ` +
            `Screening: ${movie.screening}. ` +
            `Sample total: ${formatMoney(total)}. ` +
            `No real booking or email has been sent.`;

        confirmation.classList.remove("d-none");
        requestToast.show();
    });

    // Meaningful jQuery event handling and DOM interaction.
    $("#summaryToggle").on("click", function () {
        const isExpanded = $(this).attr("aria-expanded") === "true";

        $(this)
            .attr("aria-expanded", String(!isExpanded))
            .text(isExpanded ? "Show Summary" : "Hide Summary");

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        $("#summaryDetails")
            .stop(true, true)
            .slideToggle(reduceMotion ? 0 : 200);
    });

    updateScreeningOptions();
    updateSummary();
}