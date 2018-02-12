<script>

import auth from '../js/auth.js'



export default {

    data() {
			auth.check();
			var userlogname = localStorage.getItem('name');
            return {
                auth: auth
				
            }
			
        },
        methods: {
            signout() {
                auth.signout()
            },
			check2() {
                auth.check2()
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                auth.check2()
            })
        },
		ready() {
			auth.check2()
			var userlogname = localStorage.getItem('name');
		}
		
		
}


</script>

<template>
    <div class="panel panel-default">
        <div class="panel-heading">

			<nav>
				<ul class="list-inline">
				
					<li>
						<router-link :to="{ name: 'home' }">Home</router-link>
					</li>
					<li class="pull-right" v-if="!auth.user.authenticated">
						<router-link :to="{ name: 'register' }">Register</router-link>
					</li>
					<li class="pull-right" v-if="!auth.user.authenticated">
						<router-link :to="{ name: 'signin' }">Sign in</router-link>
					</li>
					<li class="pull-right" v-if="auth.user.authenticated">
						<a href="javascript:void(0)" v-on:click="signout">Sign out</a>
					</li>
					
					<li class="pull-right" v-if="auth.user.authenticated">
						<router-link :to="{ name: 'dashboard' }">Member area </router-link>
					</li>
					<li class="pull-right" v-if="auth.user.authenticated">
						Hi,  	
						<span v-if=auth.user.profile.name>
						Default
					
						{{ auth.user.profile.name }} 
						</span>
						<span v-else>
						After refresh  {{ auth.user.name  }}
						</span>
					
					</li>

					<li class="pull-right" >
						<router-link :to="{ name: 'dashboard' }">  &raquo;  Try Member area Anyway   </router-link>
						<a href="javascript:void(0)" v-on:click="signout"> &raquo; Sign out anyway </a> | 
					</li>
					
				</ul>
			</nav>

        </div>
        <div class="panel-body">
            <router-view></router-view>
        </div>
    </div>
</template>


