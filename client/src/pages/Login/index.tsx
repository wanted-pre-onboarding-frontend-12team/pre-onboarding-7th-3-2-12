import { DecemberIcon } from "@src/assets/icons";
import { signin } from "@src/core/apis/auth";
import { ACCESS_TOKEN_KEY } from "@src/core/apis/common";
import { setLocalStorage } from "@src/utils/storage";
import { useRef } from "react";

const Login = () => {
	const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const passwordInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	const onLoginFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const payload = await signin(emailInputRef.current.value, passwordInputRef.current.value)
		setLocalStorage(ACCESS_TOKEN_KEY, payload.accessToken);
	}

	return (
		<div className="flex flex-col justify-center items-center h-screen bg-gray-200">
			<div className="w-1/2">
				<header className="flex justify-center items-center pb-10">
					<img src={DecemberIcon} className="w-20" />
					<p className="text-5xl font-medium pl-2">PREFACE</p>
				</header>
				<form onSubmit={onLoginFormSubmit} className=" flex flex-col bg-white border border-black">
					<p className="flex px-8 py-5 bg-gray-100">로그인</p>
					<div className="flex py-3 mx-11 my-5 border border-black w-5/6">
						<input ref={emailInputRef} type="email" placeholder="이메일을 입력하세요" className="pl-5" />
					</div>
					<div className="flex  py-3  mx-11 my-5 border border-black w-5/6">
						<input ref={passwordInputRef} type="password" placeholder="비밀번호를 입력하세요" className="pl-5" />
					</div>
					<div className="pt-5 pb-12">
						<button type="submit" className="w-5/6 mx-11 py-3 bg-gray-100">
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
