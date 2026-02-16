import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {

  const musicAPI = [
    {
      songName: "No Sleep",
      songArtist: "Kontraa",
      songSrc: "/Assets/songs/no-sleep.mp3",
      songAvatar: "/Assets/Images/image1.jpg",
    },
    {
      songName: "Pop 05",
      songArtist: "Grigoriy Nuzhny",
      songSrc: "/Assets/songs/pop_05.mp3",
      songAvatar: "/Assets/Images/image2.jpg",
    },
    {
      songName: "Relaxing In Nature",
      songArtist: "Deigo Nava",
      songSrc: "/Assets/songs/relaxing_in_nature.mp3",
      songAvatar: "/Assets/Images/image3.jpg",
    },
    {
      songName: "Romantic",
      songArtist: "Francisco Alvear",
      songSrc: "/Assets/songs/romantic.mp3",
      songAvatar: "/Assets/Images/image4.jpg",
    },
    {
      songName: "Valley Sunset",
      songArtist: "Alejandro Magana (A.M)",
      songSrc: "/Assets/songs/valley_sunset.mp3",
      songAvatar: "/Assets/Images/image5.jpg",
    },
    {
      songName: "Very Happy Christmas",
      songArtist: "Michael Ramir",
      songSrc: "/Assets/songs/very_happy_christmas.mp3",
      songAvatar: "/Assets/Images/image6.jpg",
    },
  ];

  const [musicIndex, setMusicIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState("00 : 00");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");

  const currentAudio = useRef(null);

  /* Auto Play When Song Changes */
  useEffect(() => {
    if (isAudioPlaying) {
      currentAudio.current.play();
    }
  }, [musicIndex]);

  /* Play / Pause */
  const handleAudioPlay = () => {
    if (isAudioPlaying) {
      currentAudio.current.pause();
    } else {
      currentAudio.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  /* Next Song */
  const handleNextSong = () => {
    setMusicIndex((prev) =>
      prev === musicAPI.length - 1 ? 0 : prev + 1
    );
  };

  /* Previous Song */
  const handlePrevSong = () => {
    setMusicIndex((prev) =>
      prev === 0 ? musicAPI.length - 1 : prev - 1
    );
  };

  /* Progress Bar Change */
  const handleMusicProgressBar = (e) => {
    const value = e.target.value;
    const audio = currentAudio.current;
    audio.currentTime = (value * audio.duration) / 100;
    setAudioProgress(value);
  };

  /* Time Update */
  const handleAudioUpdate = () => {
    const audio = currentAudio.current;

    if (!audio.duration) return;

    const totalMin = Math.floor(audio.duration / 60);
    const totalSec = Math.floor(audio.duration % 60);

    const currentMin = Math.floor(audio.currentTime / 60);
    const currentSec = Math.floor(audio.currentTime % 60);

    setMusicTotalLength(
      `${totalMin < 10 ? "0" : ""}${totalMin} : ${
        totalSec < 10 ? "0" : ""
      }${totalSec}`
    );

    setMusicCurrentTime(
      `${currentMin < 10 ? "0" : ""}${currentMin} : ${
        currentSec < 10 ? "0" : ""
      }${currentSec}`
    );

    const progress = (audio.currentTime / audio.duration) * 100;
    setAudioProgress(progress);
  };

  const currentSong = musicAPI[musicIndex];

  return (
    <div className="container">
      <audio
        ref={currentAudio}
        src={currentSong.songSrc}
        onTimeUpdate={handleAudioUpdate}
        onEnded={handleNextSong}
      />

      <div className="music-Container">
        <p className="musicPlayer">Music Player</p>

        <p className="music-Head-Name">{currentSong.songName}</p>

        <p className="music-Artist-Name">{currentSong.songArtist}</p>

        <img
          src={currentSong.songAvatar}
          alt="Song Avatar"
          id="songAvatar"
        />

        <div className="musicTimerDiv">
          <p>{musicCurrentTime}</p>
          <p>{musicTotalLength}</p>
        </div>

        <input
          type="range"
          className="musicProgressBar"
          value={audioProgress}
          onChange={handleMusicProgressBar}
        />

        <div className="musicControlers">
          <i
            className="fa-solid fa-backward musicControler"
            onClick={handlePrevSong}
          ></i>

          <i
            className={`fa-solid ${
              isAudioPlaying ? "fa-pause-circle" : "fa-circle-play"
            } playBtn`}
            onClick={handleAudioPlay}
          ></i>

          <i
            className="fa-solid fa-forward musicControler"
            onClick={handleNextSong}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default App;


