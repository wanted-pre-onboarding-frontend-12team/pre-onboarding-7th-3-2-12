import { DecemberIcon } from '../../assets/icons';

const Login = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen bg-gray-200">
			<div className="w-1/2">
				<header className="flex justify-center items-center pb-10">
					<img src={DecemberIcon} className="w-20" />
					<p className="text-5xl font-medium pl-2">PREFACE</p>
				</header>
				<form className=" flex flex-col bg-white border border-black">
					<p className="flex px-8 py-5 bg-gray-100">로그인</p>
					<div className="flex py-3 mx-11 my-5 border border-black w-5/6">
						<input placeholder="아이디를 입력하세요" className="pl-5" />
					</div>
					<div className="flex  py-3  mx-11 my-5 border border-black w-5/6">
						<input placeholder="비밀번호를 입력하세요" className="pl-5" />
					</div>
					<div className="pt-5 pb-12">
						<button className="w-5/6 mx-11 py-3 bg-gray-100">로그인</button>
					</div>
				</form>
				<footer className="flex justify-center py-5 ">© December and Company</footer>
			</div>
		</div>
	);
};

export default Login;
