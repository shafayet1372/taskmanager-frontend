import React from 'react'
import Logo from '../assets/image/logo.svg'
import SearchController from './SearchController'
import { Link } from 'react-router-dom'
export default function NavBar() {
    return <nav className="container relative py-3">
        <div className="flex items-center justify-between">
            <Link to="/">
                <img src={Logo} />
            </Link>
            <SearchController />
        </div>
    </nav>
}
