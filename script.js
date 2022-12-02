var menuIcon = document.querySelector(".menu-icon")
var sidebar = document.querySelector(".sidebar")
var container = document.querySelector(".container")


menuIcon.onclick = function () {
    sidebar.classList.toggle("small-sidebar")
    container.classList.toggle("large-container")
}


// ---------------------main js-----------------------

const API_KEY = "AIzaSyCaByxgbZatU811NGETMB3Xbn9yyYz2ubg"

let q;

let search = async () => {
    let query = document.getElementById("query").value;
    console.log(query)
    let data = await getData(query)
    q = query;
    append(data)
}

let getData = async (query) => {
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyCaByxgbZatU811NGETMB3Xbn9yyYz2ubg`;
    // let url = ` https://swapi.dev/api/people/?search={query}`;

    let res = await fetch(url);
    let data = await res.json();

    console.log(data)
    return data.items;
};

let append = (data) => {
    let container = document.getElementById("container");
    container.innerHTML = "";
    data.forEach((el) => {
        // snippet --> title 
        //  snippet --->  thumbnails -->   medium --->  url
        let img = document.createElement("img")
        img.src = el.snippet.thumbnails.medium.url;

        let h3 = document.createElement("h3")
        h3.innerText = el.snippet.title;

        let div = document.createElement('div');
        div.onclick = () => {
            saveVideo(el);
        }
        div.setAttribute("class", "video");
        div.append(img, h3)

        container.append(div);

    });
};

let saveVideo = (data) => {
    // console.log('data :>> ', data);
    localStorage.setItem("video", JSON.stringify(data));
    window.location.href = "play-video.html"

}


let filter = async () => {
    let data = await getData(q);
    console.log(data);
    data = data.filter((el) => {
        return el.snippet.channelId === "UCvC4D8onUfXzvjTOM-dBfEA";
    });
    append(data);
};

// play video script 

let playVideo = () => {
    let video = JSON.parse(localStorage.getItem("video"));
    let play_video = document.getElementById("play_video");
    let id = video.id.videoId;
    play_video.src = `https://www.youtube.com/embed/${id}`
}


function move(){
   
    window.location.href = "index.html"
}