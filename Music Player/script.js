// Elements
const audio = document.getElementById("audio-player");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");

const songListPage = document.getElementById("song-list-page");
const playerPage = document.getElementById("player-page");
const songList = document.getElementById("song-list");
const songCount = document.getElementById("song-count");

const backBtn = document.getElementById("backBtn");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// Playlist
const playlist = [
  {
    title: "Beet Janiya",
    artist: "Jass Manak",
    file: "Beet Janiya-Jass Manak.mp3",
    cover: "jass manak.webp",
    background: "jass manak.webp"
  },
  {
    title: "G.O.A.T",
    artist: "Diljit Dosanjh",
    file: "G.O.A.T-Diljit Dosanjh.mp3",
    cover: "Diljit Dosanjh.webp",
    background: "Diljit Dosanjh.webp"
  },
  {
    title: "Maand",
    artist: "Bayaan, Hasan Raheem, Rovalio",
    file: "Maand-Bayyan x Hassan Raheem x Rovalio.mp3",
    cover: "Mand bg.jpeg",
    background: "Mand bg.jpeg"
  },
  {
    title: "Chal Dil Mera",
    artist: "Ali Zafar",
    file: "Chal Dil Mera-Ali Zafar.mp3",
    cover: "Ali Zafar.jpeg",
    background: "Ali Zafar.jpeg"
  },
  {
    title: "Sajde",
    artist: "Faheem Abdullah",
    file: "Sajde-Faheem Abdullah.mp3",
    cover: "Faheem Abdullah.jpeg",
    background: "Faheem Abdullah.jpeg"
  }
];

let currentTrackIndex = 0;

// Render song list
function renderSongList() {
  songList.innerHTML = "";
  songCount.textContent = `${playlist.length} Songs Available`;

  playlist.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = `${track.title} - ${track.artist}`;
    li.onclick = () => {
      currentTrackIndex = index;
      showPlayer();
      loadTrack(index);
      playTrack();
    };
    songList.appendChild(li);
  });
}

// Show player page
function showPlayer() {
  songListPage.classList.add("hidden");
  playerPage.classList.remove("hidden");
}

// Show song list page
function showSongList() {
  playerPage.classList.add("hidden");
  songListPage.classList.remove("hidden");
}

// Load a track
function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.file;
  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;
  playerPage.style.backgroundImage = `url('${track.background}')`;
  progress.value = 0;
}

// Play
function playTrack() {
  audio.play();
}

// Pause
function pauseTrack() {
  audio.pause();
}

// Next
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

// Previous
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progress.value = (audio.currentTime / audio.duration) * 100;
});

// Seek song when progress changed
progress.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Back button click handler
backBtn.addEventListener("click", () => {
  pauseTrack();
  showSongList();
});

// Control buttons
playBtn.addEventListener("click", playTrack);
pauseBtn.addEventListener("click", pauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Auto next when track ends
audio.addEventListener("ended", nextTrack);

// Initialize
renderSongList();
