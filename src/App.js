import React, { useState, useEffect } from 'react';

const _data = [
  { id: 0, data: [ 'L1', 'L2', 'US' ] },
  { id: 1, data: [ 'C1', 'C2', 'CN' ] },
  { id: 2, data: [ 'D1', 'D2', 'AU' ] },
]
const fetchData = new Promise((res) => setTimeout(res, 800)).then(_ => _data)





function AddressForm({
  model,
  defaultAddress,
  onAddressChange,
}) {
  const [ address, setAddress ] = useState(null)
  const [ list, setList ] = useState([])

  const handleAddressChange = (addr, throwOut = true) => {
    setAddress(addr)
    throwOut && onAddressChange(addr)
  }

  const updateAddress = (index, newValue) => {
    const oldValue = address.data;
    return {
      id: address.id,
      data: [
        ...oldValue.slice(0, index),
        newValue,
        ...oldValue.slice(index + 1),
      ]
    }
  }

  const handleInputChange = (event) => {
    const newAddress = updateAddress(~~event.target.dataset.index, event.target.value)
    handleAddressChange(newAddress)
  }

  useEffect(() => {
    fetchData.then(data => {
      setList(data)
      defaultAddress ? handleAddressChange(defaultAddress) : handleAddressChange(data.slice(0)[0])
    })
  }, [])

  useEffect(() => {
    handleAddressChange(model, false)
  }, [model])

  return list.length !== 0 && address !== null && (
    <div>
      <select value={address.id} onChange={event => handleAddressChange(list[~~event.target.value])}>
        {
          list.map((item, index) => <option key={item.id} value={index}>{item.data.join(', ')}</option>)
        }
      </select>
      {
        address.data.map((data, index) => (
          <div key={index}>
            <input type="text" data-index={index} value={data} onChange={handleInputChange}/>
          </div>
        ))
      }
    </div>
  )
}

function App() {
  const [ address, setAddress ] = useState(null)
  const [ display, setDisplay ] = useState(true)

  return (
    <div>
      { display && <AddressForm defaultAddress={ address ? address : { id: 2, data: [ 'D1', 'D2', 'AU' ] }} model={address} onAddressChange={addr => setAddress(addr)}/> }
      <button onClick={_ => setAddress({ ...address, data: [...address.data.slice(0, 2), 'CN'] })}>Switch to CN</button>

      <p>{address !== null && JSON.stringify(address)}</p>
      <button onClick={_ => setDisplay(!display)}>Toggle</button>
    </div>
  );
}

export default App;
