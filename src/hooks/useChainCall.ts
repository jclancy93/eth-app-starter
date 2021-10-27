import { useContext, useEffect, useMemo } from 'react'
import { ChainCall } from '../contexts/ChainState/callsReducer'
import { ChainStateContext } from '../contexts/ChainState/context'
import { Falsy } from '../types'

export function useChainCalls(calls: (ChainCall | Falsy)[]) {
  const { dispatchCalls, value } = useContext(ChainStateContext)

  useEffect(() => {
    const filteredCalls = calls.filter(Boolean) as ChainCall[]
    dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls })
    return () => dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(calls), dispatchCalls])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => calls.map((call) => call && value?.state?.[call.address]?.[call.data]), [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(calls),
    value,
  ])
}

export function useChainCall(call: ChainCall | Falsy) {
  return useChainCalls([call])[0]
}