import ApiClient from "./ApiClient";

export interface ChatRequest{
    question: string,
    answerLanguage: string,
    history: string,
    chat_type: string,
    extra_param: string,
    personality_prompt: string,
    userConfirmedPersonalDataProcessing: boolean
}


export default class ChatApiClient extends ApiClient {
    public chatWithChatbot = async (chatbotId: string, chatRequest: ChatRequest,
                                    onClose: (lastChunkReceived: string) => void): Promise<void> => {
        return this.postStream(`/chatbot/${chatbotId}/chat`, chatRequest, onClose);
    }
}
