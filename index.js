import { createVideo } from "./video.js";

(async () => {
  const src = new URL(document.location).searchParams.get("src");
  if (src) {
    const video = await createVideo(src);
    document.body.appendChild(video);
  }
})();
