import React from 'react';
import {Button} from "@material-ui/core";

export default function Marker(props) {
    let name = props.name



    return(
        <div>
            <h3 style={{backgroundColor: "red"}}>
                {name}
            </h3>
        </div>
    );

}