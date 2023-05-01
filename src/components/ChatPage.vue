<template>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>

    <div class="container">
        <div class="row clearfix">
            <div class="col-lg-12">
                <div class="card chat-app">
                    <!-- Sidebar -->
                    <div id="plist" class="people-list">
                        <!-- Search -->
                        <search-input/>
                        <search-list/>
                        <search-item/>

                        <!-- Chats -->
                        <chats-list/>

                        <!-- Followed Users -->
                        <followed-users-list/>

                        <!-- Settings -->
                        <settings-list/>

                        <!-- Blocked Users -->
                        <blocked-users-list/>

                    </div>
                    <div class="bar">
                        <!-- Navbar -->
                        <nav-bar/>
                    </div>
                    <!-- Chat -->
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
                                        :value="messageText"
                                        @input="messageText = $event.target.value"
                                        @keydown.enter="pushMessage(messageText, user, chatUser)"
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

import FollowedUsersList from "@/components/FollowedUsersList.vue";
import BlockedUsersList from "@/components/BlockedUsersList.vue";
import SettingsList from "@/components/SettingsList.vue";
import ChatsList from "@/components/ChatsList.vue";
import NavBar from "@/components/NavBar.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchList from "@/components/SearchList.vue";
import SearchItem from "@/components/SearchItem.vue";

export default {
    name: 'ChatPage',
    components: {
        SearchInput,
        SearchList,
        SearchItem,
        NavBar,
        FollowedUsersList,
        BlockedUsersList,
        SettingsList,
        ChatsList
    },
    data() {
        return {
            messageText: '',
            message: {},
            messages: [],
            chats: [],
            showChat: false,
            chatUser: {},
        };
    },
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
                this.messageText = "";
            }
        },
        handleLogout() {
            EventBus.dispatch("logout");
            this.$router.push('/login');
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
                this.$store.user.user = response.data.data;
                this.$store.user.followedUsers = response.data.data.followedUsers;
                this.$store.user.blockedUsers = response.data.data.blockedUsers;
                this.$store.user.chatUsers = response.data.data.chats;
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
};
</script>

<style>

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