import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

const CustomScrollbar = ({ children }) => (
  <Scrollbars
    autoHide
    renderThumbVertical={({ style, ...props }) =>
      <div {...props} style={{ 
        ...style, 
        backgroundColor: '#888', 
        borderRadius: '10px',
        position: 'absolute', // 스크롤바를 절대 위치로 설정
        right: '2px'
      }} />
    }
    renderTrackVertical={({ style, ...props }) =>
      <div {...props} style={{ 
        ...style, 
        position: 'absolute', // 트랙을 절대 위치로 설정
        width: '10px', 
        right: '0',
        top: '0',
        bottom: '0',
        borderRadius: '3px', 
        backgroundColor: '#f1f1f1'
      }} />
    }
  >
    {children}
  </Scrollbars>
);

export default CustomScrollbar;
