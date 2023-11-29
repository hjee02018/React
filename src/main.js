import React, { useState } from "react";
import InfoComponent from "./info";
import Room2 from "./room2/Room2";
import Room1 from "./room1/Room1";

import img from "./res/main_bg.png";

function MainComponent() {
  const [showInfo, setShowInfo] = useState(false);
  const [showRoom2, setShowRoom2] = useState(false);

  const handleInfoClick = () => {
    setShowInfo(true);
  };

  const handleStartClick = () => {
    setShowInfo(false);
    setShowRoom2(true);
  };

  const imgStyle3 = {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    position: "fixed",
    backgroundRepeat: "repeat-y", // 수직으로 반복
    backgroundSize: "100% auto", // 크기 설정
  };

  return (
    <div>
      {showInfo ? (
        <InfoComponent />
      ) : showRoom2 ? (
        <Room1 />
      ) : (
        <>
          <img src={img} style={imgStyle3} alt="background"></img>
          <img src="./res/main_cta.svg" alt="Main CTA" className="cta-image" />
          <img
            src="./res/info_cta.svg"
            alt="Info CTA"
            className="cta-txt-image1"
            onClick={handleInfoClick}
            style={{ cursor: "pointer" }}
          />
          <img
            src="./res/start_cta.svg"
            alt="Start CTA"
            className="cta-txt-image2"
            onClick={handleStartClick}
            style={{ cursor: "pointer" }}
          />
          <img src="./res/logo_w.svg" alt="logo CTA" className="logo-image" />
        </>
      )}
    </div>
  );
}

export default MainComponent;
