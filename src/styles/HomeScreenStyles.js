import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  todoList: {
    flexGrow: 1,
    width: '100%',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 18,
    color: '#fff',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#8D6DE5',
    borderColor: '#8D6DE5',
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#8D6DE5',
    borderRadius: 5,
    marginRight: 5,
  },
  addButton: {
    alignContent: "center",
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    padding: 10,
    backgroundColor: '#8D6DE5',
    borderRadius: 10,
    // marginRight: 5,
    height: 40
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'red',
    borderRadius: 5,
    marginRight: 5,
  },
  actionButtonText: {
    color: '#ffffff',
  },
  input: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    color: '#ffffff',
    backgroundColor: '#333',
    width: "90%"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalInput: {
    width: '80%',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    backgroundColor: '#333',
    color: '#ffffff',
  },
  modalButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#8D6DE5',
    borderRadius: 5,
    marginRight: 5,
    marginVertical: 5
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  pageNumber: {
    alignSelf: 'center',
    color: 'white',
    marginHorizontal: 10,
  },
  nextButton: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#8D6DE5',
    borderRadius: 5,
  },
});
