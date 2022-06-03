import { useState } from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import { getAccountTxHistory } from 'utils/tokenActions';
import useSWR from 'swr';
import { getUnixTimeEpochFromRippleEpoch } from 'utils/utils';

const columns = [
    { id: 'no', label: 'No' },
    { id: 'account', label: 'Account' },
    { id: 'txtype', label: 'TransactionType', },
    { id: 'tokenid', label: 'NFTokenID', },
    { id: 'fee', label: 'Fee(Drops)' },
    { id: 'flags', label: 'Flags' },
    { id: 'taxon', label: 'NFTokenTaxon', },
    { id: 'sequence', label: 'Sequence', },
    { id: 'uri', label: 'URI', },
    { id: 'date', label: 'date', },
    { id: 'ledger_index', label: 'Ledger Index', },
];

const fetcher = url => getAccountTxHistory(url).then(res => res)


export default function AccountTxHistory({ account }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const { data, error } = useSWR(account, fetcher)

    if (error) return <Typography variant='caption'>{JSON.stringify(error)}</Typography>
    if (!data) return <Typography variant='caption'>Loading...</Typography>
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true)
    //         try {
    //             const txs_result = await getAccountTxHistory(account)
    //             setTxs(txs_result)
    //             console.log({ txs_result })
    //         } catch (e) {
    //             console.log(e)
    //             enqueueSnackbar(e.message, {
    //                 variant: 'error'
    //             })
    //         }
    //         setLoading(false)
    //     }

    //     fetchData()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [account])
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.tx.hash}>
                                        <TableCell>
                                            {index + 1 + page * rowsPerPage}
                                        </TableCell>
                                        <TableCell>
                                            {row.tx.Account}
                                        </TableCell>
                                        <TableCell>
                                            {row.tx.TransactionType}
                                        </TableCell>
                                        <TableCell sx={{
                                            maxWidth: 200,
                                            overflowWrap: 'anywhere'
                                        }}>
                                            {row.tx.NFTokenID}
                                        </TableCell>
                                        <TableCell>
                                            {row.tx.Fee}
                                        </TableCell>
                                        <TableCell>
                                            {row.tx.Flags}
                                        </TableCell>
                                        <TableCell>
                                            {row.tx.NFTokenTaxon}
                                        </TableCell>
                                        <TableCell>
                                            {row.tx.Sequence}
                                        </TableCell>
                                        <TableCell sx={{
                                            maxWidth: 200,
                                            overflowWrap: 'anywhere'
                                        }}>
                                            {row.tx.URI}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(getUnixTimeEpochFromRippleEpoch(row.tx.date)).toLocaleString()}
                                            {/* {row.tx.date} */}
                                        </TableCell>
                                        <TableCell>
                                            {row.tx.ledger_index}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}



    // {
    //   "Account": "rrpr7KNaEzHSd3GcXHkmK7PtdNEdnfULG3",
    //   "Fee": "12",
    //   "Flags": 9,
    //   "LastLedgerSequence": 1591681,
    //   "NFTokenTaxon": 0,
    //   "Sequence": 1591657,
    //   "SigningPubKey": "0352762C37CD55E5DF581303BE4222B81064875CECDAB0E670C019CEC891BAE412",
    //   "TransactionType": "NFTokenMint",
    //   "TxnSignature": "3045022100EB851206E3616DE5321B10799A9904A32E47F725DCBA13295D6C31F4954023C30220212D2778E8E695C3AF4BBBB96D100DD1D55C5C78352E1130BFAAE7E51E07DDB3",
    //   "URI": "68747470733A2F2F697066732E696E667572612E696F2F697066732F516D6632553152763155655569507970695A423871774A65724D73705A576F416F425A3764394E32517644774B78",
    //   "date": 704287630,
    //   "hash": "7893B1498781321F7A1388D291A2B8A35FD28C18345BCD04A7FF3CF86092460A",
    //   "inLedger": 1591662,
    //   "ledger_index": 1591662
    // }
