import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(
      `${this.namespace}:accesstoken`
    );
    return token ? token : null;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:accesstoken`,
      accessToken
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(
      `${this.namespace}:accesstoken`
    );
  }
}

export default AuthStorage;