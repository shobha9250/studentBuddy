import React, { useEffect,useState } from "react";
import axios from 'axios';
import {trackPromise} from "react-promise-tracker";
import Keys from "../config";
import EventCard from "../components/EventCard";
import {Row,Col,Container} from "react-bootstrap";
axios.defaults.withCredentials = true;

const Events = () =>{
    const [events,setEvents] = useState(null);
    const [isLoading, setLoading] = useState(true);
    
    const getEvents = async ()=>{
        const url = Keys.BASE_API +'/workshop';
        try {
            trackPromise(
                axios.get(url).then((res) => {
                    setEvents(res.data);   
                    console.log(res);               
                })
            );
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getEvents();
    },[isLoading]);

    return(
        <>
        <Row><Col className="mt-5" style={{textAlign:"center"}}><h1>Events</h1></Col></Row>
        {!events ?(<p>failed</p>):(
            <Row className="p-5">{events.map((eventObj)=>(
                <EventCard key={eventObj._id} eventObj = {eventObj} />
                
            ))}</Row>
        )}
        </>
    )
}
export default Events;