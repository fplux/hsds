import { connect } from 'react-redux';
import { EditExpense } from './EditExpense';

const mapStateToProps = state => ({
  expense: state.data.expense,
});

export const EditExpenseContainer = connect(mapStateToProps)(EditExpense);
