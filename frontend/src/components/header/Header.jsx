import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { AcmeLogo } from './AcmeLogo.jsx'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext.jsx'
import CartIcon from '../cart/CartIcon.jsx'

function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state: { isLoggedIn, user }, logout } = useAuth()
  const [profilePic, setProfilePic] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    if (isLoggedIn && user.id) {
      setIsLoading(true)
      const fetchImageFromArtisan = async () => {
        try {
          const resProfilePic = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}?populate=artisan.profilePicture`)
          const profilePicDataJson = await resProfilePic.json()
          const url = profilePicDataJson.artisan?.profilePicture?.url
          setProfilePic(url ? `${process.env.REACT_APP_BASE_URL}${url}` : undefined)
        } catch (error) {
          setError(error.message)
        } finally {
          setIsLoading(false)
        }
      }
      fetchImageFromArtisan()
    }
  }, [isLoggedIn]) // Ajoutez user.id pour recharger lorsque l'utilisateur change

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <Link className='text-black' href='/'>
            <AcmeLogo />
            <p className='font-bold text-inherit text-black'>ARTIZANS</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link href='/'>
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/artisans'>
            Artisans
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/about'>
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/services'>
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/contact'>
            Contact
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/dashboard'>
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as='div' justify='end'>
        {isLoggedIn
          ? (
            <Dropdown placement='bottom-end'>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as='button'
                  className='transition-transform'
                  color='secondary'
                  name='Jason Hughes'
                  size='sm'
                  src={profilePic}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label='Profile Actions' variant='flat'>
                <DropdownItem key='profile' href='/profile' className='h-14 gap-2'>
                  <p className='font-semibold'>Mon compte</p>
                  <p className='font-semibold'>{isLoggedIn ? user.email : 'Non connecté'}</p>
                </DropdownItem>
                <DropdownItem key='logout' color='danger' onPress={logout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            )
          : (
            <Button as={Link} color='primary' href='/authentication' variant='flat'>
              Login
            </Button>
            )}
      </NavbarContent>
      <Link to='/cart'>
        <li>
          <CartIcon />
        </li>
      </Link>

      <NavbarMenu>
        <NavbarMenuItem />
        <NavbarMenuItem>
          <Link href='/services'>
            Services
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href='/about'>
            About
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href='/artisans'>
            Artisans
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href='/contact'>
            Contact
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
