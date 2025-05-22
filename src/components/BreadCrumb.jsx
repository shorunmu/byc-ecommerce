import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BreadCrumb = () => {

    const location = useLocation();

    const pathParts = location.pathname.split('/').filter((part) => part);
  return (
    <>
       <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            {/* Home link */}
            <li className="breadcrumb-item">
            <Link to="/">Home</Link>
            </li>

            {/* Dynamically generate breadcrumb links */}
            {pathParts.map((part, index) => {
            const path = `/${pathParts.slice(0, index + 1).join('/')}`;
            const isLast = index === pathParts.length - 1;
            

            return isLast ? (
                <li key={path} className="breadcrumb-item active" aria-current="page">
                {part}
                </li>
            ) : (
                <li key={path} className="breadcrumb-item">
                <Link to={path}>{part}</Link>
                </li>
            );
            })}
        </ol>
       </nav>
    </>
  )
}

export default BreadCrumb
