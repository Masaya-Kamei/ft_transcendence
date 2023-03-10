# 42 ft_transcendence

## 概要

オンライン対戦ゲームやチャットができるwebアプリ

- デモサイト: https://transpong-42-mk.com <br>
  (シークレットウィンドウ or 別ブラウザを使うと、複数ユーザーでログイン可能)
- React + NestJS
- OAuth2を利用した認証
- ワンタイムパスワードによる二要素認証
- websocketを使ってリアルタイム通信
- オンライン2人対戦ゲームPong
  - 他のユーザーは観戦できる
  - マッチングシステム (ランダム, 招待)
- チャットルーム
  - パスワード付きの部屋を作れる
  - メンバーをBan,Muteなどできる
- DB, API 設計
  - プロフィール,フレンド,チャット,対戦記録など
- docker compose CLI を使ってAWS ECS にデプロイ
- GithubActionsを使ってCI/CD
- 5人チーム (全員webアプリの開発は初めて)

## キーワード

`TypeScript`,`React`,`NestJS`,`Vite`,`42API`,`REST API`,`JWT`,`Cookie`,`OAuth2`,`2FA`,`CORS`,`File Upload`,`File Stream`,`PostgreSQL`,`Prisma`,`Socket.IO`,`canvas`,`Swagger`,`docker compose`,`nginx`,`CI/CD`,`Github　Actions`,`Jest`,`Cypress`,`AWS ECS`,`AWS ECR`,`AWS Route53`,`ACM`
     
