import { defineStore } from 'pinia'
import * as mqtt from 'mqtt/dist/mqtt'

export const useAuthStore = defineStore('auth', {
    state: () => {
        const defaultState = {
            isAuthenticated: false,
            username: '',
            password: '',
            client: null,
            isErrored: false,
        };

        if (localStorage.getItem('auth')) {
            const authInfo = JSON.parse(localStorage.getItem('auth'))
            return Object.assign(defaultState, authInfo);
        }

        return defaultState;
    },

    actions: {
        persistAuth() {
            localStorage.setItem('auth', JSON.stringify({
                username: this.username,
                password: this.password 
           }))
        },

        setAuthData(username, password) {
            this.username = username
            this.password = password
        },

        setIsErrored(newValue) {
            this.isErrored = newValue
        },

        login() {
            this.isErrored = false;

            this.setClient(
                mqtt.connect("wss://mqtt.verybig.cloud", {
                    username: this.username,
                    password: this.password
                })
            )
        },

        logout() {
            this.setClient(null)
            localStorage.removeItem('auth')

            this.isErrored = false
            this.isAuthenticated = false
            this.username = ''
            this.password = ''
        },

        setClient(newClient) {
            this.client = newClient
        },

        setAuthenticated(newValue) {
            this.isAuthenticated = newValue
            this.persistAuth()
        }
    }

})
