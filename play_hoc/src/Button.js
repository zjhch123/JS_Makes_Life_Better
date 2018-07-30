import React from 'react'
export default ({
  className,
  color,
  children,
  ...props
}) => (
  <button className={className} style={{color: color}} {...props}>{ children }</button>
)