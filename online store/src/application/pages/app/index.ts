import MainPage from '../main/index';
import CartPage from '../cart/index';
import Header from '../components/header/index';
import { Page } from '../../patterns/pagePattern';
import ProductPage from '../product page/productPage';

export const enum PageIds {
    MainPage = 'main-page',
    CartPage = 'cart-page',
    ProductPage = 'products',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId = 'current-page';
    private header: Header;

    static renderNewPage(idPage: string, query: string) {
        const currentPage = document.querySelector(`#${App.defaultPageId}`);
        if (currentPage) {
            currentPage.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.MainPage || idPage === '') {
            page = new MainPage(idPage, query);
        } else if (idPage === PageIds.CartPage) {
            page = new CartPage(idPage);
        } else if (/products/.test(idPage)) {
            page = new ProductPage(PageIds.ProductPage, idPage.split('/')[1]);
        } else {
            console.log('else url', idPage);
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = App.defaultPageId;
            App.container.append(pageHTML);
        }
    }

    private localStorageCheck(): string {
        if (localStorage.getItem('page') !== undefined) {
            return String(localStorage.getItem('page'));
        } else {
            return 'main-page';
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            localStorage.setItem('page', `${hash}`);
            App.renderNewPage(hash, window.location.search);
        });
    }

    constructor() {
        this.header = new Header('header', 'header-container');
    }

    findRouteWhenLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.location.hash === '' || window.location.hash === '#main-page') {
                App.renderNewPage('main-page', window.location.search);
            } else if (/product-page/.test(window.location.hash)) {
                App.renderNewPage(window.location.hash.slice(1), '');
            }
        });
    }

    run() {
        App.container.append(this.header.render());
// diana-route-test отсюда
        App.renderNewPage('main-page', window.location.search);
// =====
        App.renderNewPage(this.localStorageCheck());
// testing-structure-w-route
        this.enableRouteChange();
        this.findRouteWhenLoad();
    }
}

export default App;
