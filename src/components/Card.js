import React from 'react'

export default function Card(props) {

    let options=props.options;
    let price=Object.keys(options);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "760px" }}>
                    <img src={props.imgsrc} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        {/* <p className="card-text">Khana.</p> */}
                        <div className="container w-100">
                            <select className="m-2 bg-success h-100 rounded">
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })}
                            </select>
                            <select className="m-2 bg-success h-100 rounded">
                                {price.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline fs-6 h-100'>
                                Total Price.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
