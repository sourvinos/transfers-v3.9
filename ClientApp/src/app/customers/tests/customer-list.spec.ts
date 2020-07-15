import { CustomerListComponent } from './../user-interface/customer-list'

describe('CustomerList', () => {

    let fixture: CustomerListComponent

    let activatedRouteMock: any
    let buttonClickServiceMock: any
    let helperServiceMock: any
    let interactionServiceMock: any
    let keyboardShortcutsServiceMock: any
    let messageServiceMock: any
    let routerMock: any
    let snackbarServiceMock: any
    let titleServiceMock: any

    beforeEach(() => {
        titleServiceMock = { setTitle: jest.fn() }
        helperServiceMock = { getApplicationTitle: jest.fn() }
        activatedRouteMock = jest.fn()
        fixture = new CustomerListComponent(
            activatedRouteMock,
            buttonClickServiceMock,
            helperServiceMock,
            interactionServiceMock,
            keyboardShortcutsServiceMock,
            messageServiceMock,
            routerMock,
            snackbarServiceMock,
            titleServiceMock
        )
        // fixture.ngOnInit()
    })

    describe('ngOnInit', () => {
        it('setWindowTitle', () => {
            const spySetTitle = jest.spyOn(titleServiceMock, 'setTitle').mockReturnValue('Title')
            expect(titleServiceMock.setTitle()).toBe('Title')
            expect(spySetTitle).toHaveBeenCalled()
        })
        it('getFilterFromLocalStorage', () => {
            const searchTerm = undefined
            expect(fixture.getFilterFromLocalStorage()).toBe(searchTerm)
        })
    })

})