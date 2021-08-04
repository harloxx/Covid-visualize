
import "./css/total.css";
import arr from "./Contents.js"

import { useState, useEffect} from 'react'
import axios from 'axios'
import { Bar, Doughnut, Line} from "react-chartjs-2"

const Quar=()=>{
    const [quarantinedData,setQuarantinedData]=useState({})
    useEffect(()=>{
        const fetchEvents=async()=>{
          const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
          makeData(res.data)
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
      setQuarantinedData({
        labels,
        datasets:[
          {
            label:"월별 격리자 현황",
            borderColor:"salmon",
            fill:false,
            data:arr.map(a=>a.active)
          },
        ]
    });
      }
    
        fetchEvents();
    
      },[])
    
        return (
            <section>
            <div className="contents">
                <div>
                <Line data={quarantinedData} options={
                {title:{display:true,text:"월별 격리자 현황",fontSize:16}},
                {legend: {display:true, position:"bottom"}}
                } />
            </div>
            </div>
    
          </section>
        )

}

export default Quar
