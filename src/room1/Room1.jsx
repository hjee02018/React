import React, { useState } from "react";
import "./room1.css";
import { useNavigate } from "react-router-dom";
import Question from "./Question";
import Room2 from "../room2/Room2";

export default function Room1() {
  const $ = (selector) => document.querySelector(selector);
  const [found, setFound] = useState(0);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  //어떤 물체를 클릭했는지 파악해서 <Question>에 넘겨 질문에 대해 답을 하면 해당 물체 비활성화 하는데 쓰임
  const [erase, setErase] = useState("0");
  //클릭한 물체에 따라 largeImg에 다른 src를 부여해 클릭에 알맞은 전체화면 이미지 띄우기
  const [largeImg, setLargeImg] = useState(false);
  //페이지 사이 이동하는데 쓰임
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);

  // 로고 클릭 시 팝업창을 열도록 하는 함수
  const handleLogoClick = () => {
    setPopupOpen(true);
  };

  // No
  const handleNoPopup = () => {
    setPopupOpen(false);
  };

  // Yes
  const handleYesPopup = () => {
    setPopupOpen(false);
    navigate("/", { replace: true });
    window.location.reload();
  };

  //어떤 특정 class를 가진 element가 나타나기를 기다린다.
  function waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  //물체 위에 mouseover할때 작동하는 함수
  function highlight(e) {
    $(".shroud").style.opacity = 1;
    $(".resultButton").style.visibility = "hidden";
    $(".counter").style.visibility = "hidden";
    $(".counterText").style.visibility = "hidden";
    e.target.style.opacity = 1;
  }

  //물체 위에 mouseout할떄 작동하는 함수
  function unhighlight(e) {
    $(".shroud").style.opacity = 0;
    $(".resultButton").style.visibility = "visible";
    $(".counter").style.visibility = "visible";
    $(".counterText").style.visibility = "visible";
    e.target.style.opacity = 0;
  }

  //물체 클릭할때 작동하는 함수
  function clickItem(e) {
    setFound(found + 1);
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
      item.style.pointerEvents = "none";
    });
    let clickedItem = e.target;

    //클릭 후 초반에 왼쪽 카운터, 오른쪽 버튼 비활성화, 배경 어둡게, 물체 하이라이트하기
    setTimeout(() => {
      $(".shroud").style.opacity = 1;
      $(".resultButton").style.visibility = "hidden";
      $(".counter").style.visibility = "hidden";
      $(".counterText").style.visibility = "hidden";
      clickedItem.style.display = "block";
      clickedItem.style.opacity = 1;
    }, 0);

    //몇 초 후 큰 이미지 띄우기
    setTimeout(() => {
      $(".shroud").style.opacity = 1;
      $(".resultButton").style.visibility = "hidden";
      $(".counter").style.visibility = "hidden";
      $(".counterText").style.visibility = "hidden";
      clickedItem.style.display = "none";
      if (e.target.className == "tea_iso item") {
        setLargeImg("./res/room1/tea.png");
      } else if (e.target.className == "pot_iso item") {
        setLargeImg("./res/room1/pot.png");
      } else if (e.target.className == "clock_iso item") {
        setLargeImg("./res/room1/clock.png");
      } else if (e.target.className == "box_iso item") {
        setLargeImg("./res/room1/box.png");
      }
    }, 2500);

    //큰 이미지 치우고 물체 하이라이트 효과 다시 부여
    setTimeout(() => {
      $(".shroud").style.opacity = 1;
      $(".largeImg").src = "";
      clickedItem.style.display = "block";
      clickedItem.style.opacity = 1;
    }, 5000);

    //질문지 띄우기, 질문에 답하면 클릭했던 물체를 비활성화할 준비 하기
    setTimeout(() => {
      if (e.target.className == "tea_iso item") {
        setErase("1");
        setShow1(true);
        waitForElm(".question").then((elm) => {
          $(".questionSheet").style.zIndex = 12;
        });
      } else if (e.target.className == "pot_iso item") {
        setErase("2");
        setShow2(true);
        waitForElm(".question").then((elm) => {
          $(".questionSheet").style.zIndex = 12;
        });
      } else if (e.target.className == "clock_iso item") {
        setErase("3");
        setShow3(true);
        waitForElm(".question").then((elm) => {
          $(".questionSheet").style.zIndex = 12;
        });
      } else if (e.target.className == "box_iso item") {
        setErase("4");
        setShow4(true);
        waitForElm(".question").then((elm) => {
          $(".questionSheet").style.zIndex = 12;
        });
      }
    }, 5200);
  }

  //오른쪽 버튼 mouseover 할때 4개 다 찾았다면 글씨가 노란색으로 바뀌고
  //덜 찾았다면 더 찾으라는 메세지 띄우기
  function highlightFinishButton(e) {
    if (found == 4) {
      e.target.style.cursor = "pointer";
      const whiteLines = document.querySelectorAll(".whiteLine");
      whiteLines.forEach((lines) => {
        lines.style.fill = "yellow";
      });
    } else {
      e.target.style.cursor = "auto";
      $(".resultButton").insertAdjacentHTML(
        "beforebegin",
        `<p class='unfinishedText'>아직 찾을 물건이 남았어요!</p>`
      );
    }
  }

  //오른쪽 버튼 mouseout 할때 4개 다 찾았다면 글씨가 흰색으로 다시 돌아오고
  //덜 찾았다면 더 찾으라는 메세지 없애기
  function unhighlightFinishButton(e) {
    if (found == 4) {
      const whiteLines = document.querySelectorAll(".whiteLine");
      whiteLines.forEach((lines) => {
        lines.style.fill = "white";
      });
    } else {
      $(".unfinishedText").remove();
    }
  }

  //4개 다 찾았다면 오른쪽 버튼 클릭 시 Room2로 이동
  function toNextPage() {
    if (found == 4) {
      navigate("/room2");
    }
  }
  return (
    <div>
      <div className="room1Body">
        <img
          src="./res/room1/logo_w.svg"
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={handleLogoClick}
        />
        {isPopupOpen && (
          <div className="popup">
            {/* 팝업창 배경 이미지 */}r
            <img
              className="popupBackground"
              src="./res/back_popup/back_popupbg.png"
              alt="Popup Background"
            />
            {/* 팝업 내용 */}
            <p className="popupText">
              탐방을 중단하시겠습니까?
              <br />
              지금까지의 기록이 초기화됩니다.
            </p>
            <div className="popupContent">
              {/* 예, 아니오 버튼 이미지 */}
              <img
                src="./res/back_popup/yes_cta.svg"
                alt="Yes Button"
                className="popupYes"
                style={{ cursor: "pointer" }}
                onClick={handleYesPopup}
              />
              <img
                src="./res/back_popup/no_cta.svg"
                alt="No Button"
                className="popupNo"
                style={{ cursor: "pointer" }}
                onClick={handleNoPopup}
              />
              {/* 추가적인 팝업 내용을 여기에 추가할 수 있습니다. */}
            </div>
          </div>
        )}
        <div className="room1Counter">
          <img src="./res/room1/counter.svg" className="counter" />
          <p className="counterText">
            <span>{found}</span> / 4
          </p>
        </div>
        <div className="room1">
          <img
            src="./res/room1/tea_iso.png"
            className="tea_iso item"
            onMouseOver={highlight}
            onMouseOut={unhighlight}
            onClick={clickItem}
          />
          <img
            src="./res/room1/pot_iso.png"
            className="pot_iso item"
            onMouseOver={highlight}
            onMouseOut={unhighlight}
            onClick={clickItem}
          />
          <img
            src="./res/room1/clock_iso.png"
            className="clock_iso item"
            onMouseOver={highlight}
            onMouseOut={unhighlight}
            onClick={clickItem}
          />
          <img
            src="./res/room1/box_iso.png"
            className="box_iso item"
            onMouseOver={highlight}
            onMouseOut={unhighlight}
            onClick={clickItem}
          />
        </div>
        <div className="room2ResultButton">
          <img
            className="resultButton"
            onMouseOver={highlightFinishButton}
            onMouseOut={unhighlightFinishButton}
            onClick={toNextPage}
            width={"258vw"}
            src="./res/room1/next.svg" // 이미지 파일의 경로에 따라 수정
            alt="Next"
          />
        </div>
        <div className="shroud"></div>
        <img src={largeImg} className="largeImg"></img>
        {show1 && (
          <Question
            erase={erase}
            show={show1}
            setShow={setShow1}
            q="의술 교수님의 애착 한방차는 무엇일까?"
            a1="./res/room1/1_popup3/1_popup3-1.svg"
            a2="./res/room1/1_popup3/1_popup3-2.svg"
            a3="./res/room1/1_popup3/1_popup3-3.svg"
            a4="./res/room1/1_popup3/1_popup3-4.svg"
          ></Question>
        )}
        {show2 && (
          <Question
            erase={erase}
            show={show2}
            setShow={setShow2}
            q="나는 식물을 키우는 것이 _"
            a1="./res/room1/1_popup4/1_popup4-1.svg"
            a2="./res/room1/1_popup4/1_popup4-2.svg"
            a3="./res/room1/1_popup4/1_popup4-3.svg"
            a4="./res/room1/1_popup4/1_popup4-4.svg"
          ></Question>
        )}
        {show3 && (
          <Question
            erase={erase}
            show={show3}
            setShow={setShow3}
            q="겨울 밤하늘을 보면 나는 ____"
            a1="./res/room1/1_popup2/1_popup2-1.svg"
            a2="./res/room1/1_popup2/1_popup2-2.svg"
            a3="./res/room1/1_popup2/1_popup2-3.svg"
            a4="./res/room1/1_popup2/1_popup2-4.svg"
          ></Question>
        )}
        {show4 && (
          <Question
            erase={erase}
            show={show4}
            setShow={setShow4}
            q="명리학 교수님의 생일편지 반닫이! <br>이번달 축하의 메시지를 보낼 ____"
            a1="./res/room1/1_popup1/1_popup1-1.svg"
            a2="./res/room1/1_popup1/1_popup1-2.svg"
            a3="./res/room1/1_popup1/1_popup1-3.svg"
            a4="./res/room1/1_popup1/1_popup1-4.svg"
          ></Question>
        )}
      </div>
    </div>
  );
}
