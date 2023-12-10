import React from 'react'
import { Link } from 'react-router-dom'
import './scss/common/breadcrumb.scss'

function Breadcrumb (props) {

  console.log(props.props)
  return (
    <>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/edit-profile">Profile</Link></li>
        <li className={props.props === "List" ?  `breadcrumb-item ` :`breadcrumb-item `} aria-current="page"><Link to="/product-portfolio-initial">Product Portfolio </Link></li>
        {props.props === "Create" ?
        <li className="breadcrumb-item active" aria-current="page">Create Product Portfolio</li>

         : ""}
         {props.props === "Edit" ?
        <li className="breadcrumb-item active" aria-current="page">Edit Product Portfolio</li>

         : ""}
      </ol>
    </nav>
    </>
  )
}

export default Breadcrumb
