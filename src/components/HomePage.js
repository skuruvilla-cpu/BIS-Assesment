import React, { useState, useEffect }from 'react';
import UserList from './UserList';
import { getAPIToken } from '../store/TokenSlice';
import { useSelector, useDispatch } from 'react-redux';



const HomePage = () => {
	const dispatch = useDispatch();

	 useEffect(() => {
        const fetchToken = async () => {
            dispatch(getAPIToken())
        };
        fetchToken();
    }, []);

	return(
		<div>
			<h1>Welcome!</h1>
			<UserList />
		</div>
	);
}

export default HomePage;