import React, { memo } from "react"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import {
    NavGroup, MenuGroup, MenuArrow,
} from "@connctd/quartz"
import styled from "@emotion/styled"
import { Store, actions } from "./docs-page-layout"

const ProfileImage = styled.img`
    border-radius: 50%;
    height: 33px;
    width: 33px;
    vertical-align: middle;
    margin-left: 10px;
`
const fetchProfile = (dispatch) => {
    dispatch({ type: actions.FETCH_PROFILE })
    // Gatsby is does SSR: https://github.com/gatsbyjs/gatsby/issues/309
    if (typeof window === "undefined") {
        return
    }
    window.fetch("https://api.connctd.io/api/v1/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            query: `
                    query {
                        profile {
                            email
                            image
                        }
                    }
            `,
        }),
    }).then((res) => {
        if (!res.ok) {
            dispatch({ type: actions.NOT_LOGGED_IN })
            return
        }

        res.json().then((json) => {
            if (json.data && json.data.profile) {
                dispatch({ type: actions.SET_PROFILE, payload: json.data.profile })
            } else {
                dispatch({ type: actions.NOT_LOGGED_IN })
            }
        }).catch((e) => {
            dispatch({ type: actions.NOT_LOGGED_IN })
        })
    }).catch((e) => {
        dispatch({ type: actions.NOT_LOGGED_IN })
    })
}

const Profile = memo<{
    state: Store
    dispatch: React.Dispatch<any>
}>(({ state, dispatch }) => {
    if (state.profile.fetched === false
        && state.profile.isLoggedIn === false
        && state.profile.pending === false) {
        fetchProfile(dispatch)
    }

    if (state.profile.isLoggedIn === false || state.profile.fetched === false) {
        return (<></>)
    }
    return (
        <NavGroup>
            <div style={{ marginTop: -3 }}>
                <span>{state.profile.email}</span>
                <ProfileImage src={state.profile.image} />
                <MenuArrow down />
            </div>
            <MenuGroup>
                <OutboundLink href="https://devcenter.connctd.io/account">Account</OutboundLink>
                <OutboundLink href="https://devcenter.connctd.io/logout">Log Out</OutboundLink>
            </MenuGroup>
        </NavGroup>
    )
})

export default Profile
