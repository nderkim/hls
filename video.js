export const createVideo = (src) =>
  new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;

    const timeout = setTimeout(() => {
      video.src = "";
      reject(new Error("video load timeout"));
    }, 3000);

    video.oncanplay = () => {
      clearTimeout(timeout);
      resolve(video);
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      reject(new Error("hls not supported"));
    }
  });
