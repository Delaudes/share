import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmountPipe } from '../../../amount/presentation/pipes/amount.pipe';
import { ExpenseDraft } from '../../../expense/domain/models/expense-draft';
import { AddExpenseUseCase } from '../../../expense/domain/use-cases/add-expense.use-case';
import { ExpenseComponent } from '../../../expense/presentation/components/expense.component';
import { Payer } from '../../domain/models/payer';
import { DeletePayerUseCase } from '../../domain/use-cases/delete-payer.use-case';

@Component({
  selector: 'app-payer',
  imports: [FormsModule, ExpenseComponent, AmountPipe],
  templateUrl: './payer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayerComponent {
  readonly payer = input.required<Payer>()

  protected expenseName = ''
  protected expenseAmount = 0

  private readonly addExpenseUseCase = inject(AddExpenseUseCase)
  private readonly deletePayerUseCase = inject(DeletePayerUseCase)

  protected async addExpense() {
    const expenseDraft = new ExpenseDraft(this.expenseName, this.expenseAmount, this.payer().id)
    await this.addExpenseUseCase.execute(expenseDraft)
    this.expenseName = ''
    this.expenseAmount = 0
  }

  protected async deletePayer() {
    await this.deletePayerUseCase.execute(this.payer().id)
  }
}
