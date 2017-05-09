import Cookies from 'js-cookie'

export default class AuthManager
{
    constructor(delegate)
    {
        this.delegate = delegate

        window.onAmazonLoginReady = () => { 
            amazon.Login.setClientId('amzn1.application-oa2-client.719fc6d00eeb472398cf7aadc73cf21d') 
            amazon.Login.setUseCookie(true)
        }
        require('~/utils/amazon-login')

        // Check for token
        const token = Cookies.get('amazon_Login_accessToken')
        if (token)
        {
            this._fetchProfile(token)
            return
        }

        if (this.delegate)
            this.delegate.didLogin(null)
    }

    login = () =>
    {
        amazon.Login.authorize({ scope: 'profile' }, (response) => {
            if (response.error)
            {
                if (this.delegate)
                    this.delegate.didLogin(null)
                return console.log('AuthManager.login(): error while getting user access token', response.error)
            }
            
            this._fetchProfile(response.access_token)
        })
    };

    logout = () =>
    {
        amazon.Login.logout()
        if (this.delegate)
            this.delegate.didLogout()
    };

    _fetchProfile = (token) =>
    {
        amazon.Login.retrieveProfile(token, (response) => {
            if (response.error)
            {
                if (this.delegate)
                    this.delegate.didLogin(null)
                return console.log('AuthManager._fetchProfile(): error while getting user profile', response.error)
            }

            if (this.delegate)
            {
                this.delegate.didLogin({
                    aaid: response.profile.CustomerId,
                    name: response.profile.Name,
                    email: response.profile.PrimaryEmail
                })
            }
        })
    };
}
