
import React, { useState, useEffect } from 'react';
// import menuLinksData from './data/menu_links.json'

// We can create a class as well, but a function component is shorter to make
// The '()' is where you can add property information to the function component
// Most likely it is this:
// “Props” is a special keyword in React, which stands for properties and is being used for passing data from one component to another.
const Header = () => {

    const [menuLinksData, setMenuLinksData] = useState([]);

    // these calls are asynchronous by nature, might need to wait around
    // if you do not define them as asynchronous, you will get all kinds of issues
    // probably, what I expect, it will first wait for the API response before rendering the rest of the page, which is shitty
    // now it will render the page, in the meantime load the data, and then populate when it arrives
    const loadMenuLinksData = async() => {
      // query API Gateway
      // we use an await because we do not want to continue but waut for this value to return 
      const resp = await fetch('https://jjcsx4hqzd.execute-api.us-east-1.amazonaws.com/Production/menulinks');
      let jsonData = await resp.json();

      // FYI: the "let" keyword allows you to declare variables that are limited to the scope of a block statement, or expression on which it is used, 
      // unlike the var keyword, which declares a variable globally, or locally to an entire function regardless of block scope.
      // The other difference between var and let is that the latter is initialized to a value only when a parser evaluates it (see below).
      // `const` is a signal that the identifier won't be reassigned. `let` is a signal that the variable may be reassigned
      
      // Assign response data to our state variable
      setMenuLinksData(jsonData)

    };

    // anonymous function, no need to name it
    // this useEffect is what gets executes as soons as the component loads
    // in tihs case it is going to run our anonymous function that calls loadMenuLinksData
    useEffect(() => {
      // Load the links from the API Gateway
      loadMenuLinksData();

      // other side effected if needed
      // ...
      // we coulds have put all the logic for ```loadMenuLinksData``` in here but it would have been messy / long
      // better to separate into separate function

    }, []);

    return (
        <header id="intro">
          <article className="fullheight">
            <div className="hgroup">
              <h1>Landon Hotel</h1>
              <h2>West London</h2>
              <p><a href="#welcome"><img src="https://landonhotel.com/images/misc/arrow.png" alt="down arrow" /></a></p>
            </div>
          </article>
          <nav id="nav">
            <div className="navbar">
              <div className="brand"><a href="#welcome">Landon <span>Hotel</span></a></div>
              <ul>
                {
                    menuLinksData.map((link) =>
                      <li><a className={`icon ${link.class}`} href={link.href}><span>{link.text}</span></a></li>
                    )
                }
              </ul>
            </div>
          </nav>
        </header>
    )
}

export default Header;
