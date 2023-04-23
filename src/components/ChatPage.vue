<template>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>

    <div class="container">

        <div class="row clearfix">
            <div class="col-lg-12">
                <div class="card chat-app">
                    <div id="plist" class="people-list">
                        <!-- Search -->
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-search"></i></span>
                            </div>
                            <input v-model="searchQuery" @input="checkInputValue" @click="clear(); showSearch = true"
                                   type="text" class="form-control" placeholder="Search...">
                        </div>
                        <div v-if="showSearch">
                            <div>
                                <ul class="list-unstyled chat-list mt-2 mb-0">
                                    <li v-for="foundUser in foundUsers" :key="foundUser.id">
                                        <div @click="openChat(foundUser)" class="clearfix">
                                            <img :src="foundUser.image" alt="avatar">
                                            <div class="about">
                                                <div class="name">{{ foundUser.username }}</div>
                                                <div class="status">
                                                    <i class="fa fa-circle offline"></i> online
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="searchError !== '' && searchQuery !== ''">
                                <ul class="list-unstyled chat-list mt-2 mb-0">
                                    <li>
                                        <div class="clearfix">
                                            <div>{{ searchError }}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Chats -->
                        <div v-if="showChatList">
                            <ul class="list-unstyled chat-list mt-2 mb-0">
                                <li v-for="chat in chats" :key="chat.id">
                                    <div @click="showChat = !showChat; chatData = chat" class="clearfix">
                                        <img :src="chat.image" alt="avatar">
                                        <div class="about">
                                            <div class="name">{{ chat.username }}</div>
                                            <div class="status">
                                                <i class="fa fa-circle offline"></i> offline
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <!-- Followed Users -->
                        <div v-if="showFollowedUsers">
                            <ul class="list-unstyled chat-list mt-2 mb-0">
                                <li v-for="followedUser in followedUsers" :key="followedUser.id">
                                    <div class="clearfix">
                                        <img :src="followedUser.image" alt="avatar">
                                        <div class="about">
                                            <div class="name">{{ followedUser.username }}</div>
                                            <div class="status">
                                                <i class="fa fa-circle offline"></i> offline
                                            </div>
                                        </div>
                                        <div>
                                            <button @click="unfollow(followedUser.id)" class="btn btn-outline-secondary trash">
                                                <font-awesome-icon icon="trash"/>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <!--Settings-->
                        <div v-if="showSettings">
                            <ul class="list-unstyled chat-list mt-2 mb-0">
                                <li>
                                    <div class="name">Username</div>
                                </li>
                                <li>
                                    <div class="name">Password</div>
                                </li>
                                <li>
                                    <div class="name">Image</div>
                                </li>
                                <li>
                                    <div class="name">Blacklist</div>
                                </li>
                                <li>
                                    <div @click="handleLogout" class="name">Logout</div>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div class="bar">
                        <div class="col-lg-12 hidden-sm text-center">
                            <button @click="clear(); showChatList = true" class="btn"
                                    :class="showChatList ? 'btn-outline-primary' : 'btn-outline-secondary'">
                                <font-awesome-icon icon="message"/>
                            </button>
                            <button @click="clear(); showFollowedUsers = true" class="btn"
                                    :class="showFollowedUsers ? 'btn-outline-primary' : 'btn-outline-secondary'">
                                <font-awesome-icon icon="user-friends"/>
                            </button>
                            <button @click="clear(); showSettings = true" class="btn"
                                    :class="showSettings ? 'btn-outline-primary' : 'btn-outline-secondary'">
                                <font-awesome-icon icon="user-gear"/>
                            </button>
                        </div>
                    </div>
                    <div v-if="showChat" class="chat">
                        <div class="chat-header clearfix">
                            <div class="row">
                                <div class="col-lg-6">
                                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                        <img :src="chatData.image" alt="avatar">
                                    </a>
                                    <div class="chat-about">
                                        <h6 class="m-b-0">{{ chatData.username }}</h6>
                                        <small>Last seen: 2 hours ago</small>
                                    </div>
                                </div>
                                <div v-if="!followedUsers.some(followedUser => followedUser.id === chatData.id)"
                                     class="col-lg-6 text-right">
                                    <div>Do you want to add {{ chatData.username }} to Contacts?</div>
                                    <div>
                                        <button @click="followUser(chatData)" class="btn btn-outline-primary contact">
                                            Yes
                                        </button>
                                        <button @click="blockUser(chatData)" class="btn btn-outline-secondary contact"
                                                href="javascript:void(0);">No, block this user
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="chat-history">
                            <ul class="m-b-0">
                                <li class="clearfix">
                                    <div class="message-data text-right">
                                        <span class="message-data-time">10:10 AM, Today</span>
                                        <img :src="user.image" alt="avatar">
                                    </div>
                                    <div class="message other-message float-right"> Hi Aiden, how are you? How is
                                        the
                                        project coming
                                        along?
                                    </div>
                                </li>
                                <li class="clearfix">
                                    <div class="message-data">
                                        <span class="message-data-time">10:12 AM, Today</span>
                                    </div>
                                    <div class="message my-message">Are we meeting today?</div>
                                </li>
                                <li class="clearfix">
                                    <div class="message-data">
                                        <span class="message-data-time">10:15 AM, Today</span>
                                    </div>
                                    <div class="message my-message">Project has been already finished and I have
                                        results
                                        to show you.
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="chat-message clearfix">
                            <div class="input-group mb-0">
                                <div class="input-group-prepend">
                                    <span @click="pushMessage(message)" class="input-group-text"><i
                                            class="fa fa-send"></i></span>
                                </div>
                                <input
                                        :value="message"
                                        @input="message = $event.target.value"
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter text here..."
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service';
import EventBus from "../common/EventBus";

export default {
    name: 'ChatPage',
    methods: {
        handleLogout() {
            EventBus.dispatch("logout");
            this.$router.push('/login');
        },
        checkInputValue() {
            if (this.searchQuery.length >= 1) {
                this.searchUser();
            } else {
                this.foundUsers = [];
            }
        },
        searchUser() {
            UserService.searchUser(this.searchQuery).then(
                response => {
                    this.foundUsers = response.data.data;
                    this.searchError = "";
                },
                error => {
                    this.searchError = "Users not found"
                    console.log(error);
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        followUser(user) {
            UserService.followUser(user.id).then(
                response => {
                    console.log(response.data.data);
                    this.user = response.data.data;
                    this.followedUsers = response.data.data.followedUsers;
                    this.blockedUsers = response.data.data.blockedUsers;
                    this.chats = response.data.data.chats;
                },
                error => {
                    console.log(error);
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        blockUser(user) {
            UserService.blockUser(user.id).then(
                response => {
                    console.log(response.data.data);
                    this.user = response.data.data;
                    this.followedUsers = response.data.data.followedUsers;
                    this.blockedUsers = response.data.data.blockedUsers;
                    this.chats = response.data.data.chats;
                },
                error => {
                    console.log(error);
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        openChat(user) {
            this.clear();
            this.showChat = true;
            this.showChatList = true;
            this.chatData = user;
        },
        clear() {
            this.foundUsers = [];
            this.searchQuery = '';
            this.showSearch = false;
            this.searchError = '';
            this.showChatList = false;
            this.showFollowedUsers = false;
            this.showBlacklist = false;
            this.showSettings = false;
        },
    },
    data() {
        return {
            message: '',
            user: {},
            followedUsers: [],
            blockedUsers: [],
            chats: [],
            foundUsers: [],
            searchQuery: '',
            searchError: '',
            showSearch: false,
            showChatList: true,
            showFollowedUsers: false,
            showBlacklist: false,
            showSettings: false,
            showChat: false,
            chatData: {},
        };
    },
    mounted() {
        UserService.getUser().then(
            response => {
                this.user = response.data.data;
                this.followedUsers = response.data.data.followedUsers;
                this.chats = response.data.data.chats;
            },
            error => {
                console.log(error);
                this.content =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                if (error.response && error.response.status !== 200) {
                    EventBus.dispatch("logout");
                    this.$router.push('/login');
                }
            }
        );
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    }
};
</script>

<style scoped>

body {
    background-color: #f4f7f6;
    margin-top: 20px;
}

.card {
    height: 600px;
    background: #fff;
    transition: .5s;
    border: 0;
    margin-bottom: 30px;
    border-radius: .55rem;
    position: relative;
    width: 100%;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}

.bar {
    width: 280px;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 20px;
    z-index: 7;
}

.bar .btn {
    margin: 0 4px;
}

.chat-app .people-list {
    width: 280px;
    position: absolute;
    left: 0;
    top: 0;
    padding: 20px;
    z-index: 7
}

.chat-app .chat {
    margin-left: 280px;
    border-left: 1px solid #eaeaea
}

.people-list {
    -moz-transition: .5s;
    -o-transition: .5s;
    -webkit-transition: .5s;
    transition: .5s
}

.people-list .chat-list li {
    padding: 10px 15px;
    list-style: none;
    border-radius: 3px
}

.people-list .chat-list li:hover {
    background: #efefef;
    cursor: pointer
}

.people-list .chat-list li.active {
    background: #efefef
}

.people-list .chat-list li .name {
    font-size: 15px
}

.people-list .chat-list img {
    width: 45px;
    border-radius: 50%
}

.people-list img {
    float: left;
    border-radius: 50%
}

.people-list .about {
    float: left;
    padding-left: 8px
}

.people-list .status {
    color: #999;
    font-size: 13px
}

.people-list .trash {
    float: right;
    line-height: 0.5;
    margin-left: 5px;
    margin-top: 5px;
}

.chat .chat-header {
    padding: 15px 20px;
    border-bottom: 2px solid #f4f7f6
}

.chat .chat-header .contact {
    line-height: 0.5;
    margin-left: 5px;
}

.chat .chat-header img {
    float: left;
    border-radius: 40px;
    width: 40px
}

.chat .chat-header .chat-about {
    float: left;
    padding-left: 10px
}

.chat .chat-history {
    overflow: auto;
    height: 440px;
    padding: 20px;
    border-bottom: 2px solid #fff;
}

.chat .chat-history ul {
    padding: 0
}

.chat .chat-history ul li {
    list-style: none;
    margin-bottom: 30px
}

.chat .chat-history ul li:last-child {
    margin-bottom: 0px
}

.chat .chat-history .message-data {
    margin-bottom: 15px
}

.chat .chat-history .message-data img {
    border-radius: 40px;
    width: 40px
}

.chat .chat-history .message-data-time {
    color: #434651;
    padding-left: 6px
}

.chat .chat-history .message {
    color: #444;
    padding: 18px 20px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    display: inline-block;
    position: relative
}

.chat .chat-history .message:after {
    bottom: 100%;
    left: 7%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #fff;
    border-width: 10px;
    margin-left: -10px
}

.chat .chat-history .my-message {
    background: #efefef
}

.chat .chat-history .my-message:after {
    bottom: 100%;
    left: 30px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #efefef;
    border-width: 10px;
    margin-left: -10px
}

.chat .chat-history .other-message {
    background: #e8f1f3;
    text-align: right
}

.chat .chat-history .other-message:after {
    border-bottom-color: #e8f1f3;
    left: 93%
}

.chat .chat-message {
    padding: 20px
}

.online,
.offline,
.me {
    margin-right: 2px;
    font-size: 8px;
    vertical-align: middle
}

.online {
    color: #86c541
}

.offline {
    color: #e47297
}

.me {
    color: #1d8ecd
}

.float-right {
    float: right
}

.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0
}

@media only screen and (max-width: 767px) {
    .card {
        height: 465px;
    }

    .chat-app .people-list {
        height: 465px;
        width: 100%;
        overflow-x: auto;
        background: #fff;
        left: -400px;
        display: none
    }

    .chat-app .people-list.open {
        left: 0
    }

    .chat-app .chat {
        margin: 0
    }

    .chat-app .chat .chat-header {
        border-radius: 0.55rem 0.55rem 0 0
    }

    .chat-app .chat-history {
        height: 300px;
        overflow-x: auto
    }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
    .card {
        height: 650px;
    }

    .chat-app .chat-list {
        height: 650px;
        overflow-x: auto
    }

    .chat-app .chat-history {
        height: 600px;
        overflow-x: auto
    }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
    .card {
        height: 480px;
    }

    .chat-app .chat-list {
        height: 480px;
        overflow-x: auto
    }

    .chat-app .chat-history {
        height: calc(100vh - 350px);
        overflow-x: auto
    }
}
</style>