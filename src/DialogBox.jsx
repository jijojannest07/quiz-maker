import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@material-ui/core';
import React from 'react';

const DialogBox = (props) => {
  const {
    set, open, details, question, answer, options,
  } = props;
  console.log('details', details);
  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={set(false)}

    >
      <DialogTitle>Answer Summary</DialogTitle>
      <DialogContent>
        {
          details.map((item, key) => (
            <>
              <b>
                Question:
                {key + 1}
              </b>
              <br />
              {item.question.value}
              <br />
              <br />
              <b>Choices</b>
              <br />
              {
                item.options.map(option => (
                  <p>
                    {option.key + 1}
                    .
                    {option.data}
                    <br />
                  </p>
                ))
              }
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
        <br />
        <br />
        <b>Choices</b>
        <br />
        {
          options.map(option => (
            <p>
              {option.key}
              .
              {option.data}
              <br />
            </p>
          ))
        }
        <b>Answer:</b>
        {answer.answer}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => set(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={set(true)} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogBox;
