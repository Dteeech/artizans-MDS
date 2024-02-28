import './header.css'
import Button from '../forms/buttons/Button'

function Header () {
  return (
    <header className='main'>

      <nav>
        <a href='/'>Accueil</a>
        <a href='/artisans'>Artisans</a>
        <a href='/about'>A propos</a>
        <a href='/services'>Services</a>
        <a href='/contact'>Contact</a>
        <a href='/products'>tous les produits</a>
        <a href='/authentication'>
          <Button>
            Connexion
          </Button>
        </a>
      </nav>

    </header>
  )
}

export default Header
