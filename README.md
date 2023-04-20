# 42 ft_transcendence

## 概要

オンライン対戦ゲームやチャットができるwebアプリ

- デモサイト: https://transpong-42-mk.com <br>
  (シークレットウィンドウ or 別ブラウザを使うと、複数ユーザーでログイン可能)
- オンライン2人対戦ゲームPong(卓球ゲーム)
  - 他のユーザーは観戦できる
  - マッチングシステム (ランダム, 招待)
- チャットルーム
  - パスワード付きの部屋を作れる
  - メンバーをBan,Muteなどできる
- 他のユーザーとフレンドになることができ、オンラインステータスが見れるようになる。
- 自分のニックネームやアバター画像を変更したり、2要素認証をon/off できる。
- 5人チーム (全員webアプリの開発は初めて)

## 扱っている技術

- フロントエンド：React、バックエンド：NestJS
- DB：PostgreSQL、ORM：Prisma
- websocketを使ってリアルタイム通信
- OAuth、JWT、2FA を利用した認証
- Jest、Cypress でテスト。
- docker compose CLI を使ってAWS ECS にデプロイ
- GithubActionsを使って、CI/CD。

## 細かいこだわり

バグ対策など。

- ゲーム中、接続切れが起きても、再接続できる。
- 別タブ(１ユーザーが複数ソケット)に対応。
- 多重クリック対策。
- URL直打ち対策。
- ブラウザの戻る進む対策。
- DB操作やAPI叩いたときのエラーハンドリング。
- React18のSuspenseを使い、一時的なコンポーネントを表示。
- React Query で、キャッシュを使用。<br>
  更新が起きた場合、該当するキャッシュを無効化。

## キーワード

`TypeScript`,`React`,`NestJS`,`Vite`,`42API`,`REST API`,`JWT`,`Cookie`,`OAuth2`,`2FA`,`CORS`,`File Upload`,`File Stream`,`PostgreSQL`,`Prisma`,`Socket.IO`,`canvas`,`Swagger`,`docker compose`,`nginx`,`CI/CD`,`Github　Actions`,`Jest`,`Cypress`,`AWS ECS`,`AWS ECR`,`AWS Route53`,`ACM`
