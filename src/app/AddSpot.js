'use client'

import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { signIn } from 'next-auth/react';
import Alert from '@mui/material/Alert';

export default function AddSpot() {
  const [ open, setOpen ] = useState(false);
  const [ formState, setFormState ] = useState({});
  const [ error, setError ] = useState(false);

  function handleAddButton() {
    setOpen(true);
    setFormState({});
  }

  function handleClose() {
    setOpen(false);
  }

  function handleAddSpot(event) {
    event.preventDefault();
    let valid  = event.currentTarget.reportValidity();
    const data = new FormData(event.currentTarget);
    if (valid) {
      const spotData = {};
      spotData['name'] = data.get('spotName');
      spotData['building'] = data.get('building');
      spotData['capacity'] = +data.get('capacity');
      console.log(spotData);
      // submit form
      fetch("/api/study-spaces", {
        method: 'post',
        body: JSON.stringify(spotData)
      }).then((res) => {
        if (res.ok) {
          setOpen(false);
          setFormState({});
          setError(false);
          res.json().then((j) => console.log('success:' + j));
        } else {
          setError(true);
          res.json().then((j) => console.log('error:' + j));
        }
      })
    } else {
      setFormState({...formState})
    }
  }

  return (
    <>
      <Button variant="underlined" color="inherit" onClick={handleAddButton}>Add Spot</Button>
      {open && <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Study Spot</DialogTitle>
        <form onSubmit={handleAddSpot}>
        <DialogContent>
          <DialogContentText>
            To Add a new spot, please fill in the following fields.
          </DialogContentText>
          { error ? (
            <Alert severity="error">There was an issue submitting the study spot, please adjust the fields and try again.</Alert>
          ) : null }
          <TextField
            autoFocus
            margin="dense"
            id="spotName"
            name="spotName"
            label="Spot Name"
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            margin="dense"
            id="building"
            name="building"
            label="Building"
            type="text"
            required
            fullWidth
            variant='standard'/>
          <TextField
            margin="dense"
            name="capacity"
            id="capacity"
            label="Spot Capacity"
            inputProps={{min: 0}}
            type="number"
            required
            fullWidth
            variant='standard'/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit for Review</Button>
        </DialogActions>
        </form>
      </Dialog>}
    </>
  );
}


