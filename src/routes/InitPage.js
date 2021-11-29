import React from 'react'
import HomePage from '../components/HomePage'
import LogIn from '../components/LogIn'


function InitPage({ user }) {

    return (
        <div>
            {user ? (
                <HomePage
                user={user}
                />
            ) : (
                <LogIn />
            )}
        </div>
    )
}

export default InitPage
