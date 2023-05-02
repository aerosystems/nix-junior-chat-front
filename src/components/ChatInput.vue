<template>
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
</template>

<script>
export default {
    name: "ChatInput",
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