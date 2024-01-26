
export const requestError = {
    header: "Hold On!",
    message: "Our servers are a bit overwhelmed right now. Take a short breather and try again."
};


export const verifyEmail = {
    header: "Verify Email",
    message: "Check your inbox for verification."
}


export const error = {
    header: "Uh-Oh!",
    message: "Error has Occured..."
};

export const wrongFormat = {
    header: "Uh-Oh!",
    message: "Stock symbols should only contain alphabets."
};
export const notFound = (stock) => {
    return {
        header: "Oops, Vanished!",
        message: `No signs of stock ${stock}. Double-check your spelling and try again!`
    };
};