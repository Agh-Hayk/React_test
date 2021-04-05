import React from 'react';
import {Spinner as BSpinner} from 'react-bootstrap'
import style from './spinner.module.css'

export default function Spinner(){
    return(
        <div className={style.spinnerCont}>
            <BSpinner animation="border" role="status" className={style.spinner}>
                <span className="sr-only">Loading...</span>
            </BSpinner>
        </div>
    )
}