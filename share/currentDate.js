module.exports = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return currentDate = `${day}-${month}-${year}`;
}

