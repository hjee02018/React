import React, { useEffect, useState } from 'react';
import answerResult from '../answerResult';


const App = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    // JSON 파일 경로 또는 API 엔드포인트
    const jsonUrl = './src/answerResults.json';

    // JSON 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch(jsonUrl);
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {jsonData.map((item, index) => (
        <div key={index}>
          <p>a: {item.a}</p>
          <p>b: {item.b}</p>
          <p>c: {item.c}</p>
          <p>d: {item.d}</p>
        </div>
      ))}
    </div>
  );
};

export default App;