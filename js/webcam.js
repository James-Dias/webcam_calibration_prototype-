'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById("snap");
//const snap2 = document.getElementById("snap2");
//const snap = document.getElementsByClassName("snap");
const stopcam = document.getElementById("stopcam");
const errorMsgElement = document.querySelector('span#errorMsg');

const constraints = {
  audio: false,
  video: {
    width: 1280, height: 720
  }
};

// Access webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    console.error('navigator.getUserMedia error:', e);
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

// Success
function handleSuccess(stream) {
  console.log('getUserMedia({audio: false}) got stream:', stream);
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
init();

// Draw image
var context = canvas.getContext('2d');
snap.addEventListener("click", function() {
  download_img("1");
});

snap2.addEventListener("click", function() {
  download_img("2");
});

snap3.addEventListener("click", function() {
  download_img("3");
});

snap4.addEventListener("click", function() {
  download_img("4");
});

snap5.addEventListener("click", function() {
  download_img("5");
});

snap6.addEventListener("click", function() {
  download_img("6");
});

snap7.addEventListener("click", function() {
  download_img("7");
});

snap8.addEventListener("click", function() {
  download_img("8");
});

function download_img(name) {
  context.drawImage(video, 0, 0, 640, 480);
  //var dataURI = canvas.toDataURL('image/jpeg'); //O resultado é um BASE64 de uma imagem.
  //document.querySelector("#base_img").value = dataURI;
  //var myImg = document.getElementById("canvas").src;

  canvas.toBlob(function(blob){
      //const url = URL.createObjectURL(blob)
      // podemos usar esta URL em um elemento de vídeo, ou fazer upload do blob, etc.
      // e então, não precisamos mais da câmera
      let a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name;
      document.body.appendChild(a);
      a.click();
  }, 'image/jpeg', 0.95)

}

stopcam.addEventListener("click", function() {
  stream.getTracks().forEach(function(track) {
    track.stop();
  });
});
