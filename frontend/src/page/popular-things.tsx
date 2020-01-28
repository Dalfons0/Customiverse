import { useQuery } from '@apollo/react-hooks';
import { createStyles, LinearProgress, makeStyles, Theme, Button } from '@material-ui/core';
import gql from 'graphql-tag';
import React from 'react';
import Thing from '../components/thing';
import ErrorDialog from '../components/error-dialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    thingContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      padding: '20px 20px 0',
      maxWidth: 1080,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    gridList: {
      width: 500,
      height: 450,
    },
  }),
);

export const GET_POPULAR = gql`
  query getPopular($page: Int) {
    popular(page: $page) {
      page
      hasMore
      result {
        id
        name
        thumbnail
        creator {
          name
          thumbnail
        }
      }
    }
  }
`;

export default function Things() {
  const classes = useStyles();

  const { data, loading, error, fetchMore } = useQuery(GET_POPULAR);

  if (loading) return <LinearProgress />;
  if (error) return <ErrorDialog message={error.message} />;

  const { page, result, hasMore } = data!.popular;
  const loadMoreThings: any = () =>
    fetchMore({
      variables: { page: page + 1 },
      updateQuery: (previous, { fetchMoreResult, ...rest }) => {
        if (!fetchMoreResult) return previous;

        return {
          ...fetchMoreResult,
          popular: {
            ...fetchMoreResult.popular,
            result: [...previous.popular.result, ...fetchMoreResult.popular.result],
          },
        };
      },
    });
  return (
    <div className={classes.root}>
      <div className={classes.thingContainer}>
        {result!.map((thing: any) => (
          <Thing key={thing.id} thing={thing} />
        ))}
      </div>
      {hasMore && (
        <Button fullWidth variant="contained" color="primary" size="large" onClick={loadMoreThings}>
          Load More
        </Button>
      )}
    </div>
  );
}
