import ChatService from '@/services/chat.service';
export const chat = {
    namespaced: true,
    state: {
        messages: [],
        historyMessages: [],
        companion: {},
    },
    actions: {
        setCompanion({commit}, companion) {
            commit('setCompanion', companion);
        },
        clearChat({commit}) {
            commit('clearChat', {});
        },
        pushMessage({commit}, {content, sender, recepiend}) {
            commit('pushMessage', {content, sender, recepiend});
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
        pushMessage(state, {content, senderId, recepiendId}) {
            const currentDate = new Date();
            const unixTimestamp = currentDate.getTime() / 1000;
            state.messages.push({
                content: content,
                senderId: senderId,
                recepiendId: recepiendId,
                createdAt: unixTimestamp,
            });
        },
        getHistoryMessages(state, {senderId, recipientId}) {
            ChatService.getMessages(senderId, recipientId).then(
                response => {
                    state.historyMessages = response.data.data;
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