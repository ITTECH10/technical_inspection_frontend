import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { useData } from '../../contexts/DataContext';
import CarRow from './CarRow';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

export default function CarTable({onHandleCarNavigation}) {
  const classes = useStyles();
  const {myVehicles} = useData()
  console.log(myVehicles)

  const cars = myVehicles.map(mv => (
    <CarRow onHandleCarNavigation={onHandleCarNavigation} key={mv._id} car={mv} />
  ))

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mark</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Last Service</TableCell>
            <TableCell>Next Service</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
