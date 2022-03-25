import "./SavedWords.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SavedWords = (props) => {
  const { savedWordsArray } = props;
  const savedWords = () => {
    if (savedWordsArray.length === 0) {
      return "(none)";
    } else {
      return savedWordsArray.join(", ");
    }
  };
  return (
    <Row>
      <Col>Saved words: {savedWords()}</Col>
    </Row>
  );
};

export default SavedWords;
