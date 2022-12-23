# 早押しクイズ用アプリ

LAN内で早押しクイズパーティーを行うためのアプリ

## サーバー起動方法

`docker-compose up`

により起動できる。

## アクセス方法

[http://localhost:8080](http://localhost:8080)
にアクセスすることでユーザーとしてログインできる。

ポート開放がされていれば別端末からでもアクセスできる。

## 管理画面

[http://localhost:8080/parent.html](http://localhost:8080/parent.html)

ログの閲覧、解答権のリセット、正解/不正解の提示が行える。

## モニター画面

[http://localhost:8080/monitor.html](http://localhost:8080/monitor.html)

プロジェクター等でモニタリングするための画面。音がなる。<br>
(Chromeでは [Autoplay policy](https://developer.chrome.com/blog/autoplay/) により初期状態では音がならない。適当にクリックするなどしてinterectする必要がある。)
