import Page from '../../components/Page';

import "./styles.css";
import { data1, data2 } from "./model";

// import {
//     Card,
//  } from '@mui/material';

export default function Spinner() {
    return (
        <Page title="Spinner Loaders">
            <div className="spinnerContainer">
                {data1.map((loader, index) => (
                <div key={loader.name + index} className="spinnerItem1">
                    <loader.Component {...loader.props} />
                    <hr />
                    <span>{loader.name}</span>
                </div>
                ))}
            </div>
            <div className="spinnerContainer">
                {data2.map((loader, index) => (
                    <div key={loader.name + index} className="spinnerItem2">
                        <div className="spinnerTitle">{loader.name}</div>
                        <loader.Component {...loader.props} />                    
                    </div>
                ))}
            </div>
        </Page>
      );
}