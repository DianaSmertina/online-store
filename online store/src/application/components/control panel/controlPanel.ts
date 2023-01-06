import { QueryParams } from '../queryParams';
export class ControlPanel {
    controlBlock = document.createElement('div');
    query = new QueryParams();

    createSearch() {
        const inputText = document.createElement('input');
        inputText.className = 'search';
        inputText.setAttribute('type', 'text');
        inputText.setAttribute('autofocus', 'true');
        inputText.setAttribute('placeholder', 'Search product');
        const querySarchArr = this.query.getQueryParam('search');
        if (querySarchArr.length > 0) {
            inputText.value = querySarchArr[0];
        }
        inputText.addEventListener('input', () => {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            if (querySarchArr.length > 0) {
                params.delete('search');
            }
            params.append('search', inputText.value);
            window.location.search = params.toString();
        });
        return inputText;
    }

    createSort() {
        const select = document.createElement('select');
        select.className = 'sort';
        select.setAttribute('size', '1');
        select.innerHTML =
            '<option disabled>Sort by:</option>\
            <option value = "price-asc">Price ASC</option>\
            <option value = "price-desc">Price DESC</option>\
            <option value = "rating-asc">Rating ASC</option>\
            <option value = "rating-desc">Rating DESC</option>';

        const querySortArr = this.query.getQueryParam('sort');
        if (querySortArr.length === 0) {
            select.firstElementChild?.setAttribute('selected', 'true');
        }
        Array.from(select.children).forEach((option) => {
            if ((option as HTMLInputElement).value === querySortArr[0]) {
                option.setAttribute('selected', 'true');
            }
        });

        select.addEventListener('change', () => {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            if (querySortArr.length > 0) {
                params.delete('sort');
            }
            params.append('sort', select.value);
            window.location.search = params.toString();
        });

        return select;
    }

    createViewButtons() {
        const buttonsWrap = document.createElement('div');
        buttonsWrap.className = 'view';
        function addButton() {
            const btn = document.createElement('button');
            btn.className = 'view-button';
            return btn;
        }
        buttonsWrap.append(addButton(), addButton());
        (buttonsWrap.firstChild as HTMLElement).classList.add('tile-view');
        (buttonsWrap.firstChild as HTMLElement).classList.add('active-view');
        (buttonsWrap.lastChild as HTMLElement).classList.add('list-view');
        return buttonsWrap;
    }

    createProductsAmount() {
        const amountBlock = document.createElement('div');
        amountBlock.className = 'products-amount';
        amountBlock.innerHTML = '<span>Find products: </span><span>0</span>';
        return amountBlock;
    }

    render() {
        this.controlBlock.className = 'control';
        this.controlBlock.append(
            this.createSearch(),
            this.createSort(),
            this.createViewButtons(),
            this.createProductsAmount()
        );
        return this.controlBlock;
    }
}