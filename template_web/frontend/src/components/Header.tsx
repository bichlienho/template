import React from 'react'
import logo from  '../assets/images/logo.png'


function Header() {
  return (
    <div>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* Logo + Title */}
                <div className="logo-title">
                  <a href="/" className="logo">
                    <img src={logo} alt="Logo" />
                  </a>
                  <h1 className="site-title">KHO TEMPLATES PROJECT CHO SINH VIÊN</h1>
                </div>

                {/* Menu */}
                <ul className="nav">
                  <li className="scroll-to-section">
                    <a href="/" className="active">Home</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

    </div>
  )
}

export default Header
