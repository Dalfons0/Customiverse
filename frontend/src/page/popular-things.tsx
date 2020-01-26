import { useQuery } from '@apollo/react-hooks';
import { createStyles, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import gql from 'graphql-tag';
import React from 'react';
import Thing from '../components/thing';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      padding: '20px 20px 0',
    },
    gridList: {
      width: 500,
      height: 450,
    },
  }),
);

export const GET_POPULAR = gql`
  query getPopular {
    popular {
      id
      name
      thumbnail
      creator {
        name
        thumbnail
      }
    }
  }
`;

export default function Things() {
  const classes = useStyles();

  const { data, loading, error } = useQuery(GET_POPULAR);

  if (loading) return <LinearProgress />;
  if (error || !data) return <p>ERROR</p>;

  return (
    <div className={classes.root}>
      {data!.popular!.map((thing: any) => (
        <Thing key={thing.id} thing={thing} />
      ))}
    </div>
  );
}
