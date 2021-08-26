import React from 'react';
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
import { useMediaQuery, Divider } from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import Pagination from '../../utils/Pagination';
import RenderPaginatedContent from '../../utils/RenderPaginatedContent';

const useStyles = makeStyles({
  // table: {
  //   marginBottom: 20
  // },
});

function VehiclesTable({ t }) {
  const classes = useStyles();
  const { vehicles, user } = useData()

  // FILTERING
  const [fields, setFields] = React.useState({
    query: ''
  })

  const matches = useMediaQuery('(max-width: 600px)')

  const { query } = fields

  const filteredContent = vehicles.filter(x => x.registrationNumber.toLowerCase().includes(query.toLowerCase()) || x.mark.toLowerCase().includes(query.toLowerCase()) || x.model.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      <Typography variant="h4" style={{ padding: !matches ? '10px 0' : 0 }}>
        {user.role === 'admin' && vehicles.length > 0 ? t('VehiclesTitle') : vehicles.length === 0 ? t('NoVehiclesYet') : t('MyVehicles')}
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      <SearchVehicles fields={fields} setFields={setFields} noVehicles={vehicles.length === 0} />
      {!matches && <Pagination
        pageLimit={matches ? 1 : 3}
        data={query !== '' ? filteredContent : vehicles}
        dataLimit={10}
      />}
      {vehicles.length > 0 &&
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
              {/* {query !== '' ? filteredContent : allCars} */}
              <RenderPaginatedContent
                data={query !== '' ? filteredContent : vehicles}
                RenderComponent={VehicleItemRow}
                dataLimit={10}
              />
            </TableBody>
          </Table>
        </TableContainer>}
      {matches && <Pagination
        pageLimit={matches ? 1 : 3}
        data={query !== '' ? filteredContent : vehicles}
        dataLimit={10}
        style={{ padding: '10px 0' }}
      />}
    </>
  );
}

export default withNamespaces()(VehiclesTable)