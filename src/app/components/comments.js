
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';


export default function Comments({ reviews, users }) {

return (
  <>
    <Box component="span" display="flex" flexDirection="column">
      <Box component="span" m={1}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {users.length != 0 ? 
          reviews.map((review, index) => 
    (<>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={`User${review.userId + 1}`} src={`/static/images/avatar/${review.userId + 1}.jpg`} />
        </ListItemAvatar>
        <ListItemText
          primary={review.comment}
          secondary={`— ${users[index]?.name} | Rating: ${review.value}`}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )) : <Typography>Loading...</Typography>}
        </List>
      </Box>
    </Box>
  </>
);
}





