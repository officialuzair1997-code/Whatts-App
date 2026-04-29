import React from 'react';
import images from '../../assets/images';
import plus from '../../assets/plus.png';
import { dropdownmenu, dropdownmenuOne, dropdownmenutwo } from '../../utils';

function Home({ 
	search, 
	setSearch, 
	InpuTmessage, 
	setInpuTMessage, 
	dropdown, 
	handelDropDown, 
	handelUserId, 
	filteruser, 
	selectedUser, 
	handleSendMessage 
}) {
	return (
		<div className="flex h-screen w-screen overflow-hidden ">
			<div className="bg-[#0e1e25] text-white p-4 w-full sm:w-[450px] border-r border-gray-600 flex flex-col ">
				<div className="flex justify-between items-center mb-4   ">
					<h1 className="text-2xl font-bold">Chats</h1>
					<div className="flex items-center space-x-2">
						<button className="p-2 rounded cursor-pointer">
							<img src={plus} alt="Plus Icon" width={40} style={{ filter: 'invert(1)' }} />
						</button>

						<div className='relative'>
							<button onClick={() => handelDropDown("first")}
								className="p-2 rounded-full cursor-pointer hover:bg-gray-600">
								<img src={images.three} width={20} alt="threedot1" />
							</button>
							{dropdown == "first" && (
								<div className='bg-[rgb(28,42,48)] absolute top-8 right-[1px] z-10 mt-2 w-56 transition-opacity duration-1000 ease-in-out'>
									<ul className="text-start space-y-1 text-gray-400 w-full">
										{dropdownmenuOne.map((text, index) => (
											<li
												key={index}
												className={` ${text.isLastLi == true ? "text-sm border-t" : ""} border-gray-700 my-2 hover:bg-[#0b1013] w-full py-2 px-4 cursor-pointer rounded `}>
												{text.test}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="relative mb-2  ">
					<input type="text" placeholder="Search" className="w-full pl-17 pr-12 py-2 bg-[#1c2a30] rounded-lg text-sm placeholder-gray-400 text-white focus:outline-none" value={search}
						onChange={(e) => setSearch(e.target.value)} />
					<span className="absolute left-5 top-2.5 ">
						<img src={images.secrchi} width={15} alt="seach bar" />
					</span>
				</div>
				<div className="flex gap-2 mb-4  pb-2">
					<button className="bg-[#0A332C] text-sm px-3 py-2 rounded-full text-green-300 cursor-pointer whitespace-nowrap">All</button>
					<button className="bg-[#202C33] text-gray-500 text-sm px-3 py-2 rounded-full cursor-pointer whitespace-nowrap hover:bg-[#1c2a30]">Unread</button>
					<button className="bg-[#202C33] text-gray-500 text-sm px-3 py-2 rounded-full cursor-pointer whitespace-nowrap hover:bg-[#1c2a30]">Favorites</button>
					<button className="bg-[#202C33] text-gray-500 text-sm px-3 py-2 rounded-full cursor-pointer whitespace-nowrap hover:bg-[#1c2a30]">Groups</button>
				</div>
        <div className='relative flex-1 overflow-y-auto  p-4 scrollbar-hidden  '>
				{filteruser.map((user, index) => (
					<div key={index} onClick={() => handelUserId(user.id)} className="space-y-3 mb-1 ">
						<div className='border-t-1 border-gray-500   '>
							<div className="flex items-center justify-between  p-3 rounded transition hover:bg-[#1c2a30]   ">
								<div className="flex items-center gap-3">
									<div className="rounded-full w-10 h-10 overflow-hidden">
										<img src={user.image} alt={user.name} className="w-full h-full object-cover" />
									</div>
									<div className=''>
										<p className="font-semibold">{user.name}</p>
										<p className="text-sm text-gray-400 truncate max-w-[180px]">{user.message.at(-1)?.text}</p>
									</div>
								</div>
								<span className="text-sm text-gray-400 ">{user.message.at(-1)?.time}</span>
							</div>
						</div>
					</div>))}
</div>
			</div>


			{!selectedUser ? <div className='bg-[black] w-full h-full '>
				<div className='absolute top-50 left-[50%] '>
					<h1 className='text-9xl text-white'>Hy ! Bro</h1>
					<p className='text-white text-2xl mt-5 flex justify-center'>please Select a User </p>
				</div>
			</div>

				: <div className="flex-1 min-w-[100px]  h-full flex flex-col bg-[#202C33] text-white ">
					<div className="relative flex justify-between items-center ps-3 p-2 min-w-[100px]">
						<div className="flex items-center gap-3 min-w-[100px] ">
							<div className="rounded-full w-10 h-10 overflow-hidden">
								<img src={selectedUser.image} alt={selectedUser.name} className="w-full h-full object-cover" />
							</div>
							<div className='min-w-[100px]'>
								<p className="font-semibold">{selectedUser.name}</p>
								<p className="text-sm text-gray-400 truncate max-w-[200px] ">Online</p>
							</div>
						</div>
						<div className=" flex items-center space-x-2">
							<button
		type="button"
		onClick={() => handleSendMessage('user btn')} 
	className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
	New User
</button>



	<button 
		onClick={onStartCall}
		className="p-2 rounded cursor-pointer hover:bg-[#1c2a30] w-24 flex justify-center items-center"
	>
		<img src="/video camera.png" alt="Video Camera" className="w-6 h-6" />
	</button>

	<div className="p-2 rounded cursor-pointer hover:bg-[#1c2a30]">
		<img src={images.secrchi} width={20} alt="Search" />
	</div>
	<button onClick={() => { handelDropDown("second") }} className=" p-2 rounded-full cursor-pointer hover:bg-[#1c2a30]">
		<img src={images.three} width={20} alt="Menu" />
	</button>
	</div>

	{dropdown == "second" && (
		<div
			className={`absolute top-20 right-4 z-10 bg-[#1c2a30] 
		transition-opacity duration-9000 ease-in-out
		${dropdown === "second" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
	`}
		>
			<ul className='text-left space-y-1 text-gray-500 w-60 rounded-sm'>
				{dropdownmenu.map((item, index) => (
					<li
						key={index}
						className="hover:bg-[#0b1013] w-full px-4 py-2 cursor-pointer rounded">
						{item}
					</li>
				))}
			</ul>
		</div>)}
	</div>




	<div className="flex-1 min-h-0 relative w-full flex flex-col   ">

		<img src="0b0b1e23-8c17-42de-b064-f1a17c761115.jfif" alt="chat background" className="absolute inset-0 w-full object-cover" />

		<div className='relative flex-1 overflow-y-auto p-4 scrollbar-hidden'>
			{selectedUser?.message.map((msg, index) => (
				
	<div key={index}
		className={`bg-[#202C33] w-fit max-w-[70%] rounded relative p-2 mt-5  ${msg.from === "user btn" ? "ml-auto mr-5 bg-green-400" : "ml-20 "
		}`}>
		
		<p className="text-white text-sm pr-16 whitespace-pre-line">{msg.text}</p>
		<span className="absolute bottom-1 right-1 text-[11px]">{msg.time}</span>
		
	</div>
	
))}
</div>

	</div>

	<div className='bg-[#202C33] py-2 px-4 shrink-0 flex items-center gap-3 relative'>
		<button onClick={() => { handelDropDown("third") }} className={`" rounded-full  p-3   ${dropdown == "third" ? "hover:bg-[#374248] " : "bg-[#202C33]"}`}>
			<img src={dropdown == "third" ? images.close : images.plusbtn} width={20} className="transition duration-1000 group-hover:scale-110" alt="Options" />
		</button>


		<div className="relative flex-1">
			<div className="w-full px-4 py-2 bg-[#202C33] flex items-end relative">


				<span className="absolute left-5 top-1/2 transform -translate-y-1/2 hover:text-white cursor-pointer">
					<img src="public/Screenshot 2025-06-02 165952.png" width={30} alt="attach icon" />
				</span>

				<textarea
					value={InpuTmessage}
					onChange={(e) => setInpuTMessage(e.target.value)}
					onInput={(e) => {
						e.target.style.height = 'auto';
						e.target.style.height = `${e.target.scrollHeight}px`;
					}}
					rows={1}
					placeholder="Type a message"
					className="flex-1 resize-none overflow-hidden bg-[#2A3942] text-white text-sm rounded-lg px-10 py-2 pr-10 focus:outline-none min-h-[40px] max-h-[150px] leading-snug"
				></textarea>


				<span className="absolute right-5 top-1/2 transform -translate-y-1/2 hover:text-red cursor-pointer">
					<img src={images.heroicon} width={20} alt="heroicon" />
				</span>
			</div>
		</div>


		<button onClick={() => handleSendMessage("other")} className=" p-2 cursor-pointer">
			<img src={images.sendms} width={25} alt="Send" />
		</button>

		{dropdown == "third" && (<div className=' absolute bottom-16  rounded-2xl p-1 bg-[#233138] max-w-[300px] hidden sm:block transition-opacity duration-1000 ease-in-out opacity-100 pointer-events-auto'>
			<div className=" text-white p-1 rounded-2xl">
				{dropdownmenutwo.map((item, index) => (

					<div key={index} className="flex items-center justify-between gap-2 hover:bg-[#141c21] p-2 rounded cursor-pointer">
						<div className="flex items-center gap-2">
							<img src={item.icon} width={20} alt={item.label} />
							<span>{item.label}</span>
							{item.badge && (
								<span className="text-xs text-gray-300 px-2 rounded-full bg-[#2c3a40]">{item.badge}</span>)}
						</div>
					</div>))}
			</div>


		</div>)}
	</div>
	</div>}
	</div>
	);
}

export default Home;
