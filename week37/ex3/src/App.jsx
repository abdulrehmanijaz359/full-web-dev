import React from 'react'
import './App.css'

function Animal(props) {
  const { name, type, legs, important } = props

  const legsText = legs === 0 ? 'has no legs' : `has ${legs} legs`
  const sentence = `The ${name} is a ${type} and ${legsText}.`

  if (important) {
    return (
      <p>
        <strong>{sentence}</strong>
      </p>
    )
  }

  return <p>{sentence}</p>
}

function ElementBlock(props) {
  const { text, number } = props

  return (
    <span style={{ marginRight: '15px' }}>
      {text}
      <button type="button">{number}</button>
    </span>
  )
}

function ElementBlockRow(props) {
  const { text, max } = props

  const blocks = []
  for (let i = 1; i <= max; i++) {
    blocks.push(<ElementBlock key={i} text={text} number={i} />)
  }

  return <div>{blocks}</div>
}

class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'left' }}>
        <Animal name="eagle" type="bird" legs={2} />
        <Animal name="cat" type="mammal" legs={4} important={true} />
        <Animal name="pike" type="fish" legs={0} />
        <Animal name="whiskered bat" type="mammal" legs={2} />

        <ElementBlockRow text="Foo" max={3} />
        <ElementBlockRow text="Bar" max={5} />
        <ElementBlockRow text="Baz" max={2} />
      </div>
    )
  }
}

export default App