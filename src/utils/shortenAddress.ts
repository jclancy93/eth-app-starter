export const shortenAddress = (address: string, num = 4): string | false => {
    if (!address) return '';
    return (
      !!address &&
      `${address.substring(0, num + 2)}...${address.substring(
        address.length - num,
      )}`
    );
  };
  