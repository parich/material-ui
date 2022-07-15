import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, IconButton, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deepOrange, deepPurple, yellow } from '@mui/material/colors';

export default function NoteCard({ note, handleDelete }) {
  const avatarColer = () => {
    if (note.category == 'work') {
      return deepOrange[500];
    }
    if (note.category == 'reminders') {
      return deepPurple[500];
    }
    if (note.category == 'todos') {
      return yellow[500];
    }
  };

  return (
    <div>
      <Card
        elevation={1}
        sx={{ border: note.category == 'work' ? `1px solid #51087E` : null }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: avatarColer }} aria-label="recipe">
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlineIcon />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
