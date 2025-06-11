import React from 'react'
import Item from './Item'

const ResultProducts = ({array}) => {
  return (
    <div>{array && array.length>0 ?
       (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6  px-50 gap-6">
          {/* Example Product Cards */}
          {array.map((product) => (
        <Item key={product.id} product={product} />
      ))}
        </div>)
        :<><span >no product found</span></>}
    </div>
  )
}

export default ResultProducts
