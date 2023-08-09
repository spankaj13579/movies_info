// $('#movie').html(``);
$(document).ready(()=>
{
    $('#searchForm').on('submit', (e)=>
    {
        let serachText= $('#searchText').val();
        getMovies(serachText);
        e.preventDefault();
    });
});
function getMovies(serachText)
{
    
    axios.get('http://www.omdbapi.com/?s=' + serachText + '&apikey=thewdb')
    .then((response)=>
    {
        $('#searchText').val('');
        console.log(response)
        let output='';
        if(response.data.Error)
        {
            output = `
            <div class="jumbotron mt-4">
                <h3 class="text-center text-secondary">No Movies Found</h3>
            </div>
            `;
        }
        else{
            let movies= response.data.Search;
            
            $.each(movies, (index, movie)=>
            {
                output += `
                <div class="col-md-3 justify-content-center">
                    <div class="well text-center center">
                    <img src="${movie.Poster}" alt="Image not found for ${movie.Title}">
                    <h5 class= 'truncateLongTexts'>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" href="#" class="btn btn-primary button">Movie Details</a>
                    </div>
                </div>
                `;
            });
        }
        
        $('#movies').html(output);
    })
    .catch((err)=>
    {
        console.log(err);
    })
}

function movieSelected(id)
{
    sessionStorage.setItem('movieId', id);
    window.location='movie.html';
    return false;
}
function getMovie()
{
    let movieId=sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com/?i=' + movieId + '&apikey=thewdb')
    .then((response)=>
    {
        $('#loader').hide();
        // console.log(response)
        let movie= response.data;
        let output= `
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                </ul>
            </div>
            </div>
            <div class= 'row'>
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Back to Search</a>
                </div>
            </div>
        `;
        $('#movie').html(output);
    })
    .catch((err)=>
    {
        console.log(err);
    })
}