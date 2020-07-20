const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const range = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');
function togglePlay() {
    if (video.paused)
        video.play();
    else
        video.pause();

/*    const method = video.paused ? 'play' : 'pause';
    video[method]();*/
}
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggleButton.textContent = icon;
}
function skipVideo() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
    video[this.name] = this.value;
}

function positionVideoPlayerSlider() {
    const position = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${position}%`;
}
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
function displayFull() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    else {
        player.requestFullscreen();
    }
}
toggleButton.addEventListener('click', togglePlay);
fullScreen.addEventListener('click', displayFull);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
skipButtons.forEach( button => button.addEventListener('click', skipVideo));
range.forEach( slider => slider.addEventListener('change', handleRangeUpdate));
video.addEventListener('timeupdate', positionVideoPlayerSlider);

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

























