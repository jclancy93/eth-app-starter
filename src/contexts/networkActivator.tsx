import { NetworkConnector } from '@web3-react/network-connector'
import { useEffect } from 'react'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core'
import { CONFIG } from '../config/chainConfig'

export function NetworkActivator() {
  const { activate, account, chainId: connectedChainId, active, connector } = useWeb3React()
  const { supportedChains, readOnlyChainId, readOnlyUrls } = CONFIG

  useEffect(() => {
    const eagerConnect = async () => {
      const injected = new InjectedConnector({ supportedChainIds: supportedChains })
      if (await injected.isAuthorized()) {
        activate(injected)
      }
    }
    eagerConnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (readOnlyChainId && readOnlyUrls) {
      if (!active || (connector instanceof NetworkConnector && connectedChainId !== readOnlyChainId)) {
        activate(new NetworkConnector({ defaultChainId: readOnlyChainId, urls: readOnlyUrls || [] }))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readOnlyChainId, readOnlyUrls, active, account, connectedChainId, connector])

  return null
}