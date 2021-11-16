const baseURL = "https://api.giphy.com/v1/gifs/trending";
const searchURL = "https://api.giphy.com/v1/gifs/search";
const key = "J84NNeLyRbnq7z2D4CPjX9Lb8LQaXw9h";

url = `${baseURL}?api_key=${key}`;

const trending = document.querySelector('.trending');
const trendingGifs = document.querySelector('.trending-gifs');
const show = document.querySelector('#show');
const clear = document.querySelector('#clear');
const submit = document.querySelector('#submit');
const input = document.querySelector('input');
const searchSec = document.querySelector('.search');
const searchGifs = document.querySelector('.search-gifs');
const clear2 = document.querySelector('#clear2');

show.addEventListener('click', fetchResults);
clear.addEventListener('click', clearTrending);
submit.addEventListener('click', fetchSearch);
clear2.addEventListener('click', clearSearch);

function fetchResults(e) {
    e.preventDefault();
    fetch(url)
    .then(res => res.json())
    .then(json => displayResults(json))
    .catch(err => console.log(err))
};

function displayResults(json) {
    while (trendingGifs.firstChild) {
        trendingGifs.removeChild(trendingGifs.firstChild);
    }
    for (i = 0; i <=4; i++) {
        let gif = document.createElement('a');
        gif.href = json.data[i].url;
        gif.innerHTML = `<img src=${json.data[i].images.fixed_height_downsampled.url} alt="gif failed to load">`;
        trendingGifs.appendChild(gif);
    }
};

function clearTrending() {
    while (trendingGifs.firstChild) {
        trendingGifs.removeChild(trendingGifs.firstChild);
    }
};

function fetchSearch(e) {
    e.preventDefault();
    let searchValue = input.value;
    let url2 = `${searchURL}?api_key=${key}&q=${searchValue}`;
    fetch(url2)
    .then(res => res.json())
    .then(json => displaySearch(json))
    .catch(err => console.log(err))
};

function displaySearch(json) {
    while (searchGifs.firstChild) {
        searchGifs.removeChild(searchGifs.firstChild);
    }
    if (input.value === "") {
        searchGifs.innerText = "Please enter search criteria!"
    } else {
        for (i = 0; i <=4; i++) {
            let gif = document.createElement('a');
            gif.href = json.data[i].url;
            gif.innerHTML = `<img src=${json.data[i].images.fixed_height_downsampled.url} alt="gif failed to load">`;
            searchGifs.appendChild(gif);
        }
    }
    input.value = "";
};

function clearSearch(e) {
    e.preventDefault();
    while (searchGifs.firstChild) {
        searchGifs.removeChild(searchGifs.firstChild);
    }
};