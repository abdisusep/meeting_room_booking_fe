import { Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom";

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ClientList from './pages/Client/List';
import ClientAdd from './pages/Client/Add';
import ClientEdit from './pages/Client/Edit';
import RoomList from './pages/Room/List';
import RoomAdd from './pages/Room/Add';
import RoomEdit from './pages/Room/Edit';
import RoomUsageList from './pages/RoomUsage/List';
import RoomUsageAdd from './pages/RoomUsage/Add';
import RoomUsageEdit from './pages/RoomUsage/Edit';

function App() {  

  return (
    <Routes>
      <Route path="/" element={ <Login/> } />
      <Route path="dashboard" element={ <Dashboard/> } />
      <Route path="client" element={ <ClientList/> } />
      <Route path="client/add" element={ <ClientAdd/> } />
      <Route path="client/edit/:id" element={ <ClientEdit/> } />
      <Route path="room" element={ <RoomList/> } />
      <Route path="room/add" element={ <RoomAdd/> } />
      <Route path="room/edit/:id" element={ <RoomEdit/> } />
      <Route path="room_usage" element={ <RoomUsageList/> } />
      <Route path="room_usage/add" element={ <RoomUsageAdd/> } />
      <Route path="room_usage/edit/:id" element={ <RoomUsageEdit/> } />
    </Routes>
  )
}

export default App
