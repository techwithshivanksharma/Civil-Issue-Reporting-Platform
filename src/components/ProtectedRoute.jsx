import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({children, allowedRoles}) => {
    const {user} = useContext(AuthContext);

    if(!user){
        return <Navigate to="/login" />;
    }

    if(allowedRoles && !allowedRoles.includes(user.role)){
        return <h2 className='text-center mt-10 text-red-500'>
           ❌ Access denied: You are not authorized.
        </h2>
    }

    return children;
};

export default ProtectedRoute;