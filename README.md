<h1 align="center">Query Banguats currency exchange rate</h1>

## Author
- José Daniel López (KByteGt)
- Jr. Web Developer

## Setup project
<p>To setup the project, you can unzip the core files in a folder or you can clon the github repository, with the following command</p>

```shell
git clone https://github.com/KByteGt/CurrencyExchangeRate
```

<p>Then, you need to install the project dependencies, in the root folder project, whit the following command</p>

```shell
npm install
```

<p>you can start the server in developer mode, with the following command</P>

```shell
npm rund dev
```

<p> or you can start the server</p>

```shell
npm start
```
---

## Endpoinst of the project
### GetRate
- URL: http://127.0.0.1:2500/api/exchange/rate/${date}/${currency} - Method GET
#### INPUT
<p>date: 2021-02-17 <br/>currency: USD</p>

#### OUTPUT
```json
{
    "date": "2018-02-17",
    "currency": "USD",
    "rate": 7.35801
}
```

### GetIntervalRate
- URL: http://127.0.0.1:2500/api/exchange/rate/${date}/${date}/${currency} - Method GET
#### INPUT
<p>date: 2021-02-14 <br/>date: 2021-02-17 <br/>currency: USD</p>

#### OUTPUT
```json
{
    "start_date": "2021-02-14",
    "end_date": "2021-02-17",
    "currency": "USD",
    "mean": 7.746235,
    "max": 7.75002,
    "min": 7.74185
}
```


---
<p>If you like to change the server config, you can do it in the root folder project, config.js file </p>