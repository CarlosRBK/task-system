import React from 'react'

const Navbar = () => {
  return (
    <div className="row">
      <div
        className="col col bg-dark text-white shadow-lg rounded mw-100 text-uppercase fs-4"
        style={{
          height: "70px",
          width: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Sistema de tareas
      </div>
    </div>
  )
}

export default Navbar