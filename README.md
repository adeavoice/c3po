# c3po
Чат-бот c3po

## Структура папок проекта
* `conf` настройки web-сервера
* `htdocs` папка приложения

### Работа с локальным git-репозиторием и github.com
* `git init` создание локального git-репозитория в папке
* `git conf user.email "[Email]"` настройка пользователя, от имени которого выполняется commit в локальном git-репозитории
* `git add [Файл]` добавление новых файлоа для фиксация изменений в локальный git-репозиторий 
* `git commit -a -m "[Комментарий]"` фиксация изменений в локальный git-репозиторий (для последующей отправки в github)
* `git push origin master` отправить последние обновления в github
* `sudo git pull origin master` получить последние обновления с github

### Скрипт установки и запуска приложения на web-сервере
* `./start_c3po.sh` Для запуска приложения бота на постоянной основе. Пулит данные (git pull) с github, устанавливает модули node (npm install) и запускает приложение
* `./stop_c3po.sh` Для останова приложения, запущенного на постоянной основе. Может потребоваться для отладки работы приложения, см. команды ниже
* * `chmod 700 run.sh` Пререквизитная команда, её нужно выполнить для запуска run.sh

### Команды запуска и останова приложения NodeJS
* `node htdocs/app.js` ручной запуск приложения на сервере
* `CTRL+C` ручной останов приложения на сервере (только для приложения, запущенного вручную)
* `node /opt/bitnami/nodejs/bin/forever stop htdocs/app.js` останов приложения на сервере, запущенного на постоянной основе
* `node /opt/bitnami/nodejs/bin/forever start htdocs/app.js` запуск приложения на сервере на постоянной основе
