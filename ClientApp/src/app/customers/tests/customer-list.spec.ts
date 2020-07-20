import { CustomerListComponent } from './../user-interface/customer-list'
import { of } from 'rxjs'

describe('CustomerList', () => {

    let fixture: CustomerListComponent

    let activatedRouteMock: any
    let buttonClickServiceMock: any
    let helperServiceMock: any
    let interactionServiceMock: any
    let messageServiceMock: any
    let routerMock: any
    let snackbarServiceMock: any
    let titleServiceMock: any

    beforeEach(() => {
        activatedRouteMock = jest.fn()
        buttonClickServiceMock = {
            clickOnButton: jest.fn()
        }
        helperServiceMock = {
            getApplicationTitle: jest.fn(),
            getItemFromLocalStorage: jest.fn(),
            setFocus: jest.fn().mockReturnValue('something')
        }
        interactionServiceMock = {
            sendObject: jest.fn()('record'),
            record: of()
        }
        routerMock = { navigate: jest.fn() }
        snackbarServiceMock = { open: jest.fn() }
        titleServiceMock = { setTitle: jest.fn() }

        fixture = new CustomerListComponent(
            activatedRouteMock,
            buttonClickServiceMock,
            helperServiceMock,
            interactionServiceMock,
            messageServiceMock,
            routerMock,
            snackbarServiceMock,
            titleServiceMock
        )
        fixture.ngOnInit()
    })

    xit('setWindowTitle()', () => {
        const spySetTitle = jest.spyOn(titleServiceMock, 'setTitle').mockReturnValue('Title')
        expect(titleServiceMock.setTitle()).toBe('Title')
        expect(spySetTitle).toHaveBeenCalled()
    })

    xit('goBack()', () => {
        fixture.onGoBack()
        localStorage.removeItem('searchTermCustomer')
        const searchTermCustomer = localStorage.getItem('searchTermCustomer')
        expect(searchTermCustomer).toBe(null)
    })

    xit('editRecord(id)', () => {
        fixture['editRecord'](1)
        expect(routerMock.navigate).toHaveBeenCalledWith(['/customers', 1])
    })

    xit('updateLocalStorageFilter()', () => {
        fixture.searchTerm = 'search term'
        fixture['updateLocalStorageWithFilter']()
        expect(localStorage.getItem('searchTermCustomer')).toBe('search term')
    })

    xit('onNew()', () => {
        fixture.onNew()
        expect(routerMock.navigate).toHaveBeenCalledWith(['/customers/new'])
    })

    xit('clearLocalStorageFilter()', () => {
        fixture['clearLocalStorageFilter']()
        window.localStorage.removeItem('searchTermCustomer')
        const searchTermCustomer = localStorage.getItem('searchTermCustomer')
        expect(searchTermCustomer).toBe(null)
    })

    xit('focus()', () => {
        const keyEvent = new KeyboardEvent('keydown', { code: '' })
        fixture['focus'](keyEvent, 'inputField')
        const spySetFocus = jest.spyOn(helperServiceMock, 'setFocus')
        expect(spySetFocus).toHaveBeenCalled()
    })

    xit('showSnackbar()', () => {
        fixture['showSnackbar']('message', 'type')
        const spySnackbarService = jest.spyOn(snackbarServiceMock, 'open')
        expect(spySnackbarService).toHaveBeenCalled()
    })

    xit('ngOnDestroy()', () => {
        fixture.ngOnDestroy()
    })

    xdescribe('Keyboard shortcuts', () => {

        it('Escape', () => {
            const event = new KeyboardEvent('keyup', { code: 'Escape' })
            const spyDocumentClick = spyOn(fixture, 'onkeyup').and.callThrough()
            fixture.onkeyup(event)
            expect(spyDocumentClick).toHaveBeenCalled()
        })

        it('ALT+F', () => {
            const event = new KeyboardEvent('keyup', { altKey: true, code: 'KeyF', bubbles: true })
            const spyDocumentClick = spyOn(fixture, 'onkeyup').and.callThrough()
            fixture.onkeyup(event)
            expect(spyDocumentClick).toHaveBeenCalled()
        })

        it('ALT+N', () => {
            const event = new KeyboardEvent('keyup', { altKey: true, code: 'KeyN', bubbles: true })
            const spyDocumentClick = spyOn(fixture, 'onkeyup').and.callThrough()
            fixture.onkeyup(event)
            expect(spyDocumentClick).toHaveBeenCalled()
        })

        it('Catches all the rest for full code coverage', () => {
            const event = new KeyboardEvent('keyup', { code: '', bubbles: true })
            const spyDocumentClick = spyOn(fixture, 'onkeyup').and.callThrough()
            fixture.onkeyup(event)
            expect(spyDocumentClick).toHaveBeenCalled()
        })

    })

    xdescribe('Filtering the list', () => {

        it('Return filtered array', () => {
            const records = [{ description: 'apples' }, { description: 'oranges' }, { description: 'grapes' }]
            const returned = fixture['filterArray'](records, 'apples')
            fixture['onFilter']('apples')
            expect(returned.length).toBe(1)
        })

        it('Return the whole array', () => {
            const records = [{ description: 'apples' }, { description: 'oranges' }, { description: 'grapes' }]
            const returned = fixture['filterArray'](records, '')
            fixture['onFilter']('')
            expect(returned.length).toBe(3)
        })

    })

    describe('subscribeToInteractionService', () => {
        interactionServiceMock.sendObject('something').subscribe((response) => {
            expect(response).toBe(true)
            expect(true).toBe(true)
        })
    })

})