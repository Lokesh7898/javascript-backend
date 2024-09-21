class ApiResponse {
    constructor(
        statusCode,
        data,
        message = 'Success'
    ) {
        this.ststusCode = statusCode
        this.data = data
        this.message = message
        this.success = this.ststusCode < 400
    }
}

export { ApiResponse }