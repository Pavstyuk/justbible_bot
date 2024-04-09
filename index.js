// Just Bible Bot 
// Version 1.2.1

require('dotenv').config();
const fs = require('node:fs');

const {
    Bot,
    GrammyError,
    HttpError,
    InputFile,
    InlineKeyboard,
} = require('grammy');



const bot = new Bot(process.env.BOT_API_KEY);

/* BIBLE DATA */
const titlesArr = ["Бытие, Бт.", "Исход, Ид.", "Левит, Левита, Лв.", "Числа, Чс.", "Второзаконие, Вт.", "Иисус Навин, Иисуса Навина, Нв.", "Судьи, Судей, Сд.", "Руфь,Руфи,Рф,", "1 Царств, 1Царств, 1Цар, 1Ц.", "2 Царств, 2Царств, 2Цар, 2Ц.", "3 Царств, 3Царств, 3Цар, 3Ц.", "4 Царств, 4Царств, 4Цар, 4Ц.", "1 Паралипоменон, 1Пар, 1П., 1 Летопись, 1Лет", "2 Паралипоменон, 2Пар, 2П., 2 Летопись, 2Лет", "Ездра, Ездру, Ездры, Езд.,Ез.", "Неемия,Неемию,Неемии,Нм.", "Есфирь, Эсфирь, Есфири, Эсфири, Ес., Эс.", "Иов, Иова, Ив.", "Псалтирь, Псалтырь, Псалом, Псалмы, Псалмов, Пс.", "Притчи, Притчей, Пр.", "Екклесиаст, Екклезиаст, Ек.", "Песня Песней, Песни Песней, Песню Песней, Песн.,Пн.", "Исаия, Исайя, Исаию,  Исаи, Ис.", "Иеремия, Иеремии, Иеремию, Ир.", "Плач Иеремии, Пл.", "Иезекииль, Иезекииля, Из.", "Даниил, Даниила, Дн.", "Осия, Осии, Осию, Ос.", "Иоиль, Иоиля, Ил.", "Амос, Амоса, Ам.", "Авдий, Авдия, Авдию, Аи.", "Иона, Ионы, Иоану, Ио.", "Михей, Михея, Мх.", "Наум, Наума, На.", "Аввакум, Аввакума, Ав.", "Софония, Софонии, Софонию, Сф.", "Аггей, Аггея, Аггею, Аг.", "Захария, Захарии, Захарию, Зр.", "Малахия, Малахии, Малахию, Мл.", "от Матфея, Матфей, Матфея, Матвей, Мт., Мф.", "от Марка, Марк, Марка, Мк., Мр.", "от Луки, Лука, Луки, Лк.", "от Иоанна, Иоанн, Иоанна, Ин.", "Деяния, Де.", "Иаков, Иакова, Ик.", "1 Петра, 1Петра, 1П.", "2 Петра, 2Петра, 2П", "1 Иоанна, 1Иоанна, 1 Ин, 1Ин., 1-е Иоан, 1И.", "2 Иоанна, 2Иоанна, 2 Ин, 2Ин., 2-е Иоан, 2И.", "3 Иоанна, 3Иоанна, 3 Ин, 3Ин., 3-е Иоан, 3И.", "Иуда, Иуды, Иуду, Иу.", "Римлянам, Рим., Рм.", "1 Коринфянам, 1Коринфянам, 1Кор., 1К., 1-е Коринфянам", "2 Коринфянам, 2Коринфянам, 2Кор., 2К., 2-е Коринфянам", "Галатам, Гл.", "Ефесянам, Эфесянам, Еф., Эф.", "Филиппийцам, Флп, Фл.", "Колоссянам, Кл.", "1 Фессалоникийцам, 1Фессалоникийцам, 1-е Фес, 1-е Фес., 1Ф.", "2 Фессалоникийцам, 2Фессалоникийцам, 2-е Фес, 2-е Фес., 2Ф.", "1 Тимофею, 1Тимофею, 1-е Тим., 1Тим., 1Т.", "2 Тимофею, 2Тимофею, 2-е Тим., 2Тим., 2Т.", "Титу, Тит., Ти.", "Филимону, Флм., Фм.", "Евреям, Евр., Ер.", "Откровение, Откр., Ои., Апокалипсис, Апок."];
const books = ["Бытие", "Исход", "Левит", "Числа", "Второзаконие", "Иисус Навин", "Судьи", "Руфь", "1 Царств", "2 Царств", "3 Царств", "4 Царств", "1 Паралипоменон", "2 Паралипоменон", "Ездра", "Неемия", "Есфирь", "Иов", "Псалтирь", "Притчи", "Екклесиаст", "Песня Песней", "Исаия", "Иеремия", "Плач Иеремии", "Иезекииль", "Даниил", "Осия", "Иоиль", "Амос", "Авдий", "Иона", "Михей", "Наум", "Аввакум", "Софония", "Аггей", "Захария", "Малахия", "Матфей", "Марк", "Лука", "Иоанн", "Деяния", "Иаков", "1 Петра", "2 Петра", "1 Иоанна", "2 Иоанна", "3 Иоанна", "Иуда", "Римлянам", "1 Коринфянам", "2 Коринфянам", "Галатам", "Ефесянам", "Филиппийцам", "Колоссянам", "1 Фессалоникийцам", "2 Фессалоникийцам", "1 Тимофею", "2 Тимофею", "Титу", "Филимону", "Евреям", "Откровение"];
const chaptersArr = [50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 10, 42, 150, 31, 12, 8, 66, 52, 5, 48, 12, 14, 3, 9, 1, 4, 7, 3, 3, 3, 2, 14, 4, 28, 16, 24, 21, 28, 5, 5, 3, 5, 1, 1, 1, 16, 16, 13, 6, 6, 4, 4, 5, 3, 6, 4, 3, 1, 13, 22];
let theBibleRBO;

const writeLogFile = (ctx, cmd) => {
    let d = new Date();
    let now = new Intl.DateTimeFormat('ru-RU', {
        dateStyle: "short",
        timeStyle: "short"
    }).format(d);
    let content = `date: "${now}", message: "${ctx.message.text}", event: "${cmd}"; \r\n`;
    console.log(content);

    fs.appendFile("./bot.log", content, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Log записан.");
        }
    })
}

// Открываем текст Библии из JSON файла Современный перевод

fetch("https://justbible.ru/json/rbo.json")
    .then((response) => {
        return response.json();
    })
    .then((rbo) => {
        theBibleRBO = rbo;
    });

// Функция получения случайного отрывка

const getRandomVerse = () => {
    const getRandomNumber = (min, max) => {
        return (Math.random() * (max - min) + min).toFixed(0);
    }
    let rnd = getRandomNumber(0, theBibleRBO.length);
    console.log(rnd);
    if (theBibleRBO[rnd].text != "") {
        let randomVerse = `${theBibleRBO[rnd].text} \r\n\r\n(${theBibleRBO[rnd].book} ${theBibleRBO[rnd].chapter}:${theBibleRBO[rnd].verse})`;
        let linkToVerse = `https://justbible.ru/?trans=rbo&book=${theBibleRBO[rnd].book}&chapter=${theBibleRBO[rnd].chapter}&verse=${theBibleRBO[rnd].verse}`;

        return `<blockquote><i>${randomVerse}</i></blockquote> <a href="${linkToVerse}">Читать в контексте...</a>`;

    } else {
        getRandomVerse();
    }
}

// КОМАНДЫ БОТА

bot.command('start', async (ctx) => {
    await ctx.react("😍")
    await ctx.reply("<b>Привет, я электронный помощник Просто Библия</b> \r\n\r\nУмею четыре функции: \n\r\r\n1. Показывать случайные отрывки из Библии, команда: /random \r\n\r\n2. Показывать отрывок из Библии по заданным координатам. Например: <i>1 Фесс 5:18</i> \r\n\r\n3. Высылать аудио записи Библии по указанной книге и главе. Например: <i>Слушать Псалом 1</i> \r\n\r\n 4. Искать фразу в тексте Библии. Например: <i>Любовь терпелива</i> или <i>Искать любовь терпелива</i>", {
        parse_mode: "HTML"
    });
});

bot.command('random', async (ctx) => {
    await ctx.react("🤩");
    await ctx.reply(getRandomVerse(), {
        parse_mode: "HTML",
        disable_web_page_preview: true
    });
    writeLogFile(ctx, "random");
});

bot.command('help', async (ctx) => {
    writeLogFile(ctx, "help");
    await ctx.react("🤓");
    let key = new InlineKeyboard().url('justbible.ru', 'https://justbible.ru/');
    await ctx.reply('<b>Телеграм бот Просто Библия использует Современный Русский Перевод, РБО, 2015.</b> \r\n\r\n    <b>1. Как читать?</b>\r\n    Напишите в сообщении координаты отрывка из Библии в формате <i>Иоанн 1:1</i> и бот выдаст указанный стих: Евангелие от Иоанна, глава 1, стих 1. Для разделения главы и стиха допускается символ двоеточие или точка. \r\n\r\n    Чтобы вывести отрывок из нескольких стихов можно указать координаты в виде: <i>1 Кор 13:4-8</i>. \r\n\r\n    Можно указать конкретные стихи через запятую: <i>Иоанн 1:1,14</i>. \r\n\r\n    Допускается сокращение названия книги до нескольких букв, вместо <i>1 Коринфянам</i> можно написать <i>1 Кор</i> или <i>1Кор</i> или даже <i>1К</i>, а вместо <i>Откровение</i> - <i>Откр</i> или <i>Отк</i> \r\n\r\n    <b>2. Как слушать?</b>\r\n    Чтобы бот выслал аудио запись главы из Библии, начните сообщение с ключевого словова <i>"Слушать"</i> (допускается: <i>"Запись", "Аудио", "Звук"</i>), затем укажите название книги и номер главы через пробел, например так: <i>"Слушать Притчи 1"</i>. \r\n\r\n    <b>3. Как искать?</b>\r\n    Чтобы найти нужную фразу в тексте Библии просто напишите эту фразу или слово в сообщении, например <i>"Всегда радуйтесь"</i> или начните сообщение с ключевого слова "Искать" (допускается: <i>"Поиск", "Найти"</i>) <i>"Искать Всегда радуйтесь"</i>\r\n\r\n    Полный функционал приложения Просто Библия можно найти по адресу <a href="https://justbible.ru">justbible.ru</a>\r\n\r\n    Разработчик @pavstyuk', {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: key,
    });
});

// МЕНЮ БОТА

bot.api.setMyCommands([{
    command: "start",
    description: "Запускаем электронного помощника"
},
{
    command: "random",
    description: "Бот показывает случайный отрывок из Библии"
},
{
    command: "help",
    description: "Как пользоваться ботом?"
}
]);

bot.hears([/Искать/, /искать/, /Поиск/, /поиск/, /Найти/, /найти/], async (ctx) => {
    searching(ctx);
});

bot.hears([/Слушать/, /Слышать/, /слушать/, /слышать/, /слыш/, /слуш/, /Cлыш/, /Cлуш/, /Аудио/, /аудио/, /запись/, /звук/], async (ctx) => {
    let wholeText = ctx.message.text;
    let wholeTextArr = wholeText.split(" ");
    if (wholeTextArr.length >= 4) {
        await ctx.reply('Напиште проще например так: <i>"Слушать Исайя 53"</i>', {
            parse_mode: "HTML"
        });
        return;
    }
    let foundBook = titlesArr.find((title) => {
        return title.toLowerCase().includes(wholeTextArr[1].toLowerCase());
    });
    // console.log(foundBook)
    let bookIndex = titlesArr.indexOf(foundBook);
    let bookToListen = books[bookIndex];

    if (bookToListen) {
        if (Number(wholeTextArr[2]) != NaN && Number(wholeTextArr[2]) > 0 && Number(wholeTextArr[2]) <= chaptersArr[bookIndex]) {
            let chapterToListen = Number(wholeTextArr[2]);
            await ctx.reply(`Высылаю запись: ${bookToListen} глава ${chapterToListen}`);
            let c, b;

            if (bookIndex < 10) {
                b = `0${bookIndex + 1}`
            } else {
                b = bookIndex + 1;
            }

            if (b === 19) {
                if (chapterToListen < 10) {
                    c = `00${chapterToListen}`;
                } else if (chapterToListen < 100) {
                    c = `0${chapterToListen}`;
                } else {
                    c = chapterToListen;
                }
            } else {
                if (chapterToListen < 10) {
                    c = `0${chapterToListen}`;
                } else {
                    c = chapterToListen;
                }
            }
            let audioFile = new InputFile(`audio/${b}/${c}.mp3`);
            console.log(audioFile);
            await ctx.replyWithAudio(audioFile, {
                title: `Глава ${chapterToListen}`
            });
        } else {
            await ctx.reply(`Уточните номер главы, пожалуйста.`, {
                parse_mode: "HTML"
            });
            return;
        }
    } else {
        await ctx.reply(`Не нашел книгу: <i>"${wholeTextArr[1]}"</i>`, {
            parse_mode: "HTML"
        });
        return;
    }
});


bot.on("message:text", async (ctx) => {

    console.log(ctx.from);
    writeLogFile(ctx, "read");

    let messageArr = ctx.message.text.split(' ');
    let book;
    let chapter;
    let ver;
    let text;

    const showErrorVerse = async (verse) => {
        await ctx.reply(`<b>${verse}</b> - неверные координаты`, {
            parse_mode: "HTML"
        });
    }

    const getChapter = (book, coords) => {
        let coordChapter;
        let coordVerse;
        if (coords.includes(':')) {
            coordChapter = Number(coords.split(':')[0]);
            coordVerse = coords.split(':')[1];
        } else if (coords.includes('.')) {
            coordChapter = Number(coords.split('.')[0]);
            coordVerse = coords.split('.')[1];
        } else {
            coordChapter = Number(coords);
            coordVerse = 0;
        }
        console.log(`coords: ${coords}`)

        let bookIndex = books.indexOf(book);
        if (coordChapter > 0 && coordChapter <= chaptersArr[bookIndex]) {
            ver = coordVerse;
            return Number(coordChapter);
        } else {
            ver = false;
            return false;
        }
    }

    const checkVers = (vers) => {
        console.log(`checking vers: ${vers}`);
        if (vers.length > 1) {
            if (vers.includes("-")) {
                let versArr = vers.split("-");
                let delta = Number(versArr[1]) - Number(versArr[0]);
                if (delta > 0) {
                    let versDelta = []
                    for (let i = 0; i <= delta; i++) {
                        versDelta.push(Number(versArr[0]) + i);
                    }
                    console.log(`versDelta: ${versDelta}`);
                    return versDelta;
                } else {
                    return false;
                }

            } else if (vers.includes(",")) {
                let versArr = vers.split(",");
                versArr.sort((a, b) => {
                    return +a - +b;
                });
                return versArr.map(Number);
            } else {
                return Number(vers);
            }
        } else {
            return Number(vers);
        }
    }

    const checkBook = () => {
        if (messageArr[0].match(/^[0-9]+$/) != null) {
            if (messageArr[0].length === 1) {

                let queryBook = `${messageArr[0]} ${messageArr[1]}`;

                let foundBook = titlesArr.find((title) => {
                    return title.toLowerCase().includes(queryBook.toLowerCase());
                });

                console.log(foundBook)

                book = books[titlesArr.indexOf(foundBook)];

                if (book && messageArr[2]) {
                    chapter = getChapter(book, messageArr[2]);
                } else {
                    chapter = false;
                }

            } else {
                book = false;
            }

        } else if (messageArr[0].toLowerCase() == 'от') {
            let queryBook = `${messageArr[0]} ${messageArr[1]}`;
            console.log(`queryBook = ${queryBook}`)
            let foundBook = titlesArr.find((title) => {
                return title.toLowerCase().includes(queryBook.toLowerCase());
            });
            console.log(foundBook)
            book = books[titlesArr.indexOf(foundBook)];

            if (book && messageArr[2]) {
                chapter = getChapter(book, messageArr[2]);
            } else {
                chapter = false;
            }

        } else {
            let queryBook = messageArr[0];
            let foundBook = titlesArr.find((title) => {
                return title.toLowerCase().includes(queryBook.toLowerCase());
            });
            console.log(foundBook)
            book = books[titlesArr.indexOf(foundBook)];

            if (book && messageArr[1]) {
                chapter = getChapter(book, messageArr[1]);
            } else {
                chapter = false;
            }
        }

        if (book && chapter) {
            text = "";
            if (ver === 0) {
                theBibleRBO.forEach(item => {
                    if (item.book == book && Number(item.chapter) === chapter) {
                        text += `${item.verse}. ${item.text} \r\n`;
                    }
                });
                text += `\r\n(${book} ${chapter})`;
            } else {

                ver = checkVers(ver);
                if (typeof ver === "number") {
                    console.log(`Книга: ${book}, Глава: ${chapter}, Стих: ${ver}`);
                    theBibleRBO.forEach(item => {
                        if (item.book == book && Number(item.chapter) === chapter && Number(item.verse) === ver) {
                            if (item.text != "") {
                                text = `${item.text}\r\n\r\n(${item.book} ${item.chapter}:${item.verse})`;
                            } else {
                                text = `<code>В современном переводе стих <b>${item.book} ${item.chapter}:${item.verse}</b> имеет другие координаты.</code>`;
                            }
                        }
                    });
                } else if (typeof ver === "object") {

                    console.log(`Книга: ${book}, Глава: ${chapter}, Стих: ${ver}`);
                    console.log(ver);
                    text = "";
                    theBibleRBO.forEach(item => {
                        if (item.book == book && Number(item.chapter) === chapter && ver.includes(Number(item.verse))) {
                            if (item.text != "") {
                                text += `${item.verse}. ${item.text}\r\n`;
                            } else {
                                text += `${item.verse}. --\r\n`;
                            }
                        }
                    });

                    if (ver[ver.length - 1] - ver[0] === ver.length - 1) {
                        text += `\r\n(${book} ${chapter}:${ver[0]}-${ver[ver.length - 1]})`;
                    } else {
                        text += `\r\n(${book} ${chapter}:${ver})`;
                    }

                } else {
                    text = false;
                }
                console.log(`Текст: ${text}`);
            }
        }
    }

    checkBook();

    if (book && chapter && text) {

        if (text.includes("<code>")) {
            await ctx.react("🤔");
            await ctx.reply(`${text}`, {
                parse_mode: "HTML"
            });
            return;
        }

        if (text.length < 4096) {
            await ctx.react("👍");
            await ctx.reply(`<blockquote><em>${text}</em></blockquote>`, {
                parse_mode: "HTML"
            });
        } else {
            await ctx.react("👀");
            await ctx.reply(`Слишком длинная глава <b>${book}: ${chapter}</b>. \r\nУточните  запрос.`, {
                parse_mode: "HTML"
            });
        }
    } else if (book && chapter) {
        await ctx.react("👀");
        await ctx.reply(`Не могу найти стих в главе ${chapter} из книги ${book}`);
    } else if (book) {
        await ctx.react("👀");
        await ctx.reply(`Не могу найти указанную главу в книге ${book}`);
    } else {
        // showErrorVerse(ctx.message.text);
        searching(ctx);
    }

});


const searching = async (ctx) => {
    let results;
    let text = ctx.message.text;
    let textArr = text.split(" ");

    const queryArr = ["Искать", "искать", "Поиск", "поиск", "Найти", "найти"];

    if (queryArr.includes(textArr[0])) {
        textArr.shift();
        text = textArr.join(" ");
    }

    console.log(`Searching text: ${text}`);
    writeLogFile(ctx, "search");

    const startSearching = (words) => {
        results = [];
        theBibleRBO.forEach(item => {
            if (item.text.toLowerCase().includes(words.toLowerCase())) {
                results.push(item);
            }
        });

        return results;
    }


    if (text.length >= 3) {
        results = startSearching(text);
    } else {
        await ctx.react("🤔");
        await ctx.reply(`Слишком короткий запрос: <b><i>${text}</i></b>. Попробуйте уточнить...`, {
            parse_mode: "HTML",
        });
    }

    if (results && results.length > 0 && results.length <= 10) {
        await ctx.react("👍");
        await ctx.reply(`
        Количество совпадений: <b>${results.length}</b>, согласно вашему запросу: <b><i>${text}</i></b>.`, {
            parse_mode: "HTML",
        });
        results.forEach(async (item) => {
            await ctx.reply(`<blockquote><em>${item.text}</em> \r\n\r\n(${item.book} ${item.chapter}:${item.verse})</blockquote>`, {
                parse_mode: "HTML",
            });
        });
    } else if (results && results.length > 10) {
        await ctx.react("🤯");
        await ctx.reply(`
        Количество совпадений: <b>${results.length}</b>, согласно вашему запросу: <b><i>${text}</i></b>. Это многовато чтобы вывести все результаты в чат.`, {
            parse_mode: "HTML",
        });

        let key = new InlineKeyboard().url('Перейти на сайт...', 'https://justbible.ru/search.html');
        await ctx.reply(`Чтобы воспользоваться расширенными функциями поиска перейдите на сайт "Просто Библия"`, {
            parse_mode: "HTML",
            reply_markup: key,
        });
    } else {
        await ctx.react("🤔");
        await ctx.reply(`Совпадений нет по вашему запросу: <b><i>${text}:</i></b>. Попробуйте искать иначе...`, {
            parse_mode: "HTML",
        });
    }
}

bot.callbackQuery(async (ctx) => {
    await ctx.answerCallbackQuery();

});

bot.on(["message:media", "message:file"], async (ctx) => {
    await ctx.reply(`Мне кажется, я вас не понимаю... /start`, {
        parse_mode: "HTML"
    });
});


// ОБРАБОТЧИК ОШИБОК 
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Ошибка в запросе:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Не удалось связаться с Telegram:", e);
    } else {
        console.error("Неизвестная ошибка:", e);
    }
});


bot.start();