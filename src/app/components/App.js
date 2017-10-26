import React, {Component} from 'react'
import Head from 'next/head'
import raf from 'raf'
import Router from 'next/router'

import Header from "./Header"
import OrderDialog from "./OrderDialog"


Router.onRouteChangeStart = (url) => {
  if (Router.router.route !== url) {
    const $container = document.getElementById('container')
    const $parentNode = $container.parentNode
    const $clone = $container.cloneNode(true)

    document.body.classList.add('loading')
    $clone.classList.add('clone')

    $clone.addEventListener('animationend', () => {
      console.log('animation ended')
      document.body.classList.remove('loading')
      $parentNode.querySelector('.clone').remove()
      $parentNode.querySelector('#container').classList.remove('animate-in')
    }, { once: true })

    raf(() => {
      const $container2 = document.getElementById('container')
      $parentNode.insertBefore($clone, $parentNode.childNodes[0])
      $clone.classList.add('animate-out')
      // const $appMain = $container2.querySelector('.app').querySelector('.app__main')
      // while ($appMain.firstChild) $appMain.removeChild($appMain.firstChild)
      $container2.classList.add('animate-in')
    })
  }
}


class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { children } = this.props
    return (
      <main  id="container">
        <style global jsx>
          {`
            .app {
              width: 100%;
              min-height: 100vh;
              background-color: white;
            }

            .app__main {
              padding: 16px;
            }
          `}
        </style>
        <div className="app">
          <Header />
          <div className="app__main">
            {children}
          </div>
        </div>
        <OrderDialog />
      </main>
    )
  }
}

export default App
