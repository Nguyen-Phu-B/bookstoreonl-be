class BadRequestError {
    static sendErrorResponse(res, message) {
        return res.status(400).json({ message: message });
    }
}
export default BadRequestError;
