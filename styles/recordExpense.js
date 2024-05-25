import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    marginBottom: 20,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'center',
  },
  monthlyContainerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  monthBox: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    marginRight: 10,
  },
  inactiveMonthBox: {
    backgroundColor: '#f0f0f0',
  },
  monthText: {
    fontSize: 16,
    color: '#fff',
  },
  inactiveMonthText: {
    color: '#000',
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  inactiveAmountText: {
    color: '#000',
  },
  holdButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  holdButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  holdButtonGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  holdText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  list: {
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  category: {
    fontSize: 18,
    color: '#fff',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  indicator: {
    width: 5,
    height: '100%',
    borderRadius: 5,
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    height: 600,
  },
  bottomIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 20,
  },
});