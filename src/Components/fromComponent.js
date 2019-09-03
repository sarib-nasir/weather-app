import React from 'react'
import "./formStyle.css"


const Form = props =>{
    return(
        <form onSubmit={props.loadWeather}>
            <div className="container mt-5 mb-5">
                <div>{props.error ? error(): null}</div>
                <div className="row">
                    <div className="col-sm-3 offset-sm-2">
                        <input type="text" className="form-control form-control-sm" name="city" placeholder="city" />
                    </div>
                    <div className="col-sm-3">
                        <input type="text" className="form-control form-control-sm" name="country" placeholder="country" />
                    </div>
                    <div className="col-sm-3 text-left">
                        <button className="btn btn-danger btn-sm">get weather</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
function error(){
    return(
        <div className="alert alert-danger mx-5" role="alert">enter data</div>
    )
}
export default Form;