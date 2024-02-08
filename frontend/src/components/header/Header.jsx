import './header.css'

function Header() {
    return (  
        <header className='main'>

            <nav>
                <a href="/">Accueil</a>
                <a href="/about">A propos</a>
                <a href="/services">Services</a>
                <a href="/contact">Contact</a>
            </nav>

        </header>
    )
}

export default Header