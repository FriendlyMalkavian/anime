import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Graph2D from './components/graph2D/Graph2D';
import Calculator from './components/calculator/Calculator';
import Graph3D from './components/graph3D/Graph3D';
import NotFound from './components/routes/NotFoundPage';
import ROUTES from './components/routes/Routes'

import './App.css';

window.requestAnimFrame = (() => {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header ROUTES={ROUTES}/>
          <Routes>
            <Route exact path={ROUTES.MAIN.path} element={<Graph2D /*store={store}*//>}/>
            <Route exact path={ROUTES.CALCULATOR.path} element={<Calculator/>}/>
            <Route exact path={ROUTES.GRAPH2D.path} element={<Graph2D /*store={store}*//>}/>
            <Route exact path={ROUTES.GRAPH3D.path} element={<Graph3D/>}/>
            <Route exact path={ROUTES.NOTFOUND.path} element={<NotFound/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
