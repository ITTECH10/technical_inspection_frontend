import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, condition, route, ...rest }) => (
    <Route {...rest} render={(props) => (
        condition === true
            ? <Component {...props} />
            : <Redirect to={route} />
    )} />
)

export default GuardedRoute;