import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import '../styles/App.css';
import jjangu from '../assets/jjangu.jpg';

import Sign from './Sign/Sign';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Sign" element={<Sign />} />
        </Routes>
      </Router>
      <header className="App-header">
        <img src={jjangu}/>
      
        
        <ul>
          <li><h3>components</h3></li>
          <li>재사용 가능한 컴포넌트들이 위치하는 폴더입니다.</li>
          <li>컴포넌트는 매우 많아질 수 있기 때문에 이 폴더 내부에서 하위폴더로 추가로 분류하는 경우가 많습니다.</li>
        </ul>
        <ul>
          <li><h3>assets</h3></li>
          <li>이미지 혹은 폰트와 같은 파일들이 저장되는 폴더입니다.</li>
          <li>이미지와 같은 파일들을 public에 직접 넣는 경우도 있는데 둘의 차이는 컴파일시에 필요한지 여부입니다.</li>
          <li>파비콘과 같이 index.html내부에서 직접 사용하여 컴파일 단계에서 필요하지 않은 파일들은 public에</li>
          <li>반면, 컴포넌트 내부에서 사용하는 이미지 파일인 경우 이 assets 폴더에 위치시켜야 합니다.</li>
        </ul>
        <ul>
          <li><h3>hooks</h3></li>
          <li>커스텀 훅이 위치하는 폴더입니다.</li>
        </ul>
        <ul>
          <li><h3>pages</h3></li>
          <li>react router등을 이용하여 라우팅을 적용할 때 페이지 컴포넌트를 이 폴더에 위치시킵니다.</li>
        </ul>
        <ul>
          <li><h3>constants</h3></li>
          <li>공통적으로 사용되는 상수들을 정의한 파일들이 위치하는 폴더입니다.</li>
        </ul>
        <ul>
          <li><h3>config</h3></li>
          <li>config 파일이 많지 않은 경우 보통 최상위에 위치시켜놓지만 여러개의 config 파일이 있을 경우 폴더로 분리하기도 합니다.</li>
        </ul>
        <ul>
          <li><h3>styles</h3></li>
          <li>css 파일들이 포함되는 폴더입니다.</li>
        </ul>
        <ul>
          <li><h3>services</h3></li>
          <li>보통 api관련 로직의 모듈 파일이 위치하며 auth와 같이 인증과 관련된 파일이 포함되기도 합니다.</li>
        </ul>
        <ul>
          <li><h3>utils</h3></li>
          <li>정규표현식 패턴이나 공통함수 등 공통으로 사용하는 유틸 파일들이 위치하는 폴더입니다.</li>
        </ul>
        <ul>
          <li><h3>contexts</h3></li>
          <li>contextAPI를 사용할 때 관련 파일들이 위치하는곳으로 상태관리를 위해 contextAPI 대신 redux를 사용 할 경우 폴더 이름을 store로 사용하기도 합니다.</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
