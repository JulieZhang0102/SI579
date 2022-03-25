import './EventsListing.css';
import EventDateTime from "./EventDateTime";
import EventInfo from "./EventInfo";
import EventInstance from "./EventInstance";
import StarredEvents from "./StarredEvents";
import { useState } from 'react';

const EventsListing = (props) => {
    // This state is an array of every event we starred.
    const [starredEvents, setStarredEvents] = useState([]);

    // Creates an array where each item is the JSX "markup" for an event.
    const generateEvents = () => {
        // Initialize an empty array that will get each event
        const eventsToShow = [];

        // Loop through the event list. Add each event as new array item.
        // If React sees an array of JSX "markup", it will render each one.
        props.events.forEach((eventInstance, index) =>
            // Add an event's "markup" to the eventsToShow array.
            eventsToShow.push(
                <EventInstance
                    setStarredEvents={setStarredEvents}
                    key={index}
                    title={eventInstance.event_title}>
                    <EventDateTime
                        dateStart={eventInstance.date_start}
                        timeStart={eventInstance.time_start}
                        timeEnd={eventInstance.time_end}
                    />
                   <EventInfo
                       title={eventInstance.event_title}
                       description={eventInstance.description}
                   />
                </EventInstance>
            )
        );

        return eventsToShow;
        // What is happening here could be done more concisely with JavaScripts's map()
        // function (so `props.events.map()`), but that can be harder to read
        // for those not used to it, so we're using forEach() and push() instead.
        // Check the end of this file for how it would be done the map way
    }

    if (props.events.length > 0) {
        // Notice the `<>` and `</>`? Those are fragments. React requires
        // the returned JSX to be wrapped in a single tag at the top. If you
        // want multiple components next to each other, you could wrap them in a
        // <div> OR use fragments, which take care of the wrapping, but don't add
        // any HTML to the final render
        // @see https://reactjs.org/docs/fragments.html
        return (
            <>
                <StarredEvents starredList={starredEvents} />
                <div className='events'>
                    {/*
                   The events "markup" is generated in a function (above)
                   to make this return statement easier to read.
                */}
                    {generateEvents()}
                </div>
            </>
        );
    } else {
        return <h2 className='events--loading'>LOADING!!!!</h2>
    }
}

// As always, we must export so others can import!
export default EventsListing;

/**
 * Below is a version of generateEvents() that uses map()
 * multiple items. It's more concise, but more confusing
 * for newer React users. It would look like this:
 *
 * const generateEvents = () => props.events.map((eventInstance, index) =>
 *                  <EventInstance
 *                     setStarredEvents={setStarredEvents}
 *                     key={index}
 *                     title={eventInstance.event_title}>
 *                     <EventDateTime
 *                         dateStart={eventInstance.date_start}
 *                         timeStart={eventInstance.time_start}
 *                         timeEnd={eventInstance.time_end}
 *                     />
 *                    <EventInfo
 *                        title={eventInstance.event_title}
 *                        description={eventInstance.description}
 *                    />
 *                 </EventInstance>
 * )
 */