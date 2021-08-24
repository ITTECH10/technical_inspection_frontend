import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@material-ui/core';
import { useData } from '../../contexts/DataContext';
import CarRow from './CarRow';
import { withNamespaces } from 'react-i18next';
import UserInfoBlock from '../UI/Users/UserInfoBlock';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

function CarTable({ t }) {
  const classes = useStyles();
  const { myVehicles, setSelectedCarBank, user, selectedUser, vehicles } = useData()
  const matches = useMediaQuery('(max-width: 600px)')
  let customersVehiclesFound, customersVehiclesRender, myVehiclesRender

  if (user.role === 'admin') {
    customersVehiclesFound = vehicles.filter(v => v.vehicleOwner === selectedUser._id)

    customersVehiclesRender = customersVehiclesFound.map(mv => (
      <CarRow key={mv._id} car={mv} />
    ))
  }

  if (user.role === 'user') {
    myVehiclesRender = myVehicles.map(mv => (
      <CarRow key={mv._id} car={mv} />
    ))
  }

  useEffect(() => {
    setSelectedCarBank({})
  }, [setSelectedCarBank])

  return (
    <>
      {selectedUser && <UserInfoBlock />}
      <Typography variant="h5" style={{ padding: !matches ? '10px 0' : 0 }}>
        {user.role === 'admin' ? "Kunden Fahrzeuge" : "Meine Fahrzeuge"}
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('MarkInputLabel')}</TableCell>
              <TableCell>{t('ModelInputLabel')}</TableCell>
              <TableCell>{t('RegistrationNumberInputLabel')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.role === 'admin' ? customersVehiclesRender : myVehiclesRender}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default withNamespaces()(CarTable)
