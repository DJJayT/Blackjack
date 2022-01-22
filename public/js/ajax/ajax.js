class ajax {

    /***
     * Ajax-call
     * @param type
     * @param url
     * @param data
     * @param callback
     * @param callbackData
     * @param callbackObject
     */
    static call(type, url, data, callback, callbackData, callbackObject) {
        $.ajax({
            type: type,
            url : "/hashiwokakero/" + url,
            data: data,
            success: function(response) {
                callback(response, callbackData, callbackObject);
            }
        });
    }
}