import "./OutPut.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import RhymingWord from "./RhymingWord";
import SingleRhymingWord from "./SingleRhymingWord";
import SingleRhymingWordFormat from "./SingleRhymingWordFormat";

const OutPut = (props) => {
  const { resultList, loadStatus, choice, setSavedWordsArray } = props;
  const [outResult, setOutResult] = useState();

  const groupBy = (objects, property) => {
    if (typeof property !== "function") {
      const propName = property;
      property = (obj) => obj[propName];
    }

    const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
    for (const object of objects) {
      const groupName = property(object);
      //Make sure that the group exists
      if (!groupedObjects.has(groupName)) {
        groupedObjects.set(groupName, []);
      }
      groupedObjects.get(groupName).push(object);
    }

    // Create an object with the results. Sort the keys so that they are in a sensible "order"
    const result = {};
    for (const key of Array.from(groupedObjects.keys()).sort()) {
      result[key] = groupedObjects.get(key);
    }
    return result;
  };

  let finalList = "";

  useEffect(() => {
    if (resultList[0] === "initial value") {
      setOutResult("");
    } else if (resultList.length === 0) {
      setOutResult("(no results)");
    } else {
      if (choice === "rhyming") {
        finalList = groupBy(resultList, "numSyllables");
        setOutResult(generateRhyming());
      }
      if (choice === "synonyms") {
        setOutResult(generateSynonym());
      }
    }
  }, [resultList]);

  const generateRhyming = () => {
    const wordsList = [];
    for (let syllabus of Object.keys(finalList)) {
      wordsList.push(
        <RhymingWord syllabus={syllabus} key={syllabus}>
          <SingleRhymingWord
            words={finalList[syllabus]}
            setSavedWordsArray={setSavedWordsArray}
          />
        </RhymingWord>
      );
    }
    return wordsList;
  };

  const generateSynonym = () => {
    const wordsList = [];
    resultList.forEach((word, index) =>
      wordsList.push(
        <SingleRhymingWordFormat
          word={word["word"]}
          key={index}
          setSavedWordsArray={setSavedWordsArray}
        />
      )
    );
    return <ul>{wordsList}</ul>;
  };

  if (loadStatus) {
    return (
      <>
        <Row>
          <Col>
            <output>{outResult}</output>
          </Col>
        </Row>
      </>
    );
  } else {
    return (
      <>
        <Row>
          <Col>
            <output>...loading</output>
          </Col>
        </Row>
      </>
    );
  }
};

export default OutPut;
