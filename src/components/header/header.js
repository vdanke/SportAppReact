import React, {Component} from 'react'
import WithSportService from '../hoc'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import {logout} from "../../actions"

class Header extends Component {
    
    render() {
        const {token, role, logout} = this.props

        const loginLogoutCabinetComponent = token && role ? 
            <div>
                {role === "ROLE_TRAINEE" ? <Link to="/cabinet/trainee/">Cabinet</Link> : null}
                {role === "ROLE_COACH" ? <Link to="/cabinet/coach/">Cabinet</Link> : null}
                <Link to="/logout/" onClick={logout}>Logout</Link>
            </div> : 
            <div>
                <Link to="/login/">Login</Link>
                <Link to="/registration/">Registartion</Link>
            </div>

        return (
            <div>
                <Navbar color="light" light expand="lg">
                    <NavbarBrand href="/">Sport App</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link to="/gyms/">Gyms</Link>                        
                        </NavItem>
                        <NavItem>
                            <Link to="/posts/">Posts</Link>
                        </NavItem>
                        <NavItem>
                            {role === "ROLE_TRAINEE" ? <Link to="/coaches/">Coaches</Link> : null}
                            {role === "ROLE_COACH" ? <Link to="/trainees/">Trainees</Link> : null}
                        </NavItem>
                    </Nav>
                    {loginLogoutCabinetComponent}
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        role: state.role,
    }
}

const mapDispatchToProps ={
    logout
}

export default WithSportService()(connect(mapStateToProps, mapDispatchToProps)(Header))