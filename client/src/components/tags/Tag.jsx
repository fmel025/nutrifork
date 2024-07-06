import React from 'react'

function Tag({ valor }) {
  return (
    <button className="btn btn-xs no-animation  text-center text-sm font-semibold text-black border-0 bg-white hover:bg-white  px-5">{valor}</button>
  )
}

export default Tag