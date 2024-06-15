import React, { useEffect, useRef } from "react";
import { PiPlaylistBold } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function MusicPlayer({ currSong, shouldAutoPlay }) {
  const songName = currSong.name || "Reminder";
  const songImage =
    currSong.img || "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452";
  const artistName = currSong.artist || "The Weeknd";
  const audioUrl = currSong.url || "";
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    if (audioPlayerRef.current && !shouldAutoPlay) {
      audioPlayerRef.current.audio.current.pause();
    }
  }, [currSong]);

  return (
    <div className="bg-[#18181D] w-full h-full rounded-lg">
      <div className="flex flex-col h-full justify-between p-2">
        {/* Image and like details */}
        <div className="flex h-full pt-6">
          <div className="flex justify-center h-full w-[20%]">
            <AiFillLike className="scale-[1.5] mt-2 hover:cursor-pointer" />
          </div>
          {/* Song Image */}
          <div className="flex flex-col justify-start gap-4 h-full w-[60%]">
            <img src={songImage} alt="song image" className="rounded-2xl w-full aspect-square" />
            <div className="flex flex-col gap-1">
              <h2 className="text-white font-medium text-2xl">{songName}</h2>
              <h3 className="text-white">{artistName}</h3>
            </div>
          </div>
          <div className="flex justify-center h-full w-[20%]">
            <PiPlaylistBold className="scale-[1.5] mt-2 hover:cursor-pointer" />
          </div>
        </div>

        {/* Audio Player */}
        <div className="h-[30%] rounded-lg">
          <AudioPlayer
            ref={audioPlayerRef}
            autoPlay={false}
            className="rounded-lg bg-[#5773FF] text-white h-full"
            src={audioUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;