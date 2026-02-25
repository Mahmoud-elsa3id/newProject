import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from './../../../context/tokenContext';


export default function NavbarComponent() {

let  {setToken,userData}=useContext(tokenContext)
let naviagte =useNavigate()

function logoutSystem(){
  localStorage.removeItem('token');
  setToken(null);
  naviagte('/auth/login')
}


  return (
    <Navbar >
      <NavbarBrand >
        <p className="font-bold text-sky-800 text-3xl">LinkedPost</p>
      </NavbarBrand>


<NavbarContent className="hidden sm:flex gap-4" justify="center">  
        <NavbarItem className="font-semibold text-sky-700 "> 
          <Link to={'/'} color="foreground" >
            Home
          </Link>
        </NavbarItem>
              </NavbarContent>
<NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src={userData?.photo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as {userData?.name}</p>
              <p className="font-semibold">{userData?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings"><Link to={'/profile/'+userData?._id}>profile</Link></DropdownItem>
           
            <DropdownItem  onClick={()=>{logoutSystem()}} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
