import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


export function Comments({comments}) {

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {comments.map((comment) => (
        <ListItem key={comment._id}  alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={comment.author} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary={comment.body} />
        </ListItem>
      ))}
    </List>
  );
}
