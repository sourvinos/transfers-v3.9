import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { Customer } from './customer'
import { CustomerService } from './customer.service'

describe('CustomerService', () => {

    let service: CustomerService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CustomerService]
        })
        service = TestBed.get(CustomerService)
        httpMock = TestBed.get(HttpTestingController)
    })

    it('Get all customers', () => {
        const customers = [
            { id: 1, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' },
            { id: 2, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: false, userId: '' },
            { id: 3, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' }
        ]
        service.getAll().subscribe(customers => {
            expect(customers.length).toEqual(3)
            expect(customers).toEqual(customers)
        })
        const request = httpMock.expectOne('/api/customers')
        expect(request.request.method).toEqual('GET')
        request.flush(customers)
    })

    it('Get all active customers', () => {
        const customers: Customer[] = [
            { id: 1, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' },
            { id: 3, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' }
        ]
        service.getAllActive().subscribe(customers => {
            expect(customers.length).toEqual(2)
            expect(customers).toEqual(customers)
        })
        const request = httpMock.expectOne('/api/customers/getActive')
        expect(request.request.method).toEqual('GET')
        request.flush(customers)
    })

    it('Get a single customer', () => {
        const customers: Customer[] = [
            { id: 1, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' }
        ]
        service.getSingle(1).subscribe(customers => {
            expect(customers.length).toEqual(1)
            expect(customers).toEqual(customers)
        })
        const request = httpMock.expectOne('/api/customers/1')
        expect(request.request.method).toEqual('GET')
        request.flush(customers)
    })

    it('Add a new customer', () => {
        const customers: Customer[] = [
            { id: 1, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' },
            { id: 2, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' }
        ]
        const newCustomer: Customer = {
            id: 3, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: ''
        }
        service.add(newCustomer).subscribe(() => {
            customers.push(newCustomer)
            expect(customers.length).toEqual(3)
        })
        const request = httpMock.expectOne('/api/customers')
        expect(request.request.method).toEqual('POST')
        expect(request.request.body).toEqual(newCustomer)
        request.flush(newCustomer)
    })

    it('Update an existing customer', () => {
        service.update(1, { description: 'Updated description' }).subscribe((data: any) => {
            expect(data.description).toEqual('Updated description')
        })
        const request = httpMock.expectOne('/api/customers/1')
        expect(request.request.method).toEqual('PUT')
        request.flush({ description: 'Updated description' })
    })

    it('Delete an existing customer', () => {
        service.delete(1).subscribe((data: any) => {
            expect(data).toEqual(1)
        })
        const request = httpMock.expectOne('/api/customers/1')
        expect(request.request.method).toEqual('DELETE')
        request.flush(1)
    })

    afterEach(() => {
        httpMock.verify()
    })

})
