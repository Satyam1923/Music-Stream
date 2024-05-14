import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
import axios from "axios";
import he from "he";

const App = () => {
    const [data, setData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currplaying, setCurrplaying] = useState(0);

    const decodeEntities = (str) => {
        return he.decode(str);
    };

    const fetchSongData = async () => {
        try {
            const response = await axios.get("http://localhost:3030/search", {
                params: { song: searchQuery },
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    // changing the like button to liked on clicking on it
    const toggleLike = (index) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[index].liked = !newData[index].liked;
            return newData;
        });
    };

    return (
        <div className="ui">
            <div className="player">
                <div className="imgBx">
                    {data && data.length > 0 ? (
                        <img
                            src={data && data[currplaying].img}
                            height="250px"
                            width="250px"
                        />
                    ) : (
                        "Choose a song to play"
                    )}
                </div>
                <ul className="details">
                    <li className="name">
                        {data &&
                            data.length > 0 &&
                            data[currplaying] &&
                            decodeEntities(data[currplaying].name)}
                    </li>
                    <li className="author">
                        {data &&
                            data.length > 0 &&
                            data[currplaying] &&
                            decodeEntities(data[currplaying].artist)}{" "}
                        {data &&
                            data.length > 0 &&
                            data[currplaying] &&
                            data[currplaying].year}
                    </li>
                    <li className="like-button">
                        {data && data[currplaying] && (
                            <button onClick={() => toggleLike(currplaying)}>
                                {data[currplaying].liked ? "Liked" : "Like"}
                            </button>
                        )}
                    </li>
                </ul>
                {data && (
                    <AudioPlayer
                        autoPlay
                        src={data && data[currplaying].url}
                        preload="metadata"
                    />
                )}
            </div>

            <div className="search-box">
                <div className="search">
                    <form className="box">
                        <input
                            type="text"
                            name="song"
                            id="song"
                            className="box1"
                            required
                            onChange={(e) => {
                                e.preventDefault();
                                setSearchQuery(e.target.value);
                            }}
                        />
                        <button
                            id="get"
                            type="image"
                            src="search.svg"
                            alt="search"
                            className="button"
                            onClick={(e) => {
                                e.preventDefault();
                                if (searchQuery !== "") fetchSongData();
                            }}
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="results">
                    {data !== null &&
                        data !== undefined &&
                        data.map((element, index) => (
                            <div
                                className="result-item"
                                key={index}
                                onClick={() => setCurrplaying(index)}
                            >
                                <div className="songresult">
                                    <img
                                        src={element.img}
                                        alt={element.name}
                                        height="20px"
                                        width="20px"
                                    />
                                    <div className="search-details">
                                        <h4 id="elementname">
                                            {decodeEntities(element.name)}
                                        </h4>
                                        <p>
                                            {decodeEntities(element.artist)} -{" "}
                                            {element.year}
                                        </p>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); toggleLike(index); }}>
                                        {element.liked ? "Liked" : "Like"}
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default App;
