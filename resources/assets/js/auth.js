import Vue from './app.js';
import {router} from './app.js';



export default {
    user: {
        authenticated: false,
        profile: null
    },
    check() {
        let token = localStorage.getItem('id_token')
        if (token !== null) {
            Vue.http.get(
                'api/user?token=' + token,
            ).then(response => {
                this.user.authenticated = true
                this.user.profile = response.data.data
            })
        }
		else{
			
			        router.push({
            name: 'home'
        })
			
		}
		
    },
	
	    check2() {
        let token = localStorage.getItem('id_token')
		let userlogname = localStorage.getItem('name')
		 let loggedemail = localStorage.getItem('email')
		//var  data1= array()
		//data1.push({"name":userlogname,"email":loggedemail}) 
        if (token !== null && userlogname !== null && loggedemail !== null) {
			/*
            Vue.http.get(
                'api/user/info?name='+userlogname,
            ).then(response => {
                this.user.authenticated = true
                this.user.profile = response.data.data
            })
			*/
			 this.user.authenticated = true;
			this.user.profile = {"name":userlogname,"email":loggedemail};
        }
		else{
			
			        router.push({
            name: 'home'
        })
			
		}
		
    },
	
	
    register(context, name, email, password) {
        Vue.http.post(
            'api/register',
            {
                name: name,
                email: email,
                password: password
            }
        ).then(response => {
            context.success = true
        }, response => {
            context.response = response.data
            context.error = true
        })
    },
    signin(context, email, password) {
        Vue.http.post(
            'api/signin',
            {
                email: email,
                password: password
            }
        ).then(response => {
            context.error = false
            localStorage.setItem('id_token', response.data.meta.token)
			localStorage.setItem('name', response.data.data.name)
			localStorage.setItem('email', response.data.data.email)
			
            Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

            this.user.authenticated = true
            this.user.profile = response.data.data

            router.push({
                name: 'dashboard'
            })
        }, response => {
            context.error = true
        })
    },
    signout() {
        localStorage.removeItem('id_token')
		 localStorage.removeItem('name')
		  localStorage.removeItem('email')
        this.user.authenticated = false
        this.user.profile = null

        router.push({
            name: 'home'
        })
    }
}