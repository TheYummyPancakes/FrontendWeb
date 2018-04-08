var axios = require('axios');
const URL = "http://localhost:8080/sendData"
const ServerURL = "https://hidden-atoll-44842.herokuapp.com/example";
module.exports = {
    getTest: function () {
        return axios.get(ServerURL)
            .then(function (response) {
                return response;
            });
    },
    sendData: function(data) {
        return axios.post(URL, data)
            .then(function (res){
                return res;
            });
    },
    sendPicture: function(data) {
        return axios.post(URL, data)
            .then(function (res){
                return res;
            });
    }
}