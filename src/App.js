import React from 'react';
import './App.css';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import Main from './components/Main.js';

class App extends React.Component {

  render() {

      return (
          <div className="app">
            <Header />
            <Main />
            <Footer />
          </div>
      );
     }
}

export default App;
