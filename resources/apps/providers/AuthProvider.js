import * as CryptoJS from 'crypto-js';
import WebStorage from 'secure-web-storage';
import { siteKey, secretKey } from '@apps/.env.js';

class AuthProvider
{
    constructor()
    {
        this.siteKey = siteKey;
        this.secretKey = secretKey;

        this.store = new WebStorage(localStorage, {
            hash: function hash(key) {
                key = CryptoJS.SHA256(key, secretKey);
        
                return key.toString();
            },

            encrypt: function encrypt(data) {
                data = CryptoJS.AES.encrypt(data, secretKey);
        
                data = data.toString();
        
                return data;
            },

            decrypt: function decrypt(data) {
                data = CryptoJS.AES.decrypt(data, secretKey);
        
                data = data.toString(CryptoJS.enc.Utf8);
        
                return data;
            }
        });        
    }

    get user()
    {
        return this.store.getItem('user');
    }

    set user(response)
    {
        if (!response) {
            return;
        }

        this.store.setItem('user', response);
    }

    get baseURL()
    {
        return this.store.getItem('base_url');
    }

    set baseURL(baseURL)
    {
        if (!baseURL) return;

        this.store.setItem('base_url', baseURL);
    }

    get menus()
    {
        return this.store.getItem('menus');
    }

    set menus(menus) 
    {
        if (!menus) return;

        this.store.setItem('menus', menus);
    }

    get registed()
    {
        return this.store.getItem('registed');
    }

    set registed(registed) 
    {
        if (!registed) return;

        this.store.setItem('registed', registed);
    }

    get token()
    {
        if (!this.store.getItem('token') || this.store.getItem('token').token_type === null) {
            return null;
        }

        return this.store.getItem('token').token_type + ' ' + this.store.getItem('token').access_token;
    }

    set token(response)
    {
        if (!response) return;

        this.store.setItem('token', response);
        this.store.setItem('token_create_at', Date.now());
    }

    get csrf() 
    {
        return (document.head.querySelector('meta[name="csrf-token"]')).content;
    }

    get expired() 
    {
        let minute = parseInt((Date.now() - parseInt(this.store.getItem('token_create_at'))) / 1000);
        let expire = parseInt(this.store.getItem('token').expires_in);

        return minute >= expire;
    }

    get check() 
    {
        if (!this.store.getItem('token')) {
            return false;
        }

        return !!this.store.getItem('token').access_token && !this.expired;
    }

    get logged() 
    {
        return this.store.getItem('token') !== null;
    }

    clear()
    {
        this.store.clear();
    }
}

export default new AuthProvider();