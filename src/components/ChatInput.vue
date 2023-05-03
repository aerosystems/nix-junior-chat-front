<template>
    <div class="input-group mb-0">
        <div class="input-group-prepend">
        <span @click="pushMessage(messageText, userState, chatUserState)"
              class="input-group-text"><i class="fa fa-send"></i></span>
        </div>
        <input
                v-model="messageText"
                @keydown.enter="pushMessage(messageText, userState, chatUserState)"
                type="text"
                class="form-control"
                placeholder="Enter text here..."
        >
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "ChatInput",
    computed: {
        ...mapState({
            userState: state => state.user.user,
            chatUserState: state => state.ui.chatUser,
        }),
    },
    data() {
        return {
            messageText: "",
        }
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
    }

}
</script>

<style lang="scss" scoped>

</style>