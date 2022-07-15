import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Button, FormLabel, FormControl } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Container } from '@mui/system';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('money');

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title == '') {
      setTitleError(true);
    }
    if (details == '') {
      setDetailsError(true);
    }
    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push('/'));
    }
  };

  return (
    <Container size="sm">
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>
            <TextField
              className={classes.field}
              onChange={(e) => setTitle(e.target.value)}
              label="Note Title"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={titleError}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.field}
              onChange={(e) => setDetails(e.target.value)}
              label="Details"
              variant="outlined"
              color="secondary"
              multiline
              rows={4}
              fullWidth
              required
              error={detailsError}
            />
          </Grid>
          <Grid item>
            <FormControl className={classes.field}>
              <FormLabel>Note Category</FormLabel>
              <RadioGroup
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <FormControlLabel
                  value="money"
                  control={<Radio />}
                  label="Money"
                />
                <FormControlLabel
                  value="todos"
                  control={<Radio />}
                  label="Todos"
                />
                <FormControlLabel
                  value="reminders"
                  control={<Radio />}
                  label="Reminders"
                />
                <FormControlLabel
                  value="work"
                  control={<Radio />}
                  label="Work"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
