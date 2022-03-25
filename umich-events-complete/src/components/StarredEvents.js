import './StarredEvents.css'

const StarredEvents = (props) => {
    // This is equivalent to:
    // const starredList = props.starredList;
    const { starredList } = props;
    // 👆 starredList is state from its parent component, so when that
    // list changes, this component is automatically re-rendered.

    // Helper function to generate the starred list or
    // 'No starred events' message. It's a function here to
    // make the JSX in return() easier to read.
    const starredEventsOutput = () => {
        if (starredList.length === 0) {
            return 'No starred events';
        } else {
            // Use join() to combine every starred item into a comma
            // separated list.
            return starredList.join(', ')
        }
    }

    return (
        <div className="event starred-events">
            <h2>STARRED EVENTS</h2>
            {starredEventsOutput()}
        </div>)
}

export default StarredEvents;