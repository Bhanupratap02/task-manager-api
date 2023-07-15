
const error = (errorMsg) => {
    return {
        success: false,
        errorMsg
    }
}

module.exports = error;