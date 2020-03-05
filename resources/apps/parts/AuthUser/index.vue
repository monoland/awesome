<template>
    <v-img 
        :class="[theme + ' lighten-2', { 'with-backdrop': withBackdrop }]" 
        :src="user.background"  
        :aspect-ratio="showActions ? 4/3 : 16/9"
    >
        <div class="d-flex flex-column align-center justify-center user-select-none" style="height: 100%;">
            <v-avatar color="white" size="64" class="my-3">
                <v-img :src="user.avatar"></v-img>
            </v-avatar>

            <div class="d-flex flex-column align-center">
                <div class="white--text subtitle-2">{{ user.name }}</div>
                <div class="white--text font-nunito caption font-weight-light line-height-1">{{ user.email }}</div>
            </div>

            <div class="d-flex justify-center mt-2" v-if="showActions">
                <v-tooltip nudge-top="-8" top>
                    <template v-slot:activator="{ on }">
                        <v-btn dark icon v-on="on" @click="openRoute(profile)">
                            <v-icon style="font-size: 18px;">perm_identity</v-icon>
                        </v-btn>
                    </template>
                    <span class="text-uppercase">Profile</span>
                </v-tooltip>

                <v-tooltip nudge-top="-8" top>
                    <template v-slot:activator="{ on }">
                        <v-btn dark icon v-on="on" @click="openRoute(password)">
                            <v-icon style="font-size: 18px;">lock</v-icon>
                        </v-btn>
                    </template>
                    <span class="text-uppercase">Password</span>
                </v-tooltip>

                <v-tooltip nudge-top="-8" top>
                    <template v-slot:activator="{ on }">
                        <v-btn dark icon v-on="on" @click="openRoute(notification)">
                            <v-icon style="font-size: 18px;">notifications</v-icon>
                        </v-btn>
                    </template>
                    <span class="text-uppercase">Notification</span>
                </v-tooltip>

                <v-tooltip nudge-top="-8" top>
                    <template v-slot:activator="{ on }">
                        <v-btn dark icon v-on="on" @click="signout">
                            <v-icon style="font-size: 18px;">exit_to_app</v-icon>
                        </v-btn>
                    </template>
                    <span class="text-uppercase">Signout</span>
                </v-tooltip>
            </div>            
        </div>
    </v-img>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'v-auth-user',

    props: {
        profile: {
            type: Object,
            default:() => ({ name: 'moui-profile' })
        },

        password: {
            type: Object,
            default:() => ({ name: 'moui-password' })
        },

        notification: {
            type: Object,
            default:() => ({ name: 'moui-notification' })
        },

        showActions: {
            type: Boolean,
            default: false
        },
    },

    computed: {
        ...mapState(['theme', 'user']),

        withBackdrop: function() {
            if (this.user && this.user.background) {
                return true;
            }

            return false;
        }
    },

    methods: {
        ...mapActions(['getUserInfo', 'signOut']),

        signout: function() {
            this.signOut().then(stores => {
                this.$router.push({ name: 'moui-login' });
                
                this.$nextTick(() => stores.clear());
            });
        },

        openRoute: function(routeObject) {
            if (this.$router.currentRoute.name !== routeObject.name) {
                this.$router.push(routeObject);
            }
        }
    },

    created() {
        this.getUserInfo({ url: '/api/user' });
    }
};
</script>