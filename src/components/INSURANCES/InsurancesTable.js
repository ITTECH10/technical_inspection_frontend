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
import InsuranceRow from './InsuranceRow';

const useStyles = makeStyles({
  // table: {
  //   marginBottom: 20
  // },
});

export default function InsuranceTable() {
  const classes = useStyles();
  const { insurances } = useData()

  const insurancesContent = insurances.map(insurance => (
    <InsuranceRow key={insurance._id} insurance={insurance} />
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
          {insurancesContent}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
