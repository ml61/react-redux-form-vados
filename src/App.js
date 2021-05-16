import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateProduct from "./components/CreateProduct";
import DeleteProduct from "./components/DeleteProduct";
import EditProduct from "./components/EditProduct";
import ProductList from "./components/ProductList";

import Menu from "./components/Menu";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Menu />
        <Switch>
          <Route path="/" exact>
            <ProductList />
          </Route>
          <Route path="/new">
            <CreateProduct />
          </Route>
          <Route path="/edit/:id">
            <EditProduct />
          </Route>
          <Route path="/delete/:id">
            <DeleteProduct />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
