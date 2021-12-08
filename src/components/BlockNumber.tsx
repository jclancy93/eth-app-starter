import { useEffect, useState } from "react"
import { useBlockNumber } from "../contexts/BlockNumber"

export function BlockNumber() {
    const blockNumber = useBlockNumber()
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (blockNumber) setIsAnimating(true)
        const timeout = setTimeout(() => setIsAnimating(false), 1500)
        
        return () => clearTimeout(timeout);
    }, [blockNumber])

    return (
        <>
            <div className="flex flex-row items-center justify-center md:justify-around">
                <span className={isAnimating ? 'text-center text-green-800 mr-2' : 'text-center text-green-800 mr-2 opacity-75'  }>{blockNumber}</span>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-75" cx="12" cy="12" r="6" fill="green" strokeWidth="2"></circle>
                    {isAnimating && <path className="opacity-75" fill="green" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>}
                </svg>
            </div>
        </>
    )
}