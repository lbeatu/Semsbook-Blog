import React, { useState } from "react";

import ProfileItem from "./profileItem";
import GridItem from "./gridItem";

const Home = () => {
  const [spoti, setSpoti] = useState(1);

  const Onclick = () => {
    console.log(spoti);

    setSpoti(!spoti);
  };
  return (
    <div className="home-container">
      <ProfileItem />
      <GridItem />
      <div className="iframe-player">
        {spoti ? (
          <i onClick={Onclick} className="fas fa-arrow-up"></i>
        ) : (
          <i onClick={Onclick} className="fas fa-arrow-down"></i>
        )}
        <p onClick={Onclick}>Playlist</p>
        <iframe
          src="https://open.spotify.com/embed/playlist/1ud70bCmMpSpSOTs159PAO?autoplay=1"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media  autoplay;"
          autoPlay
          className={spoti ? "iframe-block " : "iframe-block iframe-ext"}
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
