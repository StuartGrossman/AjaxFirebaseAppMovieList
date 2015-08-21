var firebase = 'https://movieajaxapp.firebaseio.com/';
var newMovie;
var movieListArray = [];
var editMovie;

function movie(name, year, genre, description, img){ //creating new movie object
	this.name = name;
	this.year = year;
	this.genre = genre;
	this.description = description;
	this.img = img;
	this.id = null;
}

function addmovie(){ // grabs input value from page, and stores them into a newMovie Object
	var name = document.getElementById('name').value;
	var year = document.getElementById('year').value;
	var genre = document.getElementById('genre').value;
	var description = document.getElementById('description').value;
	var img = document.getElementById('img').value;
	newMovie = new movie(name, year, genre, description, img);

}

function addMovieToDataBase(){ // first request to server POST , adding newMovie Object
	addmovie()

	var req = new XMLHttpRequest();

	req.open('POST', firebase + '.json'); // concationates the url with .json String

	req.onload = function(){
		this.response;
		console.log(JSON.parse(this.response)); // rec.response
	}
	req.send(JSON.stringify(newMovie));

	location.reload();
}

function getMovieInformation(){
	var req = new XMLHttpRequest();

	req.open('GET', firebase + '.json');

	req.onload = function(){
		if(this.status >= 200 && this.status < 400){
			var res = JSON.parse(this.response);
			console.log(res)
			for(prop in res){
				movieListArray.push(res[prop])
				console.log(prop)
				res[prop].id = prop
			}
			console.log(movieListArray)
			displayMovie();
		}
	}
	req.send();
}

getMovieInformation();

function displayMovie(){
	var concatString = ""
	for(var i = 0; i < movieListArray.length; i += 1){
		console.log(movieListArray[i])
		concatString += '<li>' +
					'<span style="font-size: 25px;"> ' + movieListArray[i].name + ' </span><br><br>'
					+ '<img class="imgClass" src="' + movieListArray[i].img + '"><br>'
					+ '<span>Year: ' + movieListArray[i].year + ' </span><br> -- <span> ' + movieListArray[i].genre + ' </span><br>'
					+ '<span class="descClass">' + movieListArray[i].description + '</span><br><br><br>'
					+ '<button onclick="createEdit()" class="btn btn-default"> Edit Movie </button><br><br>'
					+ '<button onclick="deleteMovie(' + i + ')" class="btn btn-default"> Delete Movie </button><br><br>'
					
				+ '</li><br>'
	}
	document.getElementById('movielist').innerHTML += concatString
}
function createEdit(){
	var concatString = ""
	for(var i = 0; i < movieListArray.length; i += 1){
		console.log(movieListArray[i])
		concatString += 
			'<div class="form-group">'
				+ '<textarea id="edit-name" rows="4" cols="30" placeholder="">' + movieListArray[i].name + '</textarea>'
			+ '</div>'
			+ '<div class="form-group">'
				+ '<textarea id="edit-year" rows="4" cols="30" placeholder="">' + movieListArray[i].year + '</textarea>'
			+ '</div>'
			+ '<div class="form-group">'
				+ '<textarea id="edit-genre" rows="4" cols="30" placeholder="">' + movieListArray[i].genre + '</textarea>'
			+ '</div>'
			+ '<div class="form-group">'
				+ '<textarea id="edit-descripton" rows="4" cols="30" placeholder="">' + movieListArray[i].description + '</textarea>'
			+ '</div>'
			+ '<div class="form-group">'
				+ '<textarea id="edit-img" rows="4" cols="30" placeholder="">' + movieListArray[i].img + '</textarea>'
			+ '</div>'
			+ '<button class="btn btn-default"  value="" onclick="updateInfo(' + i + ')"> Submit Changes </button><br><br>'
	}
	document.getElementById('editDiv').innerHTML += concatString

}
function updateInfo(i){
	var name = document.getElementById('edit-name').value;
	var year = document.getElementById('edit-year').value;
	var genre = document.getElementById('edit-genre').value;
	var description = document.getElementById('edit-descripton').value;
	var img = document.getElementById('edit-img').value;
	editMovie = new movie(name, year, genre, description, img)
	console.log(editMovie)
	addInfo(i)
	editMovie = {};
	
}

function addInfo(i){

	var req = new XMLHttpRequest();

	req.open('PUT', firebase + movieListArray[i].id + '.json');

	req.onload = function(){
		if(this.status >= 200 && this.status < 400){
			var res = JSON.parse(this.response);
			displayMovie();
			location.reload();
		}
	}
	console.log(editMovie)
	req.send(JSON.stringify(editMovie));

}
function deleteMovie(i) {
   var req = new XMLHttpRequest();
   req.open('DELETE', firebase + movieListArray[i].id + '/.json');
   req.onload = function() {
     if(this.status >= 200 && this.status < 400) {
       movieListArray.splice(i, 1);
       displayMovie();
       location.reload();
     }
     else {
       console.error(this.response);
     }
   }
   req.send();
}

