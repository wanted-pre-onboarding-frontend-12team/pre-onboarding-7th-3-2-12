import React, { useState } from 'react';
import { DecemberIcon } from '../../assets/icons';
import { onLogin } from '../../apis/login';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const handleLoginSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data: any = await onLogin(email, password);
		localStorage.setItem('accessToken', data.accessToken);
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen bg-gray-200">
			<div className="w-1/2">
				<header className="flex justify-center items-center pb-10">
					<img src={DecemberIcon} className="w-20" />
					<p className="text-5xl font-medium pl-2">PREFACE</p>
				</header>
				<form className=" flex flex-col bg-white border border-black" onSubmit={handleLoginSumbit}>
					<p className="flex px-8 py-5 bg-gray-100">로그인</p>
					<div className="flex py-3 mx-11 my-5 border border-black w-5/6">
						<input
							placeholder="아이디를 입력하세요"
							className="pl-5 w-full outline-none"
							value={email}
							onChange={handleEmailChange}
						/>
					</div>
					<div className="flex  py-3  mx-11 my-5 border border-black w-5/6">
						<input
							placeholder="비밀번호를 입력하세요"
							type="password"
							value={password}
							className="pl-5 outline-none"
							onChange={handlePasswordChange}
						/>
					</div>
					<div className="pt-5 pb-12">
						<button className="w-5/6 mx-11 py-3 bg-gray-100" type="submit">
							로그인
						</button>
					</div>
				</form>
				<footer className="flex justify-center py-5 ">Copyright © December and Company</footer>
			</div>
		</div>
	);
};

export default Login;
