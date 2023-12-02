import React, { useState } from "react";
import MainComponent from "./main";
import img from "./res/main_bg.png";

function InfoComponent() {
  const [showMain, setShowMain] = useState(false);

  const textStyle = {
    position: "absolute",
    top: "43%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#FFFFFF",
    fontSize: "2.0vw",
    fontWeight: "bold",
  };

  const textStyle2 = {
    position: "absolute",
    top: "53%",
    left: "57%",
    fontSize: "1.1vw",
    fontWeight: 400,
    color: "#FFFFFF",
    textAlign: "left",
  };

  const textNormal1 = {
    position: "absolute",
    top: "70%",
    left: "20%",
    fontSize: "1.1vw",
    fontWeight: 400,
    color: "#FFFFFF",
    textAlign: "left",
  };

  const textNormal2 = {
    position: "absolute",
    top: "70%",
    left: "37%",
    fontSize: "1.1vw",
    fontWeight: 400,
    color: "#FFFFFF",
    textAlign: "left",
  };

  const imgStyle1 = {
    position: "absolute",
    top: "50%",
    left: "20%",
    width: "zz",
    height: "128px",
  };

  const imgStyle2 = {
    position: "absolute",
    top: "50%",
    left: "37%",
    width: "123px",
    height: "128px",
  };

  const imgStyle3 = {
    width: "100%",
    height: "100vh",
    top: 0,
    left: 0,
    position: "fixed",
  };
  const buttonStyle = {
    position: "absolute",
    width: "3.3vw",
    height: "3.3vh",
    top: "40%",
    left: "80%",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
  };

  const handleShowMain = () => {
    setShowMain(true);
  };

  return (
    <div>
      <img src={img} style={imgStyle3} alt="background"></img>
      <p style={textStyle}>한국술법학교 입학설명회</p>
      <img
        src="./res/logo_w.svg"
        alt="logo CTA"
        className="logo-image"
        style={{ cursor: "pointer" }}
        onClick={handleShowMain}
      />
      <p style={textStyle2}>
        본교에서는 개교 100주년을 맞아
        <br /> 최초로 특별 공개 입학설명회를 개최합니다.
        <br />
        학교를 직접 탐방하며 특별한 물건을 찾아내면,
        <br /> 마침내 나의 수호신을 만날 수 있습니다. <br />
        <br />
        탐방을 다시 시작하고 싶으면 로고를 클릭하세요.
        <br />
      </p>
      <p style={textNormal1}>
        강의실 안 특별한 물건을 찾아
        <br />
        질문에 대답해보자.
      </p>
      <p style={textNormal2}>
        모든 물건들을 발견하면
        <br />
        나의 수호신을 만날 수 있다.
      </p>
      <img src="./res/info/object_img.png" alt="img1" style={imgStyle1} />
      <img src="./res/info/god_img.png" alt="img2" style={imgStyle2} />
      {showMain ? (
        <MainComponent />
      ) : (
        <div style={buttonStyle} onClick={handleShowMain}>
          <img
            src="./res/info/close.svg"
            alt="Go to Main"
            style={{ cursor: "pointer" }}
          />
        </div>
      )}
    </div>
  );
}

export default InfoComponent;
