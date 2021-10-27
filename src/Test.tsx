import { useEagerConnect } from "./hooks/useEagerConnect";
import { useBlockNumber } from "./contexts/BlockNumber";

export const Test = () => {
  const blockNumber = useBlockNumber()

  useEagerConnect()

  return (
    <>
    <h1>{blockNumber}</h1>
    </>
  )
}