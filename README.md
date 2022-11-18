# 원티드 프리온보딩 7차 6차 과제

## 과제 설명

> [Assignment 6](https://www.notion.so/3-3-024ecdae5af6452788a9be19106ebeec) 주제 : 투자 관리 서비스의 관리자 기능 구현

- 진행 기간 : 2022-11-12 ~ 2022-11-18

<br />

## 데모 & 구현 방법

<details>
<summary>고객 목록에서는 활성화 여부, 임직원 계좌 여부를 필터링 및 검색 이 가능, 또한 특정 고객과 연관된 정보들(계좌 정보, 세팅 정보, 기본 정보) 삭제 가능해야 합니다. [https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-2-12/pull/39]</summary>


### 결과물

`필터링 및 검색에 따른 고객 목록 업데이트`


![filter_users](https://user-images.githubusercontent.com/50790145/202811722-f01aaf27-897b-459b-ac61-b41fa189d902.gif)


`특정 고객 삭제(고객과 연동된 계좌 + 세팅 정보 삭제 + 기본정보 모두 삭제되어야함)`

![user_delete](https://user-images.githubusercontent.com/50790145/202811449-5037d3a5-7eba-4896-8b43-fd9b1924893e.gif)


### 구현방법

`필터링에 따른 고객 목록 리스트 업데이트`

- 베이스가 되는 고객 정보 리스트 API 를 요청하는데, 해당 API Refetch 되는 조건은 `검색어가 바뀌었거나`, `필터 조건이 변경` 되었을 때 요청합니다.
- 고객 정보 리스트 데이터를 서버로부터 응답받는데 성공했다면, 이를 기반으로 고객 목록에서 필요한 데이터를 정제한 결과를 반환받습니다. 이를 `userService` 라는 모듈에 분리했습니다.

```ts
export const generateFullInfoUsers = async (users: UserResponseDTO[], userSettingFilterObj: UserSettingFilterObj) => {
	const userSettings = await getUserSettingAll(generateQueryString(userSettingFilterObj));
	const accounts = await getAllAccounts('', {
		accountBroker: '',
		accountStatus: '',
		accountActive: '',
	});

	const fullInfoUsers: FullInfoUser[] = [];

	for (let i = 0; i < users.length; i++) {
		const targetUserAccounts = accounts.filter((account) => users[i].id === account.user_id);
		const targetUserUserSetting: UserSettingResponseDTO = userSettings.filter(
			(userSetting) => users[i].uuid === userSetting.uuid,
		)[0];

		if (targetUserUserSetting) {
			fullInfoUsers.push({
				...users[i],
				is_active: targetUserUserSetting?.is_active ?? false,  // DB 상에 undefined 로 초기화된 정보가 생각보다 많았기 때문에, 그렇다면 기본적으로 false (동의 X) 로 초기화하는 과정을 밞음
				is_staff: targetUserUserSetting?.is_staff ?? false,  // DB 상에 undefined 로 초기화된 정보가 생각보다 많았기 때문에, 그렇다면 기본적으로 false (동의 X) 로 초기화하는 과정을 밞음
				allow_marketing_push: targetUserUserSetting?.allow_marketing_push ?? false,  // // DB 상에 undefined 로 초기화된 정보가 생각보다 많았기 때문에, 그렇다면 기본적으로 false (동의 X) 로 초기화하는 과정을 밞음
				account_count: targetUserAccounts.length,  // 고객별 연동된 계좌수
				user_accounts: targetUserAccounts,  // 고객 삭제 시, 연동된 계좌정보를 알기 위함
				user_setting_id: targetUserUserSetting.id,  // 고객 삭제 시, 매핑되어있는 유저 부가 정보를 알기 위함
			});
		}
	}

	return fullInfoUsers;
};
```

`특정 고객 삭제(고객과 연동된 계좌 + 세팅 정보 삭제 + 기본정보 모두 삭제되어야함)`

- 특정 고객을 삭제할 경우, 의사를 묻고 동의할 경우 고객 정보 삭제를 진행합니다.
- 고객 삭제는 해당 고객 정보 뿐만 아니라, 연동된 모든 계좌 정보 및 고객 부가 정보 또한 DB에서 삭제해야합니다.
- 이를 위해, 삭제 요청이 들어온 고객의 정제된 필드값을 참조하여 각각에 맞는 삭제 프로세스를 진행하도록 구현했습니다.
- 이 또한, `userService` 모듈로 분리했습니다.

```ts
// 고객 삭제 이벤트
const handleUserDelete = async (targetUserId: number) => {
		if(window.confirm('고객 삭제시 연동된 계좌 정보가 모두 삭제됩니다.\n삭제하시겠습니까?')) {
			...

			if(targetUser) {
				await deleteUserInfo(targetUser);
				alert('고객 삭제를 완료했습니다.');
                                 ...
			}
		}
	}


// userService
export const deleteUserInfo = async (targetUser: FullInfoUser) => {
	try {
		targetUser.user_accounts.forEach(async (account) => {
			await deleteAccountById(account.id);
		});

		await deleteUserSettingById(targetUser.user_setting_id);
		await deleteUserById(targetUser.id);
	} catch (error) {
		if (error instanceof AxiosError) {
			console.error(`${targetUser.name} 고객 삭제 중 오류 발생 !`);
		}
	}
};
```

</details>


<details>
<summary>계좌목록 페이지에서는 브로커명, 계좌 활성화 여부, 계좌 상태를 필터링 할 수 있어야 합니다. [https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-2-12/pull/27]</summary>
	

### 결과물
  
<img width="763" alt="스크린샷 2022-11-18 오전 5 56 03" src="https://user-images.githubusercontent.com/108744804/202558070-610bf0c5-d7bc-470c-aa70-e6a22b45c7ef.png">


### 구현 방법

> 💫 객체로된 state를 만들고, 객체의 키값을 이용해 api 요청을 하는 방식으로 구현

+ 객체로 만든 accountFilterObj state를 쿼리키의 의존성 배열로 부여해, 브로커명, 계좌상태, 계좌활성화 여부가 변경시 useQuery가 작동하여, 데이터 캐싱을 할 수 있도록 구현
  
```tsx
const [accountFilterObj, setAccountFilterObj] = useState({
		accountBroker: '',
		accountStatus: '',
		accountActive: '',
	});
```
```tsx
  const useAccount = (currentPage: number, search: string, accountFilterObj: Props) => {
	const { data: accounts } = useQuery<AccountResponseDTO[]>(['getAccounts', currentPage, accountFilterObj, search], () =>
		getAccounts(currentPage, search, accountFilterObj),
	);
```

+ 해당 객체 사용부
  
```tsx
url: `${accounts}?_page=${currentPage}&q=${search}&_limit=14&broker_id_like=${accountFilterObj.accountBroker}&status_like=${accountFilterObj.accountStatus}&is_active_like=${accountFilterObj.accountActive}`,

```


</details>

<details>
<summary> 계좌목록 페이지는 페이지네이션이 되어야 합니다. [https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-2-12/pull/36]</summary>
	
### 결과물
  
  <img width="1440" alt="스크린샷 2022-11-18 오전 5 21 35" src="https://user-images.githubusercontent.com/108744804/202559535-6315efde-6810-4cb8-8590-c810a9387a27.png">


### 구현 방법

> 💫 전체페이지, 현재페이지, 현재페이지 핸들러 함수를 전달받아 페이지네이션을 관리하는 페이지네이션 컴포넌트 생성

+ 필터링, 검색 시 보일 전체페이지와 현재페이지를 핸들링하기 위해 filterObj, searchKeyword, setCurrentPage를 변경 시 새로 페이지를 계산할 수 있게 전달
  
`필터링,검색 시 새로 페이지 계산하는 부분`
  
```tsx
useEffect(() => {
		props.setCurrentPage(INITAL_PAGE);
		setStartPage(INITAL_PAGE);
		if (props.totalPage > PagePerView) {
			setEndPage(PagePerView);
		} else {
			setEndPage(props.totalPage);
		}
	}, [props.filterObj, props.searchKeyword]);

```
  
`선택된 페이지를 전달받아 현재페이지를 설정해주는 부분`
  
```tsx
  const handlePagenationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const newPage = event.currentTarget.dataset.page;
		props.onPagenationChange(Number(newPage));
	};
```

+ 해당 컴포넌트 사용부
  
```tsx
<Pagenation
	searchKeyword={searchKeyword}
	setCurrentPage={setCurrentPage}
	filterObj={accountFilterObj}
	totalPage={totalPage!}
	currentPage={currentPage}
	onPagenationChange={handlePagenationChange}
/>
```


</details>  
  <details><summary>새로고침을 해도 로그인 상태가 유지되어야 하며, 상태에 따라 기존에 머무르던 화면이 그대로 보여야 합니다. [https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-2-12/pull/5]</summary></details>

<details>
<summary> 인증된 사용자만 CRUD(생성, 조회, 수정, 삭제) 가 가능해야 합니다. [https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-2-12/pull/10]</summary>
</details>
	
<br />

## 실행 방법

### 0. 레포지토리 클론

```bash
# Clone Front Repo
git clone https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-2-12.git
```

### 1. API 서버 실행 

> 🌟 API 서버가 실행되어야 정상적으로 작동하므로, 필수적으로 선행되어야 합니다.

```
# GoTo JSON-SERVER
cd server

# Install API Server Dependency
npm install

# Run API Server
npm start
```

### 2. 프론트 실행

```bash
# 새로운 터미널 실행
cd client

# Install Front Dependency
yarn install

# Run Front Project
yarn run dev
```

### 3. 테스트용 아이디

```bash
admin12@email.com
admin12!
```

<br />


## 시연 영상
<table>
  <tr>
 <td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/97100045/202550478-eb9f4d19-87ec-4c57-94d5-3404f7d90da6.gif" alt="users" /><p><b> 로그인 및 대시보드 </b></p>
<td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/50790145/202813248-c9295b1d-4eb5-4b4c-a418-643fa87f2723.gif" alt="users" /><p><b> 고객 목록 </b></p>
  </tr>
  <tr>
<td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/50790145/202813554-6b2af43c-a893-491c-811a-01a8fb60de2c.gif" alt="users" /><p><b> 고객 삭제 </b></p>
<td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/97100045/202552356-201d50ae-6dcf-4921-8d6c-c3dbdc966190.gif" alt="login" /><p><b> 고객 상세 </b></p>
  </tr>
  <tr>
<td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/97100045/202552473-fccd3c03-852c-4fd5-9d6b-20b67acd427b.gif" alt="users" /><p><b> 계좌 목록 </b></p>
<td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/97100045/202552556-5d1b14d6-71cf-4c6f-805c-c6153b2acdd2.gif" alt="login" /><p><b> 사용자 추가1 </b></p>
  </tr>
  <tr>
<td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/97100045/202552590-d8b0cef9-1393-44e4-99a9-1294f58aef69.gif" alt="users" /><p><b> 사용자 추가2 </b></p>
  </tr>
</table>

<br />

## 과제 달성 사항 및 해결 방법

### 필수 구현 범위

- 사용자 목록
    - 표기되어야 하는 정보
        - [x] 고객명(name) : 가운데 글자 마스킹 필요, 두글자일 경우 성을 제외한 이름 마스킹 처리, 4글자 이상일 경우 마스킹 처리 후 앞뒤 한글자만 표기
            - [x] 고객명을 누를 경우 사용자 상세화면으로 이동합니다.
        - [x] 보유중인 계좌수(account_count) : (해당 API 호출 후 데이터를 정제하여 표기)
        - [x] 이메일 주소 (email)
        - [x] 주민등록상 성별코드 (gender_origin)
        - [x] 생년월일 (yyyy-mm-dd) (birth_date)
        - [x] 휴대폰 번호 (가운데 4자리 `***` 로 마스킹 필요) (phone_number)
        - [x] 최근로그인 (last_login)
        - [x] 혜택 수신 동의 여부 (해당 API 호출 후 데이터를 정제하여 표기) (allow_marketing_push)
        - [x] 활성화 여부 (해당 API 호출 후 데이터를 정제하여 표기) (is_active)
        - [x] 가입일 (created_at)

- 계좌 목록
  - 표기되어야 하는 정보
    - [x] 고객명(user_name) : 고객ID 를 참조하여 실제 이름으로 보여져야 합니다.
        - 고객명을 누를 경우 사용자 상세화면으로 이동합니다.
    - [x] 브로커명(broker_name) : 예시) OO증권, `brokers.json` 를 참조하여 실제 이름으로 보여져야 합니다.
    - [x] 계좌번호(number) : 앞 뒤 각각 두글자를 제외하고 나머지는 글자수에 맞게 `*` 글자로 마스킹 처리가 필요합니다.
    - [x] 계좌상태(status) : 예시) 운용중, `accountStatus.json` 를 참조하여 실제 이름으로 보여져야 합니다.
    - [x] 계좌명(name) : 계좌명입니다.
    - [x] 평가금액(assets) : 예시) 123,123,123
    - [x] 입금금액(payments) : 예시) 123,123,123
    - [x] 계좌활성화여부(is_active) : 계좌 활성화 여부
    - [x] 계좌개설일(created_at)

### 필수 요구 사항

- 고객 목록
   - [x] 목록에서는 활성화 여부, 임직원 계좌 여부를 필터링 할 수 있어야 합니다.
   - [x] 리스트 페이지에서는 검색이 가능해야 합니다.
       - `json-server` 의 Full-text Search API 를 사용하여 구현합니다.
       - 예시 : GET [http://localhost:3000/users?q=South](http://localhost:3000/users?q=South)
   - [x] 페이지네이션이 되어야 합니다.
       - `json-server` 의 Paginate API 를 사용하여 구현합니다.
       - 예시 : GET [http://localhost:3000/users?\\_page=1&\\_limit=20](http://localhost:3000/users?%5C%5C_page=1&%5C%5C_limit=20)
   - [x] 임의로 신규 사용자를 추가할 수 있어야 합니다.
   - [x] 잘못 생성한 사용자를 삭제할 수 있어야 합니다.
   - [x] 개명을 한 사용자를 위해 사용자명을 변경할 수 있어야 합니다.

- 계좌 목록
  - [x] 목록에서는 브로커명, 계좌 활성화 여부, 계좌 상태를 필터링 할 수 있어야 합니다.
  - [x] 리스트 페이지에서는 검색이 가능해야 합니다.
  - [x] 페이지네이션이 되어야 합니다.
  
- 계좌 상세
  - [x] 각 사용자, 계좌의 상세 페이지는 획득 가능한 대부분의 정보를 표시해주시면 됩니다.
  
- 종합
  - [x] Sider 메뉴에서는 현재 보고 있는 화면에 해당하는 메뉴가 하이라이트 되어야 합니다.
  - [ ] 새로고침을 해도 로그인 상태가 유지되어야 하며, 상태에 따라 기존에 머무르던 화면이 그대로 보여야 합니다.
  - [x] 계좌 리스트에서 계좌번호를 누르면 계좌상세 화면으로 이동합니다.
  - [ ] 계좌 리스트에서 사용자 이름을 누르면 사용자 상세로 이동합니다.
  - [x] 사용자 상세에서 사용자의 계좌목록이 보여야 합니다.
  - [x] 계좌 목록에서 각 계좌 상태별로 필터링이 가능해야 합니다.
  - [x] 수익률이 플러스인 계좌의 총자산 금액은 빨간색, 원금과 동일한 경우 검정색, 마이너스일 경우 파란색으로 보여줘야 합니다.
  - [x] 계좌 목록에서 broker_id 에 해당하는 실제 브로커명 (OO투자증권) 이 보여야 합니다.

### 추가 구현 사항

- [ ] brokerFormat.json 의 형식에 맞춘 계좌번호가 표기 (예: 123-123-123123-10)
  
<br />

## 기술스택 & 레포지토리 구조

<br />

![My Skills](https://skillicons.dev/icons?i=git,github,discord,javascript,typescript,react,vscode,vite,figma,stackoverflow,css,html)

 <img src="https://img.shields.io/badge/react-router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">    <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">    <img src="https://img.shields.io/badge/eslint-181717?style=for-the-badge&logo=eslint&logoColor=white">      <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E">     <img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white">     <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react query&logoColor=white"> 

<br />

```jsx
📦src
 ┣ 📂assets
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜AccountIcon.svg
 ┃ ┃ ┣ 📜DashboardIcon.svg
 ┃ ┃ ┣ 📜DecemberIcon.png
 ┃ ┃ ┣ 📜LogoutIcon.svg
 ┃ ┃ ┣ 📜UserIcon.svg
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜logo.png
 ┃ ┗ 📂images
 ┃ ┃ ┗ 📜index.ts
 ┣ 📂components
 ┃ ┣ 📂feature
 ┃ ┃ ┣ 📂AccountGrid
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂CreateUser
 ┃ ┃ ┃ ┣ 📂UserInput
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂UserRadio
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂UserSelect
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂DetailUser
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂UserGridTable
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂UserInfo
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Sidebar
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂shared
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂DropDown
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Pagenation
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂SearchInput
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📜index.ts
 ┣ 📂constants
 ┃ ┣ 📜account.ts
 ┃ ┣ 📜dropDown.ts
 ┃ ┗ 📜zustand.ts
 ┣ 📂core
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📜account.ts
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┣ 📜common.ts
 ┃ ┃ ┣ 📜requester.ts
 ┃ ┃ ┗ 📜user.ts
 ┃ ┗ 📜adminDataConverter.ts
 ┣ 📂hooks
 ┃ ┣ 📜useAccount.ts
 ┃ ┗ 📜useAccountDetail.ts
 ┣ 📂pages
 ┃ ┣ 📂Account
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂AccountDetail
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Board
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Login
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Users
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📜index.ts
 ┣ 📂router
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜privateRouter.tsx
 ┃ ┗ 📜routePath.ts
 ┣ 📂shared
 ┃ ┗ 📂modal
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂types
 ┃ ┗ 📜api.ts
 ┣ 📂utils
 ┃ ┣ 📜accountUtils.ts
 ┃ ┣ 📜dayUtils.ts
 ┃ ┣ 📜isValidArray.ts
 ┃ ┣ 📜makeUUID.ts
 ┃ ┣ 📜numberUtils.ts
 ┃ ┣ 📜sidebarList.ts
 ┃ ┣ 📜storage.ts
 ┃ ┗ 📜useUserStore.ts
 ┣ 📂zustand
 ┃ ┗ 📜useAccountStore.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┗ 📜vite-env.d.ts
```

<br />

## 12팀 소개

| <img src="https://avatars.githubusercontent.com/u/40523487?v=4"/> | <img src="https://avatars.githubusercontent.com/u/50790145?v=4"/> | <img src="https://avatars.githubusercontent.com/u/108744804?v=4"> | <img src="https://avatars.githubusercontent.com/u/97100045?v=4"/> | <img src="https://avatars.githubusercontent.com/u/92246102?v=4"> | <img src="https://avatars.githubusercontent.com/u/96763714?v=4"> |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| <a href="https://github.com/od-log">[팀장] 오다영</a>             | <a href="https://github.com/youngminss">[부팀장] 위영민</a>       | <a href="https://github.com/jong6598">김종현</a>                  | <a href="https://github.com/hopak-e">박상호</a>                   | <a href="https://github.com/forest-6">임승민</a>                 | <a href="https://github.com/kyunghee47">피경희</a>               |

<br />

## 12팀이 동료학습으로 협업하는 방식

1. [Convention Rule](https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/wiki) 을 정의 & 모든 팀원이 실천합니다.

- 1시부터 6시까지는 12팀이 집중해서 작업하는 코어 시간입니다. 멀리 떨어져 있지만 옆에 있는 것처럼 화면을 공유하고 서로 자유롭게 의견을 나누면서 과제를 해결하기 위해 협업합니다.

- 12팀은 git flow 방식으로 개발하고 있습니다. devlop branch에 자신이 작업한 branch를 merge하려면 최소 두 명 이상의 팀원이 리뷰를 하고, 요청을 수락해야 합니다. 그래서 12팀은 pull request 요청이 오는 즉시 12팀의 디스코드에 알람으로, 메일로 각 팀원들에게 전달되어 빠르게 피드백이 가능하면서도 작업하는 branch의 변경사항을 공유할 수 있는 환경을 구성했습니다.

2. 피그잼 or 피그마에서 요구사항을 동료 학습을 기반으로 논의하고 정의합니다.

- [🚀 Assignment 6 - Figjam 요구 사항 분석 보러가기](<https://www.figma.com/file/hgmWqqFFijQVzRfrFWJAvA/Assignment-6---%EB%94%94%EC%85%88%EB%B2%84%EC%95%A4%EC%BB%B4%ED%8D%BC%EB%8B%88(%ED%95%80%ED%8A%B8)?node-id=32%3A8&t=sFvBm5AhAPl77dne-0>)

- [🚀 Assignment 6 - Figma 디자인 프로토타입 보러가기](https://www.figma.com/file/1oFaLIwhk0P3KiAV6faimy/Assignment-6---%EB%94%94%EC%85%88%EB%B2%84%EC%95%A4%EC%BB%B4%ED%8D%BC%EB%8B%88?node-id=0%3A1&t=BjnY2DOqlQmFwCsu-0)
