import React from "react";
import {Row,Col,Container} from "react-bootstrap";
import dateFormat from 'dateformat';

const EventCard = ({eventObj}) =>{
    return(
        <>
            <Col className="border border-primary m-3 p-2 mt-3">
                <Row>
                    {/* <Col><img src="https://res.cloudinary.com/techspardha2/image/upload/v1687198378/img_orjuvh.jpg" alt="this is an image" style={{maxWidth: "100%", maxHeight:"100%"}}></img></Col> */}
                    <Col><img src={eventObj.imglink} alt="this is an image" style={{maxWidth: "100%", maxHeight:"100%"}}></img></Col>
                </Row>
                <Col class="m-2" style={{textAlign:"center"}}><b><h3>{eventObj.title}</h3></b></Col>
                <Col class="m-2" style={{textAlign:"center"}}>Timings:-{dateFormat(eventObj.time, 'HH:MM:ss')}|{dateFormat(eventObj.date, 'dd/mm/yy')}</Col>
                <Col class="m-2" style={{textAlign:"center"}}>Organiser: {eventObj.author}</Col>
                <Col class="m-2" style={{textAlign:"center"}}>Know more</Col>
            </Col>
        </>
    )
}
export default EventCard;