const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volumeSlider");
const volumeLevel = document.getElementById("volumeLevel");

// Sample songs
const songs = [
  {
    title: "Summer Vibes",
    artist: "Chill Beats",
    src: "music_for_video-please-calm-my-mind-125566.mp3"
  },
  {
    title: "Night Drive",
    artist: "LoFi Mix",
    src: "loksii-no-copyright-music-211881.mp3"
  },
  {
    title: "sonican",
    artist: "sonican Mix",
    src: "sonican-background-music-new-age-nature-465069.mp3"
  }

];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
  document.getElementById("songTitle").innerText = song.title;
  document.getElementById("artistName").innerText = song.artist;
  audio.src = song.src;
}

// Play song
function playSong() {
  isPlaying = true;
  audio.play();
  playIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`; // pause icon
}

// Pause song
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`; // play icon
}

// Toggle play
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Update progress
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";

  // Time update
  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
});

// Click progress bar
progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

// Format time
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

// Next song
document.getElementById("nextBtn").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Previous song
document.getElementById("prevBtn").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Volume control
volumeSlider.addEventListener("click", (e) => {
  const width = volumeSlider.clientWidth;
  const clickX = e.offsetX;
  const volume = clickX / width;

  audio.volume = volume;
  volumeLevel.style.width = (volume * 100) + "%";
});

// Auto play next
audio.addEventListener("ended", () => {
  document.getElementById("nextBtn").click();
});

// Init
loadSong(songs[songIndex]);