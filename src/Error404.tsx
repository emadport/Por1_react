import Info from 'components/Info'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Error404() {
  return (
    <div className="error-element">
      <div className="error-element__info">
        {' '}
        <Info type="warning">
          <div>404 Error</div> <div> No page founded or you logged out</div>
        </Info>
        <NavLink to={'/'}>Navigate to home?</NavLink>
      </div>
    </div>
  )
}
