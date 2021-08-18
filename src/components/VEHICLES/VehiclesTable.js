import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { useData } from '../../contexts/DataContext';
import VehicleItemRow from './VehicleItemRow';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

export default function CarTable() {
  const classes = useStyles();
  const { vehicles, setSelectedCarBank } = useData()

  const allCars = vehicles.map(v => (
    <VehicleItemRow key={v._id} car={v} />
  ))

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" style={{ padding: '0 5px' }}>All Vehicles</Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mark</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Registration number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allCars}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
