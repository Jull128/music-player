// import { WaveSurfer } from "wavesurfer.js";

// Экземпляр плеера
const player = WaveSurfer.create({
  container: ".waveform",
  autoplay: false,
  waveColor: "white",
  progressColor: "pink",
  cursorColor: "red",
  barWidth: 0.02,
  barHeight: 1,
  height: 20,
  barRadius: 1,
});

const play = document.querySelector(".play-pause");
const mix = document.querySelector(".mix");
const back = document.querySelector(".back");
const next = document.querySelector(".next");
const repeat = document.querySelector(".repeat");
const seekBar = document.querySelector(".seek-bar");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
const playlist = document.querySelector(".playlist");
const playlistContainer = document.querySelector(".playlist__container");
const imgOFTrack = document.querySelector(".main__song_img");
const singerOFTrack = document.querySelector(".singer");
const nameOfTrack = document.querySelector(".nameOfTrack");
const showPlaylist = document.querySelector(".navigate_playlist");
const fileInput = document.getElementById("fileInput");

showPlaylist.addEventListener("click", () => {
  if (playlistContainer.className === "playlist__container") {
    showPlaylist.classList.add("rotate");
    playlistContainer.className = "playlist__container show";
  } else {
    showPlaylist.classList.remove("rotate");
    playlistContainer.className = "playlist__container";
  }
});

const arrayPlaylist = [
  {
    url: "audio/96_minutes.mp3",
    photo: "img/nervy.jpeg",
    title: "Нервы",
    song: "96 минут",
  },
  {
    url: "audio/batarei.mp3",
    photo: "img/nervy2.jpg",
    title: "Нервы",
    song: "Батареи",
  },
  {
    url: "audio/glupaya.mp3",
    photo: "img/nervy3.jpg",
    title: "Нервы",
    song: "Глупая",
  },
];

localStorage.setItem("playlist", JSON.stringify(arrayPlaylist));
let arrayPlaylistLS;
const getLS = () => {
  const LS = localStorage.getItem("playlist");
  if (LS) {
    arrayPlaylistLS = JSON.parse(LS);
  } else arrayPlaylistLS = arrayPlaylist;
};
getLS();

let currentIndex = 0;

arrayPlaylistLS.forEach((audio, id) => {
  let track = `
  <li class='item' id=${id} onclick='clicked(this)'>
  <div>${id + 1}</div>
  <div class='icon' ><img src="${audio.photo}"/></div>
  <div class='item__title'>
  <p>${audio.title}</p>
  <p>${audio.song}</p>
  </div>
  </li>
  `;
  playlist.insertAdjacentHTML("beforeend", track);
});

const item = playlist.querySelectorAll("li");
const isPlay = () => {
  if (player.isPlaying()) {
    play.className = "pause";
  } else {
    play.className = "play-pause";

    console.log("wow");
  }
};
isPlay();
const clicked = (item) => {
  let id = item.id;
  currentIndex = id;
  playTrack(currentIndex);
};

const playTrack = (id) => {
  const trackToPlay = arrayPlaylistLS[id];
  player.load(trackToPlay.url);
  console.log(trackToPlay);
  player.on("ready", () => {
    player.play();
    imgOFTrack.src = trackToPlay.photo;
    singerOFTrack.textContent = trackToPlay.title;
    nameOfTrack.textContent = trackToPlay.song;

    duration.textContent = formatTime(player.getDuration());
  });
};

const switchTrack = (direction) => {
  player.empty();

  if (direction === "next") {
    currentIndex = (currentIndex + 1) % arrayPlaylistLS.length;
    playTrack(currentIndex);
  } else if (direction === "back") {
    currentIndex =
      (currentIndex - 1 + arrayPlaylistLS.length) % arrayPlaylistLS.length;

    playTrack(currentIndex);
  }
};

play.addEventListener("click", () => {
  if (player.isPlaying()) {
    play.className = "play-pause";
    player.pause();
  } else {
    play.className = "pause";
    console.log("wow");
    player.play();
  }
});

next.addEventListener("click", () => {
  switchTrack("next");
});

back.addEventListener("click", () => {
  switchTrack("back");
});

// обновление времени
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formatted = `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
  return formatted;
};

const updCurrentTime = () => {
  currentTime.textContent = formatTime(player.getCurrentTime());
};

volumeBar.addEventListener("input", () => {
  const volume = volumeBar.value / 100;
  player.setVolume(volume);
});

seekBar.addEventListener("input", () => {
  updCurrentTime();
  const seekTime = seekBar.value / 100;
  player.seekTo(seekTime);
});

player.on("audioprocess", updCurrentTime);

player.on("seeking", () => {
  updCurrentTime();
  const percentage = (player.getCurrentTime() / player.getDuration()) * 100;
  seekBar.value = percentage;
});

player.on("timeupdate", () => {
  const percentage = (player.getCurrentTime() / player.getDuration()) * 100;
  seekBar.value = percentage;
});

let isRepeating = false;
console.log(isRepeating);
repeat.addEventListener("click", () => {
  isRepeating = !isRepeating;
  console.log(isRepeating);
  if (!isRepeating) {
    repeat.className = "repeat";
  } else if (isRepeating) {
    repeat.className = "repeatOne";
  }
});

player.on("finish", () => {
  if (!isRepeating) {
    switchTrack("next");
  } else if (isRepeating) {
    player.stop();
    player.play();
  }
});

// Загрузка первого трека при загрузке страницы

playTrack(currentIndex);

// Обработчик выбора файла
fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    const listItem = document.createElement("li");
    listItem.textContent = file.name;
    listItem.className = "item";
    player.load(url);
    // listItem.addEventListener("click", function () {
    //   player.src = url;
    //   audio.play();
    // });
    playlist.appendChild(listItem);
  }
});
