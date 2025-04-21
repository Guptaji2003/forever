import React from 'react'
import ResultProducts from '../../components/ResultProducts'
import { useSelector } from 'react-redux';
// import { products } from '../../assets/Product'

const UserWishlist = () => {
    const { user } = useSelector((store) => store.auth);
  
  return (
    <div className='overflow-y-scroll h-170 mt-10'>
      <ResultProducts array={user.whislist}/>
    </div>
  )
}

export default UserWishlist
