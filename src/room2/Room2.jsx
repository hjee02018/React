import React, { useState } from 'react';
import './room2.css';
import {useNavigate} from "react-router-dom";
import Question from './Question';

export default function Room2() {
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
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
    
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });
    
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    //물체 위에 mouseover할때 작동하는 함수
    function highlight(e){
        $(".shroud").style.opacity = 1;
        $(".resultButton").style.visibility = "hidden";
        $(".counter").style.visibility = "hidden";
        $(".counterText").style.visibility = "hidden";
        e.target.style.opacity = 1;
    }

    //물체 위에 mouseout할떄 작동하는 함수
    function unhighlight(e){ 
        $(".shroud").style.opacity = 0;
        $(".resultButton").style.visibility = "visible";
        $(".counter").style.visibility = "visible";
        $(".counterText").style.visibility = "visible";
        e.target.style.opacity = 0;
    }

    //물체 클릭할때 작동하는 함수
    function clickItem(e){
        setFound(found+1);
        const items = document.querySelectorAll(".item");
        items.forEach((item)=>{item.style.pointerEvents = "none";})
        let clickedItem = e.target;

        //클릭 후 초반에 왼쪽 카운터, 오른쪽 버튼 비활성화, 배경 어둡게, 물체 하이라이트하기
        setTimeout(()=>{
            $(".shroud").style.opacity = 1;
            $(".resultButton").style.visibility = "hidden";
            $(".counter").style.visibility = "hidden";
            $(".counterText").style.visibility = "hidden";
            clickedItem.style.display="block";
            clickedItem.style.opacity = 1;
        },0)
        
        //몇 초 후 큰 이미지 띄우기
        setTimeout(()=>{
            $(".shroud").style.opacity = 1;
            $(".resultButton").style.visibility = "hidden";
            $(".counter").style.visibility = "hidden";
            $(".counterText").style.visibility = "hidden";
            clickedItem.style.display = "none";
            if (e.target.className=='paint_iso item'){
                setLargeImg("./res/room2Res/paint.png")
            } else if (e.target.className=='altar_iso item'){
                setLargeImg("./res/room2Res/altar.png")
            } else if (e.target.className=='lamp_iso item'){
                setLargeImg("./res/room2Res/lamp.png")
            } else if (e.target.className=='craft_iso item'){
                setLargeImg("./res/room2Res/craft.png")
            }
        }, 2500)

        //큰 이미지 치우고 물체 하이라이트 효과 다시 부여
        setTimeout(()=>{
            $(".shroud").style.opacity = 1;
            $(".largeImg").src = "";
            clickedItem.style.display="block";
            clickedItem.style.opacity = 1;
        },5000);

        //질문지 띄우기, 질문에 답하면 클릭했던 물체를 비활성화할 준비 하기
        setTimeout(()=>{
            if (e.target.className=='paint_iso item'){
                setErase("1");
                setShow1(true);
                waitForElm('.question').then((elm)=>{
                    $(".questionSheet").style.zIndex=12;
                })
            } else if (e.target.className=='altar_iso item'){
                setErase("2");
                setShow2(true);
                waitForElm('.question').then((elm)=>{
                    $(".questionSheet").style.zIndex=12;
                })
            } else if (e.target.className=='lamp_iso item'){
                setErase("3");
                setShow3(true);
                waitForElm('.question').then((elm)=>{
                    $(".questionSheet").style.zIndex=12;
                })
            } else if (e.target.className=='craft_iso item'){
                setErase("4");
                setShow4(true);
                waitForElm('.question').then((elm)=>{
                    $(".questionSheet").style.zIndex=12;
                })
            }
        },5200);
    }

    //오른쪽 버튼 mouseover 할때 4개 다 찾았다면 글씨가 노란색으로 바뀌고
    //덜 찾았다면 더 찾으라는 메세지 띄우기
    function highlightFinishButton(e){
        if (found==4){
            e.target.style.cursor = "pointer";
            const whiteLines = document.querySelectorAll(".whiteLine")
            whiteLines.forEach((lines)=>{
                lines.style.fill = "yellow";
            })
        }
        else{
            e.target.style.cursor = "auto";
            $(".resultButton").insertAdjacentHTML("beforebegin", `<p class='unfinishedText'>아직 찾을 물건이 남았어요!</p>`)
        }
    }

    //오른쪽 버튼 mouseout 할때 4개 다 찾았다면 글씨가 흰색으로 다시 돌아오고
    //덜 찾았다면 더 찾으라는 메세지 없애기
    function unhighlightFinishButton(e){
        if (found==4){
            const whiteLines = document.querySelectorAll(".whiteLine")
            whiteLines.forEach((lines)=>{
                lines.style.fill = "white";
            })
        }
        else{
            $(".unfinishedText").remove();
        }   
    }

    //4개 다 찾았다면 오른쪽 버튼 클릭 시 다음 페이지로 이동
    function toEndPage(){
        if (found==4){
            navigate('/end')
        }
    }
    return (
        <div>
            <div className="room2Body">
                <img
                  src="./res/room1/logo_w.svg"
                  className="room2logo"
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
                <div className="room2Counter">
                    <img src="./res/room2Res/counter.svg" className="counter"/>
                    <p className="counterText"><span>{found}</span> / 4</p>
                </div>
                <div className="room2">
                    <img src="./res/room2Res/paint_iso.png" className="paint_iso item" onMouseOver={highlight} onMouseOut={unhighlight} onClick={clickItem} />
                    <img src="./res/room2Res/altar_iso.png" className="altar_iso item" onMouseOver={highlight} onMouseOut={unhighlight} onClick={clickItem} />
                    <img src="./res/room2Res/lamp_iso.png" className="lamp_iso item" onMouseOver={highlight} onMouseOut={unhighlight} onClick={clickItem} />                    
                    <img src="./res/room2Res/craft_iso.png" className="craft_iso item" onMouseOver={highlight} onMouseOut={unhighlight} onClick={clickItem} />
                </div>
                <div className="room2ResultButton">
                    <svg className="resultButton" onMouseOver={highlightFinishButton} onMouseOut={unhighlightFinishButton} onClick={toEndPage} width="258" height="88" viewBox="0 0 258 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_529_148)">
                            <path d="M255.83 1.17993H1.17969V86.3899H255.83V1.17993Z" fill="#4AE6CA"/>
                            <path d="M254.8 1.18C255.37 1.18 255.84 1.64 255.84 2.22V85.35C255.84 85.92 255.38 86.39 254.8 86.39H2.22C1.65 86.39 1.18 85.93 1.18 85.35V2.22C1.18 1.65 1.64 1.18 2.22 1.18H254.8ZM254.8 0H2.22C0.99 0 0 0.99 0 2.22V85.35C0 86.57 0.99 87.57 2.22 87.57H254.8C256.02 87.57 257.02 86.58 257.02 85.35V2.22C257.02 1 256.03 0 254.8 0Z" fill="#0F594B"/>
                            <path d="M246.549 10.47H10.4688V77.1H246.549V10.47Z" fill="#0F594B"/>
                            <mask id="mask0_529_148" maskUnits="userSpaceOnUse" x="10" y="10" width="237" height="68">
                            <path d="M246.549 10.47H10.4688V77.1H246.549V10.47Z" fill="white"/>
                            </mask>
                            <g mask="url(#mask0_529_148)">
                            <path d="M180.782 110.42C189.982 110.42 197.442 102.96 197.442 93.7599C206.642 93.7599 214.102 86.2999 214.102 77.0999C223.302 77.0999 230.762 69.6399 230.762 60.4399C239.962 60.4399 247.422 52.9799 247.422 43.7799C247.422 34.5799 239.962 27.1199 230.762 27.1199C230.762 17.9199 223.302 10.4599 214.102 10.4599C214.102 1.25989 206.642 -6.20011 197.442 -6.20011C197.442 -15.4001 189.982 -22.8601 180.782 -22.8601H76.2416C67.0416 -22.8601 59.5816 -15.4001 59.5816 -6.20011C50.3816 -6.20011 42.9216 1.25989 42.9216 10.4599C33.7216 10.4599 26.2616 17.9199 26.2616 27.1199C17.0616 27.1199 9.60156 34.5799 9.60156 43.7799C9.60156 52.9799 17.0616 60.4399 26.2616 60.4399C26.2616 69.6399 33.7216 77.0999 42.9216 77.0999C42.9216 86.2999 50.3816 93.7599 59.5816 93.7599C59.5816 102.96 67.0416 110.42 76.2416 110.42H180.782Z" fill="#E06161" stroke="#FF9C9C" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M168.253 -22.8501C177.453 -22.8501 184.913 -15.3901 184.913 -6.1901C194.113 -6.1901 201.573 1.2699 201.573 10.4699C210.773 10.4699 218.233 17.9299 218.233 27.1299C227.433 27.1299 234.893 34.5899 234.893 43.7899C234.893 52.9899 227.433 60.4499 218.233 60.4499C218.233 69.6499 210.773 77.1099 201.573 77.1099C201.573 86.3099 194.113 93.7699 184.913 93.7699C184.913 102.97 177.453 110.43 168.253 110.43H88.7728C79.5728 110.43 72.1128 102.97 72.1128 93.7699C62.9128 93.7699 55.4528 86.3099 55.4528 77.1099C46.2528 77.1099 38.7928 69.6499 38.7928 60.4499C29.5928 60.4499 22.1328 52.9899 22.1328 43.7899C22.1328 34.5899 29.5928 27.1299 38.7928 27.1299C38.7928 17.9299 46.2528 10.4699 55.4528 10.4699C55.4528 1.2699 62.9128 -6.1901 72.1128 -6.1901C72.1128 -15.3901 79.5728 -22.8501 88.7728 -22.8501H168.253Z" fill="#2E6C9A" stroke="#4E8DC3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M155.493 110.42C164.693 110.42 172.153 102.96 172.153 93.7599C181.353 93.7599 188.813 86.2999 188.813 77.0999C198.013 77.0999 205.473 69.6399 205.473 60.4399C214.673 60.4399 222.133 52.9799 222.133 43.7799C222.133 34.5799 214.673 27.1199 205.473 27.1199C205.473 17.9199 198.013 10.4599 188.813 10.4599C188.813 1.25989 181.353 -6.20011 172.153 -6.20011C172.153 -15.4001 164.693 -22.8601 155.493 -22.8601H101.523C92.3228 -22.8601 84.8628 -15.4001 84.8628 -6.20011C75.6628 -6.20011 68.2028 1.25989 68.2028 10.4599C59.0028 10.4599 51.5428 17.9199 51.5428 27.1199C42.3428 27.1199 34.8828 34.5799 34.8828 43.7799C34.8828 52.9799 42.3428 60.4399 51.5428 60.4399C51.5428 69.6399 59.0028 77.0999 68.2028 77.0999C68.2028 86.2999 75.6628 93.7599 84.8628 93.7599C84.8628 102.96 92.3228 110.42 101.523 110.42H155.493Z" fill="#0F594B" stroke="#4AE6CA" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <path d="M246.549 10.47V77.1H10.4691V10.47H246.549ZM246.549 9.29004H10.4691C9.81906 9.29004 9.28906 9.82004 9.28906 10.47V77.1C9.28906 77.75 9.81906 78.28 10.4691 78.28H246.549C247.199 78.28 247.729 77.75 247.729 77.1V10.47C247.729 9.82004 247.199 9.29004 246.549 9.29004Z" fill="#0F594B"/>
                            <path className="whiteLine" d="M72.7894 46.61C72.4494 46.58 72.1094 46.1 72.1094 45.78C76.7294 42.73 80.3594 38.39 81.9894 34.9L78.7094 34.93C77.5394 34.93 76.7394 35.24 76.3994 35.59C75.4594 35.33 73.6894 33.91 73.5994 33.54C73.5694 33.43 73.7394 33.08 73.8594 33.11C74.4294 33.25 76.4294 33.37 78.3394 33.34L81.3094 33.28C82.2494 33.25 82.7394 33.14 83.0794 32.82C83.4794 32.68 86.4494 33.36 86.2794 33.76C85.9694 34.5 85.5694 35.25 85.1394 35.99C85.9694 36.05 87.3394 36.1 88.6494 36.1H90.9594V32.79C90.9594 32.11 88.6794 30.82 87.9594 30.48C87.7894 30.4 88.4194 29.71 88.5894 29.71C90.0994 29.71 94.2994 30.57 94.2094 31.28C94.1494 31.71 94.0994 32.25 94.0994 32.85V38.87C94.0994 41.75 93.2994 43.72 92.8694 44.61C92.6094 44.9 92.0394 45.04 91.6694 44.95C91.5294 44.41 91.2394 43.66 91.0994 42.04H87.8994C86.7894 42.04 86.0394 42.27 85.7294 42.55C84.8394 42.32 83.7594 41.04 83.6694 40.72C83.6394 40.61 83.8094 40.29 83.9294 40.32C84.4694 40.46 86.3294 40.52 88.0694 40.52H90.9794C90.9494 40.03 90.9494 39.46 90.9494 38.86V37.6H88.4894C87.3794 37.6 86.6294 37.83 86.3194 38.11C85.7194 37.94 85.0094 37.28 84.6094 36.8C81.6994 41.23 77.0994 45.02 72.7894 46.59V46.61ZM95.3194 55.72C95.3194 55.86 95.2094 55.95 94.9794 55.95H82.4494C80.2494 55.95 79.4794 55.21 79.4194 53.52L79.3594 51.35C79.3594 51.01 78.4994 50.58 77.9294 50.38C77.8994 50.21 78.3894 49.64 78.6694 49.64C79.2994 49.64 81.6094 49.75 82.4994 50.07H90.0694L90.1294 47.56H83.3894C82.2194 47.56 81.4194 47.87 81.0494 48.19C80.1094 47.93 78.3694 46.51 78.2494 46.16C78.2194 46.05 78.4194 45.7 78.5394 45.73C79.0794 45.87 81.0794 45.96 82.9894 45.96H88.8694C89.8094 45.96 90.3294 45.76 90.6694 45.39C91.0694 45.36 93.6994 45.76 93.6094 46.16L92.7794 49.93C93.4094 50.36 93.7794 51.16 93.7794 51.36C93.7794 51.53 93.6894 51.65 93.5194 51.65H82.4994V53.02C82.4994 54.1 82.8094 54.36 84.2994 54.36H90.1494C92.1794 54.36 92.8294 53.22 93.1494 53.22C93.4894 53.22 95.3194 54.93 95.3194 55.73V55.72Z" fill="white"/>
                            <path className="whiteLine" d="M115.518 47.78C112.518 49.01 107.178 49.81 103.298 50.38C102.268 50.52 101.618 50.69 101.018 51.07C100.018 50.81 98.4777 49.36 98.3077 48.84C98.2777 48.76 98.4777 48.38 98.5377 48.38C99.6177 48.38 101.368 48.44 103.278 48.32C103.848 48.29 104.388 48.26 104.908 48.21L104.708 42.53C104.678 42.02 103.598 41.22 102.908 40.85C102.708 40.76 103.338 40.22 103.508 40.22C105.018 40.22 107.908 40.88 107.848 41.3C107.768 41.9 107.768 42.53 107.538 47.98C111.618 47.58 114.048 47.04 115.758 46.52C116.048 46.44 115.898 47.63 115.528 47.78H115.518ZM99.5277 34.88C99.4977 34.77 99.6677 34.42 99.7877 34.45C100.358 34.59 102.358 34.71 104.268 34.68L109.808 34.62C110.718 34.62 111.238 34.48 111.578 34.16C111.978 34.02 114.518 34.42 114.458 34.82C113.858 39.05 113.058 42.93 112.178 44.64C111.778 45.44 109.918 45.81 110.008 45.24C110.348 43.13 110.718 39.82 110.838 36.25L104.638 36.28C103.468 36.28 102.668 36.59 102.328 36.94C101.388 36.65 99.6177 35.23 99.5277 34.89V34.88ZM123.908 41.22C124.278 41.05 125.908 44.25 125.218 44.25L120.018 44.17V47.57C120.018 52.25 119.218 55.65 118.818 56.68C118.558 56.97 117.958 57.11 117.618 57.02C117.358 56.22 116.908 53.68 116.908 49.45V32.83C116.908 32.14 114.628 30.86 113.908 30.52C113.738 30.43 114.338 29.75 114.508 29.75C116.018 29.75 120.218 30.61 120.128 31.32C120.068 31.75 120.018 32.29 120.018 32.89V42.8L123.898 41.23L123.908 41.22Z" fill="white"/>
                            <path className="whiteLine" d="M137.236 47.75C136.206 47.89 135.556 48.06 134.956 48.46C133.956 48.17 132.706 46.72 132.526 46.21C132.496 46.12 132.696 45.78 132.756 45.78C133.866 45.78 135.296 45.84 137.206 45.72C138.236 45.66 139.176 45.58 140.086 45.49L139.886 43.15C137.486 42.81 136.116 41.64 136.116 39.92C136.116 37.98 137.946 36.84 141.026 36.69C141.056 36.63 141.056 36.58 141.056 36.49C141.056 36.23 140.966 35.95 140.596 35.69C140.596 35.06 142.536 35.69 142.536 36C142.536 36.11 142.426 36.43 142.336 36.71C145.276 36.85 147.016 37.99 147.016 39.91C147.016 41.62 145.676 42.76 143.306 43.14L143.136 45.2C146.476 44.8 148.736 44.31 150.186 43.89C150.496 43.8 150.326 45 149.986 45.15C146.986 46.38 141.106 47.21 137.226 47.75H137.236ZM133.326 33.79C133.296 33.65 133.466 33.3 133.586 33.33C134.156 33.47 136.096 33.59 137.986 33.56L144.726 33.5C146.636 33.47 147.236 32.5 147.526 32.5C147.866 32.5 149.096 34.21 149.096 34.98C149.096 35.12 148.986 35.24 148.756 35.24C148.416 35.24 146.526 35.13 145.046 35.13L137.766 35.16C136.626 35.16 135.856 35.45 135.506 35.76C134.596 35.5 133.426 34.13 133.336 33.79H133.326ZM139.976 32.59C139.066 32.59 137.126 30.71 137.006 30.45C136.916 30.34 137.146 29.85 137.316 29.88C138.426 30.05 139.516 30.25 140.946 30.45L143.486 30.79C143.776 30.85 145.086 32.59 144.226 32.59H139.976ZM154.276 49.12C154.166 50 154.166 51.26 154.166 51.8C154.166 53.8 153.366 55.8 152.966 56.65C152.706 56.94 152.106 57.11 151.766 57.02C151.506 56.19 151.056 54.94 151.056 51.8V50.54H142.236C141.066 50.54 140.266 50.85 139.926 51.17C138.986 50.91 137.216 49.49 137.126 49.14C137.096 49.03 137.266 48.68 137.386 48.71C137.926 48.85 139.956 48.94 141.836 48.94L149.406 48.91C150.346 48.91 150.866 48.77 151.206 48.45C151.576 48.31 154.206 48.79 154.286 49.11L154.276 49.12ZM141.566 41.81C143.136 41.81 144.046 41.12 144.046 39.95C144.046 38.78 143.136 38.04 141.566 38.04C139.996 38.04 139.086 38.75 139.086 39.95C139.086 41.15 140.026 41.81 141.566 41.81ZM157.866 38.73C158.266 38.59 159.866 41.78 159.206 41.78L154.326 41.72C154.326 44.57 153.526 46.55 153.096 47.43C152.836 47.72 152.236 47.86 151.896 47.77C151.666 46.97 151.186 45.71 151.186 41.69V32.35C151.186 31.66 148.906 30.38 148.186 30.04C148.016 29.95 148.646 29.24 148.816 29.24C150.296 29.24 154.526 30.13 154.436 30.84C154.376 31.27 154.326 31.81 154.326 32.41V40.2L157.866 38.72V38.73Z" fill="white"/>
                            <path className="whiteLine" d="M168.619 44.8099C164.619 44.8099 161.969 42.6699 161.969 39.4399C161.969 36.4099 164.339 34.3599 167.969 34.1599C167.999 34.0499 168.029 33.9599 168.029 33.8699C168.029 33.5599 167.949 33.2399 167.539 32.9599C167.539 32.2699 169.739 32.9599 169.739 33.2999C169.739 33.4399 169.569 33.8399 169.449 34.1599C172.929 34.4499 175.219 36.4699 175.219 39.4399C175.219 42.6699 172.569 44.8099 168.629 44.8099H168.619ZM168.509 43.0399C170.569 43.0399 171.939 41.5799 171.939 39.3599C171.939 37.1399 170.599 35.7599 168.569 35.7599C166.539 35.7599 165.259 37.2199 165.259 39.3599C165.259 41.4999 166.539 43.0399 168.509 43.0399ZM184.609 55.3999C184.609 55.5399 184.499 55.6299 184.269 55.6299L171.559 55.6899C168.759 55.6899 168.219 54.7499 168.219 52.8899V49.8899C168.219 49.3799 167.109 48.6299 166.559 48.4599C166.389 48.3799 167.019 47.5999 167.299 47.5999C168.439 47.5999 170.129 47.8899 170.979 48.1699C171.179 48.2299 171.439 48.3099 171.379 48.7099C171.319 49.1099 171.319 49.7099 171.319 50.2499V52.9099C171.319 53.9099 171.659 54.0199 172.549 54.0199L179.429 53.9899C181.459 53.9899 182.139 52.8799 182.429 52.8799C182.799 52.8799 184.599 54.6199 184.599 55.3899L184.609 55.3999ZM177.239 29.6799C178.749 29.6799 182.949 30.5399 182.859 31.2499C182.799 31.6799 182.749 32.2199 182.749 32.8199V43.8099C182.749 47.0099 181.949 49.2599 181.519 50.1499C181.259 50.4399 180.689 50.5799 180.319 50.4899C180.089 49.6599 179.609 48.1199 179.609 43.8099V32.7599C179.609 32.0799 177.329 30.7899 176.609 30.4499C176.439 30.3699 177.069 29.6799 177.239 29.6799Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_529_148">
                            <rect width="257.02" height="87.57" fill="white"/>
                            </clipPath>
                            </defs>
                    </svg>
                </div>
                <div className="shroud"></div>
                <img src={largeImg} className="largeImg"></img>
                {show1 && (
                    <Question erase={erase} show={show1} setShow={setShow1} q="행운 상승 아이템을 골라보자!" a1="./res/room2Res/2_popup1/2_popup1-1.svg" a2="./res/room2Res/2_popup1/2_popup1-2.svg" a3="./res/room2Res/2_popup1/2_popup1-3.svg" a4="./res/room2Res/2_popup1/2_popup1-4.svg"></Question>
                )}
                {show2 && (
                    <Question erase={erase} show={show2} setShow={setShow2} q="무속학 교수님의 신년운세!<br>가장 간절한 소원은 무엇인가요?" a1="./res/room2Res/2_popup2/2_popup2-1.svg" a2="./res/room2Res/2_popup2/2_popup2-2.svg" a3="./res/room2Res/2_popup2/2_popup2-3.svg" a4="./res/room2Res/2_popup2/2_popup2-4.svg"></Question>
                )}
                {show3 && (
                    <Question erase={erase} show={show3} setShow={setShow3} q="마음을 밝히는 도술 교수님의 램프!<br>나는 스트레스 받을 때" a1="./res/room2Res/2_popup3/2_popup3-1.svg" a2="./res/room2Res/2_popup3/2_popup3-2.svg" a3="./res/room2Res/2_popup3/2_popup3-3.svg" a4="./res/room2Res/2_popup3/2_popup3-4.svg"></Question>
                )}
                {show4 && (
                    <Question erase={erase} show={show4} setShow={setShow4} q="무인도에 부적을 한 장만 가져갈 수 있다면?" a1="./res/room2Res/2_popup4/2_popup4-1.svg" a2="./res/room2Res/2_popup4/2_popup4-2.svg" a3="./res/room2Res/2_popup4/2_popup4-3.svg" a4="./res/room2Res/2_popup4/2_popup4-4.svg"></Question>
                )}
            </div>
        </div>
    );
}
