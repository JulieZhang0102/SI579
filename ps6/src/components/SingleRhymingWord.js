import "./SingleRhymingWord.css";
import SingleRhymingWordFormat from "./SingleRhymingWordFormat";

const SingleRhymingWord = (props) => {
  const { words, setSavedWordsArray } = props;
  const singleWordList = [];
  words.forEach((word, index) =>
    singleWordList.push(
      <SingleRhymingWordFormat
        word={word["word"]}
        key={index}
        setSavedWordsArray={setSavedWordsArray}
      />
    )
  );

  return singleWordList;
};

export default SingleRhymingWord;
