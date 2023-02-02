import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

const Example = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <View>
      <TouchableOpacity style={styles.selectedOptionContainer} onPress={toggleModal}>
        <Text style={styles.selectedOptionText}>{selectedOption.label}</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.modalOptionContainer}
              onPress={() => {
                setSelectedOption(option);
                toggleModal();
              }}
            >
              <Text style={styles.modalOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedOptionContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    margin:20
  },
  selectedOptionText: {
    fontSize: 18,
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    margin:30
  },
  modalOptionContainer: {
    padding: 10,
  },
  modalOptionText: {
    fontSize: 18,
  },
});

export default Example;
