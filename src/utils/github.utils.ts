import axios from "axios"

export async function createTokenWithCode(code: string) {
    const endpoint = `https://github.com/login/oauth/access_token?client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}&code=${code}`

    const response = await axios.post(endpoint, {
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })
    const data = response.data

    // get access token
    const accessTokenData = data.split("&")[0]
    const accessToken = accessTokenData.split("=")[1]
    const userData = await getUserEmailandName(accessToken)
    return userData
}

export async function getUserEmailandName(token: string) {
    const endpoint = `https://api.github.com/user`
    const response = await axios.get(endpoint, {
        headers: {
            "Authorization": `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    const { name, email } = response.data
    return {
        name,
        email
    }
}