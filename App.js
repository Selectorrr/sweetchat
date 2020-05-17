/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Button, ThemeProvider} from 'react-native-elements';
import {authorize} from 'react-native-app-auth';
import {View} from 'react-native';
import Chat from './Chat';

const AuthorizeResult = React.createContext(null);
const App = () => {
  const [authorizeResult, setAuthorizeResult] = React.useState(null);

  React.useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    startAuth();
  }, []);

  const config = {
    issuer: 'http://192.168.1.44:8080/auth/realms/chat',
    clientId: 'chat',
    redirectUrl: 'com.sweetchat:/callback',
    scopes: ['openid', 'profile'],
    dangerouslyAllowInsecureHttpRequests: true,
  };

  async function startAuth() {
    try {
      let result = await authorize(config);
      setAuthorizeResult(result);
    } catch (e) {
      return startAuth();
    }
  }

  return (
    <ThemeProvider>
      <AuthorizeResult.Provider value={authorizeResult}>
        {!authorizeResult ? (
          <View style={styles.body}>
            <Button
              title="Войти"
              type="clear"
              onPress={startAuth}
              loading={!authorizeResult}
            />
          </View>
        ) : (
          <Chat />
        )}
      </AuthorizeResult.Provider>
    </ThemeProvider>
  );
};

const styles = {
  body: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
export default App;
