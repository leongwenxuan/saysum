import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      button: {
        width: 200,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#fff',
      },
      buttonHovered: {
        backgroundColor: '#4285F4',
      },
      buttonText: {
        fontSize: 18,
        color: '#000',
      },

});