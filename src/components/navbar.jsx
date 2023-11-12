import {NavLink } from "react-router-dom";

const Navbar = (props) => {
    return(
     <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to ="/">Home</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to ="/users">Users</NavLink>
        </li>
        {
          !props.user ? (
            <>
            <li className="nav-item">
          <NavLink className="nav-link" to ="/login">Logins</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
            </>
          ) : (
            <>
            <li className="nav-item">
          <NavLink className="nav-link" to ="/dashboard">Dashboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">Logout</NavLink>
        </li>
            </>
          )
        }
      </ul>
    </div>
  </div>
</nav>
    </>
    );
}
 
export default Navbar;