import { connect } from 'react-redux';
import { AddExpense } from './AddExpense';

const mapStateToProps = state => ({
  config: state.data.config
});

export const AddExpenseContainer = connect(mapStateToProps)(AddExpense);
