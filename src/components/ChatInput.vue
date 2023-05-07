<template>
    <div class="input-group mb-0">
        <div class="input-group-prepend">
        <span @click="pushMessage(messageText, userState, companionState)"
              class="input-group-text"><i class="fa fa-send"></i></span>
        </div>
        <input
                v-model="messageText"
                @keydown.enter="pushMessage(messageText, userState, companionState)"
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
            companionState: state => state.chat.companion,
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
                this.$store.dispatch("chat/pushMessage", {
                    content: content,
                    sender: sender,
                    recipient: recepiend,
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