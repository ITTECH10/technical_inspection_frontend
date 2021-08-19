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
import SearchVehicles from './SearchVehicles';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

export default function CarTable() {
  const classes = useStyles();
  const { vehicles, setSelectedCarBank, user } = useData()

  // FILTERING
  const [fields, setFields] = React.useState({
    query: ''
  })

  const matches = useMediaQuery('(max-width: 600px)')

  const { query } = fields

  const filteredContent = vehicles.filter(x => x.registrationNumber.toLowerCase().includes(query.toLowerCase()) || x.mark.toLowerCase().includes(query.toLowerCase()) || x.model.toLowerCase().includes(query.toLowerCase())).map(v => (
    <VehicleItemRow key={v._id} car={v} />
  ))

  const allCars = vehicles.map(v => (
    <VehicleItemRow key={v._id} car={v} />
  ))


  return (
    <>
      <Typography variant="h4" style={{ padding: !matches ? 10 : 0 }}>
        {user.role === 'admin' && vehicles.length > 0 ? 'Alle Fahrzeuge' : vehicles.length === 0 ? 'Noch keine fahrzeuge' : 'Meine Fahrzeuge'}
      </Typography>
      <SearchVehicles fields={fields} setFields={setFields} noVehicles={vehicles.length === 0} />
      {vehicles.length > 0 &&
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mark</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Registration number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {query !== '' ? filteredContent : allCars}
            </TableBody>
          </Table>
        </TableContainer>}
    </>
  );
}
