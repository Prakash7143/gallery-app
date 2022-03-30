import { Container } from '@mui/material';
import './App.css';
import ImagesList from './components/imagesList/ImagesList';
import Nav from './components/Nav';
import Upload from './components/upload/Upload';
import AuthContext from './contexts/AuthContext';
import Modal from "./components/Modal";
import MainNotification from './components/MainNotification';
import Loading from "./components/Loading";
import Verification from './components/user/Verification';

function App() {
  return (
    <Container maxWidth="lg" sx={{textAlign:"center", mt:"1rem"}}>
      <AuthContext>
      <h1>Amazing Gallery App</h1>
        <Loading/>
        <Modal/>
        <Verification/>
        <MainNotification/>
        <Nav/>
        <Upload/>
        <ImagesList/>
      </AuthContext>
    </Container>
  );
}

export default App;
