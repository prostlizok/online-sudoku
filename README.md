# Проект Судоку

Це проект з судоку, реалізований на Node.js та React.

## Вимоги

Перед тим як почати, переконайтеся, що у вас встановлено:

- [Node.js](https://nodejs.org/) (версія 14 або новіша)
- [npm](https://www.npmjs.com/)

## Встановлення

1. Клонувати репозиторій:
   ```
   git clone https://github.com/prostlizok/online-sudoku.git
   ```
   
2. Перейти в директорію проекту:
   ```
   cd online-sudoku
   ```

3. Встановити необхідні залежності:
    ```
    npm install
    ```

## Запуск проекту

### Запуск клієнтської частини

1. Запустити проект:
   ```
   npm start
   ```

### Запуск серверної частини

2. Запустити сервер:
   ```
   node server/index.js
   ```
   Невеличка примітка, mongodb має бути запущеним 

### Перевірка документації API

1. Після запуску серверної частини, відкрийте веб-браузер і перейдіть за адресою:
   ```
   http://localhost:5000/api-docs
   ```

   як пароль вводиться пошта або номер телефону

Це дозволить вам переглядати та взаємодіяти з API через інтерфейс Swagger UI.