import { DecemberIcon } from '@src/assets/icons';
import { signin } from '@src/core/apis/auth';
import { ACCESS_TOKEN_KEY, USER_NAME } from '@src/core/apis/common';
import { setLocalStorage } from '@src/utils/storage';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const passwordInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	const navigate = useNavigate();

	const onLoginFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const payload = await signin(emailInputRef.current.value, passwordInputRef.current.value);
		setLocalStorage(ACCESS_TOKEN_KEY, payload.accessToken);
		setLocalStorage(USER_NAME, payload.user.name);
		navigate('/');
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen bg-gray-200">
			<div className="w-1/2">
				<header className="flex justify-center items-center pb-10">
					<img src={DecemberIcon} className="w-20" />
					<p className="text-5xl font-medium pl-2">PREFACE</p>
				</header>
				<form onSubmit={onLoginFormSubmit} className=" flex flex-col bg-white border border-black">
					<p className="flex px-8 py-5 bg-gray-100">로그인</p>
					<div className="flex flex-col items-center">
						<div className="py-3 justify-center my-5 border border-black w-5/6">
							<input ref={emailInputRef} type="email" placeholder="이메일을 입력하세요" className="pl-5 outline-none w-full" />
						</div>
						<div className="flex justify-center py-3  my-5 border border-black w-5/6">
							<input
								ref={passwordInputRef}
								type="password"
								placeholder="비밀번호를 입력하세요"
								className="pl-5 outline-none w-full"
							/>
						</div>

						<div className="pt-5 pb-12 w-5/6 ">
							<button type="submit" className="py-3 w-full bg-gray-100">
								로그인
							</button>
						</div>
					</div>
				</form>
				<footer className="flex justify-center py-5 ">Copyright © December and Company</footer>
			</div>
		</div>
	);
};

export default Login;
