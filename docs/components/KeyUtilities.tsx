import React, { useState, useCallback, useEffect } from "react"
import { Input, SpiNNer } from "@connctd/quartz"
import { VscRefresh } from "react-icons/vsc"
import BeatLoader from "react-spinners/BeatLoader"


export function KeyUtilities() {
    const [key, setkey] = useState("")
    const [pending, setPending] = useState(true)

    const fetchKey = useCallback(() => {
        setPending(true)
        setkey("...")
        fetch("https://docs-pandelis.connctd.vercel.app/api/querykey")
            .then(response => response.json())
            .then((json) => {
                setPending(false)
                setkey(json.key)
            })
            .catch((err) => {
            //eslint-disable-next-line
                console.error(err)
                return err
            })
    }, [key, pending])

    useEffect(() => {
        fetchKey()
    }, [])

    return (
        <div>
            <Input
                readOnly
                icon={pending ? <BeatLoader size={5} margin={0} color="white" /> : <VscRefresh onClick={() => { fetchKey() }} color="white" size="1.5em" />}
                type="text"
                value={key}
            />

            <h3>Using the apollo CLI?</h3>

            <pre className="language-bash">
$ apollo schema:download --endpoint=https://api.connctd.io/api/v1/query --header=&quot;Authorization: Bearer
                {" "}
                {key}
                &quot; connctdSchema.json
            </pre>

            <h4>Generate Types</h4>
            <pre className="language-bash">
$ apollo client:codegen --target=typescript --endpoint=https://api.connctd.io/api/v1/query --header=&quot;Authorization: Bearer
                {" "}
                {key}
                &quot; types
            </pre>
        </div>
    )
}


export default KeyUtilities
