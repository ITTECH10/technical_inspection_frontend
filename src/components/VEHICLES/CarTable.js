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
import CarRow from './CarRow';
import { withNamespaces } from 'react-i18next';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

function CarTable({ t }) {
  const classes = useStyles();
  const { myVehicles, setSelectedCarBank, user } = useData()

  const cars = myVehicles.map(mv => (
    <CarRow key={mv._id} car={mv} />
  ))

  useEffect(() => {
    setSelectedCarBank({})
  }, [setSelectedCarBank])

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" style={{ padding: '0 5px' }}>{user.role === 'admin' ? "Kunden Fahrzeuge" : "Meine Fahrzeuge"}</Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t('MarkInputLabel')}</TableCell>
            <TableCell>{t('ModelInputLabel')}</TableCell>
            <TableCell>{t('RegistrationNumberInputLabel')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withNamespaces()(CarTable)
