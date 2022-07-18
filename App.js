import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Electronics from './Electronics';
import Grocery from './Grocery';
import Clothes from './Clothes';
import HomendKitchen from './HomendKitchen';
import Return from './Return';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>

            <Route path = '/checkout'>
              <Header/>
              <Checkout/>
            </Route>

            <Route path = '/electronics'>
              <Header/>
              <Electronics/>
            </Route>

            <Route path = '/grocery'>
              <Header/>
              <Grocery/>
            </Route>

            <Route path = '/clothes'>
              <Header/>
              <Clothes/>
            </Route>

            <Route path = '/handkit'>
              <Header/>
              <HomendKitchen/>
            </Route>

            <Route path = '/returnOrder'>
              <Header/>
              <Return/>
            </Route>

            <Route path = "/">
              <Header/>
              <Home/>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
