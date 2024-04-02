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
    // createChat(this.container);
    this.registerEvents();
  }

  bindToDOM() { }

  registerEvents() {
    // Login
    const modalForm = document.querySelector('.modal__footer');
    const modalInput = document.querySelector('.form__input');
    const modalContent = document.querySelector('.modal__content');

    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      createRequest({ name: modalInput.value })
        .then(data => {
          this.currentUserInfo = data;
        })
      this.currentUserName = modalInput.value;
      modalContent.classList.add('hidden');
      createChat(this.container);
      this.ws();
    })

  }

  sendMessage() {
    const chatMessageInput = document.querySelector('.chat__messages-input');
    const chatMessageContainer = document.querySelector('.chat__messages-container');
    chatMessageInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        console.log(e.target.value);
        const p = document.createElement('p');
        p.textContent = e.target.value;
        chatMessageContainer.append(p)
      }
    })
  }

  ws() {
    const ws = new WebSocket('ws://localhost:3000/ws');
    const chatMessageContainer = document.querySelector('.chat__messages-container');
    const chatMessageInput = document.querySelector('.chat__messages-input');
    const chatUserList = document.querySelector('.chat__userlist');
    const closeBtn = document.querySelector('.closeBtn');

    let users = [];

    closeBtn.addEventListener('click', () => {
      ws.close();
    })

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
      console.log('ws open')

      const div = document.createElement('div');
      div.textContent = 'You';
      chatUserList.append(div);
      console.log(users);
      console.log('trash')
      users.forEach((name) => {
        const div = document.createElement('div');
        div.textContent = name;
        chatUserList.append(div);
      })
    })

    ws.addEventListener('close', (e) => {
      console.log(e);

      const message = {
        type: 'exit',
        user: {
          name: 'Sobaka'
        }
      };


      if (!message) return;

      ws.send(JSON.stringify(message));

      console.log('ws close')
    })

    ws.addEventListener('error', (e) => {
      console.log(e);
      console.log('ws error')
    })

    ws.addEventListener('message', (e) => {
      console.log(e);

      const data = JSON.parse(e.data);

      if (data.message) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'messageContainer';
        const message = document.createElement('div');
        const name = document.createElement('div');
        message.textContent = data.message;
        if (this.currentUserInfo.user.name === data.name) {
          name.textContent = 'You';
          messageContainer.classList.add('yourMessageContainer');
          message.className = 'yourMessage';
        } else {
          name.textContent = data.name;
        }
        messageContainer.append(name);
        messageContainer.append(message);
        chatMessageContainer.append(messageContainer);
      }

      // if (Array.isArray(data)) {
      //   data.forEach((el) => {
      //       const div = document.createElement('div');
      //       div.textContent = el.name;
      //       chatUserList.append(div);
      //   })
      // }
      if (!users.includes(this.currentUserName)) {
        users.push(this.currentUserName);
      }

      if (data.length > 0) {
        let lastName = data[data.length - 1].name;
        console.log(lastName);
        console.log('lastname');
        users.push(lastName);
        if (lastName !== this.currentUserName) {
          const div = document.createElement('div');
          div.textContent = lastName;
          chatUserList.append(div);
        }
      }
      // users.forEach((el) => {
      //     const div = document.createElement('div');
      //     div.textContent = el;
      //     chatUserList.append(div);
      // })

      console.log('ws message');

    })
  }

  subscribeOnEvents() { }

  onEnterChatHandler() { }

  sendMessage() { }

  renderMessage() { }
}
