import "./SingleRhymingWordFormat.css";
import Button from "react-bootstrap/Button";

const SingleRhymingWordFormat = (props) => {
  const { word, setSavedWordsArray } = props;
  const addToSavedWords = () => {
    setSavedWordsArray((previousList) => {
      return [...previousList, word];
    });
  };
  return (
    <li>
      {word + " "}
      <Button variant="outline-success" onClick={() => addToSavedWords()}>
        (save)
      </Button>
    </li>
  );
};

export default SingleRhymingWordFormat;
