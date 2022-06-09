import './App.css';
import { BrowserRouter, Switch , Route } from 'react-router-dom';
import LandingPage from './component/LandingPage';
import Home from './component/Home';
import DogCreate from './component/DogCreate';
import Detail from './component/Detail';
import PageNotFound from './component/PageNotFound';


function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home}/>
        <Route exact path='/dog' component={DogCreate}/>
        <Route exact path='/dogs/:id' component= {Detail}/>
        <Route path='*' component= {PageNotFound}/>
      </Switch>
    </div>
    </BrowserRouter>        
  );
}

export default App;
