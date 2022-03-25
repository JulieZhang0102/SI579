import "./RhymingWord.css";

const RhymingWord = (props) => {
  const { syllabus } = props;

  return (
    <>
      <h3>Syllables: {syllabus}</h3>
      <ul>{props.children}</ul>
    </>
  );
};

export default RhymingWord;
