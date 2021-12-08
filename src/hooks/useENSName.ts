import { namehash } from '@ethersproject/hash'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import { useContractCall } from '.'
import { useDebounce } from './useDebounce'
import ENSRegistrarABI from '../constants/abi/ENSRegistrar.json'
import ENSResolverABI from '../constants/abi/ENSPublicResolver.json'
import { ENS_REGISTRAR_ADDRESSES } from '../constants/addresses'
import { useWeb3React } from '@web3-react/core'


/**
 * Does a reverse lookup for an address to find its ENS name.
 * Note this is not the same as looking up an ENS name to find an address.
 */
export default function useENSName(address?: string): { ENSName: string | null; } {
  const { chainId } = useWeb3React()
  const debouncedAddress = useDebounce(address, 200)
  const ensNodeArgument = useMemo(() => {
    if (!debouncedAddress || !ethers.utils.isAddress(debouncedAddress)) return [undefined]
    return [namehash(`${debouncedAddress.toLowerCase().substr(2)}.addr.reverse`)]
  }, [debouncedAddress])
  const resolverAddress = useContractCall(ensNodeArgument && {
      abi: new ethers.utils.Interface(ENSRegistrarABI),
      // @ts-ignore
      address: ENS_REGISTRAR_ADDRESSES[chainId || 1],
      method: 'resolver', 
      args: [ensNodeArgument[0] ?? ''] 
    })
  const resolverAddressResult = resolverAddress?.[0]
  const name = useContractCall(resolverAddressResult && ensNodeArgument && {
      abi: new ethers.utils.Interface(ENSResolverABI),
      // @ts-ignore
      address: resolverAddressResult,
      method: 'name',
      args: ensNodeArgument
  })
  return {
    ENSName: name?.[0],
  }
}