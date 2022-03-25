import './EventInfo.css'

// This component shows the event title and description, which
// are passed in as props (i.e. the things that basically look like attributes)
// <EventInfo title={your title} description={your description} />
// makes it available here as props.title and props.description.
const EventInfo = (props) => {
    return (<div className='event__info'>
        <h2>{props.title}</h2>
        <div className='event__description'>
            {props.description}
        </div>
    </div>)
}

// As always, we must export so others can import!
export default EventInfo;