import React from 'react';
import Header from './header';

interface childrenType {
    children: React.ReactNode;
}

const Layout =(props:childrenType) =>{
    return(
        <>
        <Header />
        <main>{props.children}</main>
        </>
    )
}

export default Layout;