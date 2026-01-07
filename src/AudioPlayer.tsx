import { useRef, useState } from "react";
import "./AudioPlayer.css";

interface Track {
  title: string;
  src: string;
}

const tracks: Track[] = [
  { title: "Half Life Original Soundtrack - Track 27 - Valve Theme", src: "/music/1.mp3" },
  { title: "Half Life Original Soundtrack - Track 10 - Drums and Riffs", src: "/music/2.mp3"},
];

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (index: number) => {
    if (!audioRef.current) return;

    if (currentIndex === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.src = tracks[index].src;
    audioRef.current.play();

    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <><video
          className="bg-video"
          autoPlay
          muted
          loop
          playsInline
      >
          <source src="/video/bg.mp4" type="video/mp4" />
      </video>
      <div className="overlay"></div>
      <div className="player">
              <h1>Audio Player</h1>
              <ul className="playlist">
                  {tracks.map((track, index) => (
                      <li
                          key={index}
                          className={index === currentIndex ? "active" : ""}
                      >
                          {currentIndex === index ? <img src="/wave.png"></img> : ""}
                          <span>{track.title}</span>

                          <button onClick={() => playTrack(index)}>
                              {index === currentIndex && isPlaying ? "⏸" : "▶"}
                          </button>
                      </li>
                  ))}
              </ul>

              <audio ref={audioRef} />
          </div></>
  );
}
