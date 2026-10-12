// An array stores the collection.
// Each object describes one title.
const movies = [
    {
        id: 1,
        title: "Judy",
        genre: "Biography / Drama",
        isComingSoon: false,
        image: "images/judy.avif",
        imageAlt: "Judy film poster on a Paris street at night",
        description:
            "Renée Zellweger plays Judy Garland in the winter of 1968, " +
            "as she arrives in London for a run of sold-out concerts.",
        screening:
            "October 16, 2026, at 6:00 PM | Movie Night Screening Room"
    },
    {
        id: 2,
        title: "Pulp Fiction",
        genre: "Crime",
        isComingSoon: false,
        image: "images/pulp-fiction.avif",
        imageAlt: "Pulp Fiction soundtrack record in a record store bin",
        description:
            "Quentin Tarantino's interlocking Los Angeles crime stories, " +
            "back on the big screen for a late-night film night.",
        screening:
            "October 17, 2026, at 8:00 PM | Movie Night Screening Room"
    },
    {
        id: 3,
        title: "Spider-Man: Brand New Day",
        genre: "Superhero",
        isComingSoon: true,
        image: "images/spider-man.avif",
        imageAlt: "Spider-Man suit against a black background",
        description:
            "A featured superhero title in our demonstration movie lineup.",
        screening:
            "Sample screening time to be announced."
    },
    {
        id: 4,
        title: "Fire Wrecks a Forest",
        genre: "Documentary",
        isComingSoon: false,
        image: "images/vintage-fire-wrecks-a-forest.avif",
        imageAlt: "Vintage poster of a burning cigarette under clouds of smoke, " +
            "titled Fire Wrecks a Forest",
        description:
            "A classic-style documentary following forest rangers as they race " +
            "to stop a wildfire started by one careless spark.",
        screening:
            "October 18, 2026, at 2:00 PM | Movie Night Screening Room"
    },
    {
        id: 5,
        title: "Washington D.C.",
        genre: "Comedy",
        isComingSoon: false,
        image: "images/vintage-washington-dc.avif",
        imageAlt: "Vintage travel poster of cartoon travellers walking past " +
            "the Capitol in Washington D.C.",
        description:
            "A light travel comedy about a planeload of mismatched passengers " +
            "on a whirlwind weekend in the capital.",
        screening:
            "October 18, 2026, at 4:00 PM | Movie Night Screening Room"
    },
    {
        id: 6,
        title: "Montreal Winter Sports",
        genre: "Sports",
        isComingSoon: false,
        image: "images/vintage-montreal-winter-sports.avif",
        imageAlt: "Vintage 1924 poster of a skier in a white fur hat above " +
            "a snowy ski jump, titled Montreal Winter Sports",
        description:
            "Set at Montreal's 1924 winter carnival, a determined skier chases " +
            "one last championship before the thaw.",
        screening:
            "October 18, 2026, at 6:00 PM | Movie Night Screening Room"
    }
];

// Reusable function with a meaningful condition.
function getScreeningStatus(movie) {
    if (movie.isComingSoon) {
        return "Coming soon";
    } else {
        return "Now showing";
    }
}

// Home page: continuous poster reel
const reelTrack = document.querySelector("#reelTrack");
const reelToggle = document.querySelector("#reelToggle");

// Builds one poster for the reel. Clones repeat the first set so
// the loop has no gap; they are hidden from screen readers.
function createReelItem(movie, isClone) {
    const item = document.createElement("li");
    item.className = "reel-item";

    if (isClone) {
        item.classList.add("reel-clone");
        item.setAttribute("aria-hidden", "true");
    }

    item.innerHTML = `
        <img src="${movie.image}" alt="${isClone ? "" : movie.imageAlt}">
        <p class="poster-caption">
            <strong>${movie.title}</strong>
            <span>${movie.genre}, ${getScreeningStatus(movie).toLowerCase()}</span>
        </p>
    `;

    return item;
}

if (reelTrack && reelToggle) {
    for (const movie of movies) {
        reelTrack.appendChild(createReelItem(movie, false));
    }

    for (const movie of movies) {
        reelTrack.appendChild(createReelItem(movie, true));
    }

    // Moving content needs a way to stop it.
    reelToggle.addEventListener("click", function () {
        const isPaused = reelTrack.classList.toggle("is-paused");

        reelToggle.textContent = isPaused
            ? "Play poster reel"
            : "Pause poster reel";
    });
}

// Select elements from the page.
const movieGrid = document.querySelector("#movieGrid");
const genreFilter = document.querySelector("#genreFilter");
const resultsCount = document.querySelector("#resultsCount");
const movieModal = document.querySelector("#movieModal");

// Build a poster entry for each matching title.
function renderMovies(selectedGenre) {
    movieGrid.innerHTML = "";

    let visibleCount = 0;

    for (const movie of movies) {
        if (selectedGenre === "All" || movie.genre === selectedGenre) {
            visibleCount++;

            const column = document.createElement("div");
            column.className = "col";

            // This template uses only our own fixed project data.
            // The button's ::after covers the whole entry, so the poster opens the Modal too.
            column.innerHTML = `
                <article class="card h-100 lineup-item">
                    <img src="${movie.image}"
                         class="card-img-top lineup-poster"
                         alt="${movie.imageAlt}"
                         loading="lazy">

                    <div class="card-body p-0">
                        <h2 class="card-title lineup-title">${movie.title}</h2>
                        <p class="card-text title-meta">
                            ${movie.genre}, ${getScreeningStatus(movie).toLowerCase()}
                        </p>

                        <button class="lineup-details"
                                type="button"
                                data-movie-id="${movie.id}"
                                data-bs-toggle="modal"
                                data-bs-target="#movieModal"
                                aria-label="View details for ${movie.title}">
                            View details
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
    poster.alt = movie.imageAlt;

    document.querySelector("#modalType").textContent =
        getScreeningStatus(movie);

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
    const screeningMovieIds = [1, 2, 4, 5, 6];

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
        option.textContent = movie.title;

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
            `for ${quantity} ${ticketWord} to ${movie.title} has been sent. ` +
            `Screening: ${movie.screening}. ` +
            `Sample total: ${formatMoney(total)}. ` +
            `No real booking was made and no email was sent.`;

        confirmation.classList.remove("d-none");
        requestToast.show();
    });

    // Meaningful jQuery event handling and DOM interaction.
    $("#summaryToggle").on("click", function () {
        const isExpanded = $(this).attr("aria-expanded") === "true";

        $(this)
            .attr("aria-expanded", String(!isExpanded))
            .text(isExpanded ? "Show summary" : "Hide summary");

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