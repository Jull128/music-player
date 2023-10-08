// import { WaveSurfer } from "wavesurfer.js";

// Экземпляр плеера
// window.onload = function () {
const player = WaveSurfer.create({
  container: ".waveform",
  waveColor: "grey",
  progressColor: "blue",
  cursorColor: "red",
  barHeight: 2,
  height: 50,
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

const arrayPlaylist = [
  "audio/96_minutes.mp3",
  "audio/batarei.mp3",
  "audio/glupaya.mp3",
];

const currentIndex = 0;

arrayPlaylist.forEach((audio, id) => {
  const track = document.createElement("li");
  track.textContent = `${id + 1}`;
  track.addEventListener("click", () => {
    currentIndex = id;
    playTrack(currentIndex);
  });
  playlist.appendChild(track);
});

const playTrack = (id) => {
  const trackToPlay = arrayPlaylist[id];
  player.load(trackToPlay);
  console.log(trackToPlay);
  player.on("ready", () => {
    player.play();
    //поменять иконку на паузу
    // функция изменения времени
  });
};

play.addEventListener("click", () => {
  //   playTrack(currentIndex);
  if (player.isPlaying()) {
    player.pause();
  } else {
    player.play();
  }
});

// Загрузка первого трека при загрузке страницы

playTrack(currentIndex);
// };
