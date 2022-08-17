import './App.css';
import{BrowserRouter,Route,Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import CreateRecipe from './components/CreateRecipe/CreateRecipe'
// import CreateUser from './components/CreateUser/CreateUser'
// import Login from './components/Login/Login'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = '/' render = { () => <LandingPage/> }/>
          <Route  path = '/home' render = { () => <Home/> }/>
          <Route exact path ='/recipes/:id' render = { () => <Detail/> }/>
          <Route exact path ='/recipe' render = { () => <CreateRecipe/> }/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
