const axios = require("axios")

const clientId = process.env.CONNCTD_CLIENT_ID
const clientSecret = process.env.CONNCTD_CLIENT_SECRET

module.exports.default = (req, res) => {
    if (req.method === "OPTIONS") {
        res.status(200).end()
        return
    }
    axios.post("https://api.connctd.io/oauth2/token", "grant_type=client_credentials&scopes=connctd.things.read%20connctd.units.read", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
    }).then((accessRes) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Methods", "GET")
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        )
        res.json({
            status: "ok",
            key: accessRes.data.access_token,
        })
    }).catch((err) => {
        res.status(500)
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Methods", "GET")
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        )
        console.log({ req, err })
        res.json({
            status: "error",
            error: err.message,
        })
    })
}
