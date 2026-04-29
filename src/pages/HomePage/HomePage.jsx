import React, { useEffect, useState } from 'react';
import Home from '../../components/Home/Home';
import { allUsers } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import socketService from '../../services/socket';


function HomePage() {
	const navigate = useNavigate();
	const [search, setSearch] = useState('')

	const [InpuTmessage, setInpuTMessage] = useState('');
	const [dropdown, setDropDown] = useState('');
	const [userid, setUserId] = useState('');

	const [users, setUsers] = useState(
		() => {
			let saveData = localStorage.getItem('users')
			return saveData ? JSON.parse(saveData) : allUsers;
		}
	);

	const filteruser = users.filter((user) =>
		user.name.toLowerCase().includes(search.toLowerCase())
	);

	useEffect(() => {
		const saveUser = JSON.parse(localStorage.getItem('users')) || [];
		setUsers(saveUser)

		// Listen for incoming messages
		socketService.on('receive_message', (data) => {
			console.log('Received real-time message:', data);
			// Process incoming data here
		});
	}, [])


	useEffect(() => {
		localStorage.setItem("users", JSON.stringify(users));
	}, [users]);

	const handelDropDown = (name) => {
		setDropDown((prev => (prev == name ? "" : name)))
	}

	const handelUserId = (id) => {
		setUserId(id)
	}

	const selectedUser = users.find(user => user.id === userid);

	const handleSendMessage = (from = "user btn") => {
		if (!InpuTmessage.trim()) return;

		// Emit message via socket
		socketService.emit('send_message', {
			to: userid,
			text: InpuTmessage,
			time: new Date().toLocaleTimeString(),
			from: from
		});

		const updatedUsers = users.map((user) => {

			if (user.id === userid) {
				return {
					...user,
					message: [...user.message, {
						text: InpuTmessage, time: new Date().toLocaleTimeString(), from: from,
					}],
				};
			}
			return user;
		});

		setUsers(updatedUsers);
		setInpuTMessage('');
	};

	const handleStartCall = () => {
		if (userid) {
			navigate(ROUTES.CALL.replace(':id', userid));
		}
	};

	return (
		<Home 
			search={search}
			setSearch={setSearch}
			InpuTmessage={InpuTmessage}
			setInpuTMessage={setInpuTMessage}
			dropdown={dropdown}
			handelDropDown={handelDropDown}
			userid={userid}
			handelUserId={handelUserId}
			filteruser={filteruser}
			selectedUser={selectedUser}
			handleSendMessage={handleSendMessage}
			onStartCall={handleStartCall}
		/>
	);
}


export default HomePage;
