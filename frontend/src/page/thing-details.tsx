import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
  LinearProgress,
  createStyles,
  makeStyles,
  Card,
  Avatar,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
  Typography,
  CardContent,
  Chip,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ErrorDialog from '../components/error-dialog';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
    card: {
      width: 970,
      marginTop: 20,
    },
    media: {
      height: 300,
      paddingTop: '56.25%',
    },
    header: {
      padding: 8,
      marginBottom: 20,
    },
  }),
);

const GET_THING_DETAILS = gql`
  query ThingDetails($thingId: ID!) {
    thing(id: $thingId) {
      name
      thumbnail
      creator {
        name
        thumbnail
      }
      like_count
      collect_count
      added
      description
    }
  }
`;

export default function ThingDetails() {
  const classes = useStyles();
  const { thingId } = useParams();

  const { data, loading, error } = useQuery(GET_THING_DETAILS, { variables: { thingId } });

  if (loading) return <LinearProgress />;
  if (error) return <ErrorDialog message={error.message} />;
  if (!data!.thing) return <ErrorDialog message={`Thing whith id ${thingId} not found`} />;

  const { name, thumbnail, creator, description, added, like_count, collect_count } = data.thing;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          avatar={<Avatar alt={creator.name} src={creator.thumbnail} />}
          title={name}
          subheader={`by: ${creator.name} ${new Date(added).toDateString()}`}
        />
        <CardMedia className={classes.media} image={thumbnail} title={name} />
        <CardContent>
          <Chip label={like_count} />
          <Chip label={collect_count} />
        </CardContent>
        <CardContent>
          <Typography component="h1">Summary:</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}
