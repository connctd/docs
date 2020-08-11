const axios = require("axios")

const clientId = process.env.CONNCTD_CLIENT_ID
const clientSecret = process.env.CONNCTD_CLIENT_SECRET

module.exports.default = (req, res) => {
    axios.post("https://api.connctd.io/oauth2/token", "grant_type=client_credentials&scopes=connctd.things.read%20connctd.units.read", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
    }).then((accessRes) => {
        res.json({
            status: "ok",
            key: accessRes.data.access_token,
        })
    }).catch((err) => {
        res.status(500)
        console.log({ req, err })
        res.json({
            status: "error",
            error: err.message,
        })
    })
}
