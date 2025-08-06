import './App.css'
import { AllowUSDT } from './components/AllowUSDT'
import TotalSupply from './components/TotalSupply'
import USDTBalance from './components/USDTBalance'
import WalletOptions from './components/WalletOptions'

function App() {

  return (
    <>
      <WalletOptions />
      <TotalSupply />
      <USDTBalance />
      <AllowUSDT />
    </>
  )
}

export default App
