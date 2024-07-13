import { Component, OnInit } from '@angular/core';

interface Transaction {
  description: string;
  value: number;
  type: 'entrada' | 'saida';
  date: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentMonth: Date = new Date();
  transactions: Transaction[] = [];
  description: string = '';
  value: number = 0;
  type: 'entrada' | 'saida' = 'entrada';
  date: string = new Date().toISOString().split('T')[0];
  editIndex: number | null = null;

  ngOnInit() {
    this.loadTransactions();
  }

  get totalEntradas() {
    let total = 0;
    for (let transaction of this.filteredTransactions) {
      if (transaction.type === 'entrada') {
        total += transaction.value;
      }
    }
    return total;
  }

  get totalSaidas() {
    let total = 0;
    for (let transaction of this.filteredTransactions) {
      if (transaction.type === 'saida') {
        total += transaction.value;
      }
    }
    return total;
  }

  get total() {
    return this.totalEntradas - this.totalSaidas;
  }

  get filteredTransactions() {
    return this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === this.currentMonth.getMonth() &&
             transactionDate.getFullYear() === this.currentMonth.getFullYear();
    });
  }

  previousMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.currentMonth = new Date(this.currentMonth); // Forçar a atualização
  }

  nextMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.currentMonth = new Date(this.currentMonth); // Forçar a atualização
  }

  addTransaction() {
    const newTransaction: Transaction = {
      description: this.description,
      value: this.value,
      type: this.type,
      date: this.date
    };

    if (this.editIndex !== null) {
      this.transactions[this.editIndex] = newTransaction;
      this.editIndex = null;
    } else {
      this.transactions.push(newTransaction);
    }

    this.saveTransactions();
    this.description = '';
    this.value = 0;
    this.type = 'entrada';
    this.date = new Date().toISOString().split('T')[0];
  }

  editTransaction(index: number) {
    const transaction = this.transactions[index];
    this.description = transaction.description;
    this.value = transaction.value;
    this.type = transaction.type;
    this.date = transaction.date;
    this.editIndex = index;
  }

  deleteTransaction(index: number) {
    this.transactions.splice(index, 1);
    this.saveTransactions();
  }

  saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  loadTransactions() {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      this.transactions = JSON.parse(savedTransactions);
    }
  }
}
