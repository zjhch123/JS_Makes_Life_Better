import React from 'react'

export default ({data}) => (
  <div>
    {
      data.map((item, index) => (
        <div key={index}>{item}</div>
      ))
    }
  </div>
)