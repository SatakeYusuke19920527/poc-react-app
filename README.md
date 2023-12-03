# ReAct アプリケーション

## 全体アーキテクチャ

![概要](./assets/react_zentai.png)

1. 人からの質問
2. OpenAI へ質問を投げかける。(この時 OpenAI へ送るプロンプトにツールとして BingSearch が使えることを含める)
3. OpenAI だけでの解答が難しい場合は、BingSearch を使って検索を行い、情報を得る
4. BingSearch から得た情報も含めて再度 OpenAI へ情報を送り、回答の要約を作成する
5. 人へ回答を返す

## 検証方法

1. 以下のボタンより、Azure へリソースを Deploy

![Deploy to Azure](https://aka.ms/deploytoazurebutton)

以下 3 つのリソースが作成されます。

- Azure OpenAI Service
- Bing Search
- Azure Static Web Apps

2. 環境変数ファイルの作成及び、Static Web Apps に環境変数を設定
   .env.loca ファイルを作成し、以下の内容を記載します。

```:md
AZURE_OPENAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AZURE_OPENAI_API_INSTANCE_NAME=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AZURE_OPENAI_API_DEPLOYMENT_NAME=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AZURE_OPENAI_API_VERSION=2023-08-01-preview
AZURE_OPENAI_API_ENDPOINT=https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AZURE_BINGSEARCH_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. Azure Static Web Apps へデプロイ
   Azure へ移動し、Azure Static Web Apps のデプロイ設定へ github の URL を指定し、CI/CD を有効にします。

4. 動作確認
   自動デプロイが完了した後、Azure Static Web Apps の URL へアクセスします。
