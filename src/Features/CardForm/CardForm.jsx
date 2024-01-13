// CardForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import CardInput from './CardInput';
import CardSelect from './CardSelect';
import './style.css.scss';

const CardForm = () => {
  const [currentCardBackground, setCurrentCardBackground] = useState(Math.floor(Math.random() * 25 + 1));
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [minCardYear] = useState(new Date().getFullYear());
  const [amexCardMask] = useState('#### ###### #####');
  const [otherCardMask] = useState('#### #### #### ####');
  const [cardNumberTemp, setCardNumberTemp] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [focusElementStyle, setFocusElementStyle] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const cardNumberRef = useRef(null);
  const cardNameRef = useRef(null);
  const cardDateRef = useRef(null);

  useEffect(() => {
    setCardNumberTemp(otherCardMask);
    cardNumberRef.current.focus();
  }, []);

  const getCardType = () => {
    let number = cardNumber.replace(/ /g, ''); // Удаляем пробелы из номера карты для определения типа
    let re = /^4/;
    if (number.match(re) !== null) return 'visa';

    re = /^(34|37)/;
    if (number.match(re) !== null) return 'amex';

    re = /^5[1-5]/;
    if (number.match(re) !== null) return 'mastercard';

    re = /^6011/;
    if (number.match(re) !== null) return 'discover';

    re = /^9792/;
    if (number.match(re) !== null) return 'troy';

    return 'visa'; // Тип по умолчанию
  };

  const handleCardNameChange = (e) => {
    const value = e.target.value;

    // Проверяем, содержит ли введенное значение цифры
    if (!/\d/.test(value)) {
      // Если нет, обновляем состояние
      setCardName(value);
    }
    // Если есть цифры, ничего не делаем (не обновляем состояние)
  };

  const generateCardNumberMask = () => {
    return otherCardMask;
  };

  const formatCardNumber = (value) => {
    // Форматируем номер карты, добавляя пробелы после каждых четырех цифр
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  // const minCardMonth = () => {
  //   if (cardYear === minCardYear) return new Date().getMonth() + 1;
  //   return 1;
  // };

  const flipCard = (status) => {
    setIsCardFlipped(status);
  };

  const focusInput = (e) => {
    setIsInputFocused(true);
    const targetRef = e.target.dataset.ref;
    const target = targetRef === 'cardNumber' ? cardNumberRef.current : targetRef === 'cardName' ? cardNameRef.current : cardDateRef.current;

    setFocusElementStyle({
      width: `${target.offsetWidth}px`,
      height: `${target.offsetHeight}px`,
      transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
    });
  };

  const blurInput = () => {
    setTimeout(() => {
      if (!isInputFocused) {
        setFocusElementStyle(null);
      }
    }, 300);
    setIsInputFocused(false);
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatCardNumber(value);
    setCardNumber(formattedValue);
  };

  const handleSubmit = () => {
    // Обработка отправки формы
  };

  return (
      <div className="card-form">
        <div className="card-list">
          <div className={`card-item ${isCardFlipped ? '-active' : ''}`}>
            <div className="card-item__side -front">
              <div className={`card-item__focus ${focusElementStyle ? '-active' : ''}`} style={focusElementStyle} ref={cardNumberRef}></div>
              <div className="card-item__cover">
                <img
                  src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${currentCardBackground}.jpeg`}
                  className="card-item__bg"
                  alt=""
                />
              </div>

              <div className="card-item__wrapper">
                <div className="card-item__top">
                  <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" className="card-item__chip" alt="" />
                  <div className="card-item__type">
                    <img
                      src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${getCardType}.png`}
                      alt=""
                      className="card-item__typeImg"
                    />
                  </div>
                </div>
                <label htmlFor="cardNumber" className="card-item__number" ref={cardNumberRef}>
                  {generateCardNumberMask().split('').map((n, index) => (
                    <span key={index}>
                      {index > 4 && index < 14 && cardNumber.length > index && n.trim() !== '' ? (
                        <div className="card-item__numberItem" key={index}>
                          *
                        </div>
                      ) : (
                        <div className={`card-item__numberItem ${n.trim() === '' ? '-active' : ''}`} key={index}>
                          {cardNumber.length > index ? cardNumber[index] : ''}
                        </div>
                      )}
                    </span>
                  ))}
                </label>
                <div className="card-item__content">
                  <label htmlFor="cardName" className="card-item__info" ref={cardNameRef}>
                    <div className="card-item__holder">Card Holder</div>
                    <transition name="slide-fade-up">
                      <div className="card-item__name" key={cardName.length ? '1' : '2'}>
                        {cardName.length ? (
                          <transition-group name="slide-fade-right">
                            {cardName.replace(/\s\s+/g, ' ').split('').map((char, index) => (
                              <span key={index} className="card-item__nameItem">
                                {char}
                              </span>
                            ))}
                          </transition-group>
                        ) : (
                          <div>Full Name</div>
                        )}
                      </div>
                    </transition>
                  </label>
                  <div className="card-item__date" ref={cardDateRef}>
                    <label htmlFor="cardMonth" className="card-item__dateTitle">
                      Expires
                    </label>
                    <label htmlFor="cardMonth" className="card-item__dateItem">
                      <transition name="slide-fade-up">
                        {cardMonth ? (
                          <span key={cardMonth}>{cardMonth}</span>
                        ) : (
                          <span key="2">MM</span>
                        )}
                      </transition>
                    </label>
                    /
                    <label htmlFor="cardYear" className="card-item__dateItem">
                      <transition name="slide-fade-up">
                        {cardYear ? (
                          <span key={cardYear}>{String(cardYear).slice(2, 4)}</span>
                        ) : (
                          <span key="2">YY</span>
                        )}
                      </transition>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-item__side -back">
              <div className="card-item__cover">
                <img
                  src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${currentCardBackground}.jpeg`}
                  className="card-item__bg"
                  alt=""
                />
              </div>
              <div className="card-item__band"></div>
              <div className="card-item__cvv">
                <div className="card-item__cvvTitle">CVV</div>
                <div className="card-item__cvvBand">
                  {Array.from({ length: 3 }, (_, index) => (
                    <span key={index}>{cardCvv[index] || '*'}</span>
                  ))}
                </div>
                <div className="card-item__type">
                  <img
                    src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${getCardType()}.png`}
                    alt=""
                    className="card-item__typeImg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-form__inner">
          <CardInput
            label="Card Number"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            onFocus={(e) => focusInput(e)}
            onBlur={() => blurInput()}
            refProp={cardNumberRef}
            autoComplete="off"
            maxLength="19"
          />
          <CardInput
            label="Card Holder"
            id="cardName"
            value={cardName}
            maxLength="26"
            onChange={handleCardNameChange}
            onFocus={(e) => focusInput(e)}
            onBlur={() => blurInput()}
            refProp={cardNameRef}
            autoComplete="off"
          />
          <div className="card-form__row">
            <div className="card-form__col">
              <CardSelect
                label="Expiration Date"
                id="cardMonth"
                value={cardMonth}
                onChange={(e) => setCardMonth(e.target.value)}
                onFocus={(e) => focusInput(e)}
                onBlur={() => blurInput()}
                refProp={cardDateRef}
                options={Array.from({ length: 12 }, (_, index) => ({
                  value: index < 9 ? `0${index + 1}` : `${index + 1}`,
                  label: index < 9 ? `0${index + 1}` : `${index + 1}`,
                }))}
              />
              <CardSelect
                label="Year"
                id="cardYear"
                value={cardYear}
                onChange={(e) => setCardYear(e.target.value)}
                onFocus={(e) => focusInput(e)}
                onBlur={() => blurInput()}
                refProp={cardDateRef}
                options={Array.from({ length: 12 }, (_, index) => ({
                  value: minCardYear + index,
                  label: minCardYear + index,
                }))}
              />
            </div>
            <div className="card-form__col -cvv">
              <CardInput
                label="CVV"
                id="cardCvv"
                maxLength="3"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                onFocus={() => flipCard(true)}
                onBlur={() => flipCard(false)}
                autoComplete="off"
              />
            </div>
          </div>
          <button className="card-form__button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
  );
};

export default CardForm;
