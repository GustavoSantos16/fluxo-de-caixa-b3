import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrenciesService } from './currencies.service';

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrenciesService]
    });
    service = TestBed.inject(CurrenciesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch currency data', () => {
    const dataJson = {
      USDBRL: { code: 'USD', codein: 'BRL', name: 'Dólar Americano/Real Brasileiro', high: '5.25', low: '5.20', varBid: '0.01', pctChange: '0.19', bid: '5.23', ask: '5.24', timestamp: '1623190441', create_date: '2023-07-12 11:00:00' }
    };

    service.getCurrencies('USD-BRL').subscribe(data => {
      expect(data).toEqual(dataJson);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}USD-BRL`);
    expect(req.request.method).toBe('GET');
    req.flush(dataJson);
  });
});
