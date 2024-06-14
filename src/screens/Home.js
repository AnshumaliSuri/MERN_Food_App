import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
export default function Home() {

  const [foodCat,setFoodCat]=useState([]);
  const [foodItem,setFoodItem]=useState([]);

  const loadData=async () =>{
    let response=await fetch("http://localhost:3100/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      }
    });
    response=await response.json();
    console.log(response[0],response[1]);
  }






  return (
    <div>
      <div><Navbar/></div>
      <div><Carousel/></div>
      <div className='m-3'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
      <div><Footer/></div>
    </div>
  )
}
