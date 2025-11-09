import { Expense } from "../../../expense/domain/models/expense"

export class Payer {
    constructor(readonly id: string, readonly name: string, readonly expenses: Expense[]) { }

    is(payerId: string): boolean {
        return this.id === payerId
    }

    addExpense(expense: Expense) {
        this.expenses.push(expense)
    }

    deleteExpense(expenseId: string) {
        const index = this.expenses.findIndex((expense) => expense.is(expenseId))
        if (index === -1) return
        this.expenses.splice(index, 1)
    }

    calculateTotalExpenses(): number {
        return this.expenses.reduce((sum, expense) => {
            return sum + expense.amount
        }, 0)
    }

    calculateDifference(averageExpenses: number): number {
        return this.calculateTotalExpenses() - averageExpenses
    }

    clearExpenses(): Payer {
        return new Payer(this.id, this.name, [])
    }
}