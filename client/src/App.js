import './App.css';
import Header from './components/header';
import Post from './components/post';
import {BrowserRouter as Router,Route , Routes} from 'react-router-dom';     // install npm i react-router-dom@latestversion
import Login from './components/Login';
import Register from './components/register';
import Posts from './components/posts';
import { UserContextProvider } from './context/contextprovider';
import Createpost from './components/createpost';
import Editpost from './components/editpost';
import Postpage from './components/postpage';

function App() {
  return (
    <UserContextProvider>
    <Router>
    <Header/> 
    <Routes>
    <Route path='/editpost/:id' element={<Editpost/>}/>
    <Route path='/post' element={<Post/>}/>
    <Route path='/post/:id' element={<Postpage/>}/>
    <Route path='/createnewpost' element={<Createpost/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/posts' element={<Posts/>}/>
    </Routes>
    </Router>
    </UserContextProvider>
  );
}

export default App;


// <Route path='/' element={<Posts/>}/>