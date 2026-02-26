## 사용법

- [jsDelivr](https://cdn.jsdelivr.net/gh/hyunbinseo/open-data@master/) 등 CDN 활용
- [npm 패키지](https://docs.npmjs.com/cli/v11/commands/npm-install) 형태로 설치

```shell
# npm install <git remote url>
npm install hyunbinseo/open-data
pnpm install hyunbinseo/open-data
```

## 데이터

[공공데이터 포털 / 한국천문연구원 특일 / 공휴일 정보](https://www.data.go.kr/data/15012690/openapi.do)

```diff
# 2027년 12월 조회
- https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=2027&solMonth=12&_type=json&serviceKey=<key>
+ https://cdn.jsdelivr.net/gh/hyunbinseo/open-data@master/data.go.kr/B090041/getRestDeInfo/2027/12.json
```
