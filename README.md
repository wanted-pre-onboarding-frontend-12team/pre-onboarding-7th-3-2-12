# 원티드 프리온보딩 7차 6차 과제

## 과제 설명

> [Assignment 6](https://www.notion.so/3-3-024ecdae5af6452788a9be19106ebeec) 주제 : 투자 관리 서비스의 관리자 기능 구현

- 진행 기간 : 2022-11-12 ~ 2022-11-18

<br />

## 데모 & 구현 방법

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
	
## 실행 방법

```bash
# Clone Front Repo
git clone https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-2-12.git
```

## 실행 방법


### API 서버 실행 

> 🌟 API 서버가 실행되어야 정상적으로 작동하므로, 필수적으로 선행되어야 합니다.

```
# GoTo JSON-SERVER
cd server

# Install API Server Dependency
npm install

# Run API Server
npm start
```

### 프론트 실행

```bash
# 새로운 터미널 실행
cd client

# Install Front Dependency
yarn install

# Run Front Project
yarn run dev
```

<br />

### 테스트용 아이디

```bash
admin12@email.com
admin12!
```
## 시연 영상
<table>
  <tr>
 <td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/97100045/202550478-eb9f4d19-87ec-4c57-94d5-3404f7d90da6.gif" alt="users" /><p><b> 로그인 및 대시보드 </b></p>
<td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/97100045/202550994-58b7a2df-7f6c-4edd-8d75-0a0bef862cb3.gif" alt="login" /><p><b> 사용자 </b></p>

  </tr>
    <tr>
<td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/97100045/202552356-201d50ae-6dcf-4921-8d6c-c3dbdc966190.gif" alt="login" /><p><b> 사용자 상세 </b></p>
<td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/97100045/202552473-fccd3c03-852c-4fd5-9d6b-20b67acd427b.gif" alt="users" /><p><b> 계좌 목록 </b></p>
  </tr>
      <tr>
<td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/97100045/202552556-5d1b14d6-71cf-4c6f-805c-c6153b2acdd2.gif" alt="login" /><p><b> 사용자 추가1 </b></p>
<td align="center"><img width='98%' height='90%' src="https://user-images.githubusercontent.com/97100045/202552590-d8b0cef9-1393-44e4-99a9-1294f58aef69.gif" alt="users" /><p><b> 사용자 추가2 </b></p>
  </tr>
</table>
## 과제 달성 사항 및 해결 방법

### 필수 구현 범위

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

- 계좌 목록
  - [x] 목록에서는 브로커명, 계좌 활성화 여부, 계좌 상태를 필터링 할 수 있어야 합니다.
  - [x] 리스트 페이지에서는 검색이 가능해야 합니다.
  - [x] 페이지네이션이 되어야 합니다.
  
- 계좌 상세
  - [x] 각 사용자, 계좌의 상세 페이지는 획득 가능한 대부분의 정보를 표시해주시면 됩니다.

### 추가 구현 사항

- 사용자 목록
  - [x] 목록에서는 활성화 여부, 임직원 계좌 여부를 필터링 할 수 있어야 합니다.
  - [x] 리스트 페이지에서는 검색이 가능해야 합니다.
  - [x] 페이지네이션이 되어야 합니다.
  - [x] 임의로 신규 사용자를 추가할 수 있어야 합니다.
  - [x] 잘못 생성한 사용자를 삭제할 수 있어야 합니다.
  - [x] 개명을 한 사용자를 위해 사용자명을 변경할 수 있어야 합니다.
  
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

3. 각자 Best Practice 를 위한 구현 이후, Wiki헤 해당 과정을 정리합니다. (단, Best Practice 구현 방식은 모든 팀원에게 사전 공유합니다.)

- [Member. 오다영 Wiki]()
- [Member. 위영민 Wiki]()
- [Member. 임승민 Wiki]()
- [Member. 박상호 Wiki]()
- [Member. 김종현 Wiki]()
