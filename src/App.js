
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavbarExample from './layouts/navbar';
import AgregarPaciente from './components/agregarPaciente';
import Contact from './components/contact';
import Home from './components/home';
import ListarTodos from './components/listarTodos';
import DetallePaciente from './components/detallePaciente';
import EliminarPaciente from './components/eliminarPaciente';
import EditarPaciente from './components/actualizarPaciente';
import BusquedaPersonalizada from './components/busquedaPersonalizada';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<NavbarExample/>}>
            <Route index element = {<Home/>}></Route>
            <Route path='paciente/nuevo' element = {<AgregarPaciente/>}></Route>
            <Route path='paciente/listar' element = {<ListarTodos/>}></Route>
            <Route path='paciente/detalle/:id' element = {<DetallePaciente/>}></Route>
            <Route path='paciente/eliminar/:id' element = {<EliminarPaciente/>}></Route>
            <Route path='paciente/actualizar/:id' element = {<EditarPaciente/>}></Route>
            <Route path='paciente/busquedaPersonalizada' element = {<BusquedaPersonalizada/>}></Route>

            {/*Para rutas que no esten registradas redirecciona al home*/}
            <Route path='*' element={<Navigate replace to={'/'}/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
