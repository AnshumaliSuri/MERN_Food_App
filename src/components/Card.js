import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let price = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(price[0]);
    let foodItem = props.item;

    useEffect(() => {
        if (priceRef.current) {
            setSize(priceRef.current.value);
        }
    }, [priceRef]);

    const handleAddToCart = async () => {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
        console.log(data);
    };

    useEffect(() => {
        console.log("Options:", options);
        console.log("Selected size:", size);
        console.log("Quantity:", qty);
        console.log("Final price:", finalPrice);
    }, [size, qty]);

    let finalPrice = qty * (options[size] ? parseInt(options[size]) : 0);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "760px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className="container w-100">
                            <select className="m-2 bg-success h-100 rounded" value={size} onChange={(e) => setSize(e.target.value)}>
                                {price.map((data) => {
                                    return (
                                        <option key={data} value={data}> {data} </option>
                                    )
                                })}
                            </select>
                            <select className="m-2 bg-success h-100 rounded" value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })}
                            </select>
                            <div className='d-inline fs-6 h-100'>
                                ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
