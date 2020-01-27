import { Avatar, Button, Card, CardActions, CardHeader, CardMedia, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: 296,
      height: 320,
      display: 'inline-block',
      margin: 5,
    },
    media: {
      height: 219,
    },
    header: {
      padding: 8,
    },
  }),
);

export default function Thing({ thing }: any) {
  const classes = useStyles();
  const history = useHistory();

  const { id, name, thumbnail, creator } = thing;

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        avatar={<Avatar alt={creator.name} src={creator.thumbnail} />}
        title={name}
        subheader={`by: ${creator.name}`}
      />
      <CardMedia className={classes.media} image={thumbnail} title={name} />
      <CardActions>
        <Button size="small" color="primary" onClick={() => history.push(`/thing/${id}`)}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
