# AA Starter Zksync

This is a Next.js app where users can send transactions on zkSync, optionally gas-sponsored.

## 🔍 **Prerequisites**

### Node.js & yarn
Before running this application, make sure you have the following installed:
```bash
node --version  # Checks the installed version of Node.js
yarn --version  # Checks the installed version of yarn
```

If you do not have Node.js installed, please install it from [nodejs.org](https://nodejs.org/en/download/package-manager). For example: 

```bash
brew install node
```

If you do not have `yarn` installed, please install it from [yarn installation guide](https://classic.yarnpkg.com/en/docs/install). For example:

```bash
npm install -g yarn
```

## 🎛️ **Setup**

### 1. Create an `.env` file 
Before running this application, copy the `.env.sample` file to a new `.env`, and follow the steps below to configure your environment variables.

> ***Note:*** If you are not deploying a paymaster, remember to comment out the `NEXT_PUBLIC_PAYMASTER_ADDRESS` line in the `.env` file. For more information on deploying a paymaster, see the ["Learn how zkSync Paymasters work" video](https://www.youtube.com/watch?v=Z0y-y9Q9Uvw).

### 2. Alchemy API Key

The [Alchemy API Key](https://docs.alchemy.com/docs/alchemy-quickstart-guide#1-create-an-alchemy-api-key) will allow you to read and write to blockchains through Alchemy’s reliable infrastructure. In this context, the API Key will let you create Embedded Accounts onchain for your users, and send UserOperations on behalf of those accounts.

To create an API Key, go to [https://dashboard.alchemy.com](https://dashboard.alchemy.com), sign up for an account, and go through the onboarding. Then on the [apps](https://dashboard.alchemy.com/apps) page, create an Alchemy app for the zkSync Sepolia network.

Click the API Key button in the top right corner and copy-paste it into the `.env` file of your application as an environment variable called `ALCHEMY_API_KEY`.

### 3. Alchemy Embedded Accounts Config

The Embedded Accounts Config enables magic auth on your app’s domain by configuring the Alchemy Signer, which securely stores the user’s private key in a non-custodial [secure enclave](https://docs.turnkey.com/security/our-approach). It is responsible for authenticating a user via email or passkey using this config, managing a user’s, and signing messages to send UserOperations. Check out the [AlchemySigner docs](https://accountkit.alchemy.com/packages/aa-alchemy/signer/overview.html) for more details.

To create an Embedded Accounts Config, go to the [embedded accounts page](https://dashboard.alchemy.com/accounts) of the Alchemy dashboard and click the “New embedded account” button. Then:

1.  Name your config.
2. Set `http://localhost:3000` as the redirect URL. NextJS apps by default are hosted locally at port 3000, and you will want to direct the user back to the URL where your application is hosted to authenticate them.
3. [optional] Customize the logo, “Sign In” button color, and support URL of the email.
4. Apply this config to the Alchemy App you created in the previous step. Doing this will allow you send requests to Alchemy Signer via the Account Kit SDKs you installed before.

## 🏃 Run Locally @ [http://localhost:3000](http://localhost:3000)

```bash
yarn
yarn dev
```
> **Note**: Ensure your `.env` has a value for `ALCHEMY_API_KEY`.
