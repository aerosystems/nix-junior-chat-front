import api from './api';

class ChatService {
    getMessages(senderId, recipientId) {
        return api.get(`/v1/messages?senderId=${senderId}&recipientId=${recipientId}`);
    }
}
export default new ChatService();