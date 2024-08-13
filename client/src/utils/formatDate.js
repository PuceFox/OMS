export const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};