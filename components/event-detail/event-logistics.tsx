import React from 'react'
import LogisticsItem from "./logistics-item";
import DateIcon from '../icon/date-icon';
import AddressIcon from '../icon/address-icon';
import classes from "./event-logistics.module.css";

function EventLogistics(props : any) {
    const {date , address , image , imageAlt} = props;
    const humanReadableDate = new Date(date).toLocaleDateString('en-us', {
        day: "numeric",
        month: "long",
        year: "numeric"
    })
    const formattedAddress = address.replace(',', '/n');
  return (
    <section className={classes.logistics}>
        <div className={classes.image}>
            <img src={`/${image}`} alt={imageAlt}/>
        </div>
        <ul className={classes.list}>
            <LogisticsItem icon={DateIcon}>
                <time>{humanReadableDate}</time>
            </LogisticsItem>
            <LogisticsItem icon={AddressIcon}>
                <address>{formattedAddress}</address>
            </LogisticsItem>

        </ul>
      
    </section>
  )
}

export default EventLogistics
