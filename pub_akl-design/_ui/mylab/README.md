# MyLAB Project

MyLAB 사용자 프로젝트

## HOW TO USE

pnpm is recommended to use.

## Run Dev

```bash
npm i -g pnpm # 최초 한번만 실행
pnpm install
npx msw init public/ --save # msw mock server 설정
pnpm run dev
```

## Run publishing

```bash
npm i -g pnpm # 최초 한번만 실행
pnpm install
pnpm run publishing
```

## Git Contribution submission specification

- `feat` 새로운 기능을 추가
- `fix` 문제/BUG를 수정
- `style` 코드 스타일 관련은 실행 결과에 영향을 주지 않습니다
- `perf` 최적화/성능 향상
- `refactor` 리팩터링
- `revert` 변경 내용을 실행 취소
- `test` 테스트 관련
- `docs` 문서/주석
- `chore` 업데이트/스캐폴드 구성 수정 등에 의존
- `workflow` 워크플로 개선
- `ci` 지속적인 통합
- `mod` 분류의 수정이 확실하지 않음
- `wip` 개발 중
- `types` 형식 수정

## Vue 3 + Typescript + Vite

> This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

> [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Type Support For `.vue` Imports in TS

> Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
