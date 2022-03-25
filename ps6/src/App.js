import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useEffect, useState } from "react";
import OutPut from "./components/OutPut";
import SavedWords from "./components/SavedWords";

function App() {
  const [theWord, setTheWord] = useState("");
  const [resultList, setResultList] = useState(["initial value"]);
  const [outDes, setOutDes] = useState("");
  const [loadStatus, setLoadStatus] = useState(true);
  const [choice, setChoice] = useState("");
  const [savedWordsArray, setSavedWordsArray] = useState([]);

  useEffect(() => {
    if (resultList[0] !== "initial value") {
      if (choice === "rhyming") {
        setOutDes("Words that rhyme with " + theWord);
      }
      if (choice === "synonyms") {
        setOutDes("Words with a similar meaning to " + theWord);
      }
    }
  }, [resultList]);

  const displayResult = (choice) => {
    setLoadStatus(false);
    setChoice(choice);
    let url;
    if (choice === "rhyming") {
      url = `https://api.datamuse.com/words?${new URLSearchParams({
        rel_rhy: theWord,
      }).toString()}`;
    }
    if (choice === "synonyms") {
      url = `https://api.datamuse.com/words?${new URLSearchParams({
        ml: theWord,
      }).toString()}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((json) => setResultList(Object.values(json)))
      .then(() => setLoadStatus(true));
  };

  return (
    <Container>
      <Row>
        <a
          href="https://github.com/JulieZhang0102/SI579-PS6/tree/main/src"
          target="_blank"
        >
          Link to Source Code
        </a>
      </Row>
      <Row>
        <h1>Rhyme Finder (579 Problem Set 5)</h1>
      </Row>
      <SavedWords savedWordsArray={savedWordsArray} />
      <Row>
        <InputGroup>
          <Form.Control
            placeholder="Enter a word"
            value={theWord}
            onChange={(e) => setTheWord(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && displayResult("rhyming");
            }}
          />
          <Button variant="primary" onClick={() => displayResult("rhyming")}>
            Show rhyming words
          </Button>
          <Button variant="secondary" onClick={() => displayResult("synonyms")}>
            Show synonyms
          </Button>
        </InputGroup>
      </Row>
      <Row>
        <Col>
          <h2>{outDes}</h2>
        </Col>
      </Row>
      <OutPut
        resultList={resultList}
        loadStatus={loadStatus}
        choice={choice}
        setSavedWordsArray={setSavedWordsArray}
      />
    </Container>
  );
}

export default App;
