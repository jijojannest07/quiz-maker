import React, { useState } from 'react';
import {
  makeStyles,
  FormLabel,
  FormControlLabel,
} from '@material-ui/core';
import {
  Button, TextArea, Form, Input, Label, Radio, Grid, GridColumn,
} from 'semantic-ui-react';
import './App.css';
import DialogBox from './DialogBox';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
  },
  formControl: {
    margin: '50px',
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  container: {
    display: 'grid',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
}));
const QuizMaker = () => {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [answerSummary] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState({ key: '', answer: '' });
  const [dialogStatus, setDialogStatus] = useState(false);
  const [question, setQuestion] = useState({ key: count, value: '' });
  const [options, setOptions] = useState([{ key: 0, data: '' },
    { key: 1, data: '' }]);
  const changeText = (e, key) => {
    if (options[key].key === correctAnswer.key && correctAnswer.key !== '') {
      setCorrectAnswer({ key: correctAnswer.key, answer: e.target.value });
    }
    const newAnswer = [...options];
    newAnswer[key] = { ...newAnswer[key], data: e.target.value };
    setOptions(newAnswer);
  };
  console.log('options', options)
  console.log('correctAnswer', correctAnswer)
  const clearQuestion = () => {
    if (question.value !== ''
     && options.every(item => item.data !== '')
     && correctAnswer.answer !== '') {
      answerSummary.push({ question, options, correctAnswer });
      setOptions([{ key: 0, data: '' },
        { key: 1, data: '' }]);
      setCount(count + 1);
      setQuestion({ key: count, value: '' });
      setCorrectAnswer({ key: '', answer: '' });
    } else {
      alert('Enter complete answer');
    }
  };
  const handleSubmit = () => {
    if (question.value !== ''
     && options.every(item => item !== '')
     && correctAnswer.answer !== '') {
      setDialogStatus(true);
    }
  };
  const addField = () => {
    const newOption = [...options];
    newOption.push({ key: options.length + 1, data: '' });
    setOptions(newOption);
  };
  return (
    <div>
      <h2 style={{ marginLeft: '20%' }}>Quiz Maker</h2>
      <Form className={classes.formControl}>
        <Label>
           Question
          {count + 1}
        </Label>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <TextArea
                label="Enter your Question"
                multiline
                value={question.value}
                rowsMax="2"
                onChange={e => setQuestion({ key: count, value: e.target.value })}
                margin="normal"
                variant="outlined"
              />
            </Grid.Column>
          </Grid.Row>
          <Label>
          Options
          </Label>
          {
            options.map((item, key) => (
              <Grid.Row>
                <Grid.Column>
                  <Radio
                    value={item.key}
                    label={String.fromCharCode(97 + key).toUpperCase()}
                    checked={item.key === correctAnswer.key}
                    name="options"
                    onChange={() => setCorrectAnswer({
                      key,
                      answer: item.data,
                    })}
                    disabled={options[key].data.length === 0}
                  />
                  <Input
                    value={item.data}
                    onChange={e => changeText(e, key)}
                  />
                </Grid.Column>
              </Grid.Row>
            ))
            }
          <Grid.Row>
            <Grid.Column>
              <Button
                disabled={options.some(item => item.data === '') || options.length > 5}
                onClick={addField}
              >
                  Add more
              </Button>
              <Button onClick={clearQuestion} disabled={answerSummary.length > 3}>
                Next
              </Button>
              <Button
                style={{ color: 'Red', float: 'right' }}
                onClick={handleSubmit}
              >
               Submit
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {
          dialogStatus
          && (
            <DialogBox
              open={dialogStatus}
              set={setDialogStatus}
              details={answerSummary}
              question={question}
              answer={correctAnswer}
              options={options}
            />
          )
        }
      </Form>
    </div>
  );
};
export default QuizMaker;
