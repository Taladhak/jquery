// Initialize variables to keep track of movie IDs and the list of movies
let movId = 0;
let movieList = [];

// Event handler for movie form submission
$("#movie-form").on("submit", function(event){
    event.preventDefault();
    // Retrieve title and rating from input fields
    let title = $("#title").val();
    let rating = $("#rating").val();    
    // Create a movie data object with title, rating, and unique ID
    let movieData = { title, rating, movId };
    // Generate HTML for the new movie entry
    const HTMLAppend = createMovieDataHTML(movieData);

    // Increment the movie ID and add the movie data to the list
    movId++;
    movieList.push(movieData);

    // Append the new movie entry HTML to the movie table body and reset the form
    $("#movie-body").append(HTMLAppend);
    $("#movie-form").trigger("reset");
});

// Event handler for deleting a movie entry
$("tbody").on("click", ".btn.btn-danger", function(event) {
    // Retrieve the ID of the movie to be deleted
    let deleteId = +$(event.target).data("deleteId"); 
    // Find the index of the movie with the given ID in the movie list
    let indexRemove = movieList.findIndex(movie => movie.movId === deleteId);
    
    // Remove the movie entry from the list and the corresponding HTML row
    movieList.splice(indexRemove, 1);
    $(event.target).closest("tr").remove();
});

// Event handler for sorting movie entries by title or rating
$(".title, .rating").on("click", function(evt) {
    // Determine the key to sort by (title or rating) and the sorting direction
    let keyToSortBy = $(evt.target).hasClass("title") ? "title" : "rating";
    let direction = $(evt.target).hasClass("down") ? "down" : "up";
    // Sort the movies based on the selected key and direction
    let sortedMovies = sortBy([...movieList], keyToSortBy, direction);

    // Clear the movie table body
    $("#movie-body").empty();
    
    // Append the sorted movie entries to the movie table
    for (let movie of sortedMovies) {
        const HTMLtoAppend = createMovieDataHTML(movie);
        $("#movie-body").append(HTMLtoAppend);
    }

    // Toggle the sorting icon to indicate the current sorting direction
    $(evt.target).toggleClass("fa-sort-down fa-sort-up");
});

// Function to sort an array of objects based on a key and direction
function sortBy(array, keyToSortBy, direction) {
    return array.sort((a, b) => {
        if (keyToSortBy === "rating") {
            // Sort numbers in ascending or descending order based on direction
            return direction === "up" ? a[keyToSortBy] - b[keyToSortBy] : b[keyToSortBy] - a[keyToSortBy];
        } else {
            // Sort strings in alphabetical order based on direction
            return direction === "up" ? a[keyToSortBy].localeCompare(b[keyToSortBy]) : b[keyToSortBy].localeCompare(a[keyToSortBy]);
        }
    });
}

// Function to generate HTML for a movie data entry
function createMovieDataHTML(data) {
    return `
        <tr>
            <td>${data.title}</td>
            <td>${data.rating}</td>
            <td>
                <button class="btn btn-danger" data-delete-id=${data.movId}>
                    Delete
                </button>
            </td>
        </tr>
    `;
}

