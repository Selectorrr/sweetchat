/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {authorize} from 'react-native-app-auth';

class App extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    const config = {
      issuer: 'http://192.168.1.44:8080/auth/realms/chat',
      clientId: 'chat',
      redirectUrl: 'com.sweetchat:/callback',
      scopes: ['openid', 'profile'],
      dangerouslyAllowInsecureHttpRequests: true,
    };

    // // Refresh token
    // const refreshedState = await refresh(config, {
    //   refreshToken: authState.refreshToken,
    // });

    authorize(config)
      .then(result => {
        // result includes accessToken, accessTokenExpirationDate and refreshToken

        this.setState({
          messages: [
            {
              _id: 1,
              text: JSON.stringify(result),
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Success',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ],
        });
      })
      .catch(error => {
        this.setState({
          messages: [
            {
              _id: 1,
              text: JSON.stringify(error),
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Error',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ],
        });
      });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return this.state.messages.length ? (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    ) : null;
  }
}

export default App;
