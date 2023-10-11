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
    photo: "img/nervy.jpeg",
    title: "Нервы",
    song: "96 минут",
  },
  {
    url: "audio/batarei.mp3",
    photo: "img/nervy.jpeg",
    title: "Нервы",
    song: "Батареи",
  },
  {
    url: "audio/glupaya.mp3",
    photo: "img/nervy.jpeg",
    title: "Нервы",
    song: "Глупая",
  },
];

let currentIndex = 0;

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
  player.load(trackToPlay.url);
  console.log(trackToPlay);
  player.on("ready", () => {
    player.play();
    imgOFTrack.src = trackToPlay.photo;
    singerOFTrack.textContent = trackToPlay.title;
    nameOfTrack.textContent = trackToPlay.song;
    play.className = "pause";
    //поменять иконку на паузу
    // функция изменения времени
    duration.textContent = formatTime(player.getDuration());
  });
};

const switchTrack = (direction) => {
  player.empty();

  if (direction === "next") {
    currentIndex = (currentIndex + 1) % arrayPlaylist.length;
    playTrack(currentIndex);
  } else if (direction === "back") {
    currentIndex =
      (currentIndex - 1 + arrayPlaylist.length) % arrayPlaylist.length;

    playTrack(currentIndex);
  }
};

play.addEventListener("click", () => {
  if (player.isPlaying()) {
    play.className = "play-pause";
    player.pause();
  } else {
    play.className = "pause";
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

player.on("finish", () => {
  //поставить завичимость от повтора
  switchTrack("next");
});

// Загрузка первого трека при загрузке страницы

playTrack(currentIndex);
// };
