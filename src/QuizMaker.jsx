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
  const [answerSummary, setSummary] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState({ key: '', value: '' });
  const [dialogStatus, setDialogStatus] = useState(false);
  const [question, setQuestion] = useState({ key: count, value: '' });
  const [options, setOptions] = useState([{ key: 0, value: '' },
    { key: 1, value: '' }]);
  const changeText = (e, key) => {
    if (options[key].key === correctAnswer.key && correctAnswer.key !== '') {
      setCorrectAnswer({ key: correctAnswer.key, value: e.target.value });
    }
    const newAnswer = [...options];
    newAnswer[key] = { ...newAnswer[key], value: e.target.value };
    setOptions(newAnswer);
  };

  const clearQuestion = () => {
    if (question.value !== ''
     && options.every(item => item.value !== '')
     && correctAnswer.value !== '') {
      const summary = [...answerSummary];
      if (summary[count]) {
        summary[count].question = { key: count, value: question.value };
        summary[count].correctAnswer = { key: correctAnswer.key, value: correctAnswer.value };
        summary[count].options = [...options];
      } else {
        summary.push({ question, options, correctAnswer });
      }
      setSummary(summary);
      setOptions([{ key: 0, value: '' },
        { key: 1, value: '' }]);
      setCount(count + 1);
      setQuestion({ key: count, value: '' });
      setCorrectAnswer({ key: '', value: '' });
    } else {
      alert('Enter complete answer');
    }
  };
  const handleSubmit = () => {
    if (question.value !== ''
     && options.every(item => item !== '')
     && correctAnswer.value !== '') {
      setDialogStatus(true);
    }
  };
  const addField = () => {
    const newOption = [...options];
    newOption.push({ key: options.length, value: '' });
    setOptions(newOption);
  };
  const gotoPrevious = () => {
    const { question, correctAnswer } = answerSummary[count - 1];
    const options = [...answerSummary[count - 1].options];
    setCorrectAnswer({ key: correctAnswer.key, value: correctAnswer.value });
    setOptions(options);
    setQuestion({ key: count - 1, value: question.value });
    setCount(count - 1);
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
                value={question.value}
                rowsmax="2"
                onChange={e => setQuestion({ key: count, value: e.target.value })}
                margin="auto"
                variant="outlined"
              />
            </Grid.Column>
          </Grid.Row>
          <Label>
          Options
          </Label>
          {
           options && options.map((item, key) => (
             <Grid.Row>
               <Grid.Column>
                 <Radio
                   value={item.key}
                   label={String.fromCharCode(97 + key).toUpperCase()}
                   checked={item.key === correctAnswer.key}
                   name="options"
                   onChange={() => setCorrectAnswer({
                     key: item.key,
                     answer: item.value,
                   })}
                   disabled={options[key].value.length === 0}
                 />
                 <Input
                   value={item.value}
                   onChange={e => changeText(e, key)}
                 />
               </Grid.Column>
             </Grid.Row>
           ))
            }
          <Grid.Row>
            <Grid.Column>
              <Button
                disabled={options.some(item => item.value === '') || options.length > 5}
                onClick={addField}
              >
                  Add more
              </Button>
              <Button
                disabled={count === 0}
                onClick={gotoPrevious}
              >
                Prev
              </Button>
              <Button onClick={clearQuestion} disabled={count > 3}>
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
