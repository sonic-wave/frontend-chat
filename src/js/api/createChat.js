export default function createChat(container) {
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat__container';


    // chatArea 

    const chatArea = document.createElement('div');
    chatArea.className = 'chat__area';

    const chatMessageContainer = document.createElement('div');
    chatMessageContainer.className = 'chat__messages-container';

    const chatMessageInput = document.createElement('input');
    chatMessageInput.className = 'chat__messages-input';

    // chatUserList

    const chatUserList = document.createElement('div');
    chatUserList.className = 'chat__userlist';



    chatArea.append(chatMessageContainer);
    chatArea.append(chatMessageInput);
    chatContainer.append(chatUserList);
    chatContainer.append(chatArea);
    
    container.append(chatContainer);
}