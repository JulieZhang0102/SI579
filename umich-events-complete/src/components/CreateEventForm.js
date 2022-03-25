import './CreateEventForm.css'
import {useState} from "react";

const CreateEventForm = (props) => {
    const [theTitle, setTheTitle] = useState('');
    const [theDescription, setTheDescription] = useState('');
    const [theDate, setTheDate] = useState('');
    const [theStartTime, setTheStartTime] = useState('');
    const [theEndTime, setTheEndTime] = useState('');

    // It's not necessary to declare separate state for EVERY form input like
    // we did above, but for the purposes of this exercise it seemed best.
    // For example, all form data could be in a single state object called
    // formData, which we create below (but don't use)
    // Instead of `theTitle` we could use `formData.theTitle`, `formData.theDescription`
    // etc.
    const [formData, setFormData] = useState({});

    // State that holds an error or success message. Defaults to emttpy string
    const [message, setMessage] = useState('');

    // State that holds the current submission status. Defaults to emttpy string
    const [status, setStatus] = useState('');

    const submitHandler = (e) => {
        // We must prevent default! By default a form submission will reload the
        // page. With react, we skip the reload and do everything dynamically.
        e.preventDefault();

        // If any form input values are not populated, prevent submission and
        // display an error.
        if (!theTitle || !theDescription || !theDate || !theStartTime || !theEndTime) {
            // This adds the error message.
            setMessage('No empty values allowed');

            // The status state is used to add a class to the message, which styles
            // red for error, green for success.
            setStatus('error')
        } else {
            // We set a message on success.
            setMessage(`You added the event ${theTitle}!`);
            // Use setTimeout to set the message to blank after 4 seconds.
            // The message is helpful, but doesn't need to stick around
            // after it is seen.
            setTimeout(() => {
                setMessage('');
            }, 4000);

            // Set the status to success.
            setStatus('success')

            // This is the `setUmichEvents` function created in App.js
            // and passed here as a prop. This means this child component
            // can update the umichEvents state created in App.js
            props.setUmichEvents((currentEvents) => {
                // 👆When you execute a setState functiion like setUmichEvents.
                // the first argument can be another function with one arg:
                // the state's prior value.

                return [
                    {
                        event_title: theTitle,
                        description: theDescription,
                        date_start: theDate,
                        time_start: `${theStartTime}:00`,
                        time_end: `${theEndTime}:00`,
                    },
                    ...currentEvents,
                ];
            });
            // The above 👆 is essentially
            // return a new array [
            //    {the first item is the new event}
            //    then the ... spread operator adds all the
            //    preexisting events.

            // Clear the values of all the form inputs by updating their
            // states to empty strings.
            setTheTitle('');
            setTheDescription('');
            setTheDate('');
            setTheStartTime('');
            setTheEndTime('');
        }
    }

    return (
        <div className='create-new-event'>
            <h2>Create New Event</h2>
            {/* display a success/error message when present */}
            <div className={'message ' + status}>{message}</div>
            {/* onSubmit is the event that is triggered when the form is submitted.
               We have a dedicated handler for that so React takes care of
               submissions, not the browser.
             */}
            <form onSubmit={submitHandler}>
                <div>
                    <label>Title</label>
                    {/* Notice thr here and every other form input:
                        - The value is a state variable (`value={theTitle}`)
                        - It has an onChange event with a callback that updates the state
                          variable anytime what you've entered has changed
                         (notice the callback is wrapped in a function -- this ensures it
                          only executes on change. If we didn't wrap it...
                          WRONG: onChange={setTheTitle(e.target.value)}
                         ... the callback would execute on render then not respond to changes.

                         Anyway, this value={someState} and onChange={updateTheState} is a
                         pattern that should be used for most forms. Forms in a browser have
                         their own type of state management, but since we're React-ing, we
                         explicitly manage state this way.
                         */}

                    <input
                        type='text'
                        value={theTitle}
                        onChange={(e) => setTheTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        onChange={(e) => setTheDescription(e.target.value)}
                        value={theDescription}
                    >
                    </textarea>

                </div>
                <div>
                    <label>Date</label>
                    <input
                        type='date'
                        value={theDate}
                        onChange={(e) => setTheDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Start Time</label>
                    <input
                        type='time'
                        value={theStartTime}
                        onChange={(e) => setTheStartTime(e.target.value)}
                    />
                </div>
                <div>
                    <label>End Time</label>
                    <input
                        type='time'
                        value={theEndTime}
                        onChange={(e) => setTheEndTime(e.target.value)}
                    />
                </div>
                <div>
                    {/* Because this is type='submit' in a form, clicking it will
                      trigger the form's onSubmit. */}
                    <button type='submit'>Create Event</button>
                </div>
            </form>
        </div>
    );
}

// As always, we must export so others can import!
export default CreateEventForm;