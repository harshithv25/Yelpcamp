module.exports = wrapper => {
    return (req, res, next) => {
        wrapper(req, res, next).catch(next);
    }
}