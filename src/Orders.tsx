import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { AppContext } from "./AppProvider";
import { generateBlockTableData } from "./utils";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const { state } = React.useContext(AppContext) as any;
  const rows = generateBlockTableData(state);

  return (
    <React.Fragment>
      <Title>Recent Blocks</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Block Number</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Tx Count</TableCell>
            <TableCell>Gas limit</TableCell>
            <TableCell>Gas used</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.blockNum}>
              <TableCell>{row.blockNum}</TableCell>
              <TableCell>{row.timestamp}</TableCell>
              <TableCell>{row.txCount}</TableCell>
              <TableCell>{row.gasLimit}</TableCell>
              <TableCell>{row.gasUsed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more blocks
      </Link>
    </React.Fragment>
  );
}
