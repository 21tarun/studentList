import React from "react";
import { Link, NavLink } from "react-router-dom";

function Nav(){
    return(
        <div className="nav">
            <li><h4><NavLink className="navLink" to='/add'>Add Student</NavLink></h4></li>


        </div>
    )
}

export default Nav;