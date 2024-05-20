import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    color: '#ffffff',
    backgroundColor: '#333',
  },
  button: {
    backgroundColor: '#8D6DE5',
    padding: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 20,
    alignItems: "center"
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
