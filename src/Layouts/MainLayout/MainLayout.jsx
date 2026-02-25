import { Outlet } from 'react-router-dom'
import Footer from '../../components/Layout/Footer/Footer';
import NavbarComponent from './../../components/Layout/Navbar/Navbar';

export default function MainLayout() {
  return (
    <div>
        <NavbarComponent/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
