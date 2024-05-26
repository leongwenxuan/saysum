import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 20,
      },
      logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4285F4',
        position: 'absolute',
        top: 50,
        left: 20,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      budgetInput: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        textAlign: 'center',
        width: '80%',
      },
      nextButton: {
        marginTop: 40,
        backgroundColor: '#4285F4',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 10,
      },
      nextButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
      },

});