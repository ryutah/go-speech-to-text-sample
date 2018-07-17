const download = document.querySelector("#download");
const rec = document.querySelector("#rec");
const stop = document.querySelector("#stop");

let recorder;

const handlerRecClick = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(handlerSuccess);
};

const handlerStopClick = () => {
  if (recorder) {
    console.log("stop tracks");
    recorder.stop();
  }

  recorder = null;
};

const handlerSuccess = (stream) => {
  recorder = new MediaRecorder(stream);
  console.log("start rec");

  recorder.start();

  recorder.addEventListener("stop", () => {
    stream.getAudioTracks().forEach((t) => t.stop());
  });

  recorder.addEventListener("dataavailable", (e) => {
    console.log("data avaialable after stop called.");

    if (e.data.size > 0) {
      download.setAttribute(
        "href",
        URL.createObjectURL(new Blob([e.data], { type: "audio/webm" }))
      );
      download.setAttribute("download", "sample.webm");
    }
  });
};

rec.addEventListener("click", handlerRecClick);
stop.addEventListener("click", handlerStopClick);
