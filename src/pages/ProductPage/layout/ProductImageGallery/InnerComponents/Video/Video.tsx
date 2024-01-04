// Import react dependencies
import { useRef, useState } from "react";
// Import custom hooks
import useWindowSize from "../../../../../../hooks/useWindowSize";
// Import icons
import PauseIcon from "../../../../../../Icons/PauseIcon";
import PlayIcon from "../../../../../../Icons/PlayIcon";

/**
 * Video Component
 *
 * This is a React functional component. It displays a video with play/pause controls and a button to open the video in a modal. The video is muted and loops indefinitely. The component uses a custom hook, `useWindowSize`, to get the current window size and adjust the behavior of the video and its controls based on the window size.
 *
 * @param {string} props.src - The source URL for the video.
 * @param {Function} props.openModal - A function to open the video in a modal.
 *
 * @example
 * <Video src="video.mp4" openModal={handleOpenModal} />
 *
 * @returns A JSX fragment that consists of a `video` element with the `ref`, `src`, `playsInline`, `loop`, `poster`, and `muted` attributes, a `button` element to open the video in a modal, and a `button` element to play/pause the video. The `onClick` and `onTouchStart` events of the play/pause button call the `handleVideoPlayPause` function, which plays or pauses the video and updates the `videoControl` state.
 */

export function Video({ src, openModal }: { src: string; openModal: () => void }) {
  const [videoControl, setVideoControl] = useState({
    isFirstPlayback: true,
    isPlaying: false,
  }); // Set the initial state of the video controls
  const videoRef = useRef<HTMLVideoElement | null>(null); // Create a ref for the video element

  const { width } = useWindowSize(); // Get the current window size from the useWindowSize custom hook

  // Play or pause the video and update the videoControl state
  function handleVideoPlayPause() {
    if (!videoRef.current) return; // Return if the video ref does not exist

    // Play or pause the video based on the current state
    if (videoControl.isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    // Update the videoControl state
    setVideoControl((prevState) => ({
      isFirstPlayback: false,
      isPlaying: !prevState.isPlaying,
    }));
  }

  return (
    <>
      <video
        ref={videoRef} // Set the ref to the videoRef
        src={src}
        playsInline // Play the video inline in mobile devices
        loop // Loop the video indefinitely
        poster={src.replace("mp4?imwidth=800", "jpg?=f=m")} // Set the poster image to the first frame of the video
        muted // Mute the video
      />
      <button
        className="product-image-gallery__video-preview-btn"
        onClick={width >= 900 ? () => openModal() : undefined} // Open the video in a modal only on larger devices
      >
        {/* Visually hidden text for accessibility and SEO purposes */}
        <span className="visually-hidden">Naciśnij aby powiększyć wideo</span>
      </button>

      <button
        className={`product-image-gallery__video-btn-control${
          videoControl.isFirstPlayback ? ` firstPlayback` : ""
        }`} // Add the `firstPlayback` class if the video is played for the first time
        onClick={width >= 900 ? handleVideoPlayPause : undefined} // Play or pause the video only on larger devices
        onTouchStart={width < 900 ? handleVideoPlayPause : undefined} // Play or pause the video on smaller devices
      >
        {/* Visually hidden text for accessibility and SEO purposes */}
        <span className="visually-hidden">
          {videoControl.isPlaying ? "Zatrzymaj" : "Odtwórz"} wideo
        </span>

        {/* Render the play or pause icon based on the current state */}
        {videoControl.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </>
  );
}
