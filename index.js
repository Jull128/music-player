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
const imgOFTrack = document.querySelector(".main__song_img");
const singerOFTrack = document.querySelector(".singer");
const nameOfTrack = document.querySelector(".nameOfTrack");

const arrayPlaylist = [
  {
    url: "audio/96_minutes.mp3",
    photo: "nervy.jpeg",
    title: "Нервы",
    song: "96 минут",
  },
  {
    url: "audio/batarei.mp3",
    photo: "nervy.jpeg",
    title: "Нервы",
    song: "Батареи",
  },
  {
    url: "audio/glupaya.mp3",
    photo: "nervy.jpeg",
    title: "Нервы",
    song: "Глупая",
  },
];

const currentIndex = 0;

arrayPlaylist.forEach((audio, id) => {
  const track = document.createElement("li");
  track.textContent = `${id + 1}`;
  track.addEventListener("click", () => {
    currentIndex = id;
    playTrack(currentIndex.url);
  });
  playlist.appendChild(track);
});

const playTrack = (id) => {
  const trackToPlay = arrayPlaylist[id];
  player.load(trackToPlay.url);
  console.log(trackToPlay);
  player.on("ready", () => {
    player.play();
    imgOFTrack.src = trackToPlay.photo;
    singerOFTrack.textContent = trackToPlay.title;
    nameOfTrack.textContent = trackToPlay.song;
    play.src = "img/pause.png";
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

// переключение на следующий трек
// переключение на предыдующий трек
// обновление оставшегося времени
// обновление прошедшего времени
// управление ползунком трека
// управление громкостью
// повтор одного трека

// Загрузка первого трека при загрузке страницы

playTrack(currentIndex);
// };
