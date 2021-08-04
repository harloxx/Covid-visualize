import './css/Month.css';
import { useState, useEffect} from 'react'
import axios from 'axios'
import { Bar, Doughnut, Line} from "react-chartjs-2"

const Month=()=>{
  
  const [confirmedData,setConfirmedData]=useState({})
  const [todayData,setTodayData]=useState(null)

  useEffect(()=>{

    setTodayData(null);

    const fetchEvents=async()=>{
      const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
      makeData(res.data)
      setTodayData(res.data)
    }
    

    const makeData=(items)=>{
      const arr=items.reduce((acc,cur)=>{
          const currentDate=new Date(cur.Date);
          const year=currentDate.getFullYear();
          const month=currentDate.getMonth();
          const date=currentDate.getDate();
          const confirmed=cur.Confirmed;
          const active=cur.Active;
          const death=cur.Deaths;
          const recovered=cur.Recovered;
    
          const findItem=acc.find(a=>a.year===year&&a.month===month);
          if(!findItem){
            acc.push({year,month,date,confirmed,active,death,recovered})
          }
          if(findItem&&findItem.data<date){
              findItem.active=active;
              findItem.death=death;
              findItem.date=date;
              findItem.year=year;
              findItem.month=month;
              findItem.recovered=recovered;
              findItem.confirmed=confirmed;
          }
        return acc;
      },[])

      const last=arr[arr.length-1];
      const labels=arr.map(a=> `${a.month+1}월`)
      
      setConfirmedData({
        labels,
        datasets:[
          {
            label:"국내 누적 확진자",
            backgroundColor:"salmon",
            fill:true,
            data:arr.map(a=>a.confirmed)
          },
        ]
      });
      }
    
      fetchEvents();
    
    },[])


    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜


    const nowMonth=year+'년 '+month+'월 '+date+'일 '+'국내 누적 확진자 현황 입니다'
    const nowNum=month+'월 '+date+'일 확진자 수는 '+'명 입니다.'
    if (!todayData) return null;

    return (
        <section>
          <h1>국내 누적 확진자</h1>
            <div className="contents">
            <div>
              <Bar data={confirmedData} options={
                {title:{display:true,text:"누적 확진자 추이",fontSize:16}},
                {legend: {display:true, position:"bottom"}}
              } />
            </div>
            <div class="text_box">{nowMonth}</div><span></span>
            <div class="text_box">{nowNum}</div>
            <ul>
                {todayData.map(user => (
                  <li key={user.id}>
                    {user.Confirmed} ({user.Deaths})
                  </li>
                ))}
              </ul>
          </div>
        </section>
      )
}

export default Month
