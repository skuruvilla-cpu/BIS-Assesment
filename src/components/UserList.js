import React, { useState, useEffect }from 'react';
import { getUserList } from '../store/UserListSlice';
import { useSelector, useDispatch } from 'react-redux';


const UserList = () => {

 	const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.userList);
    const { token } = useSelector((state) => state.token);


	 useEffect(() => {
        if (token) {
            dispatch(getUserList(token)); // Pass the token to the thunk
        }
    }, [token, dispatch]);

	console.log(users);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

	return(
		<div>
			<h1>user list!</h1>
			 <table>
                <thead>
                    <tr>
                        <th>Active</th>
                        <th>Department ID</th>
                        <th>Department Name</th>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role ID</th>
                        <th>Role Name</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {users.data.data.map((user) => (
                        <tr key={user.userid}>
                            <td>{user.active ? 'Yes' : 'No'}</td>
                            <td>{user.departmentid}</td>
                            <td>{user.departmentname}</td>
                            <td>{user.employeeid}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.roleid}</td>
                            <td>{user.rolename}</td>
                            <td>{user.userid}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
		</div>
	);
}

export default UserList;