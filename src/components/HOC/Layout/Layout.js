import React from 'react';

import Navigation from '../../navigation/NavigationItems';
import classes from './Layout.module.scss';

const Layout = (props) => {

    return (
        <>
            <Navigation />
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
        )
}



export default Layout;