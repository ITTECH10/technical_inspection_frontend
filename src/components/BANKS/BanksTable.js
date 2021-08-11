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
import BankRow from './BankRow';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

export default function InsuranceTable() {
  const classes = useStyles();
  const {banks} = useData()

  const banksContent = banks.map(bank => (
    <BankRow key={bank._id} bank={bank} />
  ))

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {banksContent}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
