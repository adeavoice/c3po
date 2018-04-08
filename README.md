# c3po
Чат-бот c3po

## Структура папок проекта
* `conf` настройки web сервера
* `htdocs` папка приложения

## Команды консоли
### Работа с локальным git-репозиторием и github.com
* `git add ` добавление новых файлоа для фиксация изменений в локальный git-репозиторий 
* `git commit -a -m "[Комментарий]"` фиксация изменений в локальный git-репозиторий (для последующей отправки в github)
* `git push origin master` отправить последние обновления в github
* `sudo git pull origin master` получить последние обновления с github

### Запуск и останов приложения NodeJS
* `node /opt/bitnami/nodejs/bin/node /opt/bitnami/nodejs/bin/forever stop htdocs/app.js` останов приложения на сервере, запущенного на постоянной основе
* `node /opt/bitnami/nodejs/bin/node /opt/bitnami/nodejs/bin/forever start htdocs/app.js` запуск приложения на сервере на постоянной основе
* `node htdocs/app.js` ручной запуск приложения на сервере
* `CTRL+C` ручной останов приложения на сервере (только для приложения, запущенного вручную)
