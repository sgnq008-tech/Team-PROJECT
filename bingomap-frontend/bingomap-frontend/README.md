# BinGo Map 프론트엔드 시연

VS Code로 바로 열어서 확인할 수 있는 순수 HTML/CSS/JS 프로젝트입니다. (Spring Boot 등 서버 없이 동작해요)

```
bingomap-frontend/
├─ index.html      ← 페이지 구조
├─ css/style.css   ← 디자인
└─ js/script.js    ← 지도·필터·탭·모달 동작
```

## VS Code에서 실행하는 방법

1. VS Code에서 `bingomap-frontend` 폴더를 엽니다. (파일 > 폴더 열기)
2. 왼쪽 확장(Extensions) 탭에서 **Live Server**를 검색해 설치합니다.
3. `index.html` 파일을 열고, 편집 화면에서 마우스 오른쪽 클릭 → **Open with Live Server**를 누릅니다.
4. 브라우저가 자동으로 열리면서 페이지가 실행됩니다. 이후 코드를 수정하고 저장하면 브라우저가 자동으로 새로고침됩니다.

Live Server 없이 그냥 `index.html`을 더블클릭해서 브라우저로 열어도 대부분 기능은 동작하지만, Live Server를 쓰면 팀원들과 수정사항을 실시간으로 확인하기 편합니다.
