import { useState, useEffect} from 'react'
import axios from 'axios'
import { Bar, Doughnut, Line} from "react-chartjs-2"

const Quar=()=>{
  const [quarantinedData,setQuarantinedData]=useState({})
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


    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate()-1;  // 날짜
    if (date<=2){
      if (month===1){
          year=year-1;
          month=12
          if(date==1) date=30
          else date=31
      }
      else if (month===5||month===7||month===9||month===11){
          month=month-1
          if(date===1) date=30
          else date=31
      }
      else if(month===3){
          month=month-1
          if(date===1) date=27
          else date=28
      }
      else{
          month=month-1
          if(date===1) date=30
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
  const firstFinal=String(year)+'-'+String(month)+'-'+'01T00:00:00Z'
  const final=String(year)+'-'+String(month)+'-'+String(date)+'T00:00:00Z'
  const nowMonth=year+'년 '+month+'월 '+date+'일 '+'국내 월별 격리자 현황 입니다'
  const monthNum=month+'월 1일 기준 격리자 수는 '
  const nowNum=month+'월 '+date+'일, 금일 날짜 기준 격리자 수는 '
  
  
  if (!todayData) return null;

    
        return (
          <div className="mastHome">
            <section>
              <h1>국내 누적 격리자</h1>
            <div className="contents">
                <div>
                <Line data={quarantinedData} options={
                {title:{display:true,text:"월별 격리자 현황",fontSize:16}},
                {legend: {display:true, position:"bottom"}}
                } />
               </div>
            </div>
            {todayData.map(datee=>(
                (datee.Date==firstFinal) ? (
                    <div key={datee.Date}>
                        <p>{monthNum}{datee.Active}명 입니다.</p>
                    </div>)
                :null        
            ))}
            {todayData.map(datee=>(
                (datee.Date==final) ? (
                    <div key={datee.Date}>
                        <p>{nowNum}{datee.Active}명 입니다.</p>
                    </div>)
                :null        
            ))}
          </section>
          </div>
        )

}

export default Quar
