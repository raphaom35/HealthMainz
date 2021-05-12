import React,{useState} from 'react'
import "./appointment.css";
import Notification from "../../../Notifications/Notification"
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'

export default function AppointmentCard(props) {
    const history = useHistory();
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
    let appt=props.appt;
    function chat(){
        var today = new Date();
        let currTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let compareDate=new Date(appt.date)
        let minDiff=parseInt(currTime.slice(3,6))-parseInt(appt.time.slice(3,6));
        let hourDiff=parseInt(currTime.slice(0,2))-parseInt(appt.time.slice(0,2));
        if(today.getTime()<compareDate.getTime())
            setNotify({isOpen:true,message:"Appointment not scheduled today",type:'error'})
        else if(currTime<appt.time)
            setNotify({isOpen:true,message:"Appointment has not started",type:'error'})
        else if(minDiff>15||hourDiff!==0)
            setNotify({isOpen:true,message:"Appointment Missed",type:'error'})
        else
            history.push("/join?appID="+appt.Appt_ID)
    }
    return(
        <div>
            <Notification notif={notif} ></Notification>
            <div className="appointmentCard">
                <div className="name">{appt.name}</div>
                <div className="ill">{appt.illness}</div>
                <div className="date_time">
                    {appt.date}
                    <br></br>
                    {appt.time}
                </div>
                <div className="but" onClick={chat}>
                    Join
                </div>
                <div className="apptID" >
                    {appt.Appt_ID}
                </div>
            </div>
        </div>
    )
}