import ChatService from '@/services/chat.service';
export const chat = {
    namespaced: true,
    state: {
        messages: [],
        companion: {},
    },
    actions: {
        setCompanion({commit}, companion) {
            commit('setCompanion', companion);
        },
        clearChat({commit}) {
            commit('clearChat', {});
        },
        pushMessage({commit}, {content, sender, recipientId}) {
            commit('pushMessage', {content, sender, recipientId});
        },
        getHistoryMessages({commit}, {senderId, recipientId}) {
            commit('getHistoryMessages', {senderId, recipientId});
        }
    },
    mutations: {
        setCompanion(state, companion) {
            state.companion = companion;
        },
        clearChat(state) {
            state.messages = [];
            state.companion = {};
        },
        pushMessage(state, {content, sender, recipientId}) {
            const currentDate = new Date();
            const unixTimestamp = currentDate.getTime() / 1000;
            state.messages.push({
                content: content,
                sender: sender,
                senderId: sender.id,
                recipientId: recipientId,
                createdAt: unixTimestamp,
            });
        },
        getHistoryMessages(state, {senderId, recipientId}) {
            ChatService.getMessages(senderId, recipientId).then(
                response => {
                    state.messages = response.data.data.sort((a, b) => {
                        return a.id > b.id ? 1 : -1;
                    });
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            )
        }
    }
}