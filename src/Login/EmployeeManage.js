import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { DatePicker, Typography, Button, Col, Divider, Row, Space, message, ConfigProvider } from "antd";
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { defaultTheme } from 'antd/es/theme/context';




const Manage = () => {

    const { Title } = Typography;

    //非活性化/活性化の制御
    const [maxEmployeeNo, setMaxEmployeeNo] = useState('');
    const [branchNameIsDisabled, setBranchNameIsDisabled] = useState(true);
    const [branchNoIsDisabled, setBranchNoIsDisabled] = useState(true);
    const [accountNoIsDisabled, setAccountNoIsDisabled] = useState(true);
    const [accountIsDisabled, setAccountIsDisabled] = useState(true);
    const [prefecturesIsDisabled, setPrefecturesIsDisabled] = useState(true);
    const [addressIsDisabled, setAddressIsDisabled] = useState(true);
    const [makeSureDisabled, setMakeSureDisabled] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [submitDisabled,setSubmitDisabled] = useState(true);
    const [employeeNameSDisabled,setEmployeeNameSDisabled] = useState(false);
    const [employeeNoDisabled,setEmployeeNoDisabled] = useState(false);
    //カレンダー
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [val, setVal] = useState('');

    //各項目
    const [employeeNo, setEmployeeNo] = useState('');
    const [employeeNameS, setEmployeeNameS] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [gender, setGender] = useState('男');
    const [joinConpanyYear, setJoinConpanyYear] = useState('');
    const [joinConpanyMonth, setJoinConpanyMonth] = useState('');
    const [dependent, setDependent] = useState('');
    const [salary, setSalary] = useState('');
    /*const [isInitialized, setIsInitialized] = useState(false);*/
    //salaryClear
    const [salaryClear, setSalaryClear] = useState('');
    const [firstPwd, setFirstPwd] = useState('');
    const [companyMail, setCompanyMail] = useState('');
    const [personalMail, setPersonalMail] = useState('');
    const [tel1, setTel1] = useState('');
    const [tel2, setTel2] = useState('');
    const [tel3, setTel3] = useState('');
    const [authority, setAuthority] = useState('社員');

    const [postNo1, setPsotNo1] = useState('');
    const [postNo2, setPsotNo2] = useState('');
    const [prefectures, setPrefectures] = useState('');
    const [address, setAddress] = useState('');
    const [station, setStation] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankNo, setBankNo] = useState('');
    const [branchName, setBranchName] = useState('');
    const [branchNo, setBranchNo] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [accountName, setAccountName] = useState('タナカ');
    const [branchNameNoError, setBranchNameNoError] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [age, setAge] = useState('');



    let authorityCode;
    let postalCode;

    //追加処理
    const [addUserOrNot, setAddUserOrNot] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    //必須項目のエラーメッセージ
    const [employeeNameError, setEmployeeNameError] = useState('');
    const [firstPwdError, setFirstPwdError] = useState('');
    const [authorityError, setAuthorityError] = useState('');
    const [employeeError, setEmployeeError] = useState('');

    //給料のエラーメッセージ
    const [salaryError, setSalaryError] = useState('');
    const numberRegex = /^[1-9][0-9]*$/;

    //mail验证
    const regMail_half = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*$/;
    const regMail_full = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;

    //mailエラー提示　
    const [companyMailError, setCompanyMailError] = useState('');
    const [personalMailError, setPersonalMailError] = useState('');

    //入社年月  joinConpanyError
    const [joinConpanyError, setJoinConpanyError] = useState('');

    //電話番号
    const reg_Tel = /^[0-9]+$/;
    const [telError, setTelError] = useState('');

    //初期パスワード
    const reg_Pwd = /^[a-zA-Z0-9]+$/;

    //郵便番号
    const [postNoError, setPostNoError] = useState('');

    //口座番号
    const [accountError, setAccountError] = useState('');

    //submitを許可
    const [allowLogin, setAllowLogin] = useState(false);
    //操作を判定の変数
    const [flag, setFlag] = useState(0);
    //点撃事件
    const [isClicked, setIsClicked] = useState(0);
    const[userRole,setUserRole] = useState('');
    const[username,setUsername] = useState('');
    const navigate = useNavigate;
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
    const toInspect = (event) => {
        // navigate('/Inspect');;
        window.alert(1)
        window.location.href='www.baidu.com';
    };
    const [updateTime,setUpdateTime] = useState();
    //追加処理
    const AddUser = async () => {
        setSubmitDisabled(false);
        setEmployeeNameSDisabled(true);
        setEmployeeNoDisabled(true);
        setFlag(1);
        setEmployeeError('');
        console.log(flag);
        if (flag != 1) {
            initialize1();
        }
        /*setIsInitialized(true);*/
        setIsClicked(1);
        try {
            const response = await axios.post('http://localhost:8080/employees/getMaxNo');
          
            console.log("-----------------", response.data);
            if (response.status === 200) {
                setMaxEmployeeNo(response.data);
                setEmployeeNo(response.data);
            } else {

            }
        } catch (error) {

        }
    }
    //修正の検索
    const selectUser = async () => {
        setSubmitDisabled(false);
        setFlag(2);
        if (flag != 2) {
            initialize1();
        }
        /*setIsInitialized(true);*/
        setIsClicked(2);
        console.log(employeeNo);
        if (employeeNo != '') {

            try {
                const response = await axios.post('http://localhost:8080/employees/employeeNo', { employeeNo });
                console.log("-----------------", response.data);
                if (response.status === 200) {
                    setEmployeeError('');
                    const data = response.data;
                    setEmployeeName(data.employeeName);
                    setFirstPwd(data.firstPwd);
                    if (data.authoritycode === 0) {
                        setAuthority('社員');
                    } else if (data.authorityCode === 1) {
                        setAuthority('管理者');
                    }
                    if (data.genderCode === 1) {
                        setGender('女');
                    } else if (data.genderCode === 0) {
                        setGender('男');
                    }
                    setJoinConpanyYear(data.joinConpanyYear);
                    setJoinConpanyMonth(data.joinConpanyMonth);
                    setDependent(data.dependent);
                    const salary = data.salary;
                    const newSalary = salary.replace(/,/g, "");
                    const clearZeroSalary = newSalary.replace(/^0+/, '').replace(/\.?0+$/, '');
                    const formattedNumber = addCommasToNumber(clearZeroSalary);
                    setSalary(formattedNumber);
                    setFirstPwd(data.firstPwd);
                    const companyMail = data.companyMail;
                    const formattedMail = companyMail.replace(/@lyc\.co\.jp$/, '');
                    setCompanyMail(formattedMail);
                    setPersonalMail(data.personalMail);
                    const phoneNo = data.phoneNo;
                    setTel1(phoneNo.substring(0, 3));
                    setTel2(phoneNo.substring(3, 7));
                    setTel3(phoneNo.substring(7, 11));
                    const postalCode = data.postalCode;
                    setPsotNo1(postalCode.substring(0, 3));
                    setPsotNo2(postalCode.substring(3, 7));
                    setPrefectures(data.prefectures);
                    setAddress(data.address);
                    setStation(data.station);
                    setBankName(data.bankName);
                    setBankNo(data.bankNo);
                    setBranchName(data.branchName);
                    setBranchNo(data.branchNo);
                    setAccountNo(data.accountNo);
                    setAccountName(data.accountName);
                    setMaxEmployeeNo(data.employeeNo);
                    setAge(data.age);
                    setUpdateTime(data.updateTime);
                } else {

                }
            } catch (error) {
                setEmployeeError("社員名または社員番号を入力してください");
            }
        } else if (employeeNameS != '') {//Fuzzy Query
            try {
                const response = await axios.post('http://localhost:8080/employees/employeeNameS', { employeeNameS });
                console.log("-----------------", response.data);
                if (response.status === 200) {
                    setEmployeeError('');
                    const data = response.data;
                    setEmployeeName(data.employeeName);
                    setFirstPwd(data.firstPwd);
                    if (data.authoritycode === 0){
                        setAuthority('社員');
                    } else if (data.authorityCode === 1) {
                        setAuthority('管理者');
                    }
                    if (data.genderCode === 1) {
                        setGender('女');
                    } else if (data.genderCode === 0) {
                        setGender('男');
                    }

                    setJoinConpanyYear(data.joinConpanyYear);
                    setJoinConpanyMonth(data.joinConpanyMonth);
                    setDependent(data.dependent);
                    const salary = data.salary;
                    const newSalary = salary.replace(/,/g, "");
                    const clearZeroSalary = newSalary.replace(/^0+/, '').replace(/\.?0+$/, '');
                    const formattedNumber = addCommasToNumber(clearZeroSalary);
                    setSalary(formattedNumber);
                    setFirstPwd(data.firstPwd);
                    const companyMail = data.companyMail;
                    const formattedMail = companyMail.replace(/@lyc\.co\.jp$/, '');
                    setCompanyMail(formattedMail);
                    setPersonalMail(data.personalMail);
                    const phoneNo = data.phoneNo;
                    setTel1(phoneNo.substring(0, 3));
                    setTel2(phoneNo.substring(3, 7));
                    setTel3(phoneNo.substring(7, 11));
                    const postalCode = data.postalCode;
                    setPsotNo1(postalCode.substring(0, 3));
                    setPsotNo2(postalCode.substring(3, 7));
                    setPrefectures(data.prefectures);
                    setAddress(data.address);
                    setStation(data.station);
                    setBankName(data.bankName);
                    setBankNo(data.bankNo);
                    setBranchName(data.branchName);
                    setBranchNo(data.branchNo);
                    setAccountNo(data.accountNo);
                    setAccountName(data.accountName);
                    setMaxEmployeeNo(data.employeeNo);
                    setAge(data.age);
                } else {

                }
            } catch (error) {
                setEmployeeError("社員名または社員番号を入力してください");
            }
        } else {
            setEmployeeError("社員名または社員番号を入力してください");
        }
    }
    //監視フラグ
    useEffect(() => {
        console.log("当前的 flag:", flag);
       
        
    }, [flag]);
    //削除の検索
    const deleteUser = async () => {
        setSubmitDisabled(false);
        setFlag(3);
        if (flag != 3) {
            initialize1();
        }
        /*setIsInitialized(true);*/
        setIsClicked(3);
        console.log(employeeNo);
        if (employeeNo != '') {

            try {
                const response = await axios.post('http://localhost:8080/employees/employeeNo', { employeeNo });
                console.log("-----------------", response.data);
                if (response.status === 200) {
                    setEmployeeError('');
                    setDisabled(true);
                    const data = response.data;
                    setEmployeeName(data.employeeName);
                    setFirstPwd(data.firstPwd);
                    if (data.authoritycode === 0) {
                        setAuthority('社員');
                    } else if (data.authorityCode === 1) {
                        setAuthority('管理者');
                    }
                    if (data.genderCode === 1) {
                        setGender('女');
                    } else if (data.genderCode === 0) {
                        setGender('男');
                    }

                    setJoinConpanyYear(data.joinConpanyYear);
                    setJoinConpanyMonth(data.joinConpanyMonth);
                    setDependent(data.dependent);
                    const salary = data.salary;
                    const newSalary = salary.replace(/,/g, "");
                    const clearZeroSalary = newSalary.replace(/^0+/, '').replace(/\.?0+$/, '');
                    const formattedNumber = addCommasToNumber(clearZeroSalary);
                    setSalary(formattedNumber);
                    setFirstPwd(data.firstPwd);
                    const companyMail = data.companyMail;
                    const formattedMail = companyMail.replace(/@lyc\.co\.jp$/, '');
                    setCompanyMail(formattedMail);
                    setPersonalMail(data.personalMail);
                    const phoneNo = data.phoneNo;
                    setTel1(phoneNo.substring(0, 3));
                    setTel2(phoneNo.substring(3, 7));
                    setTel3(phoneNo.substring(7, 11));
                    const postalCode = data.postalCode;
                    setPsotNo1(postalCode.substring(0, 3));
                    setPsotNo2(postalCode.substring(3, 7));
                    setPrefectures(data.prefectures);
                    setAddress(data.address);
                    setStation(data.station);
                    setBankName(data.bankName);
                    setBankNo(data.bankNo);
                    setBranchName(data.branchName);
                    setBranchNo(data.branchNo);
                    setAccountNo(data.accountNo);
                    setAccountName(data.accountName);
                    setMaxEmployeeNo(data.employeeNo);
                    setAge(data.age);
                } else {

                }
            } catch (error) {
                setEmployeeError("社員名または社員番号を入力してください");
            }
        } else if (employeeNameS != '') {//Fuzzy Query
            try {
                const response = await axios.post('http://localhost:8080/employees/employeeNameS', { employeeNameS });
                console.log("-----------------", response.data);
                if (response.status === 200) {
                    setEmployeeError('');
                    const data = response.data;
                    setEmployeeName(data.employeeName);
                    setFirstPwd(data.firstPwd);
                    if (data.authoritycode === 0) {
                        setAuthority('社員');
                    } else if (data.authorityCode === 1) {
                        setAuthority('管理者');
                    }
                    if (data.genderCode === 1) {
                        setGender('女');
                    } else if (data.genderCode === 0) {
                        setGender('男');
                    }
                    
                    setJoinConpanyYear(data.joinConpanyYear);
                    setJoinConpanyMonth(data.joinConpanyMonth);
                    setDependent(data.dependent);
                    const salary = data.salary;
                    const newSalary = salary.replace(/,/g, "");
                    const clearZeroSalary = newSalary.replace(/^0+/, '').replace(/\.?0+$/, '');
                    const formattedNumber = addCommasToNumber(clearZeroSalary);
                    setSalary(formattedNumber);
                    setFirstPwd(data.firstPwd);
                    const companyMail = data.companyMail;
                    const formattedMail = companyMail.replace(/@lyc\.co\.jp$/, '');
                    setCompanyMail(formattedMail);
                    setPersonalMail(data.personalMail);
                    const phoneNo = data.phoneNo;
                    setTel1(phoneNo.substring(0, 3));
                    setTel2(phoneNo.substring(3, 7));
                    setTel3(phoneNo.substring(7, 11));
                    const postalCode = data.postalCode;
                    setPsotNo1(postalCode.substring(0, 3));
                    setPsotNo2(postalCode.substring(3, 7));
                    setPrefectures(data.prefectures);
                    setAddress(data.address);
                    setStation(data.station);
                    setBankName(data.bankName);
                    setBankNo(data.bankNo);
                    setBranchName(data.branchName);
                    setBranchNo(data.branchNo);
                    setAccountNo(data.accountNo);
                    setAccountName(data.accountName);
                    setMaxEmployeeNo(data.employeeNo);
                    setAge(data.age);
                } else {

                }
            } catch (error) {
                setEmployeeError("社員名または社員番号を入力してください");
            }
        } else {
            setEmployeeError("社員名または社員番号を入力してください");
        }
    }
    //銀行と連携項目のチェック
    const handleBankInfo = () => {

        setAccountError('');

        console.log("bankNo--", bankNo);

        if (bankNo !== '') {

            //銀行に関連する項目を活性化する
            setBranchNameIsDisabled(false);
            setBranchNoIsDisabled(false);
            setAccountNoIsDisabled(false);
            setAccountIsDisabled(false);
        } else {
            setBranchNameIsDisabled(true);
            setBranchNoIsDisabled(true);
            setAccountNoIsDisabled(true);
            setAccountIsDisabled(true);
            setBranchName('');
            setBranchNo('');
            setAccountNo('');
            setAccountName('');
            setBranchNameNoError('');
        }

    }
    /*const [oldBranchName, setOldBranchName] = useState('');//?
    useEffect(() => {
        console.log("oldBranchName",oldBranchName)
        console.log("branchName", branchName)

        if(branchName !== oldBranchName) {
            setBranchNo("")
        }
    }, [branchName])*/


    //支店名チェック
    const handleBranchName = async () => {
        setBranchNameNoError('');
        setAccountError('');

        //setOldBranchName(branchName);
        if (branchName !== '' && branchNo === '') {
            try {
                const response = await axios.post('http://localhost:8080/employees/handleBranchName', { bankNo, branchName });
                console.log("-----------------", response.data);
                if (response.status === 200) {

                    if (response.data !== "") {
                        setBranchNo(response.data);
                        console.log("success");
                    } else {
                        setBranchNo('');
                        setBranchNameNoError("支店名また支店番号は支店マスターで存在してない、ご確認ください");
                        console.log("branchNameNoError", branchNameNoError);
                        console.log("fail");
                    }
                }
            } catch (error) {

            }

        } else if (branchName === '') {
            setBranchNo('');
        }


    }

    useEffect(() => {
        console.log("ssssssssssssssss")
        if (branchNo.length !== 3) {
            setBranchName("")
        }
    }, [branchNo])

    //支店番号チェック branchNo
    const handleBranchNo = async () => {
        setBranchNameNoError('');

        if (branchNo !== '' && !reg_Tel.test(branchNo)) {
            setBranchName('');
            setBranchNameNoError("半角数字で入力してください");
            setAccountError('');
            return;
        }

        try {
            if (branchNo !== '' && branchName === '') {
                const response = await axios.post('http://localhost:8080/employees/handleBranchNo', { bankNo, branchNo });
                console.log("-----------------", response.data);
                if (response.status === 200) {

                    if (response.data !== "") {
                        setBranchName(response.data);
                        console.log("success");
                    } else {
                        setBranchName('');
                        setBranchNameNoError("支店名また支店番号は支店マスターで存在してない、ご確認ください");
                        console.log("branchNameNoError", branchNameNoError);
                        console.log("fail");
                    }
                }
            } else if (branchNo === '') {
                setBranchName('');
            }
        }

        catch (error) {

        }

    }


    const [birthday, setBirthday] = useState(null);
    const handleBirthdayChange = (date) => {
        setBirthday(date);
        setDatePickerVisible(false);
    }

    //correct
    /*useEffect(() => {
          if (birthday) {
            const calculatedAge = calculateAge(birthday);
            setAge(calculatedAge);
          }
        }, [birthday]);
        const handleChange = (e) => {
          setAge(e.target.value);
        };*/
    const calculateAge = (birthday) => {
        if (!birthday) return '';

        const today = new Date();
        const birthDate = new Date(birthday);
        const plustoday = new Date();

        plustoday.setDate(today.getDate() + 5);
        plustoday.setFullYear(today.getFullYear() + 5);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };


    //
    const [postCheck, setPostCheck] = useState(false);
    const handlePost = async (event) => {

        event.preventDefault();
        console.log('postNo1', postNo1)
        console.log('postNo2', postNo2)


        setPostNoError('');


        setPrefectures('');
        setAddress('');
        setStation('');

        if (postNo1 === '' || postNo2 === '' || postNo1.length !== 3 || postNo2.length !== 4) {
            setPostNoError('正しく郵便番号を入力してください');

        } else {

            const fullPost = postNo1 + postNo2;
            const fullURL = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + fullPost;
            console.log('fullURL----', fullURL)

            const PostResponse = await axios.get(fullURL);

            if (PostResponse.data.status === 200) {
                console.log('PostResponse.data----', PostResponse.data)
                console.log('PostResponse.data.message----', PostResponse.data.message)
                console.log('PostResponse.data.results----', PostResponse.data.results)
                console.log('PostResponse.data.status----', PostResponse.data.status)

                if (PostResponse.data.results === null) {
                    setPostNoError('正しく郵便番号を入力してください');
                } else {
                    const address = PostResponse.data.results[0].address1 + PostResponse.data.results[0].address2 + PostResponse.data.results[0].address3
                    setPrefectures(address);
                    setAddressIsDisabled(false);

                    //???????
                    setPostCheck(true);
                }

            } else if (PostResponse.status === 400) {
                setPostNoError('必須パラメータが指定されていません。');
            }
        }
    }

    function addCommasToNumber(number) {
        // 将数字转换为字符串
        let numStr = number.toString();
        // 从右向左每隔三位添加逗号
        let result = "";
        let count = 0;
        for (let i = numStr.length - 1; i >= 0; i--) {
            result = numStr[i] + result;
            count++;
            if (count % 3 === 0 && i !== 0) {
                result = "," + result;
            }
        }
        return result;
    }
    //ボタン変換の黙認界面
    function initialize1() {
        setDisabled(false);
        setSubmitDisabled(false);
        setJoinConpanyYear('');
        setJoinConpanyMonth('');
        setDependent('');
        setEmployeeName('');
        setFirstPwd('');
        setSalary('');
        setFirstPwd('');
        setAuthority('');
        setCompanyMail('');
        setPersonalMail('');
        setGender('');
        setTel1('');
        setTel2('');
        setTel3('');
        setMaxEmployeeNo('');
        //setEmployeeNameS('');
        setPsotNo1('');
        setPsotNo2('');
        setPrefectures('');
        setAddress('');
        setStation('');
        setBankName('');
        setBankNo('');
        setBranchName('');
        setBranchNo('');
        setAccountNo('');
        setAccountName('');
        //setEmployeeNo('');
        setAge('');
    }
    //送信したの黙認界面
    function initialize2() {
        setEmployeeNameSDisabled(false);
        setEmployeeNoDisabled(false);
        setSubmitDisabled(true);
        setJoinConpanyYear('');
        setJoinConpanyMonth('');
        setDependent('');
        setEmployeeName('');
        setFirstPwd('');
        setSalary('');
        setFirstPwd('');
        setAuthority('');
        setCompanyMail('');
        setPersonalMail('');
        setGender('');
        setTel1('');
        setTel2('');
        setTel3('');
        setMaxEmployeeNo('');
        setEmployeeNameS('');
        setPsotNo1('');
        setPsotNo2('');
        setPrefectures('');
        setAddress('');
        setStation('');
        setBankName('');
        setBankNo('');
        setBranchName('');
        setBranchNo('');
        setAccountNo('');
        setAccountName('');
        setEmployeeNo('');
        setAge('');
    }


    const handleClearSalary = () => {
        const newSalaryClear = salary.replace(/,/g, "");
        const clearZeroSalary = newSalaryClear.replace(/^0+/, '');
        setSalary(clearZeroSalary);
        setSalaryClear(clearZeroSalary);

        // console.log("newSalaryClear---",newSalaryClear)

    }

    const handleSalary = () => {
        const newSalary = salary.replace(/,/g, "");
        const clearZeroSalary = newSalary.replace(/^0+/, '').replace(/\.?0+$/, '');
        const formattedNumber = addCommasToNumber(clearZeroSalary);
        setSalary(formattedNumber);
        setSalaryClear(salary);
    }


    // 计算 20 岁和 50 岁的日期范围
    const twentyYearsAgo = moment().subtract(20, 'years');
    const fiftyYearsAgo = moment().subtract(50, 'years');

    // 定义一个禁用日期的函数
    const disabledDate = (current) => {
        if (current) {
            return current.isAfter(twentyYearsAgo) || current.isBefore(fiftyYearsAgo);
        }
        return false;
    };
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const handleButtonClick = () => {
        setDatePickerVisible(!isDatePickerVisible); // 切换日历的显示与隐藏
    };
    const handleDatePickerChange = (date, dateString) => {
        console.log(date, dateString);
        setDatePickerVisible(false); // 选择日期后隐藏日历
    };

    const handleDatePickerCancel = () => {
        setDatePickerVisible(false);
    };
    //年月チェック
    const inputStyle = (value) => ({
        border: value === '' && joinConpanyError ? '2px solid red' : '2px solid #ccc',
        padding: '4px',
        borderRadius: '4px',
        outline: 'none',
       
      });
    const ManageEmployee = async function (event) {
        // event.preventDefault();

        let isValid = true;
        if (postNo1 === '' || postNo2 === '') {
            setPrefectures('');
            setAddress('');
            setStation('');
        }

        const newSalary = salary.replace(/,/g, "");
        //console.log("bankNo--------------",bankNo);

        //エラー提示を消す
        setEmployeeNameError('');
        setFirstPwdError('');
        setAuthorityError('');
        setSalaryError('');
        setCompanyMailError('');
        setPersonalMailError('');
        setJoinConpanyError('');
        setTelError('');
        setPostNoError('');
        setAccountError('');
        setEmployeeError('');//corrected

        //console.log('bankNo--------------',bankNo);

        
        //必須項目
        if (employeeName === '') {
            setEmployeeNameError('必須項目を入力してください');
            isValid = false;
        } else if (firstPwd === '') {
            setFirstPwdError('必須項目を入力してください');
            isValid = false;
        } else if (!reg_Pwd.test(firstPwd)) {
            isValid = false;
            setFirstPwdError('半角数字またはアルファベットで入力してください');
        }else if(firstPwd.length < 6){
            setFirstPwdError('初期パスワード入力が間違っています');
            isValid = false;
        }
         else if (newSalary !== '' && newSalary.length < 5) {
            // const salaryClear = salary.replace(/,/g, "");
            setSalaryError('入力桁数が正しくありません、再入力してください');
            isValid = false;
        }else if(/[^0-9]/.test(newSalary)){
            setSalaryError('半角数字で入力してください');
            isValid = false;
        }
        //社用メールチェック
        else if (companyMail !== '' && !regMail_half.test(companyMail)) {
            console.log('companyMail----', companyMail)
            const aa = regMail_half.test(companyMail)
            console.log('----aa', aa)
            setCompanyMailError('正しくメールアドレス入力してください');
            isValid = false;
        }
        //私用メールチェック
        else if (personalMail !== '' && !regMail_full.test(personalMail)) {
            setPersonalMailError('正しくメールアドレス入力してください');
            isValid = false;
        }
        //入社年月
        else if (joinConpanyYear === '' && joinConpanyMonth !== '') {
            setJoinConpanyError('入社年月を正しく入力してください');
            isValid = false;
        } else if (joinConpanyYear !== '' && joinConpanyMonth === '') {
            setJoinConpanyError('入社年月を正しく入力してください');
            isValid = false;
        }
        //電話番号
        else if (tel1 !== '' && !reg_Tel.test(tel1)) {
            setTelError('電話番号を正しく入力してください(数字のみ)');
            isValid = false;
        } else if (tel2 !== '' && !reg_Tel.test(tel2)) {
            setTelError('電話番号を正しく入力してください(数字のみ)');
            isValid = false;
        } else if (tel3 !== '' && !reg_Tel.test(tel3)) {
            setTelError('電話番号を正しく入力してください(数字のみ)');
            isValid = false;
        } else if (tel1 !== '' || tel2 !== '' || tel3 !== '') {
            if (tel1.length + tel2.length + tel3.length < 11) {
                setTelError('桁数入力が間違っています');
                isValid = false;
            }

        } else if (postNo1 !== '' || postNo2 !== '') {
            console.log("postNo1!!!!!!!!!!!!!!!!!!!!", postNo1)
            if (postNo1.length !== 3) {
                setPostNoError('正しく郵便番号を入力してください');
                isValid = false;
            } else if (postNo2.length !== 4) {
                setPostNoError('正しく郵便番号を入力してください');
                isValid = false;
            }
        }

        //銀行に関連する項目
        else if (bankNo !== '' && branchName === '') {
            setAccountError('銀行情報関連項目を入力してください');
            isValid = false;
        } else if (bankNo !== '' && branchNo === '') {
            setAccountError('銀行情報関連項目を入力してください');
            isValid = false;
        } else if (bankNo !== '' && accountNo === '') {
            setAccountError('銀行情報関連項目を入力してください');
            isValid = false;
        } else if (bankNo !== '' && accountName === '') {
            setAccountError('銀行情報関連項目を入力してください');
            isValid = false;
        } else if (accountNo !== '' && !reg_Tel.test(accountNo)) {
            setAccountError('半角数字で入力してください');
            isValid = false;
        } else if (/[^ァ-ン]/.test(accountName)) {
            setAccountError('口座名義人をカタカナで入力してください');
            //isValid = flase;
        } else {
            console.log('bankNo----11111----------', bankNo);
            //すべての項目のチェックが完了する場合、提出を許可
            setAllowLogin(true);

            

            let StrAge = calculateAge(birthday);
            console.log("StrAge", StrAge)
            console.log('calculateAge(birthday)', calculateAge(birthday))


        }
        return isValid;
    }

    const submitClick = async () => {
        if (flag === 1||flag === 2) { 
            const isCheckValid = await ManageEmployee();
            if (isCheckValid) {
                setIsOpen(true); // 检查通过时才打开弹窗
            }
        } else {
            setIsOpen(true); // 当 flag 不等于 1 时直接打开弹窗
        }
        

    }
    const handleConfirm = async (e) => {
        let employeeNo = ''
        let authorityCode = 0
        let genderCode = 0
        authorityCode = authority === '社員' ? 0 : 1
        genderCode = gender === '男' ? 0 : 1
        
       
        if (maxEmployeeNo === '') {
            return
        } else {
            employeeNo = maxEmployeeNo
            const formData = {
                employeeNo,//
                employeeName,//
                gender,
                genderCode,//
                joinConpanyYear,
                joinConpanyMonth,
                dependent,
                salary: salary.replace(/,/g, ""), // Remove commas
                firstPwd,//
                companyMail,
                personalMail,
                tel1,
                tel2,
                tel3,
                authority,
                authorityCode,//
                postalCode: postNo1 + postNo2,
                prefectures,
                address,
                station,
                bankName,
                bankNo,
                branchName,
                branchNo,
                accountNo,
                accountName,
                phoneNo: tel1 + tel2 + tel3,
                age: calculateAge(birthday),
                updateTime
            }
        
            e.preventDefault();
            try {
                if (flag === 1) {
                    //追加
                    const response = await axios.post('http://localhost:8080/employees/insertEmployee', formData);
                    const gotInsertFromBack =  response.data;                    
                    if (gotInsertFromBack === 1) {
                        console.log(gotInsertFromBack);
                        message.success('社員情報が正常に登録されました', 3)
                        initialize2();
                    }else if(gotInsertFromBack === 0){
                        console.log(gotInsertFromBack);
                        message.error('社員情報の登録に失敗しました' , 3)
                        setTimeout(() => {
                            window.location.reload();
                            console.log('delay');
                        }, 3000);
                       // 
                    }
                    //修正
                } else if (flag === 2) {
                    const response = await axios.post('http://localhost:8080/employees/updateEmployee', formData);
                    const gotUpdateFromBack =  response.data;
                    if(gotUpdateFromBack  === 3){
                        console.log('排他处理');
                        message.error('社員情報の更新が失敗しました' , 3)
                        setTimeout(() => {
                            window.location.reload();
                            console.log('delay');
                        }, 3000);
                        return;
                    }                    
                    if (gotUpdateFromBack === 1) {
                        console.log(gotUpdateFromBack);
                        message.success('社員情報が正常に更新されました', 3)
                        initialize2();
                    }else if(gotUpdateFromBack === 0){
                        console.log(gotUpdateFromBack);
                        message.error('社員情報の更新が失敗しました' , 3)
                        setTimeout(() => {
                            window.location.reload();
                            console.log('delay');
                        }, 3000);
                       // 
                    }
                    //削除    
                } else if (flag === 3) {
                    const response = await axios.post('http://localhost:8080/employees/deleteEmployee', formData);
                    if (response.status === 200) {
                        
                        message.success('社員情報が正常に削除されました', 3)
                        setTimeout(() => {
                            console.log('delay');
                            window.location.reload();
                        }, 3000);
                        //initialize2();
                    }
                }

            } catch (error) {
                
            }

        }
        setIsOpen(false);
    }
    const handleCancel = () => {
        console.log("いいえを選択しました");
        setIsOpen(false);
    };
    const getModalContent = () => {
        if (flag === 1) {
            return 'インサートしてもよろしいでしょうか ?';
        } else if (flag === 2) {
            return '修正してもよろしいでしょうか ?';
        } else if (flag === 3) {
            return '削除してもよろしいでしょうか ?';
        }
    };




    return (
        <div>
            <div>
                <span className='Manage_Top1'>LYC株式会社</span>
                <span className='Manage_Top2'><a href='http://localhost:3000/login'>ログアウト</a></span>
            </div><br /><br />
            <Title level={2} style={{ textAlign: 'center' }}>社員勤務管理システム</Title>
            <Title level={4} style={{ textAlign: 'center' }}>社員情報管理画面</Title>
            <div className='Manage_Row'><span>{userRole}:{username}<span></span></span></div><br /><br />

            <form onSubmit={ManageEmployee}>
                <div className='div1'>
                    <button className='EMbtn1' onClick={AddUser} style={{ backgroundColor: isClicked === 1 ? 'green' : '' }} type='button'>追加</button>
                    <button className='EMbtn1' onClick={selectUser} style={{ backgroundColor: isClicked === 2 ? 'green' : '' }} type='button'>修正</button>
                    <button className='EMbtn1' onClick={deleteUser} style={{ backgroundColor: isClicked === 3 ? 'green' : '' }} type='button'>削除</button>
                    <button className='EMbtn1'  onClick={toInspect}>詳細検索画面へ</button>
                </div><br />
               <div  className='mainForm' style={{ marginLeft: '100px'}}>
                <div>
                    <label className='Block_Item'>社員番号：</label>
                    <input className='Input_Item' value={employeeNo} disabled = {employeeNoDisabled} onChange={(e) => setEmployeeNo(e.target.value)} />
                    <span className='Block_OR_Item'>OR</span>
                    <label className='Block_Item2'>社員名：</label>
                    <input className='Input_Item2' value={employeeNameS} disabled ={employeeNameSDisabled} onChange={(e) => setEmployeeNameS(e.target.value)} />
                    {employeeError && <span className="employeeError-msg" style={{ color: 'red', marginLeft: '5px' }}>{employeeError}</span>}
                </div><br />
                <div className="line"></div><br />
                <div>
                    <label className='Second_Item'>社員番号：</label>
                    <input className='EmployeeNo_Input_Item' style={{ width: '310px' }} value={maxEmployeeNo} onChange={(e) => setMaxEmployeeNo(e.target.value)} readOnly disabled />{/*? */}
                </div><br />
                <div>
                    <label className='Second_Item'>社員名：</label>
                    <input className={`EmployeeName_Input_Item ${employeeNameError ? 'error-input' : ''}`}  style={{ width: '310px' }} value={employeeName} disabled={disabled} onChange={(e) => setEmployeeName(e.target.value)} />
                    <span style={{ color: 'red', marginLeft: '5px' }}>&#9733;</span>
                    {employeeNameError && <span className="manage_branchNameNoError-msg" >{employeeNameError}</span>}
                </div><br />
                <div>
                    <label className='Second_Item' >性別：</label>
                    <select className='Input_Item' disabled={disabled} value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option>男</option>
                        <option>女</option>
                    </select>
                    <label className='Block_Item2'>年齢：</label>
                    <input className='Input_Item2' value={birthday ? calculateAge(birthday) : age} disabled />歳


                    <Button onClick={handleButtonClick} style={{ marginLeft: '5px', display: 'inline-block' }}>カレンダー</Button>
                    {/*？ */}{isDatePickerVisible && (<DatePicker disabledDate={disabledDate} onChange={handleBirthdayChange} onCancel={handleDatePickerCancel} style={{ marginLeft: '10px', display: 'inline-block', height: '22px' }} />)}
                </div><br />
                <div>
                    <label className='Second_Item'>入社年月：</label>
                    <select className='Input_Item' disabled={disabled} value={joinConpanyYear} onChange={(e) => setJoinConpanyYear(e.target.value)} style={inputStyle(joinConpanyYear)}>
                        <option></option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                    </select>
                    <label className='Year_Item'>年</label>
                    <select className='Input_Item' value={joinConpanyMonth} disabled={disabled} onChange={(e) => setJoinConpanyMonth(e.target.value)}  style={inputStyle(joinConpanyMonth)} >
                        <option></option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                    <label className='Year_Item'>月</label>

                    {joinConpanyError && <span className="manage_branchNameNoError-msg" >{joinConpanyError}</span>}
                </div><br />
                <div>
                    <label className='Second_Item'>扶養人数：</label>
                    <select className='Input_Item' disabled={disabled} value={dependent} onChange={(e) => setDependent(e.target.value)}>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <label className='Block_Item2'>給料：</label>
                    <input className={`Input_Item  ${ salaryError ? 'error-input' : ''}`} disabled={disabled} value={salary} maxLength={6} onClick={handleClearSalary} onBlur={handleSalary} onChange={(e) => setSalary(e.target.value)} />
                    <label className=''> 円</label>
                    {salaryError && <span className="manage_branchNameNoError-msg" >{salaryError}</span>}
                </div><br />
                <div>
                    <label className='Block_Item'>初期パスワード：</label>
                    <input className= {`Pwd_Input_Item ${firstPwdError ? 'error-input' : ''}`} type='password' maxLength={30} value={firstPwd} disabled={disabled} onChange={(e) => setFirstPwd(e.target.value)} />
                    <span style={{ color: 'red', marginLeft: '5px' }}>&#9733;</span>
                    {firstPwdError && <span className="manage_branchNameNoError-msg" >{firstPwdError}</span>}
                </div><br />
                <div>
                    <label className='Block_Item'>社用メールアドレス：</label>
                    <input className= {`Personal_Mail_Input ${companyMailError ? 'error-input' : ''}`} maxLength={20} value={companyMail} disabled={disabled} onChange={(e) => setCompanyMail(e.target.value)} />
                    <label className=''>@lyc.co.jp</label>
                    {companyMailError && <span className="manage_branchNameNoError-msg" >{companyMailError}</span>}
                </div><br />
                <div>
                    <label className='Block_Item'>私用メールアドレス：</label>
                    <input className= {`Mail_Item ${personalMailError ? 'error-input' : ''}`} maxLength={50} value={personalMail} disabled={disabled} onChange={(e) => setPersonalMail(e.target.value)} />
                    {personalMailError && <span className="manage_branchNameNoError-msg" >{personalMailError}</span>}
                </div><br />
                <div>
                    <label className='Second_Item'>電話番号：</label>
                    <input className= {`tel_Item ${telError ? 'error-input' : ''}`} value={tel1} disabled={disabled} maxLength={3} onChange={(e) => setTel1(e.target.value)} /><span className='tel_Item2'>-</span>
                    <input className={`tel_Item3 ${telError ? 'error-input' : ''}`} value={tel2} disabled={disabled} maxLength={4} onChange={(e) => setTel2(e.target.value)} /><span className='tel_Item2'>-</span>
                    <input className={`tel_Item3 ${telError ? 'error-input' : ''}`} value={tel3} disabled={disabled} maxLength={4} onChange={(e) => setTel3(e.target.value)} />
                    {telError && <span className="manage_branchNameNoError-msg" >{telError}</span>}
                </div><br />
                <div>
                    <label className='Second_Item'>権限：</label>
                    <select className='Input_Item' value={authority} disabled={disabled} onChange={(e) => setAuthority(e.target.value)}>
                        <option>社員</option>
                        <option>管理者</option>
                    </select>
                    <span style={{ color: 'red', marginLeft: '5px' }}>&#9733;</span>
                    {authorityError && <span className="manage_branchNameNoError-msg" >{authorityError}</span>}
                </div><br />
                <div className='Text_Item'><strong>住所情報</strong></div><br /> <br />
                <div>
                    <label className='address_Item'>郵便番号：〒</label>
                    <input className= {`tel_Item ${postNoError ? 'error-input' : ''}`} value={postNo1} disabled={disabled} maxLength={3} onChange={(e) => setPsotNo1(e.target.value)} /><span className='tel_Item2'>-</span>
                    <input className= {`tel_Item3 ${postNoError ? 'error-input' : ''}`} value={postNo2} maxLength={4} disabled={disabled} onChange={(e) => setPsotNo2(e.target.value)} />
                    <button className='address_Btn' onClick={handlePost} type='onClick'>検索</button>
                    {postNoError && <span className="manage_branchNameNoError-msg" >{postNoError}</span>}
                </div><br />
                <div>
                    <label className='Block_Item'>都道府県+市区町村：</label>
                    <input className='address_input' disabled={prefecturesIsDisabled} value={prefectures} onChange={(e) => setPrefectures(e.target.value)} />
                </div><br />
                <div>
                    <label className='Block_Item'>以降の住所：</label>
                    <input className='address_input2' disabled={addressIsDisabled} value={address} onChange={(e) => setAddress(e.target.value)} />
                </div><br />
                <div>
                    <label className='Second_Item'>寄り駅：</label>
                    <input className='Input_Item' value={station} disabled={disabled} onChange={(e) => setStation(e.target.value)} />
                </div><br />
                <div className='Text_Item'><strong>口座情報</strong></div><br /> <br />
                <div>
                    <label className='Second_Item'>銀行名：</label>
                    <select className='Bank_Input_Item' disabled={disabled} value={bankNo} onBlur={handleBankInfo} onChange={(e) => {
                        setBankNo(e.target.value);
                        setBranchName('');
                        setBranchNo('');
                        setAccountNo('');
                        setAccountName('');
                    }}  >
                        <option></option>
                        <option value={1}>東京三菱UFJ銀行</option>
                        <option value={2}>みずほ銀行</option>
                        <option value={3}>三井銀行</option>
                        <option value={4}>郵政銀行</option>
                    </select>
                </div><br />
                <div>
                    <label className='Second_Item'>支店名：</label>
                    <input className= {`Input_Item ${branchNameNoError ? 'error-input' : ''}`} disabled={branchNameIsDisabled} onBlur={handleBranchName} value={branchName} onChange={(e) => setBranchName(e.target.value)} />
                    <label className='Branch_No_Item'>支店番号：</label>
                    <input className= {`Branch_Item ${branchNameNoError ? 'error-input' : ''}`} disabled={branchNoIsDisabled} onBlur={handleBranchNo} value={branchNo} onChange={(e) => setBranchNo(e.target.value)} />
                    {branchNameNoError && <span className="manage_branchNameNoError-msg" >{branchNameNoError}</span>}
                </div><br />
                <div>
                    <label className='Second_Item'>口座番号：</label>
                    <input className= {`Input_Item ${ accountError ? 'error-input' : ''}`} maxLength={10} disabled={accountNoIsDisabled} value={accountNo} onChange={(e) => setAccountNo(e.target.value)} />
                    <label className='Bank_Item2'>口座名義人：</label>
                    <input className= {`BankInput_Item ${accountError ? 'error-input' : ''}`} maxLength={5} disabled={accountIsDisabled} value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                    {accountError && <span className="manage_branchNameNoError-msg" >{accountError}</span>}
                </div><br />
                
                    <input className='Time' maxLength={50}  value={updateTime} onChange={(e) => setUpdateTime(e.target.value)} style={{ display: 'none' }}/>
                <div className="Manage_Btn">
                    <button type="button" onClick={submitClick} className='submitM1' disabled={submitDisabled}>確定</button>
                </div>
                <div>
                </div>
                </div>
                {isOpen && (
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white',
                            color: 'blue',
                            padding: '40px 20px',
                            borderRadius: '10px',
                            width: '400px',
                            height: '200px',
                            textAlign: 'center',


                        }}
                    >
                        <div style={{ marginBottom: '20px', marginTop: '100px' }}>
                            <p style={{
                                position: 'relative',
                                top: '-100px',
                            }}>{getModalContent()}</p>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <button
                                onClick={handleConfirm}
                                style={{
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    padding: '10px 20px',
                                    marginRight: '10px',
                                    borderRadius: '5px',
                                    border: 'none',
                                }}
                            >
                                はい
                            </button>
                            <button
                                onClick={handleCancel}
                                style={{
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    border: 'none'
                                }}
                            >
                                いいえ
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )

}
export default Manage;// 默认导出
