import { Avatar, Card, CardHeader, CardMedia, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: 296,
      height: 320,
      display: 'inline-block',
      margin: 5,
      cursor: 'pointer',
    },
    media: {
      height: '85%',
    },
    header: {
      padding: 8,
    },
  }),
);

interface ThingProps {
  thing: {
    id: string;
    name: string;
    thumbnail: string;
    creator: {name: string, thumbnail: string}; 
  }
}

export default function Thing({ thing }: ThingProps) {
  const classes = useStyles();
  const history = useHistory();

  const { id, name, thumbnail, creator } = thing;

  return (
    <Card className={classes.card} onClick={() => history.push(`/things/${id}`)}>
      <CardHeader
        className={classes.header}
        avatar={<Avatar alt={creator.name} src={creator.thumbnail} />}
        title={name}
        subheader={`by: ${creator.name}`}
      />
      <CardMedia className={classes.media} image={thumbnail} title={name} />
    </Card>
  );
}
