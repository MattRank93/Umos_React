import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import axios from "axios";
//
// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
// });
//
// function createData(name, calories, fat, carbs, protein) {
//     return {name, calories, fat, carbs, protein};
// }
//
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
//
// let x = {};
//
// const API_URL = "http://localhost:3007/api/";
//
// const TableTCA = (props) => {
//     const classes = useStyles();
//     const [table, setTable] = useState({})
//
//     React.useEffect(() => {
//         const token = JSON.parse(localStorage.getItem("user")).token
//
//         axios.get(API_URL + "tcusers/all", {headers: {Authorization: token}})
//             .then((response) => {
//                 setTable(response.data)
//                 console.log(response.data)
//             });
//
//     }, [])
//
//
//     return (
//         <div>
//             {/*<Button onClick={login}>*/}
//             {/*    Click me*/}
//             {/*</Button>*/}
//             <TableContainer component={Paper}>
//                 <Table className={classes.table} aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell align="right">Email</TableCell>
//                             <TableCell align="right">Verified Status</TableCell>
//                             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//                             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {table.map((row) => (
//                             <TableRow key={row.firstname}>
//                                 <TableCell component="th" scope="row">
//                                     {row.firstname}
//                                 </TableCell>
//                                 <TableCell align="right">{row.lastname}</TableCell>
//                                 <TableCell align="right">{row.email}</TableCell>
//                                 <TableCell align="right">{row.phone}</TableCell>
//                                 <TableCell align="right">{row.role}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// }
//
// export default TableTCA;