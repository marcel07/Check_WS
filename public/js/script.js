var audio = document.getElementsByTagName('audio')[0];
var stopBtn = document.getElementById('stopButton');

audio.volume = 0.2;
stopBtn.addEventListener('click', () => {
  if(!audio.paused) {
    stopBtn.innerText = 'Play';
    audio.pause();
  } else {
    stopBtn.innerText = 'Pause';
    audio.play();
  }
})