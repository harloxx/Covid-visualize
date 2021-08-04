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
    return(
        <section>
          <h1>국내 누적 확진자</h1>
            <ul>
                {todayData.map(user => (
                  <li key={user.id}>
                    {user.Confirmed} ({user.Deaths})
                  </li>
                ))}
              </ul>
        </section>
    );

}

export default Today;