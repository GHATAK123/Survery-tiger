import React, { useState, Fragment } from "react";

const Survey = (props) => {
  const [surveyType, setSurveyType] = useState("defaultValue");
  const [options, setOptions] = useState([{ value: "", id: Date.now() }]);
  const [question, setQuestion] = useState("");

  const onAddItem = () => {
    //Approach - 1
    //const updatedOptions = [...options];
    //updatedOptions.push([value:"", id:Date.now()])
    //setOptions(updatedOptions);

    //Approach - 2
    if (surveyType === "single" && options.length === 2) return;
    setOptions([...options, { value: "", id: Date.now() }]);
  };

  const onAddAnswer = (text, id) => {
    const optionsCopy = [...options];
    const updatedOptions = optionsCopy.map((option) => {
      if (option.id === id) {
        return { ...option, value: text };
      } else {
        return option;
      }
    });
    setOptions(updatedOptions);
  };

  const onRemoveItem = (id) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
  };

  return (
    <Fragment>
      <div className="question-type-container">
        <select
          name="survey"
          value={surveyType}
          onChange={(evt) => {
            setSurveyType(evt.target.value);
            setOptions([{ value: "", id: Date.now() }]);
          }}
        >
          <option value="defaultValue">Select question type</option>
          <option value="multi">Multi-select</option>
          <option value="single">Single select</option>
        </select>
      </div>
      {surveyType !== "defaultValue" ? (
        <div className="survey-container">
          <input
            type="text"
            placeholder="Enter your question here"
            className="question-container"
            value={question}
            onChange={(evt) => {
              setQuestion(evt.target.value);
            }}
          />
          <p>Options</p>
          {options.map((option) => (
            <div className="answer-container" key={option.id}>
              <input
                type="text"
                placeholder="Type answer here"
                value={option.value}
                onChange={(event) => {
                  onAddAnswer(event.target.value, option.id);
                }}
              />
              <p onClick={onAddItem}>➕</p>
              <p
                onClick={() => {
                  onRemoveItem(option.id);
                }}
              >
                ➖
              </p>
            </div>
          ))}
          {(surveyType === "multi" && options.length >= 4) ||
          (surveyType === "single" && options.length === 2) ? (
            <div>
              <button>Add Question</button>
              <button>Publish</button>
            </div>
          ) : null}
        </div>
      ) : null}
    </Fragment>
  );
};

export default Survey;
