import './EventStarButton.css'
import { useMemo } from 'react';

const EventStarButton = (props) => {
    // These props are part of the parent component's state -- that means if the
    // value changes, React sees it as a "state change" and will rebuild every
    // component using that state, based on the current values.
    const { tossedOverIsStarred, handMeDownSetStarStateFunction, setStarredEvents, title} = props;
    // 👆 Above destructuring assigment was used to get multiple values from props.
    // This is equivalent to
    // const tossedOverIsStarred = props.tossedOverIsStarred;
    // const  handMeDownSetStarStateFunction = props.t handMeDownSetStarStateFunction;
    // etc...

    // Function that provides the star button text based on the "starred"
    // status. An example of moving conditional output to a function to make
    // the JSX in the return() easier to read.
    const getStarMessage = () => {
        if (tossedOverIsStarred) {
            // We're adding Date.now() to put a timestamp on the end to demonstrate
            // that currently, clicking ONE star button re-renders ALL of them. You
            // can tell because the timestamp changes on all of them.
            // A little later in this component, look for theStarMessage, which is
            // a way to prevent this unnecessary re-rendering (that is not active
            // because it's advanced and not *needed* for this course)
            return 'U GOT STARD ' + Date.now();
        } else {
            return 'ADD STAR ' + Date.now();
        }
    };

    // Event callback for when the "star" button is clicked.
    const starButtonHandler = (e) => {
        setStarredEvents((previousList) => {
            // If tossedOverIsStarred is TRUE, we are about to un-star it.
            // remove the item from the list.
            if (tossedOverIsStarred) {
                return previousList.filter((value) => value !== title);
            } else {
                // Would also work
                // previousList.push(title);
                // return previousList
                return [...previousList, title];
            }
        });
        handMeDownSetStarStateFunction((previousValue) => {
            return !previousValue;
        });
    };

    // This function isn't currently used -- it's the approach
    // that would stop unnecessary re-rendering of EVERY button
    // after starring one event.
    // useMemo is advanced... you won't need to know this for anything
    // you're graded on, but thought it might be of interest.
    // to use this instead change this in return()-
    //<div>{getStarMessage()}</div>
    //to
    //<div>️{theStarMessage}</div>
    // (no parentheses as it the 'useMemo' already returns the
    // value needed )
    const theStarMessage = useMemo(() => {
        if (tossedOverIsStarred) {
            return 'U GOT STAR' + Date.now();
        } else {
            return 'add star' + Date.now();
        }
    }, [tossedOverIsStarred]);

    // In the line above, we're saying "don't re-compute theStarMessage"
    // unless `tossedOverIsStarred` in THIS component has changed value.
    return (
      // The className uses a ternary statement to assign the starred/not-starred class
      // depending on whether tossedOverIsStarred is TRUE.
      <button onClick={starButtonHandler} className={tossedOverIsStarred ? 'starred' : 'not-starred'}>
          ⭐️<div>{getStarMessage()}</div>
      </button>
    );
}

export default EventStarButton;