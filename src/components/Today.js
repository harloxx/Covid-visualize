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
    let today = new Date();  
    if (today==todayData.Date)
        console.log("right")

    
    return(
        <section>
            {todayData.map(datee=>(
                (datee.Date=="2021-07-05T00:00:00Z") ? (
                    <div key={datee.Date}>
                        <p>title:{datee.Deaths}</p>
                    </div>)
                :null
            ))}
        </section>
    );

}

export default Today;