import React, {useState} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import axios from "axios";


const columns = [
    {field: 'firstname', headerName: 'First name', width: 125},
    {field: 'lastname', headerName: 'Last name', width: 125},
    {field: 'email', headerName: 'Email', width: 225},
    {
        field: 'verEnabled',
        headerName: 'Verified Email',
        width: 150,
    },
    {
        field: 'verifyDate',
        headerName: 'Verification Date',
        width: 175,
    },
    {
        field: 'active',
        headerName: 'Active',
        width: 100,
    },
];

const API_URL = "http://localhost:3008/api/";

const getPicture = async (uuid, setPic, setLoading) => {

    const token = JSON.parse(localStorage.getItem("user")).token
    setLoading(true);

    await axios.get(API_URL + 'images/tca', {
        headers: {
            'Authorization': token,
            'UUID': uuid
        }
    })
        .then((response) => {
            setLoading(false);
            setPic("data:" + response.data.type + ";base64, " + response.data.data);
        })
        .catch((err) => {
            setLoading(false);
            return new Error(err.message);
        })


    setLoading(false);
}

const TableTCA = (props) => {
    const [table, setTable] = useState([])

    React.useEffect(() => {
        const token = JSON.parse(localStorage.getItem("user")).token
        axios.get(API_URL + "tcusers/all", {headers: {Authorization: token}})
            .then((response) => {
                setTable(response.data)
                console.log(response.data)
            });
    }, [props.message])

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={table}
                columns={columns}
                pageSize={5}
                onCellClick={(newSelection) => {
                    props.setSelection(newSelection.row);
                    getPicture(newSelection.row.id, props.setSelectPicture, props.setLoading).then()
                }}/>
        </div>
    );
}

export default TableTCA;
