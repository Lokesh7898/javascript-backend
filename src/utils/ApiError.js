class ApiError extends Error {
    constructor(
        ststusCode,
        message = "Something Went Wrong.",
        errors = [],
        statck = ""
    ){
        super(message)
        this.statusCode = ststusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if(statck){
            this.stack = this.statck
        } else {
            error.captureStackTrace(this, this.constructor)
        }

    }
}

export default ApiError