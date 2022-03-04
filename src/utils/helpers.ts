
export const toEther = (library:any,amount: string): string => {
    return library.utils.toWei(amount, "ether");
  };

  export const fromEther = (library:any,amount: string): string => {
    return library.utils.fromWei(amount, "ether");
  };