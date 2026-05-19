import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MOCK_ABASTECIMENTOS } from '../data/mock-abastecimentos';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { abastecimentos: MOCK_ABASTECIMENTOS };
  }
}
