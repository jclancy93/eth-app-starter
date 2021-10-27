import { useContractCalls } from "./hooks/useContractCall";
import CompoundEthInterface from "./constants/abi/CETH.json"
import { Interface } from "@ethersproject/abi";
import { useEagerConnect } from "./hooks/useEagerConnect";
import Navbar from "./components/Header";

const address = '0xd6801a1dffcd0a410336ef88def4320d6df1883e'

export const Test = () => {
  const [totalSupply, totalReserveMantissa] = useContractCalls(
    [{
      abi: new Interface(CompoundEthInterface),
      address,
      method: 'getCash',
      args: []
    },
    {
      abi: new Interface(CompoundEthInterface),
      address,
      method: 'totalBorrowsCurrent',
      args: []
    }]
  )
  console.log(+(totalReserveMantissa  || ''), +(totalSupply || ''))

  useEagerConnect()

  return (
    <>
    <Navbar />
    <h1>CETH Total Suply -{+(totalSupply || '')}</h1>
    </>
  )
}