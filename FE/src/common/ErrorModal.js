import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { RoundButton, Colors } from '../common';

const ErrorModal = ({ error = {}, visible, dispatch }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const closeModal = () => {
    setModalVisible(!modalVisible);
    // dispatch({ type: GLOBAL_ERROR, payload: null });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>ERROR</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyText}>
              Sorry our app is giving error, {error && error.message}
            </Text>
            <Text style={styles.errorCode}>Error Code: 1234</Text>
            <RoundButton
              onPress={closeModal}
              btnStyle={styles.button}
              color="green"
              title="close"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
    height: 200,
    width: '70%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    width: '100%',
    paddingBottom: 8,
    borderBottomColor: Colors.green,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.darkGrey,
  },
  body: {
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.darkGrey,
  },
  errorCode: { margin: 10, color: Colors.darkGrey },
  button: { marginBottom: 0 },
});

export default ErrorModal;
