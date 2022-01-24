 function getData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (temp) => {
                body += temp.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
} 
module.exports = { getData };