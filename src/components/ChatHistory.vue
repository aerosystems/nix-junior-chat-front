<template>
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
</template>

<script>
export default {
    name: "ChatHistory",
    methods: {
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

}
</script>

<style lang="scss" scoped>

</style>