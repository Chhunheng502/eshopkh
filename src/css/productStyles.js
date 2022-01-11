import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '90%',
  },
  media: {
    width: '100%',
    height: 0,
    paddingTop: '100%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));