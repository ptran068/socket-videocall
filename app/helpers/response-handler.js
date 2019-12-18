export default class ResponseHandler {

    static returnSuccess (res, data) {
        return res.status(200).json({
            data,
            isSuccess: true
        });
    }
    
    static returnError (res, e) {
        console.error(e);
        return res.status(400).json({
            isSuccess: false,
            message: e.message || 'Have error', // Get message from new Error()
            error: e.stack || e
        });
    }

}
