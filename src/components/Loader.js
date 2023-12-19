import React, { Component } from 'react'
import loading from './loader.gif'

export default class Loader extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}
