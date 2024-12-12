import AbstractView from '../framework/view/abstract-view.js';
import { toUpperCaseFirstLetter } from '../utils/utils.js';
import { isPointFavorite } from '../utils/points.js';
import { formatDate, getDuration } from '../utils/daijs.js';
import { FormatsDate } from '../const.js';

const createPointTemplate = (point, pointDestination, pointOffers) => {
  const { basePrice, dateFrom, dateTo, type, isFavorite } = point;

  return (
    `<li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime=${formatDate(dateFrom, FormatsDate.DATE_FULL)}>${formatDate(dateFrom, FormatsDate.DATE)}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type} icon">
          </div>
          <h3 class="event__title">${toUpperCaseFirstLetter(type)} ${pointDestination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime=${formatDate(dateFrom, FormatsDate.DATE_TIME_FULL)}>${formatDate(dateFrom, FormatsDate.TIME)}</time>
                &mdash;
              <time class="event__end-time" datetime=${formatDate(dateTo, FormatsDate.DATE_TIME_FULL)}>${formatDate(dateTo, FormatsDate.TIME)}</time>
            </p>
            <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
          </div>
          <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
          ${pointOffers.length > 0 ? pointOffers.map((offer) => (
      `<li class="event__offer">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </li>`
    )).join('') : ''}

          </ul>
          <button class="event__favorite-btn ${isPointFavorite(isFavorite)}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
      </div>
    </li>`
  );
};

export default class PointView extends AbstractView {
  #point;
  #pointDestination;
  #pointOffers;
  #handlerEditClick;
  #handleFavoriteClick;

  constructor({point, pointDestination, pointOffers, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#handlerEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.#setEventListeners();
    this.#setFavoriteListeners();

  }

  get template() {
    return createPointTemplate(this.#point, this.#pointDestination, this.#pointOffers);
  }

  #setEventListeners() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handlerEditClick);
  }

  #setFavoriteListeners() {
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#handleFavoriteClick);
  }
}
