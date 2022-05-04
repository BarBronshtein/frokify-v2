import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _numPages;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  prevBtn(page, totalPages) {
    return `
      <button data-goto="${
        page - 1
      }" data-of="${totalPages}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${page - 1}</span>
      <span> of ${totalPages}</span>
    </button>
      `;
  }
  forwBtn(page, totalPages) {
    return `<button data-goto="${
      page + 1
    }" data-of="${totalPages}" class="btn--inline pagination__btn--next">
      <span>${page + 1}</span>
      <span> of ${totalPages}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // this._numPages = numPages;

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this.forwBtn(curPage, numPages);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this.prevBtn(curPage, numPages);
    }
    //Other page
    if (curPage < numPages) {
      const html =
        this.prevBtn(curPage, numPages) + this.forwBtn(curPage, numPages);
      return html;
    }
    // Page 1, and there are NO other pages
    return ``;
  }
}

export default new PaginationView();
