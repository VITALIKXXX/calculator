const number = document.querySelectorAll('.container__number');
const operators = document.querySelectorAll('.container__operator');
const clear = document.querySelector('.container__clear');
const delet = document.querySelector('.container__delete');
const equals = document.querySelector('.container__equals');
const previousAction = document.querySelector('.container__previousAction');
const currentAction = document.querySelector('.container__currentAction');
const toggleButton = document.querySelector('.container__toggle');
const container = document.querySelector('.container');


let aktualneDzialanie = '';
let poprzednieDzialanie = '';
let operacja = undefined;

toggleButton.addEventListener('click', () => {
    container.classList.toggle('active');
    toggleButton.innerText = container.classList.contains('active') ? 'Basic' : 'Advanced';
});

const oblicz = () => {
    let dzialanie
    if (!poprzednieDzialanie || !aktualneDzialanie) {
        return
    }

    const poprzednie = parseFloat(poprzednieDzialanie)
    const aktualne = parseFloat(aktualneDzialanie)

    if (isNaN(poprzednie) || isNaN(aktualne)) {
        return
    }

    switch (operacja) {
        case '+':
            dzialanie = poprzednie + aktualne
            break;
        case '-':
            dzialanie = poprzednie - aktualne
            break;
        case '×':
            dzialanie = poprzednie * aktualne
            break;
        case '÷':
            if (aktualne === 0) {
                clearWynik()
                return
            }
            dzialanie = poprzednie / aktualne
            break;
        case '√':
            dzialanie = Math.pow(poprzednie, 1 / aktualne)
            break;
        case '^':
            dzialanie = Math.pow(poprzednie, aktualne)
            break;
        case '%':
            dzialanie = poprzednie / 100 * aktualne
            break;
        case 'log':
            dzialanie = Math.log(poprzednie) / Math.log(aktualne)
            break;
        default:
            return
    }

    aktualneDzialanie = dzialanie
    operacja = undefined
    poprzednieDzialanie = ''
}

const wybierzOperacje = (operator) => {
    if (aktualneDzialanie === '') {
        return
    }
    if (poprzednieDzialanie !== '') {
        const poprzednie = previousAction.innerText
        if (aktualneDzialanie.toString() === '0' && poprzednie[poprzednie.length - 1] === '/') {
            clearWynik()
            return
        }
        oblicz()
    }
    operacja = operator
    poprzednieDzialanie = aktualneDzialanie
    aktualneDzialanie = ''
}

const zaktualizujWynik = () => {
    currentAction.innerText = aktualneDzialanie
    if (operacja != null) {
        previousAction.innerText = poprzednieDzialanie + operacja
    } else {
        previousAction.innerText = ''
    }
}

const dodajLiczbe = (liczba) => {
    if (liczba === '.' && aktualneDzialanie.includes('.')) {
        return
    }
    aktualneDzialanie = aktualneDzialanie.toString() + liczba.toString()
}

const deletLiczbe = () => {
    aktualneDzialanie = aktualneDzialanie.toString().slice(0, -1)
}

const clearWynik = () => {
    aktualneDzialanie = ''
    poprzednieDzialanie = ''
    operacja = undefined
}

number.forEach((liczba) => {
    liczba.addEventListener('click', () => {
        dodajLiczbe(liczba.innerText)
        zaktualizujWynik()
    })
})

delet.addEventListener('click', () => {
    deletLiczbe()
    zaktualizujWynik()
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        wybierzOperacje(operator.innerText)
        zaktualizujWynik()
    })
})

equals.addEventListener('click', () => {
    oblicz()
    zaktualizujWynik()
})

clear.addEventListener('click', () => {
    clearWynik()
    zaktualizujWynik()
})