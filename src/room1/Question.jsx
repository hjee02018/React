import React from "react";
import "./Question.css";
//가, 나, 다, 라 답을 취합하는 json파일 불러오기
import answerResult from "../answerResult";

export default function Question({ erase, show, setShow, q, a1, a2, a3, a4 }) {
  const $ = (selector) => document.querySelector(selector);
  //버튼 죄다 똑같이 onClick시 clickAnswer을 실행하기 때문에 누가 눌렸는지 파악하는게 필요
  //e.target.className을 확인해서 뭐를 눌렀는지 확인 -> 눌렀는 것에 따라 json을 업데이트
  function clickAnswer(e) {
    if (e.target.className == "a1") {
      answerResult[0].a++;
    } else if (e.target.className == "a2") {
      answerResult[0].b++;
    } else if (e.target.className == "a3") {
      answerResult[0].c++;
    } else if (e.target.className == "a4") {
      answerResult[0].d++;
    }
    console.log(
      answerResult[0].a,
      answerResult[0].b,
      answerResult[0].c,
      answerResult[0].d
    );

    //Room2.jsx에서 가져온 useState 함수, setShow를 가지고 show 값을 false로 바꾼다
    //show값이 false가 되면 <Question> 컴포넌트가 사라진다 (show&&<Question> 방식으로 돼 있어서)
    setShow(false);

    //<Question>이 올라온 동안 물체:hover이 작동하지 않게 마우스 인터렉션을 껐었다
    //인터렉션을 다시 키기 위해서 ".item"의 클래스를 모두 모아준다. 그리고 인터렉션을 켜준다.
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
      item.style.pointerEvents = "auto";
    });

    //아이템을 한번 클릭하면 다시는 클릭할 수 없게 만들기
    if (erase == "1") {
      $(".tea_iso").style.display = "none";
    } else if (erase == "2") {
      $(".pot_iso").style.display = "none";
    } else if (erase == "3") {
      $(".clock_iso").style.display = "none";
    } else if (erase == "4") {
      $(".box_iso").style.display = "none";
    }

    //왼쪽 카운터, 오른쪽 버튼을 다시 볼 수 있게 만들기. 배경 어두움 효과 걷기.
    $(".shroud").style.opacity = 0;
    $(".resultButton").style.visibility = "visible";
    $(".counter").style.visibility = "visible";
    $(".counterText").style.visibility = "visible";
  }
  //dangerouslySetInnerHTML은 얼추 innerHTML과 비슷한 역할을 한다고 보면 된다. 이러면 줄 띄움도 반영 가능하다.
  return (
    <div className="question">
      <div className="questionSheet">
        <div className="questionSection">
          <p dangerouslySetInnerHTML={{ __html: q }}></p>
        </div>
        <div className="answerSection">
          <div className="answers">
            <img src={a1} onClick={clickAnswer} className="a1" />
          </div>
          <div className="answers">
            <img src={a2} onClick={clickAnswer} className="a2" />
          </div>
          <div className="answers">
            <img src={a3} onClick={clickAnswer} className="a3" />
          </div>
          <div className="answers">
            <img src={a4} onClick={clickAnswer} className="a4" />
          </div>
        </div>
      </div>
    </div>
  );
}
