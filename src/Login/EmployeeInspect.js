import React, { useState, useEffect } from 'react';
import { Typography, Flex } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
const { Title } = Typography;

const Inspect = () => {


  const [employeeNo, setEmployeeNo] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [gender, setGender] = useState('');
  const [joinConpanyYear, setJoinConpanyYear] = useState('');
  const [joinConpanyMonth, setJoinConpanyMonth] = useState('');
  const [salary, setSalary] = useState('');
  const [LAge, setLAge] = useState('');
  const [UAge, setUAge] = useState('');
  const rows = 11;
  const cols = 15;
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');

  //     const userData = sessionStorage.getItem('user');
  //     useEffect(() => {
  //     if (userData) {
  //       const user = JSON.parse(userData);
  //       console.log(user);
  //       console.log(userData);
  //       setUserRole(user.userRole); 
  //       setUsername(user.userName);
  //     }
  // }, []);

  // 设置每列的宽度
  const columnWidths = [50, 50, 80, 100, 40, 40, 80, 50, 40, 120, 80, 120, 60, 60, 150]; // 根据需要设置每列的宽度
  const headers = [
    '', '番号', '社員番号', '社員名', '性別', '年齢', '入社年月',
    '給料(万円)', '扶養人数', '電話番号', '寄り駅', '住所', '口座名義人',
    '口座番号', '社用メールアドレス'
  ];
  // const [tableData, setTableData] = useState([headers, ...Array.from({ length: rows - 1 }, () => Array(cols).fill(''))]);
  /*useEffect(() => {
    // 模拟从后端获取数据并更新表格
    const fetchData = async () => {
      // 假设从后端获取的数据
      const response = await fetch('/api/tabledata');
      const data = await response.json();
      setTableData(data); // 更新表格数据
    };
 
    fetchData();
  }, []);*/





return (<div></div>)
  // return (

  //   <div>
  //     <span className='Manage_Top1'>LYC株式会社</span>
  //     <Title style={{ textAlign: 'center', marginTop: '40px' }}>社員勤務管理システム</Title>
  //     <Title style={{ textAlign: 'center' }} level={4}>社員情報詳細検索画面</Title>
  //     {/* <div className='Manage_Row'><span>{userRole}:{username}<span></span></span></div><br /><br /> */}
  //     <div className='fuzzyQuery'>
  //       <div className='fuzzywarp'>
  //         社員番号<input className='Input_Item3' style={{ width: '80px' }} value={employeeNo} onChange={(e) => setEmployeeNo(e.target.value)} />
  //         社員名<input className='Input_Item3' value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
  //         性別<select className='Input_Item' style={{ height: '30px' }} value={gender} onChange={(e) => setGender(e.target.value)}>
  //           <option></option>
  //           <option>男</option>
  //           <option>女</option>
  //         </select>
  //         {/* <Button type="primary" className='btnS'>検索</Button> */}
  //       </div>
  //       <div className='empty'></div>
  //       <div className='fuzzywarp'>
  //         <label className='Second_Item2'>入社年月</label>
  //         <select className='Input_Item' value={joinConpanyYear} onChange={(e) => setJoinConpanyYear(e.target.value)}>
  //           <option></option>
  //           <option>2015</option>
  //           <option>2016</option>
  //           <option>2017</option>
  //           <option>2018</option>
  //           <option>2019</option>
  //           <option>2020</option>
  //           <option>2021</option>
  //           <option>2022</option>
  //           <option>2023</option>
  //           <option>2024</option>
  //         </select>
  //         <label className='Year_Item'>年</label>
  //         <select className='Input_Item' value={joinConpanyMonth} onChange={(e) => setJoinConpanyMonth(e.target.value)}>
  //           <option></option>
  //           <option>01</option>
  //           <option>02</option>
  //           <option>03</option>
  //           <option>04</option>
  //           <option>05</option>
  //           <option>06</option>
  //           <option>07</option>
  //           <option>08</option>
  //           <option>09</option>
  //           <option>10</option>
  //           <option>11</option>
  //           <option>12</option>
  //         </select>
  //         <label className='Year_Item'>月</label>
  //         年龄<input className='Input_Item3' style={{ width: '30px' }} value={LAge} onChange={(e) => setLAge(e.target.value)} />～
  //         <input className='Input_Item3' style={{ width: '30px' }} value={UAge} onChange={(e) => setUAge(e.target.value)} />
  //         給料<input className='Input_Item3' style={{ width: '80px' }} value={salary} onChange={(e) => setSalary(e.target.value)} />以上
  //         {/* <Button type="primary" className='btnS'>個別社員情報出力</Button> */}
  //       </div>
  //     </div>
  //     <div className='sort'>
  //       <span className='font1'>ソート：</span><span className='diot'>●</span><span className='font1'>デフォルト</span>
  //       <span className='diot'>〇</span><span className='font1'>年齢</span><span className='diot'>〇</span>
  //       <span className='font1'>入社年月</span><span className='diot'>〇</span><span className='font1'>給料</span>
  //     </div>
  //     &nbsp;&nbsp;&nbsp;選択&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;社員情報明細
  //     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  //     合计件数<span>0</span>件
  //     <div className="table-container">
  //       <table className="custom-table">
  //         <tbody>
  //           {/* {tableData.map((row, rowIndex) => (
  //             <tr key={rowIndex}>
  //               {row.map((cell, colIndex) => (
  //                 <td key={colIndex} style={{ width: `${columnWidths[colIndex]}px` }}>
  //                   {cell}
  //                 </td>
  //               ))}
  //             </tr>
  //           ))} */}
  //         </tbody>
  //       </table>
  //     </div>
  //     <div className='pageBtn'>
  //       {/* <Button className='btnP'>前ページ&lt;&lt;</Button>
  //       <Button className='btnP'>&lt;&lt;次ページ</Button> */}
  //     </div>
  //     {/* <Button className='btnB'>&lt;&lt;前画面に戻る</Button> */}
  //   </div>
  // );

};

export default Inspect;