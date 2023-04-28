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
                            <input v-model="searchQuery" @input="checkInputValue"
                                   @click="clearLeftBar(); showSearch = true"
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
                                    <div @click="showChat = !showChat; chatUser = chat" class="clearfix">
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
                                    <div @click="clearChat(); openChat(followedUser)" class="clearfix">
                                        <img :src="followedUser.image" alt="avatar">
                                        <div class="about">
                                            <div class="name">{{ followedUser.username }}</div>
                                            <div class="status">
                                                <i class="fa fa-circle offline"></i> offline
                                            </div>
                                        </div>
                                        <div>
                                            <button @click="unfollowUser(followedUser)"
                                                    class="btn btn-outline-secondary trash">
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
                                    <div class="name row">
                                        <div class="col-lg-6">Username</div>
                                        <div class="col-lg-6 text-right">
                                            <font-awesome-icon icon="angle-right"/>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="name row">
                                        <div class="col-lg-6">Password</div>
                                        <div class="col-lg-6 text-right">
                                            <font-awesome-icon icon="angle-right"/>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="name row">
                                        <div class="col-lg-6">Image</div>
                                        <div class="col-lg-6 text-right">
                                            <font-awesome-icon icon="angle-right"/>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div @click="clearLeftBar(); showBlockedUsers = true" class="name row">
                                        <div class="col-lg-6">Blacklist</div>
                                        <div class="col-lg-6 text-right">
                                            <font-awesome-icon icon="angle-right"/>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div @click="handleLogout" class="name">Logout</div>
                                </li>
                            </ul>
                        </div>

                        <!-- Blocked Users -->
                        <div v-if="showBlockedUsers">
                            <ul class="list-unstyled chat-list mt-2 mb-0">
                                <li>
                                    <div @click="clearLeftBar(); showSettings = true" class="clearfix row">
                                        <div class="col-lg-6">
                                            <font-awesome-icon icon="angle-left"/>
                                        </div>
                                        <div class="col-lg-6 text-right">Back</div>
                                    </div>
                                </li>
                                <li v-for="blockedUser in blockedUsers" :key="blockedUser.id">
                                    <div class="clearfix">
                                        <img :src="blockedUser.image" alt="avatar">
                                        <div class="about">
                                            <div class="name">{{ blockedUser.username }}</div>
                                            <div class="status">
                                                <i class="fa fa-circle offline"></i> offline
                                            </div>
                                        </div>
                                        <div>
                                            <button @click="unblockUser(blockedUser)"
                                                    class="btn btn-outline-secondary trash">
                                                <font-awesome-icon icon="trash"/>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div class="bar">
                        <div class="col-lg-12 hidden-sm text-center">
                            <button @click="clearLeftBar(); showChatList = true" class="btn"
                                    :class="showChatList ? 'btn-outline-primary' : 'btn-outline-secondary'">
                                <font-awesome-icon icon="message"/>
                            </button>
                            <button @click="clearLeftBar(); showFollowedUsers = true" class="btn"
                                    :class="showFollowedUsers ? 'btn-outline-primary' : 'btn-outline-secondary'">
                                <font-awesome-icon icon="user-friends"/>
                            </button>
                            <button @click="clearLeftBar(); showSettings = true" class="btn"
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
                                        <img :src="chatUser.image" alt="avatar">
                                    </a>
                                    <div class="chat-about">
                                        <h6 class="m-b-0">{{ chatUser.username }}</h6>
                                        <small>Last seen: 2 hours ago</small>
                                    </div>
                                </div>

                                <div v-if="blockedUsers.some(blockedUser => blockedUser.id === chatUser.id)"
                                     class="col-lg-6 text-right">
                                    <div>User is in Blacklist. Do you want to unblock?</div>
                                    <div>
                                        <button @click="unblockUser(chatUser)" class="btn btn-outline-primary contact">
                                            Yes
                                        </button>
                                        <button @click="clearChat()" class="btn btn-outline-secondary contact">
                                            No, close this chat
                                        </button>
                                    </div>
                                </div>

                                <div v-if="!followedUsers.some(followedUser => followedUser.id === chatUser.id) && !blockedUsers.some(blockedUser => blockedUser.id === chatUser.id)"
                                     class="col-lg-6 text-right">
                                    <div>Do you want to add user to Contacts?</div>
                                    <div>
                                        <button @click="followUser(chatUser)" class="btn btn-outline-primary contact">
                                            Yes
                                        </button>
                                        <button @click="blockUser(chatUser)" class="btn btn-outline-secondary contact">
                                            No, block this user
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chat-history">
                            <ul class="m-b-0">
                                <li v-for="(message, index) in messages" :key="index" class="clearfix">
                                    <div class="message-data"
                                         :class="message.sender.id === user.id ? 'text-left' : 'text-right'">
                                        <img v-if="message.sender.id === user.id" :src="message.sender.image"
                                             alt="avatar">
                                        <span class="message-data-time">{{ formattedDate(message.date) }}</span>
                                        <img v-if="message.sender.id !== user.id" :src="message.sender.image"
                                             alt="avatar">
                                    </div>
                                    <div class="message"
                                         :class="message.sender.id === user.id ? 'my-message float-left' : 'other-message float-right'">
                                        {{ message.content }}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="chat-message clearfix">
                            <div class="input-group mb-0">
                                <div class="input-group-prepend">
                                    <span @click="pushMessage(message, user, chatUser)" class="input-group-text"><i
                                            class="fa fa-send"></i></span>
                                </div>
                                <input
                                        :value="message"
                                        @input="message = $event.target.value"
                                        @keydown.enter="pushMessage(message, user, chatUser)"
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
        pushMessage(content, sender, recepiend) {
            if (content.length > 0) {
                this.messages.push({
                    content: content,
                    sender: sender,
                    recepiend: recepiend,
                    date: new Date()
                });
                this.$socket.sendObj({
                    "content": content,
                    "recipientId": recepiend.id
                });
                this.message = "";
            }
        },
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
        unfollowUser(user) {
            UserService.unfollowUser(user.id).then(
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
        unblockUser(user) {
            UserService.unblockUser(user.id).then(
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
            this.showChat = true;
            this.chatUser = user;
            this.message = '';
        },
        clearLeftBar() {
            this.foundUsers = [];
            this.searchQuery = '';
            this.showSearch = false;
            this.searchError = '';
            this.showChatList = false;
            this.showFollowedUsers = false;
            this.showBlockedUsers = false;
            this.showBlacklist = false;
            this.showSettings = false;
        },
        clearChat() {
            this.showChat = false;
            this.chatUser = {};
        },
        formatDate(date) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}-${month}-${day}`;
        },
        formattedDate(date) {
            const now = new Date();
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            const dateFormatted = this.formatDate(date);
            const nowFormatted = this.formatDate(now);
            const yesterdayFormatted = this.formatDate(yesterday);

            let displayDate = '';
            if (dateFormatted === nowFormatted) {
                displayDate = 'Today';
            } else if (dateFormatted === yesterdayFormatted) {
                displayDate = 'Yesterday';
            } else {
                displayDate = date.toLocaleDateString();
            }

            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            return `${formattedHours}:${formattedMinutes} ${ampm}, ${displayDate}`;
        },
    },
    data() {
        return {
            message: {},
            messages: [],
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
            showBlockedUsers: false,
            showBlacklist: false,
            showSettings: false,
            showChat: false,
            chatUser: {},
        };
    },
    mounted() {
        this.$options.sockets.onmessage = (data) => {
            let responseObj = {};
            responseObj = JSON.parse(data.data);

            if (responseObj.content.length > 0) {
                let date;
                date = new Date(responseObj.createdAt * 1000);
                let sender = {};
                sender.id = responseObj.senderId;
                sender.image =
                this.messages.push({
                    content: responseObj.content,
                    sender: responseObj.senderId,
                    recepiend: responseObj.recepiendId,
                    date: date,
                });
            }
            console.log(responseObj);
        };
        UserService.getUser().then(
            response => {
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
        },
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
    text-align: right;
}

.chat .chat-history .other-message:after {
    border-bottom-color: #e8f1f3;
    left: 80%
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