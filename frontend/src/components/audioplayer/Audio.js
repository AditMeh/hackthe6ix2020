import React from "react";

import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";

// import song from './trap_anthem.mp3';

import useAudioPlayer from './useAudioPlayer';

function Audio(props) {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();

  return (
    <div className="player">
      <audio id="audio">
        <source src={props.storagelink} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Song songName={props.title} songArtist={props.artist} />
      <div className="controls">
        {playing ? 
          <Pause handleClick={() => setPlaying(false)} /> :
          <Play handleClick={() => setPlaying(true)} />
        }
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </div>
    </div>
  );
}

export default Audio;
