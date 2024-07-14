import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a transaction', () => {
    component.description = 'Teste Entrada';
    component.value = 1000.00;
    component.type = 'entrada';
    component.date = '2024-07-12';
    component.addTransaction();

    expect(component.transactions.length).toBe(1);
    expect(component.transactions[0].description).toBe('Teste Entrada');
    expect(component.transactions[0].value).toBe(1000);
    expect(component.transactions[0].type).toBe('entrada');
    expect(component.transactions[0].date).toBe('2024-07-12');
  });

  it('should filter transactions by month and year', () => {
    component.transactions = [
      { description: 'Entrada 1', value: 1000, type: 'entrada', date: '2024-07-01' },
      { description: 'Saída 1', value: 500, type: 'saida', date: '2024-07-02' },
      { description: 'Entrada 2', value: 2000, type: 'entrada', date: '2024-06-01' }
    ];

    component.currentMonth = new Date('2024-07-01');
    const filteredTransactions = component.filteredTransactions;

    expect(filteredTransactions.length).toBe(2);
    expect(filteredTransactions[0].description).toBe('Entrada 1');
    expect(filteredTransactions[1].description).toBe('Saída 1');
  });
});
