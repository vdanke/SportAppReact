import React, {Component} from 'react'
import WithSportService from '../hoc'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, NavLink, Nav, UncontrolledDropdown,
    DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import {logout} from "../../actions"

class Header extends Component {

    state = {
        categories: []
    }

    componentDidMount() {
        const {categoryService} = this.props

        categoryService.fetchAllCategories("/api/v1/categories")
            .then(res => res.json())
            .then(res => {
                this.setState({
                    categories: res
                })
            })
    }
    
    render() {
        const {token, role, logout} = this.props
        const {categories} = this.state

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
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Posts
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {
                                        categories.map(item => {
                                            return (
                                                <DropdownItem key={item.id}>
                                                    <NavLink href={`/posts/${item.name}/`}>{item.name}</NavLink>
                                                </DropdownItem>
                                            )
                                        })
                                    }
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>
                        <NavItem>
                            <Link to="/gyms/">Gyms</Link>                        
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