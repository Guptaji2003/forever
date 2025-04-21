import React, { useState } from 'react'
// import { products } from '../assets/Product'
import Item from './Item'
import ResultProducts from './ResultProducts'
import { useSelector } from 'react-redux'

const NewArrival = () => {
  const {products}=useSelector(store=>store.product);

    const [newarrival, setnewarrival] = useState([])
    React.useEffect(() => {
            const Products = products.slice(0,5)
            setnewarrival(Products)
        }, [])
    
  return (
    <div>
      <div className="container mx-auto mt-12 px-6">
              <h2 className="text-3xl font-bold text-center mb-6">New Arrivals</h2>
              <p className="text-center mb-12">
                Our new arrivals are built to withstand your activities while keeping you looking your best!
              </p>
              <ResultProducts array={newarrival}/>
            </div>
    </div>
  )
}

export default NewArrival
