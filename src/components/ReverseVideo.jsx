import { useEffect, useRef } from "react";

export default function ReverseVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      // Pause at the end
      video.pause();

      const stepBack = () => {
        if (video.currentTime > 0) {
          video.currentTime -= 0.4; // adjust for smoother/slower reverse
          requestAnimationFrame(stepBack);
        } else {
          // when it reaches the start, play forward again
          video.play();
        }
      };

      requestAnimationFrame(stepBack);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <video
      ref={videoRef}
      className="loading-video"
      src="loading.mp4"
      autoPlay
      muted
      playsInline
    />
  );
}
