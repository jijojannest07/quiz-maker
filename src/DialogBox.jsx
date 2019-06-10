import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const DialogBox = (props) => {
  const {
    set, open, details, question, answer, options,
  } = props;
  console.log('details', details);
  return (
    <Modal
      style={{ lineHeight: '2.2em' }}
      maxwidth="md"
      open={open}
      onClose={set(false)}

    >
      <Modal.Header>Answer Summary</Modal.Header>
      <Modal.Content>
        {
          details.map((item, key) => (
            <>
              <b>
                Question(
                {key + 1}
                )
              </b>
              <p>{item.question.value}</p>
              <hr />
              <b>Choices</b>
              <br />
              {
                item.options.map((option, keyValue) => (
                  <p>
                    {String.fromCharCode(97 + keyValue)}
                    .
                    {option.value}
                  </p>
                ))
              }
              <hr />
              <b>Answer:</b>
              {item.correctAnswer.answer}
              <br />
            </>
          ))
        }
        <b>
          Question:
          {details.length + 1 }
        </b>
        <br />
        {question.value}
        <hr />
        <b>Choices</b>
        <br />
        {
          options.map((option, keyValue) => (
            <p>
              {String.fromCharCode(97 + keyValue)}
              .
              {option.value}
            </p>
          ))
        }
        <hr />
        <b>Answer:</b>
        <br />
        {answer.value}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => set(false)} style={{ color: 'primary' }}>
          Cancel
        </Button>
        <Button onClick={set(true)} style={{ color: 'red' }}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default DialogBox;
