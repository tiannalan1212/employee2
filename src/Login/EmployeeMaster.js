import React, { createContext, useContext, useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { DatePicker, Typography, Button, Col, Divider, Row, Space, message, ConfigProvider } from "antd";

const Master = function () {
    const[userRole,setUserRole] = useState('');
    const[username,setUsername] = useState('');
    const userData = sessionStorage.getItem('user');
    useEffect(() => {
    if (userData) {
      const user = JSON.parse(userData);
      console.log(user);
      console.log(userData);
      setUserRole(user.userRole); 
      setUsername(user.userName);
    }
}, []);
   const navigate = useNavigate();

    /*const valueToSend = { name: 'John Doe', age: 30 };

    const location = useLocation();
    const { valueToMaster } = location.state || {};
    const valueToManage = {
        userID: valueToMaster.userID,
        username: valueToMaster.username,
        pwd: valueToMaster.pwd,
        pwd2: valueToMaster.pwd2,
        userRole: valueToMaster.userRole
    };*/



    const { Title } = Typography;

    const toPwdReset = (event) => {
        //navigate('/PasswordReset', { state: { userID, pwd, username, pwd2, userRole } });
        navigate('/PasswordReset');
    };

    const toManage = (event) => {
        //navigate('/Manage', { state: {userID, pwd, employeeName, pwd2,userRole} });
        // };
        navigate('/Manage');

        //navigate('/Manage', { state: { userID, pwd, username, pwd2, userRole } });
    };


    return (
        <div>
            <div >
                <h1 className='Master_Top1'>LYC株式会社</h1>
                <span className='Master_Top2'><a href='/login'>サインアウト</a></span>
            </div>
            <br /><br />
            <Title level={1} style={{ textAlign: 'center' }}>社員勤務管理システム</Title>
            <h5 className="system-title2">メニュー一覧</h5>
            <br/>
            <div className='Manage_Row'> <span>{userRole}:{username}</span></div><br /><br />
            <div className='five-btns'>
                <div className='First_Row'>
                    <span><input className='Btn1' type='button' value='実績入力'/></span>
                    <span><input className='Btn1' type='button' onClick={toManage} value='社員管理情報' /></span>

                </div>
                <div className='First_Row'>
                    <span><input className='Btn2' type='button' value='休憩時&#13;&#10;間設定' /></span>
                </div>
                <div className='First_Row'>
                    <span>
                        <input onClick={toPwdReset} className='Btn1' type='button' value='パスワードリセット' />
                    </span>
                    <span><input className='Btn1' type='button' value='実績検索' /></span>
                </div>
            </div>
            <div >
                <span className='Master_Bottom'><a href="/Login">ログイン画面に戻る</a></span>
            </div>

        </div>
    )


}
export default Master;
