import { Outlet } from 'react-router-dom';
import Header from './components/header/Header.jsx';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

