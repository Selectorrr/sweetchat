import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

const Chat = () => {
  const [messages, setMessages] = React.useState([]);

  const onSend = function(mes = []) {
    setMessages(GiftedChat.append(messages, mes));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Chat;
