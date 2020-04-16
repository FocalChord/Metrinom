import React from "react";
import { Link } from "react-router-dom";

const StatsHeader = () => {
    return (
        <nav class="lg:px-16 px-6 bg-black text-white text-6x1 cursor-text flex justify-around items-center lg:py-0 py-2">
            <ul class="flex justify-around items-center w-1/2">
                <Link to="/stats/genres" class="border-b-2 border-transparent hover:border-green-600">
                    <li>Genres</li>
                </Link>
                <Link to="/stats/artists" class="border-b-2 border-transparent hover:border-green-600">
                    <li>Artists</li>
                </Link>
                <Link to="/stats/tracks" class="border-b-2 border-transparent hover:border-green-600">
                    <li>Tracks</li>
                </Link>
            </ul>
        </nav>
    );
};

export default StatsHeader;
