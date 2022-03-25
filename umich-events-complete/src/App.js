import './App.css';
// We import this component to make it available.
import EventsListing from "./components/EventsListing";
import { useEffect, useState } from "react";
import CreateEventForm from "./components/CreateEventForm";
// To get assets from a file with multiple exports.
// import { helperImage, helperLink} from "./file-with-many-assets"

// This is main application file loaded by index.html -- when this is compiled
// it includes this code, anything imported by this code AND any child-imports
// as well.
function App() {
    // We use destructing to assign the umichEvents and the setUmichEvents variables
    // at the same time.
    const [umichEvents, setUmichEvents] = useState([]);
    // DO NOT DO umichEvents = 'whatever value';
    // Instead do setUmichEvent('whatever value'), because it broadcasts the changes
    // to the whole application. Things that use `umichEvent` will be automatically
    // re-rendered.
    useEffect(() => {
        fetch('https://events.umich.edu/day/json')
            .then((response) => response.json())
            .then((json) => setUmichEvents(Object.values(json)));
    }, []);


  // This returns the JSX "markup" of this component.
  return (
      <main className="i-am-main">
        <h1>Events at University of Michigan</h1>
        <CreateEventForm setUmichEvents={setUmichEvents} />
        {/*  <EventsListing /> is a self-closing "tag" that generates the list of events */}
        {/*  We are adding the state `umichEvents` as a prop that gets passed to EventsListing.
             because it is state, any time `umichEvents` changes, the <EventsListing> will
             re-render.
        */}

        <EventsListing events={umichEvents} />
      </main>
  );
}

export default App;
