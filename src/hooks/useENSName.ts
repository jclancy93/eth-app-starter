import { namehash } from '@ethersproject/hash'
import { ethers } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { useChainCall, useContractCall } from '.'
import { useDebounce } from './useDebounce'
import ENSRegistrarABI from '../constants/abi/ENSRegistrar.json'
import ENSResolverABI from '../constants/abi/ENSPublicResolver.json'
import { ENS_REGISTRAR_ADDRESSES } from '../constants/addresses'
import { useWeb3React } from '@web3-react/core'


/**
 * Does a reverse lookup for an address to find its ENS name.
 * Note this is not the same as looking up an ENS name to find an address.
 */
export default function useENSName(): { ENSName: string | null; } {
  const [name, setName] = useState<string | null>(null);
  const { chainId, library, account } = useWeb3React()
  const debouncedAddress = useDebounce(account, 200)

  useEffect(() => {
    library?.lookupAddress(account)
      .then((n: string) => setName(n))
      .catch((err: any) => setName(null))
  }, [library, account, chainId])

  return {
    ENSName: name
  }
}