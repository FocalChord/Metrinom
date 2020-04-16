import React, { useState } from "react";
import { Link } from "react-router-dom";

const StatsHeader = () => {
    const [selected, setSelected] = useState(window.location.pathname.split("/")[2]);

    return (
        <nav className="lg:px-16 px-6 bg-black text-white text-6x1 cursor-text flex justify-around items-center lg:py-0 py-2">
            <ul className="flex justify-around items-center w-1/2">
                <Link
                    to="/stats/genres"
                    onClick={() => setSelected("genres")}
                    class={"border-b-2 border-transparent hover:border-green-600" + (selected === "genres" ? " text-green-600" : "")}
                >
                    <li>Genres</li>
                </Link>
                <Link
                    to="/stats/artists"
                    onClick={() => setSelected("artists")}
                    class={"border-b-2 border-transparent hover:border-green-600" + (selected === "artists" ? " text-green-600" : "")}
                >
                    <li>Artists</li>
                </Link>
                <Link
                    to="/stats/tracks"
                    onClick={() => setSelected("tracks")}
                    class={"border-b-2 border-transparent hover:border-green-600" + (selected === "tracks" ? " text-green-600" : "")}
                >
                    <li>Tracks</li>
                </Link>
            </ul>
        </nav>
    );
};

export default StatsHeader;
