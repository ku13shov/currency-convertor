import { useState, useEffect } from 'react';
import axios from 'axios';

import { Block } from './Block';
import './index.scss';

function App() {
    const [fromCurrency, setFromCurrency] = useState('BYN');
    const [toCurrency, setToCurrency] = useState('USD');
    const [fromCurrencyValue, setFromCurrencyValue] = useState(1);
    const [toCurrencyValue, setToCurrencyValue] = useState(0);
    const [currencyRate, setCurrencyRate] = useState(0);

    const onChangeFromValue = (value) => {
        const result = Number.isInteger(value * +currencyRate)
            ? value * +currencyRate
            : (value * +currencyRate).toFixed(3);

        setFromCurrencyValue(value);
        setToCurrencyValue(result);
    };

    const onChangeToValue = (value) => {
        const result = Number.isInteger(value / +currencyRate)
            ? value / +currencyRate
            : (value / +currencyRate).toFixed(3);

        setToCurrencyValue(value);
        setFromCurrencyValue(result);
    };

    const getCurrency = async () => {
        try {
            const { data } = await axios.get(
                `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency.toLocaleLowerCase()}/${toCurrency.toLocaleLowerCase()}.json`,
            );
            setCurrencyRate(data[`${toCurrency.toLocaleLowerCase()}`]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCurrency();
        onChangeFromValue(fromCurrencyValue);
    }, [fromCurrency, toCurrency, currencyRate]);

    return (
        <div className="App">
            <Block
                value={fromCurrencyValue}
                currency={fromCurrency}
                onChangeCurrency={setFromCurrency}
                onChangeValue={onChangeFromValue}
                currencyRate={currencyRate}
            />
            <Block
                value={toCurrencyValue}
                currency={toCurrency}
                onChangeCurrency={setToCurrency}
                onChangeValue={onChangeToValue}
                currencyRate={currencyRate}
            />
        </div>
    );
}

export default App;
