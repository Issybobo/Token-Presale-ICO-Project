// convert time to a more readable format

export const convertTime = (time) => {
    const date = new Date(time);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
}

// convert shorten address to full address

export const shortenAddress = (address) => {
    return `${address.slice(0, 4)}...${address.slice(address.length - 4)}`;
}

