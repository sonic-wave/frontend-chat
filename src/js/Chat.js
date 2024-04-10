import ChatAPI from "./api/ChatAPI";
import createModal from "./api/createModal";
import createChat from "./api/createChat";
import createRequest from "./api/createRequest";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI();
    this.websocket = null;
  }

  init() {
    createModal(this.container);
    this.registration();
  }

  bindToDOM() { }

  registration() {
    // Login
    const modalForm = document.querySelector('.modal__footer');
    const modalInput = document.querySelector('.form__input');
    const modalContent = document.querySelector('.modal__content');

    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      createRequest({ name: modalInput.value })
        .then(data => {
          if (data.status === 'ok') {
            this.currentUserName = modalInput.value;
            modalContent.classList.add('hidden');
            createChat(this.container);
            this.ws();
          }
          if (data.status === 'error') {
            alert(data.message);
            modalInput.value = '';
          }
        })
    })

  }

  ws() {
    const ws = new WebSocket('wss://https://backend-chat-gov0.onrender.com/ws');
    const chatMessageContainer = document.querySelector('.chat__messages-container');
    const chatMessageInput = document.querySelector('.chat__messages-input');
    const chatUserList = document.querySelector('.chat__userlist');

    chatMessageInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {

        const message = {
          type: 'send',
          message: chatMessageInput.value,
          name: this.currentUserName,
        };

        if (!message) return;

        ws.send(JSON.stringify(message));

        chatMessageInput.value = '';
      }
    })

    ws.addEventListener('open', (e) => {
      console.log(e);
      console.log('ws open');

    })

    ws.addEventListener('close', (e) => {
      console.log(e);

      console.log('ws close')
    })

    window.addEventListener('beforeunload', () => {
      if (ws.readyState === WebSocket.OPEN) {
        const exitMessage = JSON.stringify({
          type: 'exit',
          user: { name: this.currentUserName }
        });
        ws.send(exitMessage);
      }
    });

    ws.addEventListener('error', (e) => {
      console.log(e);
      console.log('ws error')
    })

    ws.addEventListener('message', (e) => {
      console.log(e);

      const data = JSON.parse(e.data);

      console.log(data);

      if (data.type !== 'send') {
        chatUserList.innerHTML = '';

        data.forEach(user => {
          const userName = document.createElement('div');
          if (this.currentUserName === user.name) {
            userName.textContent = 'You';
            userName.classList.add('yourMessageName');

          } else {
            userName.textContent = user.name;
            userName.classList.add('messageName');
          }
          chatUserList.append(userName);
        })
      }

      if (data.type === 'send') {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'messageContainer';
        const message = document.createElement('div');
        const name = document.createElement('div');
        message.textContent = data.message;
        if (this.currentUserName === data.name) {
          name.textContent = 'You';
          name.classList.add('yourMessageName');
          messageContainer.classList.add('yourMessageContainer');
          message.className = 'yourMessage';
        } else {
          name.textContent = data.name;
          name.classList.add('messageName');
        }
        messageContainer.append(name);
        messageContainer.append(message);
        chatMessageContainer.append(messageContainer);
      }

      console.log('ws message');

    })
  }

  subscribeOnEvents() { }

  onEnterChatHandler() { }

  sendMessage() { }

  renderMessage() { }
}
