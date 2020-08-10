# Simple chat

## Описание

Клиент мессенджера позволяющий обмениваться сообщениями.

## Технологии

HTML, CSS, БЭМ

## Как пользоваться

### Запуск dev сервера

```
npm run dev
```

### Сборка проекта

```
npm run build
```

### Запуск сервера

```
npm run start
```

### Деплой проекта

После того как вы зафиксируете изменения, выполнить следующую команду

```
npm run deploy
```


## Ссылки на развернутый проект

```
https://tohalb-chat.herokuapp.com/

https://ecstatic-edison-b968c0.netlify.app/
```

## Полезные команды

```
Данный команды нужно скопировать и вставить в консоль.

Показать начальный экран

document.querySelector('.messages-window__start-container').classList.remove('messages-window__start-container_hidden');
document.querySelector('.messages-window__container').classList.add('messages-window__container_hidden');

Показать экран сообщений

document.querySelector('.messages-window__start-container').classList.add('messages-window__start-container_hidden');
document.querySelector('.messages-window__container').classList.remove('messages-window__container_hidden');
```
