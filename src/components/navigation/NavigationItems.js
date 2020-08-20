import React from 'react'
import classes from './NavigationItems.module.scss'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>HOME PAGE</NavigationItem>
      <NavigationItem link='/settings'>SETTINGS</NavigationItem>
    </ul>
  )
}

export default navigationItems
