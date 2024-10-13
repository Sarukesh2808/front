import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve username from local storage
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);
    const handleLogout = async () => {
        const userId = localStorage.getItem('userId');
        
        if (!userId) return;  // If no user is logged in, return
    
        try {
            // Make an API call to update the user's loggedIn status to false
            const response = await fetch(`https://project-bn05.onrender.com/api/users/${userId}/logout`, {
                method: 'POST',
            });
    
            if (response.ok) {
                // Clear the localStorage after successfully logging out
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
                window.location.reload();  // Reload the page to update the navbar
            } else {
                console.error('Failed to log out:', response.statusText);
            }
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Job Portal</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/applied-jobs">Applied Jobs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user-profile">Profile</Link>
            </li>
            {username === "John Doe" && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
                            </li>
                        )}
                        <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Show different options based on whether the user is logged in */}
                        {username ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Hello, {username}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
