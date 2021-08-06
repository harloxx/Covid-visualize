import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Today=()=>{

    const [todayData,setTodayData]=useState(null)
    

    useEffect(()=>{
        setTodayData(null);
        const fetchToday = async () => {
            const response = await axios.get("https://api.covid19api.com/total/dayone/country/kr");
            setTodayData(response.data);
        }
        fetchToday();
        },[]);

    if (!todayData) return null;

    let todayDate=new Date();
    let year = todayDate.getFullYear(); // 년도
    let month = todayDate.getMonth() + 1;  // 월
    let date = todayDate.getDate()-1;  // 날짜
    let yesterday = todayDate.getDate()-1;

    if (date<=2){
        if (month==1){
            year=year-1;
            month=12
            if(date==1) date=30
            else date=31
        }
        else if (month==5||month==7||month==9||month==11){
            month=month-1
            if(date==1) date=30
            else date=31
        }
        else if(month==3){
            month=month-1
            if(date==1) date=27
            else date=28
        }
        else{
            month=month-1
            if(date==1) date=30
            else date=31
        }
    }    

    if (month<10){
        month=String(month)
        month='0'+month
    }
    if (date<10){
        date=String(date)
        date='0'+date
    }
    if (yesterday<10){
        yesterday=String(yesterday)
        yesterday='0'+yesterday
    }
    const final=String(year)+'-'+String(month)+'-'+String(date)+'T00:00:00Z'
    const compare=String(year)+'-'+String(month)+'-'+String(yesterday)+'T00:00:00Z'
    
    
    return(
        <section>
            {todayData.map(datee=>(
                (datee.Date==final) ? (
                    <div key={datee.Date}>
                        <p>{datee.Deaths}</p>
                    </div>)
                :null        
            ))}
            {todayData.map(dateee=>(
                (dateee.Date==compare) ? (
                    <div key={dateee.Date}>
                        <p>title:{dateee.Deaths}</p>
                    </div>)
                :null
            ))}
            
        </section>
    );

}
/*<li key={datee.Date}>{datee.Deaths}hh</li>*/
export default Today;