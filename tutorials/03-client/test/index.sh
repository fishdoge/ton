del ./temp
npm create vite@latest temp -- --template react-ts
cd temp
npm install
npm install ton ton-core
npm install @orbs-network/ton-access
npm install vite-plugin-node-polyfills
copy ../vite.config.ts .
npm install @tonconnect/ui-react
copy ../src/main.tsx ./src
copy ../src/App.step5.tsx ./src/App.tsx
npm run build
mkdir ./src/contracts
copy ../src/contracts/counter.ts ./src/contracts
mkdir ./src/hooks
copy ../src/hooks/useAsyncInitialize.ts ./src/hooks
copy ../src/hooks/useTonClient.ts ./src/hooks
copy ../src/hooks/useCounterContract.step6.ts ./src/hooks/useCounterContract.ts
copy ../src/App.step6.tsx ./src/App.tsx
npm run build
copy ../src/hooks/useTonConnect.ts ./src/hooks
copy ../src/hooks/useCounterContract.step7.ts ./src/hooks/useCounterContract.ts
copy ../src/App.step7.tsx ./src/App.tsx
copy ../src/index.css ./src
copy ../public/tonconnect-manifest.json ./public
npm run build
npm install @twa-dev/sdk
copy ../src/App.step10.tsx ./src/App.tsx
npm run build