import React, { useState } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    theme,
    CSSReset,
} from "@chakra-ui/core"
import {
    Button, ButtonAppearance, defaultTheme, Input, TextArea,
} from "@connctd/quartz"
import { ThemeProvider } from "emotion-theming"
import { Link } from "gatsby"

function AuthModal({
    isOpen, toggle, setCredentials, defaults,
}) {
    const [appID, setAppID] = useState(defaults.appID)
    const [appSecret, setSecret] = useState(defaults.appSecret)
    const [token, setToken] = useState(defaults.token)
    const [scopes, setScopes] = useState(defaults.scopes)
    const [subjectID, setSubjectID] = useState(defaults.subjectID)

    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Modal isOpen={isOpen} onClose={toggle}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>App Credentials Auth</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ThemeProvider theme={defaultTheme}>
                            <p>
                                To query the GraphQL you first
                                need to have valid App credentials.
                            </p>
                            <p>
                            You can read about our
                                {" "}
                                <Link to="/oauth2">auth flow here</Link>
                            .
                            </p>
                            <br />
                            <p>
                                You can either provide the Client ID and Secret and we will
                                 generate a Token for you or provide your own token.
                            </p>

                            <div className="textAreaFix" style={{ marginTop: 20 }}>
                                <Input value={appID} label="Client ID" onChange={e => setAppID(e.target.value)} />
                                <Input value={appSecret} label="Client Secret" onChange={e => setSecret(e.target.value)} />
                                <h2>App Scopes (1 per line)</h2>
                                <TextArea
                                    value={scopes}
                                    onChange={e => setScopes(e.target.value)}
                                />
                                <br />
                                <h2>Or a valid Token you have generated</h2>
                                <br />
                                <Input value={token} label="Token" onChange={e => setToken(e.target.value)} />
                                <br />
                                <Input label="External Subject ID" value={subjectID} onChange={e => setSubjectID(e.target.value)} />
                            </div>

                        </ThemeProvider>
                    </ModalBody>

                    <ModalFooter>
                        <ThemeProvider theme={defaultTheme}>
                            <Button
                                appearance={ButtonAppearance.secondary}
                                type="submit"
                                onClick={() => {
                                    setCredentials({
                                        appID,
                                        appSecret,
                                        token,
                                        scopes,
                                        subjectID,
                                    })
                                }}
                                text="Save"
                            />
                        </ThemeProvider>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ThemeProvider>
    )
}

export default AuthModal
