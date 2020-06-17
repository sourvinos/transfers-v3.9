import { TestBed, inject } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CustomerService } from './customer.service'
import { Customer } from './customer'

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

    // it('Should create the service', inject([CustomerService], (service: CustomerService) => {
    //     expect(service).toBeTruthy()
    // }))

    // it('Should get all customers', () => {
    //     const customers = [
    //         { id: 1, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' },
    //         { id: 2, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: false, userId: '' },
    //         { id: 3, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' }
    //     ]
    //     service.getAll().subscribe(customers => {
    //         expect(customers.length).toBe(3)
    //         expect(customers).toEqual(customers)
    //     })
    //     const request = httpMock.expectOne('/api/customers')
    //     expect(request.request.method).toBe('GET')
    //     request.flush(customers)
    // })

    // it('Should get all active customers', () => {
    //     const customers: Customer[] = [
    //         { id: 1, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' },
    //         { id: 3, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' }
    //     ]
    //     service.getAllActive().subscribe(customers => {
    //         expect(customers.length).toBe(2)
    //         expect(customers).toEqual(customers)
    //     })
    //     const request = httpMock.expectOne('/api/customers/getActive')
    //     expect(request.request.method).toBe('GET')
    //     request.flush(customers)
    // })

    // it('Should get a single customer', () => {
    //     const customers: Customer[] = [
    //         { id: 1, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' }
    //     ]
    //     service.getSingle(1).subscribe(customers => {
    //         expect(customers.length).toBe(1)
    //         expect(customers).toEqual(customers)
    //     })
    //     const request = httpMock.expectOne('/api/customers/1')
    //     expect(request.request.method).toBe('GET')
    //     request.flush(customers)
    // })

    // it('Should add a new customer', () => {
    //     const customers: Customer[] = [
    //         { id: 1, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' },
    //         { id: 2, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' }
    //     ]
    //     const newCustomer: Customer = {
    //         id: 3, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: ''
    //     }
    //     service.add(newCustomer).subscribe(() => {
    //         customers.push(newCustomer)
    //         expect(customers.length).toBe(3)
    //     })
    //     const request = httpMock.expectOne('/api/customers')
    //     expect(request.request.method).toBe('POST')
    //     expect(request.request.body).toEqual(newCustomer)
    //     request.flush(newCustomer)
    // })

    it('Should update an existing customer', () => {
        const customers: Customer[] = [
            { id: 3, description: '', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' }
        ]
        service.update(3, { description: 'Updated', profession: '', address: '', phones: '', personInCharge: '', email: '', isActive: true, userId: '' }).subscribe(response => {
            console.log(response)
            const request = httpMock.expectOne('/api/customers/3')
            expect(request.request.method).toBe('PUT')
            // expect(request.request.body).toEqual(updatedCustomer)
            request.flush({ description: 'Updated' })
        })
    })

    afterEach(() => {
        httpMock.verify()
    })

})
